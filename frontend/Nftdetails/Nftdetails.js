import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Map from './map'
import classnames from 'classnames';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Web3 from "web3";
import {XAxis,YAxis,CartesianGrid,Tooltip, LineChart, Legend, Line} from "recharts";
import eyeslashImg from '../../assets/images/icons/eye-slash.svg';
import eye2Img from '../../assets/images/icons/eye-2.svg';
import heartImg from '../../assets/images/icons/heart.svg';
import searchImg from '../../assets/images/icons/search.svg';
import nft16Img from '../../assets/images/nft/nft-16.jpg';
import nft15Img from '../../assets/images/nft/nft-15.jpg';
import nft14Img from '../../assets/images/nft/nft-14.jpg';
import nft13Img from '../../assets/images/nft/nft-13.jpg';
import nft12Img from '../../assets/images/nft/nft-12.jpg';
import nft11Img from '../../assets/images/nft/nft-11.jpg';
import nft10Img from '../../assets/images/nft/nft-10.jpg';
import nft6Img from '../../assets/images/nft/nft-6.jpg';
import nft5Img from '../../assets/images/nft/nft-5.jpg';
import nft3Img from '../../assets/images/nft/nft-3.jpg';
import nft1Img from '../../assets/images/nft/nft-1.jpg';
import arrlftsmImg from '../../assets/images/icons/arrow-left-sm.svg';
import arrrgtsmImg from '../../assets/images/icons/arrow-right-sm.svg';
import files2Img from '../../assets/images/icons/files-2.svg';
import prcgrphImg from '../../assets/images/pics/price-graph.jpg';
import mapImg from '../../assets/images/pics/map.jpg';
import locImg from '../../assets/images/icons/location.svg';
import mailImg from '../../assets/images/icons/mail.svg';
import take1Img from '../../assets/images/take-1.png';
import take2Img from '../../assets/images/take-2.png';
import take3Img from '../../assets/images/take-3.png';
import take4Img from '../../assets/images/take-4.png';
import QRCodeModal from "@walletconnect/qrcode-modal";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Dashboard from "../../views/Dashboard/Dashboard";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";
import WalletDetails from "../../walletConnect/WalletDetails";
import { toast } from "react-toastify";
import DataTable, { createTheme } from "react-data-table-component";

import { factoryAddress, hocAddress } from "../../contract";
import { factoryAbi, hocAbi } from "../../contract"
import { useDispatch } from 'react-redux'
import { loader } from '../../redux/api'

const walletChain = WalletDetails.ChainId();
const BinRPc = WalletDetails.BinRpcUrl();
const WalletConnectRpc = WalletDetails.WalletConnectRpcUrl();
const RpcChainId = WalletDetails.rpcChainId();
var web3 = '';

