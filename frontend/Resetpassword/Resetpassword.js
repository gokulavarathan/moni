import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import crpgigImg from '../../assets/images/pics/crPgIg-3.svg';
import metamaskImg from '../../assets/images/icons/metamask.svg';
import binanceImg from '../../assets/images/icons/binance.svg';
import wal3Img from '../../assets/images/icons/wallet-3.svg';
import walconImg from '../../assets/images/icons/walletconnect.svg';
import trstwalImg from '../../assets/images/icons/trustwallet.svg';
import wal6Img from '../../assets/images/icons/wallet-6.svg';
import { useDispatch} from 'react-redux'


import { toast } from "react-toastify";
import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";
import axios from "axios";
import helper from "../../components/Helper/axiosHelper";
import { useLocation, } from 'react-router-dom';
import {loader} from '../../redux/api'
import { useNavigate } from "react-router-dom";



const Resetpassword = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    const [passwordViewHide, setPasswordViewHide] = useState(true)
    const [passwordReViewHide, setPasswordReViewHide] = useState(true)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")

    let baseUrl = helper.baseUrl()


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("auth")}`
    }

    const handleCilckReset = () => {

        if (password === confirmPassword) {
            dispatch(loader(true))
            var resetObj = {
                password: password,
                confirmPassword: confirmPassword,
                email: email

            }
            axios.post(baseUrl + "user/basic/resetPassword", resetObj, { headers: headers })
            .then((res) => {
               if(res.data.status){
                dispatch(loader(false))
                toast.success(res.data.msg);
                navigate("/")
               }
               else{
                dispatch(loader(false))
                toast.error(res.data.msg)
               }
            }).catch((err)=>{
                dispatch(loader(false))

            })
        }else{
            dispatch(loader(false))
            toast.error("Password Mismatch")
        }

    }

    useEffect(() => {
        if (location && location.state) {
            setEmail(location.state.email)
            console.log(location.state.email)
        }

    }, [location]);

    return (
        <Fragment>
            <Header />
            <div className="uCrPg">
                <div className="container">
                    <div className="uCrPgCnt">
                        <div className="row uCrPgR">
                            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-auto uCrPgC">
                                <div className="uCrPgIg">
                                    <img src={crpgigImg} alt="crPgIg-3" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl uCrPgC">
                                <div className="uCrPgFrm">
                                    <h2 className="pb-1">Reset Password</h2>



                                    <div className="ucpgIps">



                                        <div className="input-group mb-3">
                                            <input onChange={(e) => { setPassword(e.target.value) }} type={passwordViewHide ? "password" : "text"} className="form-control" placeholder="New Password" autoComplete="off" />
                                            <div className="input-group-append">
                                                <button className="btn btnIc" onClick={() => { setPasswordViewHide(!passwordViewHide) }}>
                                                    <img src={eyeslashImg} alt="eye-slash" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="input-group mb-3">
                                            <input onChange={(e) => { setConfirmPassword(e.target.value) }} type={passwordReViewHide ? "password" : "text"} className="form-control" placeholder="Re-enter Password" autoComplete="off" />
                                            <div className="input-group-append">
                                                <button className="btn btnIc" onClick={() => { setPasswordReViewHide(!passwordReViewHide) }} >
                                                    <img src={eyeslashImg} alt="eye-slash" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ucpgSbm" >
                                        <button className="btn btnGr btn-16645" onClick={() =>
                                            handleCilckReset()}>
                                            Submit
                                        </button>
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

export default Resetpassword;