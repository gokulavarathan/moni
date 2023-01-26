import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import crpgigImg from '../../assets/images/pics/crPgIg-2.svg';
import metamaskImg from '../../assets/images/icons/metamask.svg';
import binanceImg from '../../assets/images/icons/binance.svg';
import wal3Img from '../../assets/images/icons/wallet-3.svg';
import walconImg from '../../assets/images/icons/walletconnect.svg';
import trstwalImg from '../../assets/images/icons/trustwallet.svg';
import wal6Img from '../../assets/images/icons/wallet-6.svg';
import { toast } from "react-toastify";
import {loader} from '../../redux/api'



import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";
import { useDispatch} from 'react-redux'

import axios from "axios";
import helper from "../../components/Helper/axiosHelper";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Forgotpassword = (props) => {

    let baseUrl = helper.baseUrl()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [showEmailOtp, setShowEmailOtp] = useState(false)
    const [otp, setOtp] = useState([])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("auth")}`
    }

    const handleEmail = () => {
        if (email !== "") {
            dispatch(loader(true))
            var emailObj = { email: email }
            axios.post(baseUrl + "user/basic/forgotPassword", emailObj)
            .then((res) => {
                if (res.data.message === "Password Reset link sent to your E-mail") {
                    dispatch(loader(false))
                    toast.success(res.data.message)
                    localStorage.setItem("auth", res.data.token)
                    setShowEmailOtp(true)
                }
                else {
                dispatch(loader(false))
                toast.error(res.data.message);
                }

            }).catch((err)=>{
                dispatch(loader(false))

            })
        }
        else {
            toast.error("Please fill the email id");
            setShowEmailOtp(false)

        }



    }

    const handleChangeOTP = (e, index) => {
        console.log(index, e.target.value)
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
        if (value.length >= maxLength) {
            if (parseInt(fieldIndex, 10) < 6) {
                const nextSibling = document.querySelector(
                    `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
                );

                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }


        const newPeople = otp.filter((v, i) => i !== index);
        let ids = [...otp]
        ids[index] = e.target.value;
        setOtp(ids)

       



    }

    const otpVerify = () => {
        let OTPStr = otp.join("")
        
        if (OTPStr.length === 6) {
            dispatch(loader(true))
            var otpObj = { otpCode: OTPStr }
            axios.post(baseUrl + "user/basic/verifyOTP", otpObj, { headers: headers })
            .then((res) => {
                if (res.data.message === "OTP verified successfully") {
                    dispatch(loader(false))
                    toast.success(res.data.message)
                    navigate("/resetPassword", { state: { email: email } })
                }
                else {
                    dispatch(loader(false))
                    toast.error(res.data.message)
                }

            }).catch((err)=>{
                dispatch(loader(false))
            })

        }
        else {
            dispatch(loader(false))
            toast.error("Please enter the otp")
        }
    }



    return (
        <Fragment>
            <Header />
            <div className="uCrPg">
                <div className="container">
                    <div className="uCrPgCnt">
                        <div className="row uCrPgR">
                            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-auto uCrPgC">
                                <div className="uCrPgIg">
                                    <img src={crpgigImg} alt="crPgIg-2" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl uCrPgC">
                                <div className="uCrPgFrm">
                                    <h2>Forget Password</h2>

                                    <div style={{ display: showEmailOtp ? "none" : "" }}  >
                                        {/* <div className="ucpgShd">Please enter register mail id</div> */}

                                        <div className="ucpgIps">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder= "Please enter register mail id" onChange={(e) => { setEmail(e.target.value) }} />
                                            </div>

                                        </div>

                                        <div className="ucpgSbm v2">
                                            <button className="btn btnGr btn-16645" onClick={() => handleEmail()}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: showEmailOtp ? "" : "none" }}>
                                        <div className="ucpgShd">OTP to your register mail id</div>

                                        <div className="ucpgIpsG">
                                            <div className="form-group">
                                                <input type="text" name="ssn-1"
                                                    maxLength={1}
                                                    onChange={(e) => handleChangeOTP(e, 0)} className="form-control" placeholder="*" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" name="ssn-2"
                                                    maxLength={1}
                                                    onChange={(e) => handleChangeOTP(e, 1)} className="form-control" placeholder="*" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" name="ssn-3"
                                                    maxLength={1}
                                                    onChange={(e) => handleChangeOTP(e, 2)} className="form-control" placeholder="*" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" name="ssn-4"
                                                    maxLength={1}
                                                    onChange={(e) => handleChangeOTP(e, 3)} className="form-control" placeholder="*" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" name="ssn-5"
                                                    maxLength={1}
                                                    onChange={(e) => handleChangeOTP(e, 4)} className="form-control" placeholder="*" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" name="ssn-6"
                                                    maxLength={1}
                                                    onChange={(e) => handleChangeOTP(e, 5)} className="form-control" placeholder="*" />
                                            </div>
                                        </div>

                                        <div className="ucpgSbm v2">
                                            <button className="btn btnGr btn-16645" onClick={() => otpVerify()}>
                                                Submit
                                            </button>

                                            <button className="btn btnLk" onClick={() => handleEmail()}>Resend</button>
                                        </div>
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

export default Forgotpassword;