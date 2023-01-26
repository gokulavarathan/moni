import React, { Component, Fragment, useState, useRef, useEffect, createRef  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalBody} from 'reactstrap';
import classnames from 'classnames';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import bnrpic1Img from '../../assets/images/pics/iBnrpic1.png';
import bnrpic2Img from '../../assets/images/pics/iBnrpic2.png';
import ftr1Img from '../../assets/images/pics/ftr-1.png';
import ftr2Img from '../../assets/images/pics/ftr-2.jpg';
import ftr3Img from '../../assets/images/pics/ftr-3.jpg';
import ftr4Img from '../../assets/images/pics/ftr-4.jpg';
import video1 from '../../assets/images/Nft_images/video-1.mp4';
import video2 from '../../assets/images/Nft_images/video-2.mp4';
import video3 from '../../assets/images/Nft_images/video-3.mp4';
import video4 from '../../assets/images/Nft_images/video-4.mp4';
import fresh1Img from '../../assets/images/fresh-1.png';
import fresh2Img from '../../assets/images/fresh-2.png';
import fresh3Img from '../../assets/images/fresh-3.png';
import take1Img from '../../assets/images/take-1.png';
import take2Img from '../../assets/images/take-2.png';
import take3Img from '../../assets/images/take-3.png';
import take4Img from '../../assets/images/take-4.png';
import sldr1Img from '../../assets/images/slider-1.png';
import sldr2Img from '../../assets/images/slider-2.png';
import fingertip from '../../assets/images/fingertips-Img.svg';


import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";


