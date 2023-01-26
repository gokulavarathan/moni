import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { } from 'reactstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {loader} from '../../redux/api'

import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import crpgigImg from '../../assets/images/pics/crPgIg.svg';


import { FiEye,FiEyeOff } from 'react-icons/fi';

import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";

import axios from "axios";
import helper from "../../components/Helper/axiosHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useDispatch} from 'react-redux'


const Login = (props) => {

    let baseUrl = helper.baseUrl()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordViewHide, setPasswordViewHide] = useState(true)


    const onSubmit = (e) => {
        dispatch(loader(true))
        let loginData = { email: e.emailId, password: e.password }
        console.log(loginData,"loginData")

        axios.post(baseUrl + "user/basic/login", loginData)
        .then((res) => {
           
            if (res.data.message === "Logged In successfully.") {
                toast.success(res.data.message)
                navigate("/")
                localStorage.setItem("auth", res.data.authKey);
                localStorage.setItem("isLogin",true);
                localStorage.setItem("userType",res.data.type);

                 dispatch(loader(false))
            }
            else {
                dispatch(loader(false))
                toast.error(res.data.message)

            }
        }).catch((err)=>{
            dispatch(loader(false))
        })
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
                                    <img src={crpgigImg} alt="crPgIg" />
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl uCrPgC">
                                <div className="uCrPgFrm">
                                    <h2 className="pb-1">Login</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="ucpgIps">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email"
                                                    
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

                                            <div className="input-group">
                                                <input
                                                    type={passwordViewHide ? "password" : "text"}
                                                    className="form-control"
                                                    placeholder="Password"
                                                    {...register("password", {
                                                        required: "password is required",

                                                    })}
                                                    onKeyUp={() => {
                                                        trigger("password");
                                                    }}
                                                />
                                                
                                                <div className="input-group-append">
                                                    <span className="btn btnIc" onClick={() => { setPasswordViewHide(!passwordViewHide) }}>

                                                        {
                                                            passwordViewHide ?  <FiEyeOff/>:  <FiEye/>
                                                        }
                                                       
                                                    </span>
                                                </div>
                                            </div>
                                            <br />
                                                {errors.password && (
                                                    <small style={{ color: "red", marginLeft: "10px" }}>
                                                        {errors.password.message}
                                                    </small>
                                                )}
                                        </div>

                                        <div className="ucpgLk" >
                                            <Link to="/forgotpassword">Forget Password</Link>
                                        </div>

                                        <div className="ucpgSbm">
                                            <button className="btn btnGr btn-16645" >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                    <div className="ucpgOr">
                                        <p> You don't have an account? <Link to="/register"> Register </Link></p>
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

export default Login;