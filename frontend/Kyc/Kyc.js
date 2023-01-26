import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import filesImg from '../../assets/images/icons/files.svg';



import Header from "../../components/Header/Header";
import InnerFooter from "../../components/InnerFooter/InnerFooter";


const Kyc = (props) => {   
    return (
        <Fragment>
            <Header />
            <div className="uCrPg">
                <div className="container">
                    <div className="uCrPgCnt v2">
                        <div className="row align-items-start justify-content-between uCrPgR">
                            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-5 uCrPgC">
                                <div className="kVcLt">
                                    <div className="kVcLtHd">KYC Verfications</div>
                                    <div className="kVcLtBd">
                                        <p>KYC procedures defined involve all the necessary actions to ensure their customers are real, assess, and monitor risks. These client-onboarding processes help prevent and identify money laundering, terrorism financing, and other illegal corruption schemes.</p>
                                        <p>The Know Your Client (KYC) verification is a set of standards and requirements used in the investment and financial services industries to ensure brokers have sufficient information about their clients, their risk profiles, and their financial position.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl-7 uCrPgC">
                                <div className="kVcRt">

                                    <div className="kVcTy">
                                        <select className="custom-select">
                                            <option selected>Passport</option>
                                            <option value="1">Voter ID</option>
                                            <option value="2">Driving Lincense</option>
                                        </select>
                                    </div>

                                    <div className="row kVcTyR">
                                        <div className="col-sm-12 col-md-12 col-lg-6 kVcTyC">
                                            <div className="kVcTyIgC">
                                                <div className="kVcTyIgTl">Front side document</div>
                                                <div className="kVcTyIgIp">
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="frSdDc" />
                                                        <label className="custom-file-label" for="frSdDc">
                                                            <div className="csFlIcTx">
                                                                <img src={filesImg} alt="files" />
                                                                <span>Drop Doucument here, or select a file.</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-6 kVcTyC">
                                            <div className="kVcTyIgC">
                                                <div className="kVcTyIgTl"> Back Side document	</div>
                                                <div className="kVcTyIgIp">
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="bkSdDc" />
                                                        <label className="custom-file-label" for="bkSdDc">
                                                            <div className="csFlIcTx">
                                                                <img src={filesImg} alt="files" />
                                                                <span>Drop Doucument here, or select a file.</span>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="kVcTySbm">
                                        <button className="btn btnGr btn-16645">
                                            Next
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

export default Kyc;