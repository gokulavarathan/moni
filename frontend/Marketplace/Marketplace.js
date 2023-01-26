import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Collapse } from 'reactstrap';
import { useNavigate } from "react-router-dom";

// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import nft1Img from '../../assets/images/nft/nft-1.jpg';
import nft2Img from '../../assets/images/nft/nft-2.jpg';
import nft3Img from '../../assets/images/nft/nft-3.jpg';
import nft4Img from '../../assets/images/nft/nft-4.jpg';
import nft5Img from '../../assets/images/nft/nft-5.jpg';
import nft6Img from '../../assets/images/nft/nft-6.jpg';
import nft7Img from '../../assets/images/nft/nft-7.jpg';
import nft8Img from '../../assets/images/nft/nft-8.jpg';
import nft9Img from '../../assets/images/nft/nft-9.jpg';
import nft10Img from '../../assets/images/nft/nft-10.jpg';
import nft11Img from '../../assets/images/nft/nft-11.jpg';
import nft12Img from '../../assets/images/nft/nft-12.jpg';
import filterImg from '../../assets/images/icons/filter.svg';
import helper from "../../components/Helper/axiosHelper";
import { loader } from '../../redux/api'


import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useDispatch } from 'react-redux'


const Marketplace = (props) => { 
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    let baseUrl = helper.baseUrl()
    const dispatch = useDispatch()

	const [projectList,setProjectList] = useState([])
	const [primaryCategory, setPrimaryCategory] = useState([]);
    const [subCategroy, setSubCategory] = useState([]);
	const [primarySelect, setPrimarySelect] = useState();
    const [subSelect, setSubSelect] = useState();

	const navigate = useNavigate();


	useEffect(() => {
		dispatch(loader(true))
		axios.get(baseUrl+"user/project/listProposalUser")
		.then((res)=>{
			dispatch(loader(false))
	        setProjectList(res.data.data)
		})
		.catch((err)=>{
			dispatch(loader(false))
	
		})
	}, [])

	useEffect(() => {
		dispatch(loader(true))

	axios.get(baseUrl+"admin/basic/listCategory")
	.then((res)=>{
		dispatch(loader(false))

		setPrimaryCategory(res.data.data[0].category);
		setSubCategory(res.data.data[0].subcategory);
		setPrimarySelect(res.data.data[0].category[0])
		setSubSelect(res.data.data[0].subcategory[0])

	})
	}, [])

const nftdetails = (id) =>{
	navigate("/nftdetails/"+id, {state:{id:id}})
}
    return (
        <Fragment>
            <Header />
            <div className="inrPgCnt mkPl">
			<div className="container">
				<h2 className="inrPgTl">Market Place</h2>	

				<div className="mkPlCon">
					<div className="mkPlHd">
						<h4>Arts</h4>
						<p>Discover the artists and organizations using Kickstarter to realize ambitious projects in visual art and performance.</p>
					</div>
					<div className="mkPlBd">
						<div className="row mkPlR">
							<div className="col-lg-auto mkPlR">

								<div className="mkPlSb">
									<div className="mkPlSbHd">
										<span>Fillter</span>
										<button className="btn btnIc d-lg-none" onClick={toggle}>
											<img src={filterImg} alt="filter" />
										</button>
									</div>
									
                                    <Collapse isOpen={isOpen}>
										<div className="mkPlSbFrm">
											<div className="form-group">
												<label>Projects on</label>
												<select id="primary" className="form-control">
													{primaryCategory && primaryCategory.map((data,i)=>{
														return(
															<option>{data}</option>

														)
													})}
													
												</select>
											</div>

											<div className="form-group">
												<label>Sort By</label>
												<select id="sub" className="form-control">
													{subCategroy && subCategroy.map((data,i)=>{
														return(
															<option>{data}</option>

														)
													})}
													
												</select>
											</div>

											<div className="form-group">
												<label>Amount Pledged</label>
												<select className="form-control">
													<option> {"<"} $ 1000 </option>
													<option> {">"} $ 1000 </option>
												</select>
											</div>

											{/* <div className="form-group">
												<label>Goal</label>
												<select className="form-control">
													<option> {"<"} $ 1000 </option>
													<option> {">"} $ 1000 </option>
												</select>
											</div> */}

											<div className="form-group">
												<label>% Rasied</label>
												<select className="form-control">
													<option> 75% Raised </option>
													<option> 50% Raised </option>
													<option> 25% Raised </option>
												</select>
											</div>
										</div>
                                    </Collapse>                                    
									<div className="mkPlSbFrm d-none d-lg-block">
											<div className="form-group">
												<label>Projects on</label>
												<select id="primary" className="form-control">
													{primaryCategory && primaryCategory.map((data,i)=>{
														return(
															<option>{data}</option>

														)
													})}
													
												</select>
											</div>

											<div className="form-group">
												<label>Sort By</label>
												<select id="sub" className="form-control">
													{subCategroy && subCategroy.map((data,i)=>{
														return(
															<option>{data}</option>

														)
													})}
													
												</select>
											</div>

											<div className="form-group">
												<label>Amount Pledged</label>
												<select className="form-control">
													<option> {"<"} $ 1000 </option>
													<option> {">"} $ 1000 </option>
												</select>
											</div>

											{/* <div className="form-group">
												<label>Goal</label>
												<select className="form-control">
													<option> {"<"} $ 1000 </option>
													<option> {">"} $ 1000 </option>
												</select>
											</div> */}

											<div className="form-group">
												<label>% Rasied</label>
												<select className="form-control">
													<option> 75% Raised </option>
													<option> 50% Raised </option>
													<option> 25% Raised </option>
												</select>
											</div>
										</div>
								</div>

							</div>
							<div className="col-lg mkPlC">

		<div className="mkPlCn">
		
		<div className="row mkPlCdR">
		{projectList && projectList.map((data)=>{
	return(
			<div className="col-sm-6 col-md-6 col-lg-4 mkPlCdC" onClick={()=>nftdetails(data._id)}>
				<a href="#">
					<div className="mkPlCdCon">
						<div className="mkPlCdIg ujymkPlCdIg_1">
							<img src={data.image1} alt="nft-1" />
						</div>
						<div className="mkPlCdTx">
							<div className="mpcTxNm">{data.projectName}</div>
							<div className="mpcTxPr">Pledged of <span>{data.pledgeAmount}</span> goal </div>
							<div className="progress mpcPg">
							<progress className="progress-bar"  style={{width: "100%"}} id="file" value={data.fundCollectedAmount} max={data.pledgeAmount}> </progress>

								{/* <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow={data.fundCollectedAmount}  aria-valuemax={data.pledgeAmount}></div> */}
							</div>
							<div className="mpcTxCt">By{data.projectName}</div>
							{/* <div className="mpcTxAmt">$ 90.546</div> */}
						</div>
					</div>
				</a>
			</div>

	)
})}
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

export default Marketplace;