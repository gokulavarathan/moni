import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toast } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import crpgigImg from '../../assets/images/pics/crPgIg.svg';
import metamaskImg from '../../assets/images/icons/metamask.svg';
import binanceImg from '../../assets/images/icons/binance.svg';
import wal3Img from '../../assets/images/icons/wallet-3.svg';
import walconImg from '../../assets/images/icons/walletconnect.svg';
import trstwalImg from '../../assets/images/icons/trustwallet.svg';
import wal6Img from '../../assets/images/icons/wallet-6.svg';
import { Link } from 'react-router-dom';
import Web3 from "web3";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loader } from '../../redux/api'
import tickcircleImg from '../../assets/images/icons/tick-circle.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from "axios";
import helper from "../../components/Helper/axiosHelper";
import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";
import { useForm } from "react-hook-form";
import WalletDetails from "../../walletConnect/WalletDetails";
import { useDispatch } from 'react-redux'

const walletChain = WalletDetails.ChainId();
const BinRPc = WalletDetails.BinRpcUrl();
const WalletConnectRpc = WalletDetails.WalletConnectRpcUrl();
const RpcChainId = WalletDetails.rpcChainId();
var web3 = '';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("auth")}`
}

const Register = (props) => {

    const [walletImg, setWalletImg] = useState("")
    let baseUrl = helper.baseUrl()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();

    const [accept, setAccept] = useState(false)
    const [userType, setUserType] = useState("Investor")
    const [passEyeOpen, setPassEyeOpen] = useState(true)
    const [userAddr, setUserAddr] = useState('');
    const [state, setState] = useState(true);
    const [userBal, setUserBal] = useState('');
    const [walletType, setWalletType] = useState("");
    const [walletconnect, setWalletConnect] = useState(true)


    const onSubmit = (e) => {
        if (userAddr != '' && userAddr != null) {
            dispatch(loader(true))
            var obj = {
                "email": e.emailId,
                "password": e.Password,
                "confirm_password": e.Password,
                "userName": e.Username,
                "userAddress": userAddr,
                "type": userType ? "Investor" : "Entrepreneur",
                "mobile": parseInt(e.mobileNumber),
                "walletName": walletType,
                "dob":e.dob,
                "country":selectedCountry
            }

            axios.post(baseUrl + "user/basic/register", obj, { headers: headers })
                .then((res) => {

                    if (res.data.status == 200) {
                        dispatch(loader(false))
                        toast.success(res.data.message);
                        navigate("/")

                    }
                    else {
                        dispatch(loader(false))
                        toast.error(res.data.message)

                    }
                }).catch((err) => {
                    dispatch(loader(false))
                })

        } else {
            toast.error('connect wallet and proceed ')
        }

    }

    const WalletConnectProvider = window.WalletConnectProvider.default;

    const mainProvider = new WalletConnectProvider({
        networkId: walletChain,
        rpc: RpcChainId,
        qrcode: true,
        supportChainIds: [80001],
        pollingInterval: 12000,
        qrcodeModalOptions: {
            mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
            ],
            desktopLinks: ["encrypted ink"],
        },
    });
    const [countriesList, setContriesList] = useState()
    const [selectedCountry, setSelectedCountry] = useState()
    useEffect(() => {
        if ((localStorage.getItem("user_addr") !== null ||
            localStorage.getItem("user_addr") !== undefined) &&
            (localStorage.getItem("WalletType") !== null ||
                localStorage.getItem("WalletType") !== undefined)) {

            setUserAddr(localStorage.getItem("user_addr"));
            setWalletType(localStorage.getItem("WalletType"));
        }
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", function (accounts) {
                if (localStorage.getItem("WalletType") === "METAMASK") {
                    setUserAddr(accounts[0]);
                    localStorage.setItem("user_addr", accounts[0]);
                    getBalance(accounts[0], "METAMASK")
                    //props.walletAction({ type: walletType, userAddr: accounts[0] })
                }
            });
        }

        else if (window.BinanceChain) {
            window.BinanceChain.on("accountsChanged", function (accounts) {
                if (localStorage.getItem("WalletType") === "BINANCE_WALLET") {
                    setUserAddr(accounts[0]);
                    localStorage.setItem("user_addr", accounts[0]);
                    getBalance(accounts[0], "BINANCE_WALLET");
                    //props.walletAction({ type: walletType, userAddr: accounts[0] });
                }
            });
        }
        else if (mainProvider) {
            mainProvider.on("accountsChanged", function (accounts) {
                if (localStorage.getItem("WalletType") === "BINANCE_WALLET") {
                    setUserAddr(accounts[0]);
                    localStorage.setItem("user_addr", accounts[0]);
                    getBalance(accounts[0], "WALLET_CONNECT");
                    //props.walletAction({ type: walletType, userAddr: accounts[0] });
                }
            });
        }

        else if (window.trustwallet) {
            window.trustwallet.on("accountsChanged", function (accounts) {
                if (localStorage.getItem("WalletType") === "TRUSTWALLET") {
                    setUserAddr(accounts[0]);
                    localStorage.setItem("user_addr", accounts[0]);
                    getBalance(accounts[0], "TRUSTWALLET");
                    //props.walletAction({ type: walletType, userAddr: accounts[0] });
                }
            });
        }

        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => {
                setContriesList(res.data)
               
                setSelectedCountry(res.data[0].name.common)
            })
    }, []);

    const connectWallet = async (type) => {

        if (type === "METAMASK") {
            web3 = new Web3(window.ethereum);
            const netId = await window.ethereum.request({ method: "eth_chainId" });
            console.log(netId, "netidmetamaskkkkkkkk")
            if (97 != walletChain) {
                alert("please change your metamask network to binance");
            } else {
                if (window.ethereum) {
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    const accounts = await web3.eth.requestAccounts();
                    setUserBal('')
                    setUserAddr(accounts[0])
                    setWalletType(type)
                    getBalance(accounts[0], type)
                    localStorage.setItem("walletConnect", walletconnect)
                    setWalletImg(metamaskImg)
                    setWalletConnect(false)


                }
            }
        }

        else if (type === "BINANCE_WALLET") {
            await window.BinanceChain.enable();
            const netId = await window.BinanceChain.request({ method: 'eth_chainId', });
            if (parseInt(netId, 16) != walletChain) {
                alert("please change your binance wallet test network to smart binance");
            } else {
                window.BinanceChain.request({ method: "eth_accounts" }).then(async function (accounts) {
                    setUserBal('')
                    setUserAddr(accounts[0])
                    setWalletType(type)
                    //props.walletAction({ type: type, userAddr: accounts[0] })
                    getBalance(accounts[0], type)
                    setWalletImg(binanceImg)
                    setWalletConnect(false)


                });
            }
        }

        else if (type === "WALLET_CONNECT") {
            const bridge = '';
            QRCodeModal.open(bridge);

            const WalletConnectProvider = window.WalletConnectProvider.default;
            const mainProvider = new WalletConnectProvider({
                networkId: walletChain,
                rpc: RpcChainId,
                qrcode: true,
                supportChainIds: [80001],
                pollingInterval: 12000,
                qrcodeModalOptions: {
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar",
                    ],
                    desktopLinks: ["encrypted ink"],
                },
            });
            await mainProvider.enable();
            web3 = new Web3(mainProvider);
            mainProvider.on("connect", () => { });
            const accounts = await web3.eth.getAccounts();
            getBalance(accounts[0], type)
            setUserBal("");
            setUserAddr(accounts[0]);
            QRCodeModal.close(bridge);
            setWalletType(type);
            setWalletImg(walconImg)
            setWalletConnect(false)


        }


        else if (type === "TRUSTWALLET") {
            console.log("trustwallet")
            web3 = new Web3(window.trustwallet);
            const netId = await window.trustwallet.request({ method: "eth_chainId" });
            console.log(netId, "netidddd")
            if ("0x38" === walletChain) {
                alert("please change your network to binance");
            } else {
                if (window.trustwallet) {
                    await window.trustwallet.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3.eth.requestAccounts();
                    setUserBal('')
                    setUserAddr(accounts[0])
                    setWalletType(type)
                    getBalance(accounts[0], type)
                    setWalletImg(trstwalImg)
                    setWalletConnect(false)
                    //props.toggle()
                }
                else {
                    window.open("https://trustwallet.com/");
                }
            }
        }

    };

    const getBalance = async (walletAddres, walletType) => {

        if (walletType == 'METAMASK') {
            var balance = await web3.eth.getBalance(walletAddres);
            balance = (balance / Math.pow(10, 18)).toFixed(4);
            localStorage.setItem('Balance', balance);
            let walletAddr = walletAddres.toLowerCase();
            localStorage.setItem("user_addr", walletAddr);
            localStorage.setItem('WalletType', 'METAMASK');
            setTimeout(() => {
                setUserBal(balance);
                setState(!state);
                //Refresh();

            }, 1000);

        }

        else if (walletType === "BINANCE_WALLET") {
            window.BinanceChain.request({ method: "eth_getBalance", params: [walletAddres] }).then(function (balc) {
                var eth_balc = (balc / 1000000000000000000).toFixed(6);
                let walletAddr = walletAddres.toLowerCase();
                localStorage.setItem("user_addr", walletAddr);
                localStorage.setItem('Balance', eth_balc);
                localStorage.setItem('WalletType', 'BINANCE_WALLET');

                setTimeout(() => {
                    setUserBal(balance);
                    setState(!state);
                    //Refresh();

                }, 1000);

            });
        }

        else if (walletType === "WALLET_CONNECT") {
            await web3.eth.getBalance(walletAddres).then((balance) => {
                var eth_balc = (balance / 1000000000000000000).toFixed(6);
                let walletAddr = walletAddres.toLowerCase();
                localStorage.setItem("user_addr", walletAddr);
                localStorage.setItem('Balance', eth_balc);
                localStorage.setItem('WalletType', 'WALLET_CONNECT');

            })
            setTimeout(() => {
                setUserBal(balance);
                setState(!state);
                //Refresh();

            }, 1000);

        }

        else if (walletType === 'TRUSTWALLET') {
            var balance = await web3.eth.getBalance(walletAddres);
            balance = (balance / Math.pow(10, 18)).toFixed(4);
            localStorage.setItem('Balance', balance);
            let walletAddr = walletAddres.toLowerCase();
            localStorage.setItem("user_addr", walletAddr);
            localStorage.setItem('WalletType', 'TRUSTWALLET');
            setTimeout(() => {
                setUserBal(balance);
                setState(!state);
                // Refresh();
            }, 1000);
        }

    }
useEffect(() => {
  console.log(selectedCountry)

  
}, [selectedCountry])

    return (
        <Fragment>
            <Header />
            <div className="uCrPg">
                <div className="container">
                    <div className="uCrPgCnt">
                        <div className="row  align-items-start uCrPgR">
                            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-auto uCrPgC">
                                <div className="uCrPgIg">
                                    <img src={crpgigImg} alt="crPgIg" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl uCrPgC">
                                <div className="uCrPgFrm">
                                    <h2>Register</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="custom-control custom-switch csV1">
                                            <label for="usrTyp"> Investor </label>
                                            <input type="checkbox"
                                                className="custom-control-input"
                                                id="usrTyp"
                                                onChange={
                                                    (e) => {
                                                        if (e.target.checked) {
                                                            setUserType("Entreprenur")
                                                        } else {
                                                            setUserType("Investor")
                                                        }

                                                    }
                                                }


                                            />
                                            <label className="custom-control-label" for="usrTyp"> Entrepreneur </label>
                                        </div>

                                        <div className="ucpgIps">
                                            <div className="form-group">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="User Name"
                                                    autoComplete="off"
                                                    name="Username"
                                                    {...register("Username", {
                                                        required: "Username is required",
                                                        pattern: {
                                                            value: /([^\s])/,
                                                            message: "User Name  is required",
                                                        },
                                                    })}
                                                    onKeyUp={() => {
                                                        trigger("Username");
                                                    }}

                                                />
                                                <br />
                                                {errors.Username && (
                                                    <small style={{ color: "red", marginLeft: "10px" }}>
                                                        {errors.Username.message}
                                                    </small>
                                                )}

                                            </div>

                                            <div className="form-group">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    name="emailId"
                                                    {...register("emailId", {
                                                        required: "email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address",
                                                        },
                                                    })}
                                                    onKeyUp={() => {
                                                        trigger("emailId");
                                                    }}

                                                />
                                                <br />
                                                {errors.emailId && (
                                                    <small style={{ color: "red", marginLeft: "10px" }}>
                                                        {errors.emailId.message}
                                                    </small>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="Mobile Number"
                                                    name="mobileNumber"
                                                    {...register("mobileNumber", {
                                                        required: "MobileNumber is required",
                                                        pattern: {
                                                            value: /([^\s])/,
                                                            message: "Mobile Number  is required",
                                                        },
                                                    })}
                                                    onKeyUp={() => {
                                                        trigger("mobileNumber");
                                                    }}

                                                />
                                                <br />
                                                {errors.mobileNumber && (
                                                    <small style={{ color: "red", marginLeft: "10px" }}>
                                                        {errors.mobileNumber.message}
                                                    </small>
                                                )}

                                            </div>

                                            <div className="form-group">
                                                <input type="date"
                                                    max={"2020-12-31"}
                                                    className="form-control"
                                                    placeholder="Date of birth"
                                                    name="dob"
                                                    {...register("dob", {
                                                        required: "DOB is required",
                                                        pattern: {
                                                            value: /([^\s])/,
                                                            message: "DOB  is required",
                                                        },
                                                    })}
                                                    onKeyUp={() => {
                                                        trigger("dob");
                                                    }}

                                                />
                                                <br />
                                                {errors.dob && (
                                                    <small style={{ color: "red", marginLeft: "10px" }}>
                                                        {errors.dob.message}
                                                    </small>
                                                )}

                                            </div>

                                            <div className="form-group">
                                                {/* <label for="exampleFormControlSelect1">Country</label> */}
                                                <select className="custom-select sel_utght "  id="exampleFormControlSelect1" placeholder="country" onChange={(e) => {
                                                   setSelectedCountry(e.target.value);
                                                }} >
                                                    {selectedCountry && countriesList.map((dat, i) => {
                                                        return (
                                                           
                                                            // <option>Country</option>
                                                            <option>{countriesList[i].name.common}</option>
                                                            

                                                        )
                                                    })}

                                                </select>                                               

                                            </div>
                                            <br></br>

                                

                                            <div className="input-group mb-3">
                                                <input
                                                    class="form-control"
                                                    placeholder="Password"
                                                    name="Password"
                                                    type={passEyeOpen ? "password" : "text"}
                                                    {...register("Password", {
                                                        required: "Password is required",
                                                        // pattern: {
                                                        //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        //     message: "Invalid email address",
                                                        // },
                                                    })}
                                                    onKeyUp={() => {
                                                        trigger("Password");
                                                    }}
                                                />
                                                <div class="input-group-append">
                                                    <span class="btn btnIc" onClick={() => { setPassEyeOpen(!passEyeOpen) }}>
                                                        {
                                                            passEyeOpen ? <FiEyeOff /> : <FiEye />
                                                        }

                                                    </span>
                                                </div>
                                                <br></br>
                                            </div>
                                            {errors.Password && (
                                                <small style={{ color: "red", marginLeft: "10px" }}>
                                                    {errors.Password.message}
                                                </small>
                                            )}
                                        </div>
                                        {
                                            walletconnect ?
                                                <div className="walCnt">
                                                    <h6>Connect Wallet</h6>
                                                    <div className="walCntR">
                                                        <span className="btn" onClick={() => connectWallet("METAMASK")}>
                                                            <img src={metamaskImg} alt="metamask" />
                                                        </span>

                                                        <span className="btn" onClick={() => connectWallet("BINANCE_WALLET")}>
                                                            <img src={binanceImg} alt="binance" />
                                                        </span>

                                                        <span className="btn" onClick={() => connectWallet("METAMASK")}>
                                                            <img src={wal3Img} alt="wallet-3" />
                                                        </span>

                                                        <span className="btn" onClick={() => connectWallet("WALLET_CONNECT")}>
                                                            <img src={walconImg} alt="walletconnect" />
                                                        </span>

                                                        <span className="btn" onClick={() => connectWallet("TRUSTWALLET")}>
                                                            <img src={trstwalImg} alt="trustwallet" />
                                                        </span>

                                                        <span className="btn" onClick={() => connectWallet("METAMASK")}>
                                                            <img src={wal6Img} alt="wallet-6" />
                                                        </span>
                                                    </div>
                                                </div>
                                                :
                                                <div className="walCnt" >
                                                    <h6>Your Wallet Address</h6>
                                                    <div className="walCntd">
                                                        <div className="walCntdIg">
                                                            <img src={walletImg} alt="metamask" />
                                                        </div>


                                                        <div className="walCntdTx">
                                                            {userAddr}
                                                        </div>
                                                        <div className="walCntdVf">
                                                            <img src={tickcircleImg} alt="tick-circle" />
                                                        </div>
                                                    </div>
                                                </div>
                                        }

                                        <div className="custom-control custom-checkbox csChk1">
                                            <input type="checkbox"
                                                className="custom-control-input"
                                                id="customCheck1"
                                                onChange={() => setAccept(!accept)}

                                            />
                                            <label className="custom-control-label" for="customCheck1">
                                                I Agree  <a href="#">Terms & Conditions</a>
                                            </label>
                                        </div>

                                        <div className="ucpgSbm ">
                                            {/* {accept ?
                                                <button className="btn btnGr btn-16645 mr-30" onClick={(e) => { navigate("/kyc") }}  >
                                                    Next
                                                </button>
                                                :
                                                <button className="btn btnGr btn-16645 mr-30" disabled >
                                                    Next
                                                </button>

                                            } */}
                                            <button className="btn btnGr btn-16645 mr-30" onClick={() => { navigate("/") }}  >
                                                Cancel
                                            </button>
                                            {accept ?
                                                <button className="btn btnGr btn-16645 ml-30" >
                                                    Skip KYC & submit
                                                </button>
                                                :
                                                <button className="btn btnGr btn-16645 ml-30" disabled >
                                                    Skip KYC & submit
                                                </button>

                                            }


                                        </div>
                                    </form>


                                    <div className="ucpgOr">
                                        <p>Have an account? <Link to="/login" >Log in</Link></p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InnerFooter />
        </Fragment>
    );

}

export default Register;