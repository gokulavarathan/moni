import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import searchImg from '../../assets/images/icons/search.svg';
import arrlftsmImg from '../../assets/images/icons/arrow-left-sm.svg';
import arrgtsmImg from '../../assets/images/icons/arrow-right-sm.svg';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../views/Dashboard/Dashboard";


const Followers = (props) => {   
    return (
        <Fragment>
            <Header />
            <div className="inrPgCnt dbPrf">
				<div className="container">
					<Dashboard />
					<div className="dbFlt">
						<div className="dbFltTl">Followers</div>
						<div className="dbFltIpR">
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

					<div className="dbFlwCn">
						<div className="dbFlwFlHd">
							<div className="dbFlwShwR">
								<span>Showing</span>
								<select>
									<option>1</option>
									<option>2</option>
									<option>3</option>
								</select>
								<span>of  21 results</span>
							</div>
						</div>

						<div className="dbFlwTbl">
							<table>
								<thead>
									<tr>
										<th>Project Name</th>
										<th>Owner Address</th>
										<th>Name</th>
										<th>Price</th>
										<th>Date & Time</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>

									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>

									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>

									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>

									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>

									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>

									<tr>
										<td>Visual Creative Arts</td>
										<td>0x4cf53ae8C51c7........</td>
										<td>Perter Park</td>
										<td>$ 2343</td>
										<td>02/12/2022 12:34:43</td>
									</tr>
								</tbody>
							</table>
						</div>


						<div className="dbFlwFlFt">
							<div className="tblShwR">Showing 1 of 21 results</div>

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
			</div>
            <Footer />
        </Fragment>
    );
   
}

export default Followers;