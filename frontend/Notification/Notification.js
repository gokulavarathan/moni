import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


const Notification = (props) => {   
    return (
        <Fragment>
			<Header />       
            <div className="inrPgCnt ntPg">
				<div className="container">
					
					<div className="ntPgHd">
						<h2>Notifications</h2>
					</div>

					<div className="ntPgBd">
						<div className="ntPgcd">
							<div className="ntPgcdH">
								<div className="ntPgSbj">Buy</div>
								<div className="ntPgDt">12:34:23 12 Dec Tue 2022</div>
							</div>
							<div className="ntPgcdMg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</p>
							</div>
						</div>

						<div className="ntPgcd">
							<div className="ntPgcdH">
								<div className="ntPgSbj">Buy</div>
								<div className="ntPgDt">12:34:23 12 Dec Tue 2022</div>
							</div>
							<div className="ntPgcdMg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</p>
							</div>
						</div>

						<div className="ntPgcd">
							<div className="ntPgcdH">
								<div className="ntPgSbj">Buy</div>
								<div className="ntPgDt">12:34:23 12 Dec Tue 2022</div>
							</div>
							<div className="ntPgcdMg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</p>
							</div>
						</div>

						<div className="ntPgcd">
							<div className="ntPgcdH">
								<div className="ntPgSbj">Buy</div>
								<div className="ntPgDt">12:34:23 12 Dec Tue 2022</div>
							</div>
							<div className="ntPgcdMg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</p>
							</div>
						</div>

						<div className="ntPgcd">
							<div className="ntPgcdH">
								<div className="ntPgSbj">Buy</div>
								<div className="ntPgDt">12:34:23 12 Dec Tue 2022</div>
							</div>
							<div className="ntPgcdMg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</p>
							</div>
						</div>

						<div className="ntPgcd">
							<div className="ntPgcdH">
								<div className="ntPgSbj">Buy</div>
								<div className="ntPgDt">12:34:23 12 Dec Tue 2022</div>
							</div>
							<div className="ntPgcdMg">
								<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making</p>
							</div>
						</div>
					</div>

				</div>
			</div>
			<Footer />        
        </Fragment>
    );
   
}

export default Notification;