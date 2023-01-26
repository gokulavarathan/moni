import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Input, Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledCollapse, TabContent, TabPane, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';
import searchImg from '../../assets/images/icons/search.svg';
import arrlftImg from '../../assets/images/icons/arrow-left.svg';
import arrrgtImg from '../../assets/images/icons/arrow-right.svg';
import thumb2Img from '../../assets/images/nft/thumbs/thumb-2.jpg';
import thumb1Img from '../../assets/images/nft/thumbs/thumb-1.jpg';
import { NavbarBrand, } from 'reactstrap';
import notifyImg from '../../assets/images/icons/notifications.svg';
import profileImg from '../../assets/images/pics/profile.png';
import { useNavigate } from "react-router-dom";


const Header = (props) => {
	
	const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate()

	const [isActive, setActive] = useState(false);
	const [flag, setFlag] = useState(false);
	const [userType, setUserType] = useState(false);

	
	const toggleNav = () => {
		setActive(!isActive);
	};

	const [isActive1, setActive1] = useState(false);
	const subcatNav = () => {
		setActive1(!isActive1);
	};

	const [isActive2, setActive2] = useState(false);
	const searchNav = () => {
		setActive2(!isActive2);
	};

	const [isActive3, setActive3] = useState(false);
	const searchAutoCompTog = () => {
		setActive3(!isActive3);
	};

	useEffect(()=>{
		if(localStorage.getItem("isLogin") == "true"){
			setLoginStatus(true);
			if(localStorage.getItem("userType") == "Entreprenur"){
				setUserType("Entreprenur")
			}else{
				setUserType("Investor") 
			}
			
		}else{
			setLoginStatus(false);
			setUserType(false) 


		}
	},[flag])

	return (
		<Fragment>
			<header className={isActive ? "indHd sbMenu" : "indHd"}>
				<div className="indHdTp">
					<div className="container">
						<nav className="navbar navbar-expand-xl px-0">

							<Link to="/"   >
								<img src={logoImg} alt="logo" />
							</Link>

							<div className="hdNavMenu">
								<Collapse navbar className="collapse_rn">
									<ul className="navbar-nav">
										<li className="nav-item">
											<UncontrolledDropdown className="ddS1">
												<DropdownToggle caret>
													All Categories
												</DropdownToggle>
												<DropdownMenu>
													<DropdownItem>Arts</DropdownItem>
													<DropdownItem>Comics & Illustration</DropdownItem>
													<DropdownItem>Design & TechFilm</DropdownItem>
													<DropdownItem>Food & Craft</DropdownItem>
													<DropdownItem>Games</DropdownItem>
													<DropdownItem>Music</DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown>
										</li>

										{ userType  ? userType == "Entreprenur" ?

											<li className="nav-item ">
												<Link to="/createproject" className="nav-link">
													Start Project
												</Link>
	
											</li>
											 : 
											 <li className="nav-item">
												 <Link to="/marketplace" className="nav-link">
													 Marketplace
												 </Link>
	 
											 </li>
											 :null
										}
										
										<li className="nav-item">
											<Link to='/' className="nav-link">
												Discover
											</Link>

										</li>

									</ul>
								</Collapse>
							</div>

							<div className={isActive3 ? "hdrSh shwAutoComp" : "hdrSh"}>
								<div className={isActive2 ? "input-group hdrShMb active" : "input-group hdrShMb"}>
									<input type="text" className="form-control" placeholder="Search" onClick={searchAutoCompTog} />
									<div className="input-group-append">
										<button className="btn btnIc">
											<img src={searchImg} alt="search" />
										</button>
									</div>
									<div className="hdShRs d-none">
										<div className="hdShRsCnt">
											<a href="#" className="hdShRlk">
												<div className="hdShRsR">
													<div className="hdShRsIg">
														<img src={thumb2Img} alt="thumb-2" />
													</div>
													<div className="hdShRsTx">
														Visual Creative Arts
													</div>
												</div>
											</a>

											<a href="#" className="hdShRlk">
												<div className="hdShRsR">
													<div className="hdShRsIg">
														<img src={thumb1Img} alt="thumb-1" />
													</div>
													<div className="hdShRsTx">
														Visual Creative Arts
													</div>
												</div>
											</a>

											<a href="#" className="hdShRlk">
												<div className="hdShRsR">
													<div className="hdShRsIg">
														<img src={thumb2Img} alt="thumb-2" />
													</div>
													<div className="hdShRsTx">
														Visual Creative Arts
													</div>
												</div>
											</a>

											<a href="#" className="hdShRlk">
												<div className="hdShRsR">
													<div className="hdShRsIg">
														<img src={thumb1Img} alt="thumb-1" />
													</div>
													<div className="hdShRsTx">
														Visual Creative Arts
													</div>
												</div>
											</a>

											<a href="#" className="hdShRlk">
												<div className="hdShRsR">
													<div className="hdShRsIg">
														<img src={thumb2Img} alt="thumb-2" />
													</div>
													<div className="hdShRsTx">
														Visual Creative Arts
													</div>
												</div>
											</a>

											<a href="#" className="hdShRlk">
												<div className="hdShRsR">
													<div className="hdShRsIg">
														<img src={thumb1Img} alt="thumb-1" />
													</div>
													<div className="hdShRsTx">
														Visual Creative Arts
													</div>
												</div>
											</a>
										</div>
									</div>
								</div>

								{/* <button className="btn btnIc btnShMb d-md-none" onClick={searchNav}>
									<img src={searchImg} alt="search" />
								</button> */}
							</div>

							{loginStatus ? 

								<div className="hdNtPf">
									{/* <a href="#" className="btn btnNt">
								<img src={notifyImg} alt="notifications" />
								<span className="btnNtCn">01</span>
							</a> */}
									<UncontrolledDropdown className="prfDd">
										<DropdownToggle caret>
											<img src={profileImg} alt="profile" />
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem>
												<img src={arrrgtImg} alt="arrow-right" />
												
												<span onClick={()=>{navigate("/profile")}}>Profile</span>
											</DropdownItem>
											<DropdownItem>
												<img src={arrrgtImg} alt="arrow-right" />
												<span onClick={()=>{
													setFlag(!flag);
													localStorage.clear();
													navigate("/")
													}}>
													Logout
												</span>
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledDropdown>
								</div>
								:
								<div className="hdCnWl">
									<Link to="/login" className="btn btnGr btn-14940">
										Login </Link>
								</div>
							}

							<div className="mobMenu d-xl-none" onClick={toggleNav}>
								<div className={isActive ? "smClose active" : "smClose"}>
									<svg id="closeicon" viewBox="0 0 800 600">
										<path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
										<path d="M300,320 L460,320" id="middle"></path>
										<path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
									</svg>
								</div>
							</div>

						</nav>
					</div>
				</div>
			</header>
		</Fragment>
	);

}

export default Header;