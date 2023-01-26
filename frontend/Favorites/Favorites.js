import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import searchImg from '../../assets/images/icons/search.svg';
import nft10Img from '../../assets/images/nft/nft-10.jpg';
import nft11Img from '../../assets/images/nft/nft-11.jpg';
import nft12Img from '../../assets/images/nft/nft-12.jpg';
import nft13Img from '../../assets/images/nft/nft-13.jpg';
import nft14Img from '../../assets/images/nft/nft-14.jpg';
import nft15Img from '../../assets/images/nft/nft-15.jpg';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../views/Dashboard/Dashboard";


const Favorites = (props) => {   
    return (
        <Fragment>
            <Header />
            <div className="inrPgCnt dbPrf">
				<div className="container">
					<Dashboard />
					<div className="dbFlt">
						<div className="dbFltTl">Favorites</div>
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
					<div className="dbFavCn">
						<div className="row dbFavR">
							<div className="col-sm-12 col-md-6 col-lg-3 dbFavC">
								<div className="dbFavCon">
									<div className="dbFavIg">
										<img src={nft10Img} alt="nft" />
									</div>
									<div className="favNm">Visual Creative Arts</div>
									<div className="favCt">By Mantic Games</div>
								</div>
							</div>

							<div className="col-sm-12 col-md-6 col-lg-3 dbFavC">
								<div className="dbFavCon">
									<div className="dbFavIg">
										<img src={nft11Img} alt="nft" />
									</div>
									<div className="favNm">Visual Creative Arts</div>
									<div className="favCt">By Mantic Games</div>
								</div>
							</div>

							<div className="col-sm-12 col-md-6 col-lg-3 dbFavC">
								<div className="dbFavCon">
									<div className="dbFavIg">
										<img src={nft12Img} alt="nft" />
									</div>
									<div className="favNm">Visual Creative Arts</div>
									<div className="favCt">By Mantic Games</div>
								</div>
							</div>

							<div className="col-sm-12 col-md-6 col-lg-3 dbFavC">
								<div className="dbFavCon">
									<div className="dbFavIg">
										<img src={nft13Img} alt="nft" />
									</div>
									<div className="favNm">Visual Creative Arts</div>
									<div className="favCt">By Mantic Games</div>
								</div>
							</div>

							<div className="col-sm-12 col-md-6 col-lg-3 dbFavC">
								<div className="dbFavCon">
									<div className="dbFavIg">
										<img src={nft14Img} alt="nft" />
									</div>
									<div className="favNm">Visual Creative Arts</div>
									<div className="favCt">By Mantic Games</div>
								</div>
							</div>

							<div className="col-sm-12 col-md-6 col-lg-3 dbFavC">
								<div className="dbFavCon">
									<div className="dbFavIg">
										<img src={nft15Img} alt="nft" />
									</div>
									<div className="favNm">Visual Creative Arts</div>
									<div className="favCt">By Mantic Games</div>
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

export default Favorites;