const Nftdetails = (props) => {
	const [activeTab, setActiveTab] = useState('1');
	const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
	}
	const location = useParams();
	const [projectData, setProjectData] = useState()
	const [docs, setDocs] = useState([])
	const [modalShow, setModalShow] = useState(false)
	const [startTime, setStartTime] = useState({ timestamp: 0, time: 0 })
	const [endTime, setEndTime] = useState({ timestamp: 0, time: 0 })
	const [mapData, setMapData] = useState({})
	const [buyMarket, setBuyMarket] = useState([])
	const [sellMarket, setSellMarket] = useState([])
	const [projectId, setProjectId] = useState("")
	const [campaignremainingTime, setCampaingRemainingTime] = useState("")
	const [projectRemainingTime, setProjectRemainingTime] = useState()
	const [partners, setParteners] = useState([])
	const [trigger, setTrigger] = useState(1)
	//

	const [userAddr, setUserAddr] = useState('');
	const [state, setState] = useState(true);
	const [userBal, setUserBal] = useState('');
	const [walletType, setWalletType] = useState("");
	const [walletconnect, setWalletConnect] = useState(true)
	//
	const [graphData, setgraphData] = useState([])
	const [graphDays, setgraphDays] = useState(1)
	let address = localStorage.getItem("address");
	let auth = localStorage.getItem("auth");
	const dispatch = useDispatch()

	useEffect(() => {
		var graphObj = { type: graphDays }
		axios.post("https://houseofcryptoback.osiztech.com/user/project/projectGraph", graphObj)
			.then((res) => {
				setgraphData(res.data.investorFee)
				
			})
			.catch((err) => {

			})

	}, [graphDays])

	const columns = [
		{
			name: "S.No",
			cell: (row, index) => index + 1,
			width: "80px",
		},
		{
			name: "NFT Image",
			selector: (row) => <img className="" style={{ maxWidth: "77px", maxHeight: "65px", objectFit: "cover" }} src={row.nftImage} alt="MDN logo" />,
		},
		{
			name: "NFT Price",
			selector: "nftPrice",
			sortable: true,
			//   width: "280px",
		},


		{
			name: "Pair ID",
			selector: (row) => row.updatedAt,
			format: (row) => moment(row.updatedAt).format('lll'),
			//   width: "180px",
		},
		{
			name: "Action",
			selector: (row) => <p className="text-red" >View</p>,
			sortable: true,
			// width: "120px",

		},
		// {
		//   name: "From Decimal",
		//   selector: "fromDecimal",
		//   sortable: true,
		//   width: "80px",
		// },
		// {
		//   name: "Reward Token",
		//   selector: "RewardToken",
		//   sortable: true,
		// },
	];
	const data = partners;


	const WalletConnectProvider = window.WalletConnectProvider.default;
	const mainProvider = new WalletConnectProvider({
		networkId: walletChain,
		rpc: RpcChainId,
		qrcode: true,
		supportChainIds: [80001],
		pollingInterval: 12000,
		qrcodeModalOptions: {
			mobileLinks: [
				"rainbow",
				"metamask",
				"argent",
				"trust",
				"imtoken",
				"pillar",
			],
			desktopLinks: ["encrypted ink"],
		},
	});

	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	useEffect(() => {

		let data = { _id: location.id }
		axios.post("https://houseofcryptoback.osiztech.com/user/project/proposalUserById", data)
			.then((res) => {
				let start = new Date(res.data.data.fundingStartTime).getTime()
				let start1 = moment(start).format("DD-MM-YYYY h:mm:ss")
				let end = new Date(res.data.data.fundingEndTime).getTime()
				let end1 = moment(end).format("DD-MM-YYYY h:mm:ss")

				let campaignEnd = new Date(res.data.data.campaignEndTime).getTime() / 1000
				let currentTime = new Date().getTime()
				console.log(campaignEnd / 1000, Math.floor(currentTime / 1000))
				if (campaignEnd > Math.floor(currentTime / 1000)) {
					let date = campaignEnd - Math.floor(currentTime / 1000)
					console.log(date)
					var date2 = Math.ceil(date / 86400)
					setCampaingRemainingTime(date2)
				}
				else {
					setCampaingRemainingTime("0")

				}

				var val = {
					langitude: res.data.data.longitude,
					lattitude: res.data.data.latitude
				}
				let project = (new Date(res.data.data.projectEndTime).getTime() / 1000 - new Date(res.data.data.projectStartTime).getTime() / 1000)
				setProjectRemainingTime(Math.ceil(project / 86400))
				setProjectId(res.data.data.projectId)
				setMapData(val)
				setStartTime({ timestamp: start, time: start1 })
				setEndTime({ timestamp: end, time: end1 })
				setBuyMarket(res.data.buymarketRes)
				setSellMarket(res.data.soldmarketRes)
				setProjectData(res.data.data)
			})
			.catch((err) => {

			})

		axios.post("https://houseofcryptoback.osiztech.com/user/project/userPurchasedDetail", data)
			.then((res) => {
				console.log(res.data.data)
				setParteners(res.data.data)
			})
			.catch((err) => {
				console.log(err)
			})


	}, [trigger])

	const connectWallet = async (type, address) => {
		if (type === "METAMASK") {
			web3 = new Web3(window.ethereum);
			const netId = await window.ethereum.request({ method: "eth_chainId" });

			if (parseInt(netId, 16) != walletChain) {
				toast.error("please change your metamask network to binance");


			} else {
				if (window.ethereum) {
					await window.ethereum.request({ method: "eth_requestAccounts" });
					const accounts = await web3.eth.requestAccounts();

					if (accounts[0].toLowerCase() === address.toLowerCase()) {
						setWalletType(type)
						setUserAddr(accounts[0])
						setUserBal('')

						getBalance(accounts[0], type)
						localStorage.setItem("walletConnect", walletconnect)
						localStorage.setItem("address", accounts[0]);

						setWalletConnect(false)
						toast.success("Wallet connected Successfully")
					}
					else {
						toast.error(`Connect this wallet ${address}`)
					}





				}

			}
		}

		else if (type === "BINANCE_WALLET") {
			await window.BinanceChain.enable();
			const netId = await window.BinanceChain.request({ method: 'eth_chainId', });
			if (parseInt(netId, 16) != walletChain) {
				toast.error("please change your binance wallet test network to smart binance");
			} else {

				window.BinanceChain.request({ method: "eth_accounts" }).then(async function (accounts) {

					if (accounts[0].toLowerCase() === address.toLowerCase()) {
						setUserBal('')
						setUserAddr(accounts[0])
						setWalletType(type)
						localStorage.setItem("walletConnect", walletconnect)
						localStorage.setItem("address", JSON.stringify(accounts[0]));
						//props.walletAction({ type: type, userAddr: accounts[0] })
						getBalance(accounts[0], type)
						setWalletConnect(false)
						toast.success("Wallet connected Successfully")

					}
					else {
						toast.error(`Connect this wallet ${address}`)
					}



				});
			}
		}

		else if (type === "WALLET_CONNECT") {
			const bridge = '';
			QRCodeModal.open(bridge);

			const WalletConnectProvider = window.WalletConnectProvider.default;
			const mainProvider = new WalletConnectProvider({
				networkId: walletChain,
				rpc: RpcChainId,
				qrcode: true,
				supportChainIds: [80001],
				pollingInterval: 12000,
				qrcodeModalOptions: {
					mobileLinks: [
						"rainbow",
						"metamask",
						"argent",
						"trust",
						"imtoken",
						"pillar",
					],
					desktopLinks: ["encrypted ink"],
				},
			});
			await mainProvider.enable();
			web3 = new Web3(mainProvider);
			mainProvider.on("connect", () => { });
			const accounts = await web3.eth.getAccounts();
			getBalance(accounts[0], type)
			setUserBal("");
			setUserAddr(accounts[0]);
			QRCodeModal.close(bridge);
			setWalletType(type);
			setWalletConnect(false)


		}


		else if (type === "TRUSTWALLET") {
			web3 = new Web3(window.trustwallet);
			const netId = await window.trustwallet.request({ method: "eth_chainId" });
			if ("0x38" === walletChain) {
				toast.error("please change your network to binance");
			} else {
				if (window.trustwallet) {
					await window.trustwallet.request({ method: 'eth_requestAccounts' });
					const accounts = await web3.eth.requestAccounts();
					setUserBal('')
					setUserAddr(accounts[0])
					setWalletType(type)
					getBalance(accounts[0], type)
					setWalletConnect(false)
					//props.toggle()
				}
				else {
					window.open("https://trustwallet.com/");
				}
			}
		}

	};
	const connect = () => {
		var auth = localStorage.getItem("auth")

		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem("auth")}`
		}

		if (auth !== "undefined" && auth !== undefined && auth !== "" && auth !== null) {
			axios.post("https://houseofcryptoback.osiztech.com/user/basic/connectWallet", {}, { headers })
				.then((res) => {
					if (res.data.status == true) {

						connectWallet(res.data.data.walletName, res.data.data.userAddress)
					}
					else {
						toast.error(res.data.message)
					}
				})
				.catch((err) => {

				})

		}
		else {
			toast.error(("Kindly Login first"));
		}

	}

	const getBalance = async (walletAddres, walletType) => {

		if (walletType == 'METAMASK') {
			var balance = await web3.eth.getBalance(walletAddres);
			balance = (balance / Math.pow(10, 18)).toFixed(4);
			localStorage.setItem('Balance', balance);
			let walletAddr = walletAddres.toLowerCase();
			localStorage.setItem("user_addr", walletAddr);
			localStorage.setItem('WalletType', 'METAMASK');
			setTimeout(() => {
				setUserBal(balance);
				setState(!state);
				//Refresh();

			}, 1000);

		}

		else if (walletType === "BINANCE_WALLET") {
			window.BinanceChain.request({ method: "eth_getBalance", params: [walletAddres] }).then(function (balc) {
				var eth_balc = (balc / 1000000000000000000).toFixed(6);
				let walletAddr = walletAddres.toLowerCase();
				localStorage.setItem("user_addr", walletAddr);
				localStorage.setItem('Balance', eth_balc);
				localStorage.setItem('WalletType', 'BINANCE_WALLET');

				setTimeout(() => {
					setUserBal(balance);
					setState(!state);
					//Refresh();

				}, 1000);

			});
		}

		else if (walletType === "WALLET_CONNECT") {
			await web3.eth.getBalance(walletAddres).then((balance) => {
				var eth_balc = (balance / 1000000000000000000).toFixed(6);
				let walletAddr = walletAddres.toLowerCase();
				localStorage.setItem("user_addr", walletAddr);
				localStorage.setItem('Balance', eth_balc);
				localStorage.setItem('WalletType', 'WALLET_CONNECT');

			})
			setTimeout(() => {
				setUserBal(balance);
				setState(!state);
				//Refresh();

			}, 1000);

		}

		else if (walletType === 'TRUSTWALLET') {
			var balance = await web3.eth.getBalance(walletAddres);
			balance = (balance / Math.pow(10, 18)).toFixed(4);
			localStorage.setItem('Balance', balance);
			let walletAddr = walletAddres.toLowerCase();
			localStorage.setItem("user_addr", walletAddr);
			localStorage.setItem('WalletType', 'TRUSTWALLET');
			setTimeout(() => {
				setUserBal(balance);
				setState(!state);
				// Refresh();
			}, 1000);
		}

	}

	const buyClick = (data) => {
		console.log(data)
		dispatch(loader(true))

		web3 = new Web3(window.ethereum);
		let amount = web3.utils.toWei(data.nftPrice, 'ether');

		const factory_contract = new web3.eth.Contract(factoryAbi, factoryAddress)
		const token_contract = new web3.eth.Contract(hocAbi, projectData.investedToken)
		token_contract.methods.balanceOf(address).call()
			.then((bal) => {
				console.log(bal)
				if (bal > amount) {
					var obj = {
						uri: "https://houseofcryptoback.osiztech.com/"
					}
					var deadline = Math.round(new Date().getTime() / 1000) + 9000

					console.log(deadline, startTime.timestamp / 1000, endTime.timestamp / 1000)
					factory_contract.methods.signature_permit_typeHash().call()
						.then((typehash) => {
							factory_contract.methods.investRole().call()
								.then((irole) => {
									console.log(irole)
									factory_contract.methods.nonce(irole).call()
										.then(async (noun) => {
											console.log(noun)
											console.log(typehash, irole, address, projectId, amount, obj.uri, "=====", noun, deadline)
											var soliditySig = web3.utils.soliditySha3(typehash, irole, address, projectId, noun, deadline)
											var sign = web3.eth.accounts.sign(soliditySig, "68dde365a60aa0070c2e2e3ef84269854ae0e67eb8033d1e728f38444f239ba4");

											await token_contract.methods.approve(factoryAddress, amount)
												.send({ from: address })
												.on("receipt", (hash) => {
													console.log(hash)
													factory_contract.methods.invest(projectId, amount, deadline, obj.uri, sign.signature)
														.send({ from: address })
														.on("receipt", (hash) => {
															console.log(hash)
															var result = {
																hash: hash.blockHash,
																NftId: projectId,
																projectId: data._id,
																_id: projectData._id,
																purchasedBy: address
															}
															const headers = {
																'Content-Type': 'application/json',
																'Authorization': `Bearer ${localStorage.getItem("auth")}`
															}
															axios.post("https://houseofcryptoback.osiztech.com/user/project/BuyOrder", result, { headers })
																.then((res) => {
																	console.log(res)
																	dispatch(loader(false))

																	toast.success("Buy Successful")
																	setTrigger(trigger + 1)
																})
																.catch((err) => {
																	console.log(err)
																	dispatch(loader(false))

																	toast.error("Something went wrong")
																	setTrigger(trigger + 1)
																})
														})
														.on("error", (err) => {
															dispatch(loader(false))

															console.log(err)
														})


												})
												.on("error", (err) => {
													dispatch(loader(false))

													console.log(err)
												})


										})
										.catch((err) => {
											dispatch(loader(false))

										})

								})
								.catch((err) => {
									dispatch(loader(false))

								})

						})
						.catch((err) => {
							dispatch(loader(false))

							console.log(err)
						})
				}
				else {
					dispatch(loader(false))

					toast.error("Not Enough Balance")
				}
			})
			.catch((err) => {
				dispatch(loader(false))
				console.log(err)

			})



	}

	return (
		<Fragment>
			<Header />
			<div className="inrPgCnt ntDtPg">
				<div className="container">

					<div className="ntDtHd">
						<div className="ntDtHdCnt">
							<div className="row ntDtHdR">
								<div className="col-sm-12 col-md-12 col-lg-6 col-xl-7 ntDtHdC">
									<div className="ntDtHdIgS">
										<Slider {...settings}>
											<div className="ntDtHdIg">
												<img src={projectData && projectData.image1} alt="nft" />
											</div>
											<div className="ntDtHdIg">
												<img src={projectData && projectData.image2} alt="nft" />
											</div>
											<div className="ntDtHdIg">
												<img src={projectData && projectData.image3} alt="nft" />
											</div>
											<div className="ntDtHdIg">
												<img src={projectData && projectData.image4} alt="nft" />
											</div>
											<div className="ntDtHdIg ntDtHdIgvif_1">
												<video controls >
													{projectData && projectData.video ? <source src={projectData.video} type="video/webm" /> :
														null}

												</video>
											</div>
										</Slider>
									</div>
								</div>
								<div className="col-sm-12 col-md-12 col-lg-6 col-xl-5 ntDtHdC">
									<div className="ntDtHdDtx">
										<div className="ntDtHdDtxTl">
											<h4>{projectData && projectData.projectName}</h4>
											{/* <h6>Arise now, ye Tarnished</h6> */}
										</div>


										{/* <div className="dpjVwLk">
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
										</div> */}

										<div className="ntDtDr">
											<div className="ntDtDrLb">Funding Duration</div>
											<div className="ntDtDrVl">
												<span>{startTime.time}</span>
												<span>To</span>
												<span>{endTime.time}</span>
											</div>
										</div>

										<div className="ntDtStOb">
											<div className="ntDtStObLb">Status</div>
											{new Date().getTime() < startTime.timestamp ? <div className="ntDtStObVl text-green">On Starting</div> :
												new Date().getTime() > startTime.timestamp && new Date().getTime() < endTime.timestamp ? <div className="ntDtStObVl text-green">On Going</div> :
													<div className="ntDtStObVl text-red">Completed</div>}


											<div className="ntDtStObLb">Owned by</div>
											<div className="ntDtStObVl text-red">{projectData && projectData.entrepreneur_address}</div>
										</div>

										<div className="ntDtHdAc" onClick={connect}>
											{address !== null && address !== undefined && auth !== null && auth !== undefined ? <button className="btn btnGr btn-16945">
												{address.slice(0, 5) + "....." + address.slice(-5)}
											</button> : <button className="btn btnGr btn-16945">
												Connect Wallet
											</button>}


											{/* <button className="btn btnGr2 btn-16945">
												Follow
											</button> */}
										</div>

									</div>
								</div>
							</div>

							<div className="ntDtHdTbs dbTbs">
								{/* <ul className="nav nav-pills" role="tablist">
									<li className="nav-item" role="presentation">
										<button className="nav-link active"  data-toggle="pill" data-target="#ntDes" type="button" role="tab"  aria-selected="true">Description</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className="nav-link"  data-toggle="pill" data-target="#ntByOf" type="button" role="tab" aria-selected="false">Buy Offer</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className="nav-link"  data-toggle="pill" data-target="#ntPts" type="button" role="tab"  aria-selected="false">Partners</button>
									</li>
								</ul> */}
								<Nav tabs className="nav-pills">
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === '1' })}
											onClick={() => { toggle('1'); }}
										>
											Description
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === '2' })}
											onClick={() => { toggle('2'); }}
										>
											Buy Offer
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className={classnames({ active: activeTab === '3' })}
											onClick={() => { toggle('3'); }}
										>
											Partners
										</NavLink>
									</NavItem>
								</Nav>
							</div>
						</div>
					</div>
					<div className="ntDtHdCnt">
						<div className="ntDtTbBx">
							<TabContent activeTab={activeTab}>
								<TabPane tabId="1">
									<div className="ntDtBx ntDtDes">
										<div className="row ntDtDsStR">
											<div className="col-lg ntDtDsStC">
												<div className="ntDtDsStCon">
													<div className="ntDtDsPgTx">
														<div className="nddpgvl">US $ 15,384</div>
														<div className="nddpglb">pledged of {projectData && projectData.pledgeAmount} goal</div>
													</div>
													<div className="progress">
														{projectData ? <progress className="progress-bar" style={{ width: "100%" }} id="file" value={projectData.fundCollectedAmount} max={projectData.pledgeAmount}> </progress> :
															<div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%" }}></div>}

													</div>
												</div>
											</div>
											{/* <div className="col-md col-lg-auto ntDtDsStC">
												<div className="ntDtDsStCon">
													<div className="nddstVl">159</div>
													<div className="nddstLb">Backers</div>
												</div>
											</div> */}
											<div className="col-md col-lg-auto ntDtDsStC">
												<div className="ntDtDsStCon">
													<div className="nddstVl">{projectRemainingTime}</div>
													<div className="nddstLb">Total Project Days</div>
												</div>
											</div>
											<div className="col-md col-lg-auto ntDtDsStC">
												<div className="ntDtDsStCon">
													<div className="nddstVl">{campaignremainingTime}</div>
													<div className="nddstLb">Remaining Campaign Days</div>
												</div>
											</div>
										</div>
										<div className="ntDtDesPar">
											<h4>Description</h4>
											<p>{projectData && projectData.projectDescription}</p>
										</div>
									</div>
								</TabPane>
								<TabPane tabId="2">
									<div className="ntDtBx ntDtByOf">
										<div className="ntDtBxTl">Buy Offers</div>
										<div className="row ntDtByR">
											<div className="col-lg-6 ntDtByC">
												<div className="ntDtByTblCnt">
													<div className="ntDtByTbl">
														<table>
															<thead>
																<tr>
																	<th>NFT</th>
																	<th>Price</th>
																	<th>Action</th>
																</tr>
															</thead>
															<tbody>
																{buyMarket && buyMarket.map((data) => {
																	return (
																		<tr >
																			<td>
																				<div className="tblNtIg">
																					<img src={data.nftImage} alt="ntf" />
																				</div>
																			</td>
																			<td>
																				{data.nftPrice}
																			</td>
																			<td style={{ cursor: "pointer" }} onClick={() => { buyClick(data) }}>
																				<p className="text-red">
																					Buy Now
																				</p>
																			</td>
																		</tr>
																	)
																})}



															</tbody>
														</table>
													</div>
												</div>
											</div>
											<div className="col-lg-6 ntDtByC">
												<div className="ntDtByTblCnt">
													<div className="ntDtByTbl">
														<table>
															<thead>
																<tr>
																	<th>Images</th>
																	<th>Price</th>
																	<th>Action</th>
																</tr>
															</thead>
															<tbody>
																{sellMarket.map((data) => {
																	return (
																		<tr>
																			<td>
																				<div className="tblNtIg">
																					<img src={data.nftImage} alt="ntf" />
																				</div>
																			</td>
																			<td>
																				{data.nftPrice}
																			</td>
																			<td style={{ cursor: "pointer" }}>
																				<span className="text-green">Sold</span>
																			</td>
																		</tr>
																	)
																})}


															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</TabPane>
								<TabPane tabId="3">
									<div className="ntDtBx ntDtPts">
										<div className="ntDtBxTl">Partners</div>
										<DataTable
											data={data}
											columns={columns}
											pagination={true}
											//   progressPending={pending}
											highlightOnHover={true}
											fixedHeader={true}
											subHeaderAlign="right"
										/>
										{/* <div className="dbFlwFlHd ntDtTblFltHd">
											<div className="dbFlwShwR">
												<span>Showing</span>
												<select>
													<option>1</option>
													<option>2</option>
													<option>3</option>
												</select>
												<span>of  21 results</span>
											</div>
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
										<div className="ntDtByTbl">
											<table>
												<thead>
													<tr>
														<th>NFT</th>
														<th>Name</th>
														<th>Price</th>
														<th>Date & Time</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft11Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft1Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft10Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft6Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft5Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft3Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
													<tr>
														<td>
															<div className="tblNtIg">
																<img src={nft6Img} alt="ntf" />
															</div>
														</td>
														<td>
															Perter Park
														</td>
														<td>
															$ 2343
														</td>
														<td>
															02/12/2022 12:34:43
														</td>
														<td>
															<a href="#" className="text-red">
																View
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="dbFlwFlFt ntDtTblFltFt">
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
														<img src={arrrgtsmImg} alt="arrow-right-sm" />
													</a>
												</li>
											</ul>
										</div> */}
									</div>
								</TabPane>
							</TabContent>
						</div>
					</div>
					<div className="ntDtDoc">
						<div className="row ntDtDocR">
							<div className="col-lg-6 ntDtDocC">
								<div className="ntDtDocTx">
									<h4>Document</h4>
									<p>When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged								</p>
								</div>
							</div>
							<div className="col-lg-6 ntDtDocC">
								<div className="row ntDtDdwnR">
									<div className="col-sm ntDtDdwnC" onClick={() => {
										setModalShow(true);
										let obj = { uri: projectData.document1, fileType: "pdf" }

										setDocs(myArray => [obj])
									}}>
										<a href="#" >
											<div className="ntDtDdwnIc">
												<img src={files2Img} alt="files" />
											</div>
											<div className="ntDtDdwnNm">
												Document 1
											</div>
										</a>
									</div>

									<div className="col-sm ntDtDdwnC" onClick={() => {
										setModalShow(true);
										let obj = { uri: projectData.document2, fileType: "pdf" }

										setDocs(myArray => [obj])
									}}>
										<a href="#" >
											<div className="ntDtDdwnIc">
												<img src={files2Img} alt="files" />
											</div>
											<div className="ntDtDdwnNm">
												Document 2
											</div>
										</a>
									</div>

									<div className="col-sm ntDtDdwnC" onClick={() => {
										setModalShow(true);
										let obj = { uri: projectData.document3, fileType: "pdf" }

										setDocs(myArray => [obj])
									}}>
										<a href="#" >
											<div className="ntDtDdwnIc">
												<img src={files2Img} alt="files" />
											</div>
											<div className="ntDtDdwnNm">
												Document 3
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="ntDtPrShVl">
						<div className="row ntPrShVlR">
							<div className="col-lg-6 ntPrShVlC">
								<div className="ntDtPSVTl">Price</div>
								<div className="ntDtPSVBx ntDtPr">

									<div className="ntDtPrR">
										<div className="ntDtPrc">
											<div className="ntDtPrcVl">52.71p</div>
											<div className="ntDtPrcLb">Avg Price (weighted)</div>
										</div>
										<div className="ntDtPrc">
											<div className="ntDtPrcVl">$344.343</div>
											<div className="ntDtPrcLb">Volume</div>
										</div>
									</div>

									<div className="ntDtPrGh"  >
										<LineChart width={530} height={350} data={graphData}
											margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis domain={[0, 100]} />
											<Tooltip />
											<Legend />
											<Line type="monotone" dataKey="invest_value" stroke="red" />
										</LineChart>
									</div>

									<div className="ntDtPrGhBtns">
										<button onClick={() => setgraphDays(1)} className={graphDays === 1 ? "btn active" : "btn "}>
											1d
										</button>
										<button onClick={() => setgraphDays(7)} className={graphDays === 7 ? "btn active" : "btn"}>
											7d
										</button>
										{/* <button onClick={() => setgraphDays(30)} className={graphDays === 30 ? "btn active" : "btn"}>
											30m
										</button> */}
										<button onClick={() => setgraphDays(90)} className={graphDays === 90 ? "btn active" : "btn"}>
											3m
										</button>
										<button onClick={() => setgraphDays(180)} className={graphDays === 180 ? "btn active" : "btn"}>
											6m
										</button>
										<button onClick={() => setgraphDays(365)} className={graphDays === 365 ? "btn active" : "btn"}>
											1y
										</button>
										{/* <button onClick={() => setgraphDays(1000)} className={graphDays === 1000 ? "btn active"  : "btn"}>
											Max
										</button> */}
									</div>

								</div>
							</div>
							<div className="col-lg-6 ntPrShVlC">
								<div className="ntDtPSVTl">Share Value</div>
								<div className="ntDtPSVBx ntDtShv">
									<div className="ndShTbl ">
										{/* <table>
											<thead>
												<tr>
													<th>Owner Address</th>
													<th>Amount</th>
												</tr>
											</thead>
											<tbody>
												{partners && partners.map((data) => {
													return (
														<tr>
															<td>{data.purchasedBy}</td>
															<td>{data.nftPrice}</td>
														</tr>
													)
												})}

												{ }
											</tbody>
										</table> */}
									</div>
									<div className="ntDtByTblCnt ntDtByTblCnt_oji">
										<div className="ntDtByTbl ntDtByTbl_oji">
											<table>
												<thead>
													<tr>
														<th>Owner Address</th>
														<th>Amount</th>
													</tr>
												</thead>
												<tbody>
													{partners && partners.map((data) => {
														return (
															<tr>
																<td>{data.purchasedBy}</td>
																<td>{data.nftPrice}</td>
															</tr>
														)
													})}

													{/* <tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr><tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr>
													<tr>
														<td>0x4cf53ae8C51c7........</td>
														<td>$ 234.34</td>
													</tr> */}
												</tbody>
											</table>
										</div>
									</div>


								</div>
							</div>
						</div>
					</div>

					<div className="ntDtLct">
						<div className="ntDtPSVTl">Location</div>
						<div className="row nDLcR">
							<div className="col-lg-8 nDLcC">
								<div className="nDLcMp nDLcMp_ujy">
									{/* <img src={mapImg} alt="map" /> */}
									<Map location={mapData} />


								</div>
							</div>
							<div className="col-lg-4 nDLcC">
								<div className="nDLcAd">
									<div className="nDLcAdR">
										<div className="nDLcAdIc">
											<img src={locImg} alt="location" />
										</div>
										<div className="nDLcAdTx">
											{/* Flats 1, 5-7 Tower Mint Apartments,
											Tower Hill, London, London, E1 8JX */}
											{projectData && projectData.projectLocation}
											{/* <div>
												<span>{projectData && projectData.country}</span>
											</div> */}
										</div>
									</div>

									{/* <div className="nDLcAdR">
										<div className="nDLcAdIc">
											<img src={mailImg} alt="mail" />
										</div>
										<div className="nDLcAdTx">
											Perterpark@gmail.com
										</div>
									</div> */}
								</div>
							</div>
						</div>
					</div>


					<div className="ntDtMrCl">
						<div className="ntDtMrClTl">More From This Collection</div>
						<div className="row">
							<div className="col-sm-6 col-lg-3 mt-4 mt-lg-0">
								<div className="Progress-Box">
									<div className="progrees-mainImg">
										<img src={take1Img} alt="" className="img-fluid" />
									</div>
									<div className="progress-cnt">
										<h5 className="progress-Head mb-0">Oliver Finn Hears a Smell!?</h5>
										<h6 className="progress-subHead mb-0">Pledged of <span>$76,956</span>  goal</h6>
										<div className="progress">
											<div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<p className="progress-name mb-0">By Mantic Games</p>
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-lg-3 mt-4 mt-lg-0">
								<div className="Progress-Box">
									<div className="progrees-mainImg">
										<img src={take2Img} alt="" className="img-fluid" />
									</div>
									<div className="progress-cnt">
										<h5 className="progress-Head mb-0">Oliver Finn Hears a Smell!?</h5>
										<h6 className="progress-subHead mb-0">Pledged of <span>$76,956</span>  goal</h6>
										<div className="progress">
											<div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<p className="progress-name mb-0">By Mantic Games</p>
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-lg-3 mt-4 mt-lg-0">
								<div className="Progress-Box">
									<div className="progrees-mainImg">
										<img src={take3Img} alt="" className="img-fluid" />
									</div>
									<div className="progress-cnt">
										<h5 className="progress-Head mb-0">Oliver Finn Hears a Smell!?</h5>
										<h6 className="progress-subHead mb-0">Pledged of <span>$76,956</span>  goal</h6>
										<div className="progress">
											<div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<p className="progress-name mb-0">By Mantic Games</p>
									</div>
								</div>
							</div>
							<div className="col-sm-6 col-lg-3 mt-4 mt-lg-0">
								<div className="Progress-Box">
									<div className="progrees-mainImg">
										<img src={take4Img} alt="" className="img-fluid" />
									</div>
									<div className="progress-cnt">
										<h5 className="progress-Head mb-0">Oliver Finn Hears a Smell!?</h5>
										<h6 className="progress-subHead mb-0">Pledged of <span>$76,956</span>  goal</h6>
										<div className="progress">
											<div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<p className="progress-name mb-0">By Mantic Games</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Modal
						show={modalShow}
						onHide={() => setModalShow(false)}
						size="lg"
						aria-labelledby="contained-modal-title-vcenter"
						centered
					>
						<DocViewer pluginRenderers={DocViewerRenderers} documents={docs}
							config={{ header: { disableHeader: true, disableFileName: true, retainURLParams: true } }}
							style={{ height: 500 }} />
						<Modal.Footer>
							<Button onClick={() =>
								setModalShow(false)

							}>Close</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
			<Footer />
		</Fragment>
	);

}

export default Nftdetails;