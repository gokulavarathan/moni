import React, {
  Component,
  Fragment,
  useState,
  useRef,
  useEffect,
  createRef,
} from "react";
import { loader } from '../../redux/api'
import { useDispatch } from 'react-redux'

import axios from "axios";
import helper from "../../components/Helper/axiosHelper";
import "./css/terms.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
const Activate = () => {
  const dispatch = useDispatch()
  let { id } = useParams();
  const [activationStatus,setActivationStatus]=useState("inital")
  let baseUrl = helper.baseUrl();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${id}`
}
  useEffect(()=>{
    dispatch(loader(true))
    axios.get(baseUrl+"user/basic/accountActivation",
    { headers: headers })
    .then((res)=>{
      if(res.data.status == 200){
        dispatch(loader(false))
        setActivationStatus(true);
        toast.success(res.data.message)
      }else{
        dispatch(loader(false))
        setActivationStatus(false);
        toast.error(res.data.message)
      }
      
    }).catch((err)=>{
      dispatch(loader(false))
    })

  },[])

  return (
    <Fragment>
      <Header />
      <div className="whole_container cms-pages">
        <div className="middle-section">
          <div className="container">
            <div className="row ts_m">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="myaccount-section">
                  <div className="width100 text-center">
                    <div className="myprofile-box">
                      <h1>Account Activation</h1>
                      <div className="about-inn">
                        {/* <h3 className="text-center">
                          
                        </h3> */}

                        { activationStatus == "inital" ?<></> : activationStatus ?
                        
                        <div className="alert alert-success alert-dismissible">
                                Your account has been activated successfully.
                                Now you can login our site using your registered
                                credentails. If you have any quereies, Please
                                kindly contact our administrator or HOC
                                technical teams.
                              </div>
                        : 
                        <div className="alert alert-danger alert-dismissible">
                                Your account activation is failed, because of
                                your account is already activated. If you have
                                any quereies, Please kindly contact our
                                administrator or HOC technical teams.
                              </div>
                        }
                              
                          

                           
                              

                      </div>
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
};



export default Activate;
