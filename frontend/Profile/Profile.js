import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import pro3Img from '../../assets/images/pics/profile-3.png';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../views/Dashboard/Dashboard";


const Profile = (props) => {   
    return (
        <Fragment>
            <Header />
            <div className="inrPgCnt dbPrf">
				<div className="container">
					<Dashboard />					
					<div className="row dbCdR">
						<div className="col-sm-12 col-md-12 col-lg-8 dbCdC">
							<div className="dbCdBg dbPfCd">
								<div className="dbPfCdHd">
									<h4>Profile</h4>
								</div>
								<div className="dbPfCdBd">
									<div className="dbFrm">

										<div className="dbFrmPrfIg">
											<div className="dbPrfIg">
												<img src={pro3Img} alt="profile-3" />
												<div className="dbPrfIgIp">
													<input type="file" id="prfIg"/>
													<label for="prfIg">
														<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
															<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
															<circle cx="12" cy="13" r="3" />
															<path d="M5 7h2a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
															<line x1="15" y1="6" x2="21" y2="6" />
															<line x1="18" y1="3" x2="18" y2="9" />
														</svg>
													</label>
												</div>
											</div>
										</div>

										<div className="row dbFrmR">
											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">First Name</label>
													<input type="text" className="form-control" placeholder="First Name" />
												</div>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">Last Name</label>
													<input type="text" className="form-control" placeholder="Last Name" />
												</div>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">User Name</label>
													<input type="text" className="form-control" placeholder="User Name" />
												</div>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">Email ID</label>
													<input type="email" className="form-control" placeholder="Enter your email address" />
												</div>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">Mobile Number</label>
													<input type="text" className="form-control" placeholder="Enter Mobile Number" />
												</div>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">Country</label>
													<select className="form-control">
														<option value="">India</option>
														<option value="">Russia</option>
														<option value="">America</option>
													</select>
												</div>
											</div>

											<div className="col-sm-12 col-md-6 col-lg-6 dbFrmC">
												<div className="form-group">
													<label for="">Day of Birth</label>
													<input type="date" className="form-control" placeholder="Enter Mobile Number" />
												</div>
											</div>
										</div>

										<div className="dbFrmSbm">
											<button className="btn btnGr btn-14634">
												Submit
											</button>
					
											<button className="btn btnGr2 btn-14634">
												Reset
											</button>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-4 dbCdC">
						<div className="dbCdBg dbPfCd">
							<div className="dbPfCdHd">
								<h4>Change Password</h4>
							</div>
							<div className="dbPfCdBd">
								<div className="dbFrm">

									<div className="row dbFrmR">
										<div className="col-sm-12 col-md-12 col-lg-12 dbFrmC">
											<div className="form-group">
												<label for="">Old Password</label>
												<div className="input-group">
													<input type="text" className="form-control" />
													<div className="input-group-append">
														<button className="btn btnIc">
															<img src={eyeslashImg} alt="eye-slash" />
													  </button>
													</div>
												</div>
											</div>

											<div className="form-group">
												<label for="">New Password</label>
												<div className="input-group">
													<input type="text" className="form-control" />
													<div className="input-group-append">
														<button className="btn btnIc">
															<img src={eyeslashImg} alt="eye-slash" />
													  </button>
													</div>
												</div>
											</div>
											
											<div className="form-group">
												<label for="">Re-type Password</label>
												<div className="input-group">
													<input type="text" className="form-control" />
													<div className="input-group-append">
														<button className="btn btnIc">
															<img src={eyeslashImg} alt="eye-slash" />
													  </button>
													</div>
												</div>
											</div>

										</div>
									</div>

									<div className="dbFrmSbm justify-content-start">
										<button className="btn btnGr btn-14634 mx-0">
											Submit
										</button>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>	
				</div>
			</div>
            <Footer />
        </Fragment>
    );
   
}

export default Profile;