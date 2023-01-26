import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import crpgigImg from '../../assets/images/pics/crPgIg.svg';
import metamaskImg from '../../assets/images/icons/metamask.svg';
import tickcircleImg from '../../assets/images/icons/tick-circle.svg';



import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";


const Register = (props) => {   
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
                                    <h2>Register</h2>

                                    <div className="custom-control custom-switch csV1">
                                        <label  for="usrTyp"> Investor </label>
                                        <input type="checkbox" className="custom-control-input" id="usrTyp" />
                                        <label className="custom-control-label" for="usrTyp"> Entrepreneur </label>
                                    </div>

                                    <div className="ucpgIps">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="User Name" value="Perter Park" />
                                        </div>

                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email" value="Perter@gmail.com" />
                                        </div>									

                                        <div className="input-group">
                                            <input type="password" className="form-control" placeholder="Password" value="**********"/>
                                            <div className="input-group-append">
                                            <button className="btn btnIc">
                                                    <img src={eyeslashImg} alt="eye-slash" />
                                            </button>
                                            </div>										
                                        </div>
                                        <div className="ipSmTx mb-3">
                                            maximum of 8 characters with special characters
                                        </div>
                                    </div>


                                    <div className="walCnt">
                                        <h6>Your Wallet Address</h6>
                                        <div className="walCntd">
                                            <div className="walCntdIg">
                                                <img src={metamaskImg} alt="metamask" />
                                            </div>
                                            <div className="walCntdTx">
                                                0x4cf53ae8C51c7eCB9f57E825152c59CB4cc450f4
                                            </div>
                                            <div className="walCntdVf">
                                                <img src={tickcircleImg} alt="tick-circle" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="custom-control custom-checkbox csChk1">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" for="customCheck1">
                                            I Agree  <a href="#">Terms & Conditions</a>
                                        </label>
                                    </div>

                                    <div className="ucpgSbm">
                                        <button className="btn btnGr btn-16645">
                                            Next
                                        </button>
                                    </div>

                                    <div className="ucpgOr">
                                        <p>Have an account? <a href="#">Log in</a></p>
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