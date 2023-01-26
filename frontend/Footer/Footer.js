import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import { InputGroupAddon, Button, InputGroup, Input} from 'reactstrap';

import ftrlogoImg from '../../assets/images/ftr-logo.png';

const Footer = (props) => {
    
    return (
        <Fragment>
           <footer className="ftr-main">
            <div className="container">
                <div className="ftr-cnt">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-lg-9">
                            <div className="ftr-Leftcnt">
                                <div className="ftr-logo">
                                    <img src={ftrlogoImg} alt="" className="img-fluid" />
                                </div>
                                <div>
                                    <h5>Our crowdfunding platform is a trusted and secure way to support innovative projects and get rewarded for your contributions. Our team has implemented industry-standard security measures to ensure the safety of your personal and financial information. We are committed to transparency and fairness, and we work closely with project creators to bring you exciting opportunities to invest in the future.</h5>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4 mt-md-0">
                        <div className="ftr-Rightcnt">
                            <div className="row">
                            <div className="col-6">
                                <div className="ftr-menumain">
                                    <h5 className="ftr-menuTitle">About</h5>
                                    <div className="ftr-menu">
                                        <ul>
                                        <li>
                                        <Link to='/aboutus'> About Us </Link>
                                        </li>
                                        <li>
                                        <Link to='/'> Terms and conditions </Link>
                                        </li>
                                        <li>
                                        <Link to='/'> Privacy Policy </Link>
                                        </li>
                                        <li>
                                        <Link to='/'> Contact Us</Link>                                       
                                        </li>
                                        <li>
                                        <Link to='/'> FAQ</Link>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="ftr-menumain">
                                    <h5 className="ftr-menuTitle">Quick Links</h5>
                                    <div className="ftr-menu">
                                        <ul>
                                        <li><a href="">Arts</a></li>
                                        <li><a href="">Comics & Illustration</a></li>
                                        <li><a href="">Design & TechFilm</a></li>
                                        <li><a href="">Food & Craft</a></li>
                                        <li><a href="">Games</a></li>
                                        <li><a href="">Music</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-cnt">
                    <div className="row align-items-center">
                        <div className="col-md-8 text-center text-md-left">
                            <p>&#169; Copyright 2022 - 2023 House of Crypto All rights reserved.</p>
                        </div>
                        <div className="col-md-4 mt-3 mt-md-0">
                            <div className="social-ul">
                            <ul className="justify-content-md-end">
                                <li>
                                    <a href="">
                                        <svg width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M31.1329 11.1102C31.0883 11.6922 31.0528 12.2758 30.9963 12.8553C30.8945 13.9073 30.7736 14.9552 30.4556 15.9471C30.3938 16.1604 30.3019 16.3581 30.1843 16.5307C29.9872 16.804 29.7684 16.8015 29.5772 16.5192C29.4248 16.276 29.3098 15.9993 29.2382 15.7034C28.9268 14.5881 28.8111 13.4249 28.7165 12.2594C28.6046 10.8057 28.573 9.34418 28.6219 7.88512C28.6706 6.27174 28.7737 4.66412 29.1055 3.09436C29.1813 2.68278 29.3062 2.28789 29.476 1.92302C29.7322 1.40937 30.0312 1.40114 30.2861 1.91232C30.5784 2.49758 30.6928 3.16598 30.8005 3.83109C30.9626 4.84907 31.0629 5.88096 31.1008 6.91791C31.1076 6.99904 31.1184 7.07958 31.1329 7.15909V11.1102Z" fill="black"/>
                                        <path d="M0.734144 9.12718C0.675267 4.55348 4.38614 0.269032 9.59184 0.266602C14.7239 0.266602 18.4782 4.45221 18.4667 9.15392C18.4553 13.8556 14.6978 18.0096 9.58039 17.9999C4.4025 17.991 0.672814 13.7341 0.734144 9.12718Z" fill="black"/>
                                        <path d="M18.4668 9.13116C18.5091 7.13813 18.7757 5.19413 19.5553 3.35851C19.8804 2.58951 20.2925 1.87384 20.8607 1.27688C22.141 -0.070158 23.6969 -0.070158 24.9707 1.27688C25.7462 2.10007 26.2331 3.1125 26.5916 4.20148C27.0434 5.60594 27.2901 7.0751 27.3232 8.55828C27.389 10.5892 27.1435 12.5633 26.4485 14.4634C26.1087 15.3924 25.6535 16.2534 24.9853 16.9674C23.7034 18.3385 22.1402 18.3437 20.8542 16.9854C20.0853 16.1717 19.6016 15.1687 19.2431 14.0961C18.7902 12.7369 18.5422 11.3108 18.5083 9.87005C18.5083 9.62318 18.4822 9.37717 18.4668 9.13116Z" fill="black"/>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.55016 19C16.6045 19 21.5583 11.6894 21.5583 5.35156C21.5583 5.14604 21.5536 4.93595 21.5442 4.73043C22.5079 4.05142 23.3395 3.21038 24 2.24682C23.1025 2.63587 22.1496 2.88995 21.1739 3.0004C22.2013 2.40038 22.9705 1.45779 23.3391 0.347345C22.3726 0.905429 21.3156 1.29911 20.2134 1.51151C19.4708 0.74272 18.489 0.23369 17.4197 0.06312C16.3504 -0.10745 15.2532 0.0699397 14.2977 0.567864C13.3423 1.06579 12.5818 1.85651 12.1338 2.81779C11.6859 3.77906 11.5754 4.85734 11.8195 5.88592C9.86249 5.79023 7.94794 5.2949 6.19998 4.43203C4.45203 3.56916 2.90969 2.35803 1.67297 0.877134C1.0444 1.93303 0.852057 3.18251 1.13503 4.37162C1.418 5.56072 2.15506 6.60024 3.19641 7.27889C2.41463 7.25471 1.64998 7.04963 0.965625 6.6806V6.73997C0.964925 7.84806 1.3581 8.92219 2.07831 9.77977C2.79852 10.6374 3.80132 11.2255 4.91625 11.4441C4.19206 11.6372 3.43198 11.6653 2.69484 11.5263C3.00945 12.4793 3.62157 13.3128 4.44577 13.9105C5.26997 14.5082 6.26512 14.8402 7.29234 14.8603C5.54842 16.195 3.39417 16.919 1.17656 16.9156C0.783287 16.915 0.390399 16.8915 0 16.8452C2.25286 18.2534 4.87353 19.0014 7.55016 19Z" fill="black"/>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.30403 7.72331C7.9146 5.27887 11.6559 3.66735 13.5278 2.88874C18.8726 0.665662 19.9832 0.279489 20.7071 0.266738C20.8663 0.263933 21.2223 0.30339 21.4529 0.490497C21.6476 0.648486 21.7011 0.861908 21.7268 1.0117C21.7524 1.16149 21.7843 1.50272 21.759 1.76935C21.4693 4.81258 20.2161 12.1977 19.5785 15.6062C19.3087 17.0484 18.7775 17.532 18.2632 17.5793C17.1456 17.6822 16.2969 16.8407 15.2144 16.1311C13.5205 15.0207 12.5635 14.3295 10.9193 13.246C9.01916 11.9938 10.251 11.3056 11.3339 10.1809C11.6173 9.88652 16.5416 5.40743 16.637 5.0011C16.6489 4.95029 16.6599 4.76086 16.5474 4.66084C16.4349 4.56082 16.2688 4.59502 16.1489 4.62222C15.979 4.66078 13.273 6.44935 8.03089 9.98794C7.26279 10.5154 6.56708 10.7724 5.94374 10.7589C5.25656 10.744 3.93471 10.3703 2.95204 10.0509C1.74677 9.65913 0.788837 9.45199 0.872251 8.78662C0.915698 8.44005 1.39296 8.08561 2.30403 7.72331Z" fill="black"/>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </footer>
        </Fragment>
    );
   
}

export default Footer;