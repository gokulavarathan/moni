import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import searchImg from '../../assets/images/icons/search.svg';
import arrlftsmImg from '../../assets/images/icons/arrow-left-sm.svg';
import arrgtsmImg from '../../assets/images/icons/arrow-right-sm.svg';
import nft10Img from '../../assets/images/nft/nft-10.jpg';
import nft11Img from '../../assets/images/nft/nft-11.jpg';
import nft12Img from '../../assets/images/nft/nft-12.jpg';
import nft4Img from '../../assets/images/nft/nft-4.jpg';
import nft7Img from '../../assets/images/nft/nft-7.jpg';
import nft9Img from '../../assets/images/nft/nft-9.jpg';
import heartImg from '../../assets/images/icons/heart.svg';
import eye2Img from '../../assets/images/icons/eye-2.svg';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../views/Dashboard/Dashboard";


const Myproject = (props) => {   
    return (
        <Fragment>
            <Header />
            <div className="inrPgCnt dbPrf">
				<div className="container">
					<Dashboard />
					<div className="dbFlt">
					<div className="dbFltTl">My Project</div>
					<div className="dbFltIpR">
						<div className="dbFltIps">
							<label for="">Status</label>
							<select className="form-control">
								<option value="">All</option>
								<option value="">Completed</option>
								<option value="">Previous</option>
							</select>
						</div>

						<div className="dbFltIps">
							<label for="">Categories</label>
							<select className="form-control">
								<option value="">Arts</option>
								<option value="">Games</option>
								<option value="">Music</option>
							</select>
						</div>

						<div className="dbFltIps">
							<label for="">Sort By</label>
							<select className="form-control">
								<option value="">Recently</option>
								<option value="">Newest</option>
								<option value="">Oldest</option>
							</select>
						</div>

						<div className="dbFltIps">
							<div className="input-group">										
								<input type="text" className="form-control" placeholder="Search" />
								<div className="input-group-append">
									<button className="btn btnIc">
										<img src={searchImg} alt="search" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="dbPrjsCn">

					<div className="dbPrjCd v2">
						<div className="dbPrjCdC">
							<div className="dpjcLbl">Project Name</div>
							<div className="dpjcIgTl">
								<div className="dpjcIg v2">
									<img src={nft10Img} alt="nft" />
								</div>
								<div className="dpjcTl">
									<div className="dpjcNm v2">Visual Creative Arts</div>
									<div className="dpjVwLk">
										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={eye2Img} alt="eye" />
											</div>
											<div className="dpjvlTx">
												27
											</div>
										</div>

										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={heartImg} alt="heart" />
											</div>
											<div className="dpjvlTx">
												23
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Funding Durations</div>
								<div className="dpjcVal">34 Days</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Project Durations</div>
								<div className="dpjcVal">234 Days</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Days to go</div>
								<div className="dpjcVal">01</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Backers</div>
								<div className="dpjcVal">232</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Status</div>
								<div className="dpjcVal text-brown">Inprogress</div>
							</div>

							<div className="dbPrjCdLv">
								<button className="btn btnGr btn-11526">
									Edit
								</button>
							</div>
						</div>
					</div>

					<div className="dbPrjCd v2">
						<div className="dbPrjCdC">
							<div className="dpjcLbl">Project Name</div>
							<div className="dpjcIgTl">
								<div className="dpjcIg v2">
									<img src={nft12Img} alt="nft" />
								</div>
								<div className="dpjcTl">
									<div className="dpjcNm v2">Visual Creative Arts</div>
									<div className="dpjVwLk">
										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={eye2Img} alt="eye" />
											</div>
											<div className="dpjvlTx">
												27
											</div>
										</div>

										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={heartImg} alt="heart" />
											</div>
											<div className="dpjvlTx">
												23
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Funding Durations</div>
								<div className="dpjcVal">34 Days</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Project Durations</div>
								<div className="dpjcVal">234 Days</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Days to go</div>
								<div className="dpjcVal">01</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Backers</div>
								<div className="dpjcVal">232</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Status</div>
								<div className="dpjcVal text-green">On Starting</div>
							</div>

							<div className="dbPrjCdLv">
								<button className="btn btnGr btn-11526">
									Edit
								</button>
							</div>
						</div>
					</div>

					<div className="dbPrjCd v2">
						<div className="dbPrjCdC">
							<div className="dpjcLbl">Project Name</div>
							<div className="dpjcIgTl">
								<div className="dpjcIg v2">
									<img src={nft10Img} alt="nft" />
								</div>
								<div className="dpjcTl">
									<div className="dpjcNm v2">Visual Creative Arts</div>
									<div className="dpjVwLk">
										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={eye2Img} alt="eye" />
											</div>
											<div className="dpjvlTx">
												27
											</div>
										</div>

										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={heartImg} alt="heart" />
											</div>
											<div className="dpjvlTx">
												23
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Funding Durations</div>
								<div className="dpjcVal">34 Days</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Project Durations</div>
								<div className="dpjcVal">234 Days</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Days to go</div>
								<div className="dpjcVal">01</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Backers</div>
								<div className="dpjcVal">232</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Status</div>
								<div className="dpjcVal text-brown">Inprogress</div>
							</div>

							<div className="dbPrjCdLv">
								<button className="btn btnGr btn-11526">
									Edit
								</button>
							</div>
						</div>
					</div>

					<div className="dbPrjCd v2">
						<div className="dbPrjCdC">
							<div className="dpjcLbl">Project Name</div>
							<div className="dpjcIgTl">
								<div className="dpjcIg v2">
									<img src={nft12Img} alt="nft" />
								</div>
								<div className="dpjcTl">
									<div className="dpjcNm v2">Visual Creative Arts</div>
									<div className="dpjVwLk">
										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={eye2Img} alt="eye" />
											</div>
											<div className="dpjvlTx">
												27
											</div>
										</div>

										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={heartImg} alt="heart" />
											</div>
											<div className="dpjvlTx">
												23
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Funding Durations</div>
								<div className="dpjcVal">34 Days</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Project Durations</div>
								<div className="dpjcVal">234 Days</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Days to go</div>
								<div className="dpjcVal">01</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Backers</div>
								<div className="dpjcVal">232</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Status</div>
								<div className="dpjcVal text-green">On Starting</div>
							</div>

							<div className="dbPrjCdLv">
								<button className="btn btnGr btn-11526">
									Edit
								</button>
							</div>
						</div>
					</div>

					<div className="dbPrjCd v2">
						<div className="dbPrjCdC">
							<div className="dpjcLbl">Project Name</div>
							<div className="dpjcIgTl">
								<div className="dpjcIg v2">
									<img src={nft10Img} alt="nft" />
								</div>
								<div className="dpjcTl">
									<div className="dpjcNm v2">Visual Creative Arts</div>
									<div className="dpjVwLk">
										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={eye2Img} alt="eye" />
											</div>
											<div className="dpjvlTx">
												27
											</div>
										</div>

										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={heartImg} alt="heart" />
											</div>
											<div className="dpjvlTx">
												23
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Funding Durations</div>
								<div className="dpjcVal">34 Days</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Project Durations</div>
								<div className="dpjcVal">234 Days</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Days to go</div>
								<div className="dpjcVal">01</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Backers</div>
								<div className="dpjcVal">232</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Status</div>
								<div className="dpjcVal text-brown">Inprogress</div>
							</div>

							<div className="dbPrjCdLv">
								<button className="btn btnGr btn-11526">
									Edit
								</button>
							</div>
						</div>
					</div>

					<div className="dbPrjCd v2">
						<div className="dbPrjCdC">
							<div className="dpjcLbl">Project Name</div>
							<div className="dpjcIgTl">
								<div className="dpjcIg v2">
									<img src={nft12Img} alt="nft" />
								</div>
								<div className="dpjcTl">
									<div className="dpjcNm v2">Visual Creative Arts</div>
									<div className="dpjVwLk">
										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={eye2Img} alt="eye" />
											</div>
											<div className="dpjvlTx">
												27
											</div>
										</div>

										<div className="dpjvl">
											<div className="dpjvlIc">
												<img src={heartImg} alt="heart" />
											</div>
											<div className="dpjvlTx">
												23
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Funding Durations</div>
								<div className="dpjcVal">34 Days</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Project Durations</div>
								<div className="dpjcVal">234 Days</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Days to go</div>
								<div className="dpjcVal">01</div>
							</div>

							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Backers</div>
								<div className="dpjcVal">232</div>
							</div>
						</div>

						<div className="dbPrjCdC">
							<div className="dbPrjCdLv">
								<div className="dpjcLbl">Status</div>
								<div className="dpjcVal text-green">On Starting</div>
							</div>

							<div className="dbPrjCdLv">
								<button className="btn btnGr btn-11526">
									Edit
								</button>
							</div>
						</div>
					</div>

				</div>

				<div className="dbPrjPgs">
					<ul className="csPg">
						<li>
							<a href="#">
								<img src={arrlftsmImg} alt="arrow-left-sm" />
							</a>
						</li>

						<li className="active">
							<a href="#">1</a>
						</li>

						<li>
							<a href="#">2</a>
						</li>

						<li>
							<a href="#">3</a>
						</li>

						<li>
							<a href="#">4</a>
						</li>

						<li>
							<a href="#">...</a>
						</li>

						<li>
							<a href="#">21</a>
						</li>

						<li>
							<a href="#">
								<img src={arrgtsmImg} alt="arrow-right-sm" />
							</a>
						</li>
					</ul>
				</div>				
				</div>
			</div>
            <Footer />
        </Fragment>
    );
   
}

export default Myproject;