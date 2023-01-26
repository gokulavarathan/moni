import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import profileImg from '../../assets/images/pics/profile-2.png';



import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";


const Kyc1 = (props) => {   
    return (
        <Fragment>
            <Header />
            <div className="uCrPg">
                <div className="container">
                    <div className="uCrPgCnt">
                        <div className="row align-items-start justify-content-between uCrPgR">
                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 uCrPgC">
                                <div className="kVcLt">
                                    <div className="kVcLtHd">Face Recognition</div>
                                    <div className="kVcLtBd">
                                        <p>KYC procedures defined involve all the necessary actions to ensure their customers are real, assess, and monitor risks. These client-onboarding processes help prevent and identify money laundering, terrorism financing, and other illegal corruption schemes.</p>
                                        <p>Face verification is a way of allowing a computer or a robot to confirm that a person is who they claim to be. It's a form of biometric authentication, which means it uses some measurable physical aspect of a body as a credential.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 uCrPgC">
                                <div className="kVcRt">
                                    <div className="row kVcTyR">
                                        <div className="col-sm-12 col-md-12 col-lg-12 kVcTyC">
                                            <div className="kVcTyIgC">
                                                <div className="kVcTyIgTl mb-2 pb-1">Click start to Here</div>
                                                <div className="kVcTyIgIp">
                                                    <div className="custom-file v2">
                                                        <input type="file" className="custom-file-input" id="facReg" />
                                                        <label className="custom-file-label" for="facReg">
                                                            <div className="csFlIcTx">
                                                                <img src={profileImg} alt="files" className="mb-0" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="kVcTySbm">
                                        <button className="btn btnGr btn-16645">
                                            Create Account
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

export default Kyc1;