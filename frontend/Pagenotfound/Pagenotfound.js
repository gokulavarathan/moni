import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ftrlogoImg from '../../assets/images/ftr-logo.png';
import fnfImg from '../../assets/images/pics/fnf.png';


const Pagenotfound = (props) => {   
    return (
        <Fragment>            
            <div className="container">

				<div className="resPg">
					<div className="rsPgLgo">
						<a href="#">
							<img src={ftrlogoImg} alt="ftr-logo" />
						</a>
					</div>
					<div className="rsPgIg">
						<img src={fnfImg} alt="fnf" />
					</div>
					<div className="rsPgTx">
						Page Not Found
					</div>
					<div className="rsPgLk">
						<a href="#" className="btn btnGr btn-17240">
							Back to Home
						</a>
					</div>
				</div>
			</div>         
        </Fragment>
    );
   
}

export default Pagenotfound;