const Home = (props) => {
    const settings = {
        infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 2000,
		autoplay: true,
        responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

      const settings1 = {
        infinite: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
      }

    //   const image=()=>{
        

    //     public function compareLiveAndDocument($liveImageData, $document1StoragePath, $document2StoragePath = null)
    //     {
    //         $connection = $this->getConnection();
    
    //         $document1ImageData = base64_encode(Storage::get($document1StoragePath));
    //         $images = [
    //             [
    //                 'type' => 3,
    //                 'data' => $liveImageData
    //             ],
    //             [
    //                 'type' => 2,
    //                 'data' => $document1ImageData
    //             ]
    //         ];
    //         if ($document2StoragePath !== null) {
    //             $document2ImageData = base64_encode(Storage::get($document2StoragePath));
    //             $images[] = [
    //                 'type' => 2,
    //                 'data' => $document2ImageData
    //             ];
    //         }
    
    //         $response = $connection->request('POST', self::FACEAPI . '/api/match', [
    //             'headers' => [
    //                 'Content-Type' => 'application/json; charset=utf-8',
    //                 'Accept' => 'application/json',
    //                 'X-RequestID' => md5(time())
    //             ],
    //             'json' => [
    //                 'images' => $images
    //             ]
    //         ]);
    
    //         $result = json_decode($response->getBody()->getContents());
    
    //         //Storage::put('log-' . date('d.m.Y H:i:s') . '.txt', json_encode($result));
    
    //         if (!empty($result->results)) {
    //             foreach ($result->results as $r) {
    //                 if (isset($r->errorCode)) {
    //                     continue;
    //                 }
    //                 if ($r->firstIndex !== 0) {
    //                     continue;
    //                 }
    //                 if ($r->similarity > 0.85) {
    //                     return true;
    //                 }
    //             }
    //         }
    
    //         return false;
    //     }
        
    //     const headers = {
    //         'Content-Type' : 'application/json; charset=utf-8',
    //                 'Accept' : 'application/json',
    //                 'X-RequestID': md5(time())
    //       }
    //       var data=[base64_encode(""),base64_encode("")]
    //       const request = {
    //           "image":data
    //       }
    //       axios.post("https://faceapi.regulaforensics.com/api/match",request,{
    //         headers: headers
    //       })
    //   }
    return (
        <Fragment>
            <Header />
            <div className="indBnr">
                <div className="container">
                    <div className="row iBnrR">
                        <div className="col-sm-12 col-md-7 col-lg-6 iBnrC">
                            <div className="iBnrTx">
                           


                                <h1>Join the blockchain <span>crowdfunding</span> </h1>
                                <p> community and discover how to invest in innovative and sustainable projects while earning with cryptocurrencies!</p>
                                <div className="iBnrLk">
                                    <span   className="btn btnGr btn-17845">
                                        Get Started
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-5 col-lg-6 align-self-end iBnrC">
                            {/* <div className="iBnrIg">
                                <img src={bnrpic1Img} alt="iBnrpic1" />
                            </div> */}

                            <div className="iBnrIg2">
                                <img src={bnrpic2Img} alt="iBnrpic2" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="iPjSts">
                <div className="container">
                    <div className="iPjStsCon">
                        <div className="iPjStsR">
                            <div className="iPjStsC">
                                <div className="iPjStsTx">
                                    <h2>71,075,086</h2>
                                    <p>Pledges</p>
                                </div>
                            </div>
                            <div className="iPjStsC">
                                <div className="iPjStsTx">
                                    <h2>$6,384,540,291</h2>
                                    <p>Towards Creative Work</p>
                                </div>
                            </div>
                            <div className="iPjStsC">
                                <div className="iPjStsTx">
                                    <h2>230,349</h2>
                                    <p>Projects Funded</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ftrPrj">
                <div className="ftrPrjCnt">
                    <div className="container">
                        <div className="ftrPrjCon">
                            <div className="ftrPrjHd">
                                <h2>Featured Project</h2>

                                <div className="ftrPrjVa">
                                    <a href="#">View All</a>
                                </div>
                            </div>

                            <div className="ftrPrjBd">

                                {/* <button className="btn btnCr48 ftrArw ftrArwLt">
                                    <img src={arrlftImg} alt="arrow-left" />
                                </button>
                                <button className="btn btnCr48 ftrArw ftrArwRt">
                                    <img src={arrrgtImg} alt="arrow-right" />
                                </button> */}

                                {/* <div className="row ftrPrjR"> */}
                                <Slider  className="ftrPrjR" {...settings}>
                                    <div className="ftrPrjC">
                                        <div className="ftrPrjCd">
                                            <div className="ftrPrjCdIg">
                                                <img src={ftr1Img} alt="ftr-1" />
                                            </div>
                                            <div className="ftrPrjCdTx">
                                                <h6>THE HAUNTER OF THE...</h6>
                                                <p>851% funded</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ftrPrjC">
                                        <div className="ftrPrjCd">
                                            <div className="ftrPrjCdIg">
                                                <img src={ftr2Img} alt="ftr-2" />
                                            </div>
                                            <div className="ftrPrjCdTx">
                                                <h6>THE HAUNTER OF THE...</h6>
                                                <p>851% funded</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ftrPrjC">
                                        <div className="ftrPrjCd">
                                            <div className="ftrPrjCdIg">
                                                <img src={ftr3Img} alt="ftr-3" />
                                            </div>
                                            <div className="ftrPrjCdTx">
                                                <h6>THE HAUNTER OF THE...</h6>
                                                <p>851% funded</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ftrPrjC">
                                        <div className="ftrPrjCd">
                                            <div className="ftrPrjCdIg">
                                                <img src={ftr4Img} alt="ftr-4" />
                                            </div>
                                            <div className="ftrPrjCdTx">
                                                <h6>THE HAUNTER OF THE...</h6>
                                                <p>851% funded</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ftrPrjC">
                                        <div className="ftrPrjCd">
                                            <div className="ftrPrjCdIg">
                                                <img src={ftr2Img} alt="ftr-3" />
                                            </div>
                                            <div className="ftrPrjCdTx">
                                                <h6>THE HAUNTER OF THE...</h6>
                                                <p>851% funded</p>
                                            </div>
                                        </div>
                                    </div>

                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tdyBs">
                <div className="container">
                    <div className="tdyBsHd">
                        <h2>Today's Best NFT</h2>
                        <div className="ftrPrjVa">
                            <a href="#">Discover More</a>
                        </div>
                    </div>

                    <div className="tdyBsBd">
                        <div className="tdyBsR">

                            <div className="tdyBsC">
                                <div className="tdyBsCon">
                                    <div className="tdyBsIg">
                                        <video autoPlay muted loop>
                                            <source src= { video1 } type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="tdyBsTx">
                                        <h6>THE HAUNTER OF THE DARK </h6>
                                        <p>851% funded</p>
                                    </div>
                                </div>
                            </div>

                            <div className="tdyBsC">
                                <div className="tdyBsCon">
                                    <div className="tdyBsIg">
                                        <video autoPlay muted loop>
                                            <source src= { video2 } type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="tdyBsTx">
                                        <h6>THE HAUNTER OF THE DARK </h6>
                                        <p>851% funded</p>
                                    </div>
                                </div>
                            </div>

                            <div className="tdyBsC">
                                <div className="tdyBsCon">
                                    <div className="tdyBsIg">
                                        <video autoPlay muted loop>
                                            <source src= { video3 } type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="tdyBsTx">
                                        <h6>THE HAUNTER OF THE DARK </h6>
                                        <p>851% funded</p>
                                    </div>
                                </div>
                            </div>

                            <div className="tdyBsC">
                                <div className="tdyBsCon">
                                    <div className="tdyBsIg">
                                        <video autoPlay muted loop>
                                            <source src= { video4 } type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="tdyBsTx">
                                        <h6>THE HAUNTER OF THE DARK </h6>
                                        <p>851% funded</p>
                                    </div>
                                </div>
                            </div>

                            <div className="tdyBsC">
                                <div className="tdyBsCon">
                                    <div className="tdyBsIg">
                                        <video autoPlay muted loop>
                                            <source src= { video2 } type="video/mp4" />
                                        </video>
                                    </div>
                                    <div className="tdyBsTx">
                                        <h6>THE HAUNTER OF THE DARK </h6>
                                        <p>851% funded</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <section className="freshfav-sec">
                <div className="freshfav-secPt">
                    <div className="container">
                        <div className="freshfav-maincnt">
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="ffLeft-cnt">
                                        <h2 className="subHead-Title mb-0">Fresh Favorites</h2>
                                        <p className="Para16-400">When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                        <a href="#" className="btn btnGr btn-17845">Discover More</a>
                                    </div>
                                </div>
                                <div className="col-lg-8 mt-3">
                                    <div className="ffRight-cnt">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-4">
                                                <div className="freshfav-item">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={fresh1Img} alt="" className="img-fluid" />
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
                                            <div className="col-sm-6 col-md-4 my-3 my-sm-0">
                                                <div className="freshfav-item">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={fresh2Img} alt="" className="img-fluid" />
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
                                            <div className="col-sm-6 col-md-4 mt-sm-3 mt-md-0">
                                                <div className="freshfav-item">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={fresh3Img} alt="" className="img-fluid" />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="takingoff-sec">
                <div className="container">
                    <div className="takingoff-cnt">
                    <div className="ftrPrjHd">
                        <h2>Taking Off</h2>
                        <div className="ftrPrjVa">
                            <a href="#">Discover More</a>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-6 col-lg-3">
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
                        <div className="col-sm-6 col-lg-3 mt-4 mt-sm-0">
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
                        <div className="col-sm-6 col-lg-3 mt-4 mt-sm-0">
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
                        <div className="col-sm-6 col-lg-3 mt-4 mt-sm-0">
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
                </div>
            </section>
            <section className="homestrech-sec">
                <div className="homestrech-secpt">
                    <div className="container">
                        <div className="homestrech-cnt">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="hsLeft-cnt">
                                        <Slider  className="homestrech-slider" {...settings1}>
                                            <div>
                                                <div className="strech-slideritem">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={sldr1Img} alt="" className="img-fluid" />
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
                                            <div>
                                                <div className="strech-slideritem">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={sldr2Img} alt="" className="img-fluid" />
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
                                            <div>
                                                <div className="strech-slideritem">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={sldr1Img} alt="" className="img-fluid" />
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
                                            <div>
                                                <div className="strech-slideritem">
                                                    <div className="Progress-Box">
                                                        <div className="progrees-mainImg">
                                                            <img src={sldr2Img} alt="" className="img-fluid" />
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
                                        </Slider >
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4 mt-lg-0">
                                    <div className="hsRight-cnt">
                                        <h2 className="subHead-Title mb-0">Home Strech</h2>
                                        <p className="Para16-400">When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                                        <a href="#" className="btn btnGr btn-17845">Discover More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="fingertips-sec">
                <div className="container">
                    <div className="fingertips-cnt">
                    <div className="row align-items-center">
                        <div className="col-md-10 col-lg-11 ft-column">
                            <div className="row align-items-center">
                                <div className="col-lg-7">
                                <div className="ftLeft-cnt">
                                    <h1>A whole world of talent at your fingertips</h1>
                                    <p>Our platform provides you with access to a diverse range of talented individuals and organizations from all over the world dedicated to Crypto World. With just a few clicks, you can discover and connect with the best and brightest in their respective fields, and unlock a wealth of knowledge, skills, and expertise. Whether you are looking for a collaborator, mentor, or simply want to learn from the best, our platform puts a world of opportunity at your fingertips.our platform provides you with access to a diverse range of talented individuals and organizations from all over the world who are working in the blockchain industry. With just a few clicks, you can discover and connect with the best and brightest in their respective fields, and unlock a wealth of knowledge, skills, and expertise. Whether you are looking for a collaborator, mentor, or simply want to learn from the best, our platform puts a world of opportunity at your fingertips. Join us today and discover the potential of blockchain technology</p>
                                </div>
                                </div>
                                <div className="col-lg-5 text-center">
                                <div className="ftRight-cnt">
                                    <img src={fingertip} alt="" className="img-fluid" />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
   
}

export default Home;