import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';
import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import copyImg from '../../assets/images/icons/copy.svg';
import closeImg from '../../assets/images/icons/close.svg';
import binImg from '../../assets/images/coins/binance.png';
import pro3Img from '../../assets/images/pics/profile-3.png';
import Header from "../../components/Header/Header";


const Dashboard = (props) => {   

	const [userType, setUserType] = useState(false);

	useEffect(()=>{
		if(localStorage.getItem("isLogin") == "true"){
			if(localStorage.getItem("userType") == "Entreprenur"){
				setUserType("Entreprenur")
			}else{
				setUserType("Investor") 
			}
			
		}else{
			setUserType(false) 


		}
	},[])


    return (
        <Fragment>      
			     
            <div className="dbCdHd">
					<div className="dbCdHdCnt">
						<div className="row dbHdCdR">
							<div className="col-lg-auto dbHdCdC">
								<div className="dbCdHdDtPf">
									<div className="dchdPIg"	>
										<img src={pro3Img} alt="profile-3" />
									</div>
									<div className="dchdPTx">Aliens Geroge</div>
									<div className="dchdPGm">aliensgeroge@gmail.com</div>
								</div>
							</div>

							<div className="col-lg dbHdCdC">
								<div className="dbCdHdDt">							
									<div className="dbCdHdDtBls">
										<div className="dchdBlCt">
											<div className="dchdBlC">
												<div className="dchdBlCVl">35</div>
												<div className="dchdBlClb">Inversment Project</div>
											</div>
										</div>
										<div className="dchdBlCt">
											<div className="dchdBlC">
												<div className="dchdBlCVl">09</div>
												<div className="dchdBlClb">Total My Project</div>
											</div>
										</div>
										<div className="dchdBlCt">
											<div className="dchdBlC">
												<div className="dchdBlCVl">09</div>
												<div className="dchdBlClb">Followers</div>
											</div>
										</div>
										{/* <div className="dchdBlCt">
											<div className="dchdBlC">
												<div className="dchdBlCVl">
													<img src={binImg} alt="binance" />
													<span>223.23</span>
												</div>
												<div className="dchdBlClb">Balance</div>
											</div>
										</div> */}
									</div>

									<div className="dbCdHdDtWlKy">
										<div className="dbCdHdDtWl">
											<div className="dbCdHdDtWlCn">											
												<img src={binImg} alt="binance" />
											</div>												

											<div className="dbCdHdDtWlTx">
												0x4cf53ae8C51c7eCB9f57E825152c59CB4cc450f4
											</div>

											<div className="dbCdHdDtWlCp">
												<button className="btn btnIc">
													<img src={copyImg} alt="copy" />
												</button>
											</div>
										</div>

										<div className="dbCdHdDtKy">
											<img src={closeImg} alt="close" />
											<span>KYC Not Verified</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="dbMu">
							<ul>
							
								

								{ userType  ? userType == "Entreprenur" ?
																
								<li> 
								<Link to="/myproject">My Project</Link>
								</li>
								: 
								<li>
								<Link to="/investedproject">Invested project</Link>
							    </li>
								:null}
								{/* <li >
								<Link to="/favorites"> Favorites</Link>
								</li>
								<li>
								<Link to="/followers"> Followers</Link>
								</li> */}
								<li>
								<Link to="/profile"> Profile</Link>
								</li>
								{/* <li>
									<a href="#">KYC</a></li> */}
							</ul>
						</div>
					</div>
			</div>            
        </Fragment>
    );
   
}

export default Dashboard;