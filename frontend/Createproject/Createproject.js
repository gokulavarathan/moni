import React, { Component, Fragment, useState, useRef, useEffect, createRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { } from 'reactstrap';
import { Wizard, useWizard } from 'react-use-wizard';
import { TextEditor, getInnerHtml } from "text-editor-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useStateRef from 'react-usestateref'
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick-theme.css";
import helper from "../../components/Helper/axiosHelper";

import files2Img from '../../assets/images/icons/files-2.svg';
import files from "../../assets/images/icons/files.svg"
import demoImg from '../../assets/images/icons/demo-image.svg';
import searchImg from '../../assets/images/icons/search.svg';
import demovidImg from '../../assets/images/icons/demo-video.svg';
import { loader } from '../../redux/api'
import { toast } from "react-toastify";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Step1 = (props) => {



    const { handleStep, previousStep, nextStep } = useWizard();
    return (
        <>
            <div className="crPrjStpCrs">
                <div className="crPjStCr prgs"><span>1</span></div>
                <div className="crPjStLn"></div>
                <div className="crPjStCr"><span>2</span></div>
                <div className="crPjStLn"></div>
                <div className="crPjStCr"><span>3</span></div>
            </div>
            <div className="crPrjBd">
                <div className="ctPjDts">
                    <h5> First, let’s get you set up. </h5>
                    <p>
                        These will help backers find your project, and you can change them later if you need to. <br />
                        Select a primary category and subcategory for your new project.
                    </p>
                </div>
                <div className="ctPjIpCnt">
                    <div className="ctPjIps">
                        <div className="row ctPjIpsR">
                            <div className="col-sm-12 col-md-6 col-lg-6 ctPjIpsC">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Primary category</label>
                                    <select className="custom-select" id="exampleFormControlSelect1" onChange={(e) => {
                                        props.selected(e.target.value);
                                    }} >
                                        {props.selectionList && props.selectionList.map((dat, i) => {
                                            return (
                                                <option>{props.selectionList[i]}</option>

                                            )
                                        })}

                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 ctPjIpsC">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect2"> Subcategory</label>
                                    <select className="custom-select" id="exampleFormControlSelect2" onChange={(e) => {
                                        props.selected2(e.target.value);
                                    }} >
                                        {props.selectionList2 && props.selectionList2.map((dat, i) => {
                                            console.log(dat)
                                            return (
                                                <option>{props.selectionList2[i]}</option>

                                            )
                                        })}

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="ctPjIpsSbm">
                            <button className="btn btnGr btn-14634" onClick={() => nextStep()}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const Step2 = (props) => {
    const { handleStep, previousStep, nextStep } = useWizard();

    return (
        <>
            <div className="crPrjStpCrs">
                <div className="crPjStCr cmplt"><span>1</span></div>
                <div className="crPjStLn"></div>
                <div className="crPjStCr prgs"><span>2</span></div>
                <div className="crPjStLn"></div>
                <div className="crPjStCr"><span>3</span></div>
            </div>
            <div className="crPrjBd">
                <div className="ctPjDts">
                    <h5> Select Country &  The Entity’s tax ID </h5>
                    <p>
                        It’ll help us provide more relevant guidance for your project.
                    </p>
                </div>

                <div className="ctPjIpCnt">
                    <div className="ctPjIps">
                        <div className="row ctPjIpsR">
                            <div className="col-sm-12 col-md-6 col-lg-6 ctPjIpsC">
                                <div className="form-group">
                                    <label for="exampleFormControlSelect1">Country</label>
                                    <select className="custom-select" id="exampleFormControlSelect1" onChange={(e) => {
                                        props.selected(e.target.value);
                                    }} >
                                        {props.selectionList && props.selectionList.map((dat, i) => {
                                            return (
                                                <option>{props.selectionList[i].name.common}</option>

                                            )
                                        })}

                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 ctPjIpsC">
                                <div className="form-group">
                                    <label>Tax ID</label>
                                    <input type="text" placeholder="Enter Tax Id Code" className="form-control" onChange={(e) => { props.changeValue(e.target.value) }} />
                                </div>
                            </div>
                        </div>

                        <div className="ctPjIpsSbm">
                            <a href="#" className="ctPjStBk" onClick={() => previousStep()}>
                                {"<"} {"<"} Back
                            </a>

                            <button className="btn btnGr btn-14634" onClick={() => nextStep()}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}



const Createproject = (props) => {
    const dispatch = useDispatch()
    const [primaryCategory, setPrimaryCategory] = useState([]);
    const [subCategroy, setSubCategory] = useState([]);
    const id = "my-unique-id";
    const navigate = useNavigate()
    const [eunterpreneurAddress, setEunterpreneurAddress] = useState("");
    const [investingToken, setInvestingToken] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectSymbol, setProjectSymbol] = useState("");
    const [url, setUrl] = useState("");
    const [supply, setSupply] = useState("");
    const [pledgeAmount, setPledgeAmount] = useState()
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState("");
    const [primarySelect, setPrimarySelect] = useState();
    const [subSelect, setSubSelect] = useState();
    const [projectImage, setProjectImage] = useState();
    const [projectImage2, setProjectImage2] = useState();
    const [projectImage3, setProjectImage3] = useState();
    const [projectImage4, setProjectImage4] = useState();

    const [projectFile, setProjectFile] = useState();
    const [projectFile2, setProjectFile2] = useState()
    const [projectFile3, setProjectFile3] = useState()
    let baseUrl = helper.baseUrl()
    var [stateLocation, setStateLocation, refLocation] = useState()
    const [projectVideo, setProjectVideo] = useState()
    const [fundingStartDuration, setFundingStartDuration] = useState()
    const [fundingEndingDuration, setFundingEndingDuration] = useState()

    const [projectStartDuration, setProjectStartDuration] = useState()
    const [projectEndingDuration, setProjectEndingDuration] = useState()

    const [countriesList, setContriesList] = useState()
    const [selectedCountry, setSelectedCountry] = useState()

    const [taxid, setTaxid] = useState()
    const [ProjectDescription, setProjectDescription] = useState("")
    //   const [pledgeAmount, setpledgeAmount] = useState("");
    const [Location, setLocation] = useState("")

    const [previewImage1, setPreviewImage1] = useState()
    const [previewImage2, setPreviewImage2] = useState()
    const [previewImage3, setPreviewImage3] = useState()
    const [previewImage4, setPreviewImage4] = useState()

    const [previewVideo, setPreviewVideo] = useState()

    const { register, handleSubmit, formState: { errors }, reset, trigger, } = useForm();

    useEffect(() => {
        axios
            .get(baseUrl + "admin/basic/listCategory")
            .then((res) => {
                setPrimaryCategory(res.data.data[0].category);
                setSubCategory(res.data.data[0].subcategory);
                setPrimarySelect(res.data.data[0].category[0])
                setSubSelect(res.data.data[0].subcategory[0])

            })
            .catch((err) => {
                console.log(err);
            });
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => {
                setContriesList(res.data)
                setSelectedCountry(res.data[0].name.common)
            })
    }, []);
    const onSubmit = (e) => {
        console.log(e, "des");
        var locationLatitude;
        var locationLongitude;
        dispatch(loader(true))

        const MAX_FILE_SIZE = 2048 // 2MB
        const fileSizeKiloBytes = projectVideo.size / 1024
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            toast.error("File size is greater than maximum limit");
            dispatch(loader(false))
            return
        } else {

        axios.get(`https://maps.google.com/maps/api/geocode/json?address=${e.location}&sensor=false&key=AIzaSyBp68RmeQVmhQRdujiPMyfMonea_C483PY`)
        .then((res) => {
            if (res.status == "ZERO_RESULTS") {
                dispatch(loader(false));
                toast.error("Unable to fetch the location in google maps");
                return;

            } else {

                locationLatitude = res.data.results[0].geometry.location.lat
                locationLongitude = res.data.results[0].geometry.location.lng

                let formData = new FormData();

                formData.set("projectSymbol", e.projectsymbol);
                formData.set("projectName", e.projectname);
                formData.set("primaryCategary", primarySelect);
                formData.set("subCategary", subSelect);
                formData.set("projectDescription", e.projectdescription);
                formData.set("projectLocation", e.location);
                formData.set("latitude", locationLatitude);
                formData.set("longitude", locationLongitude);
                formData.set("pledgeAmount", parseInt(e.pledgeamount));
                formData.set("country", selectedCountry);
                formData.set("fundingEndTime", new Date(e.fundingendduration));
                formData.set("fundingStartTime", new Date(e.fundingstartduration));
                formData.set("taxId", taxid)
                formData.set("projectStartTime", new Date(e.projectstartduration));
                formData.set("projectEndTime", new Date(e.projectendduration));
                formData.set("campaignStartTime", new Date(e.start));
                formData.set("campaignEndTime", new Date(e.end));
                formData.append("document1", projectFile);
                formData.append("document2", projectFile2);
                formData.append("document3", projectFile3);
                formData.append("image1", projectImage);
                formData.append("image2", projectImage2);
                formData.append("image3", projectImage3);
                formData.append("image4", projectImage4);
                formData.append("video", projectVideo);

                formData.set("projectId", "0");
                formData.set("projectHash", "0");
                formData.set("supply", e.projectsupply);

                axios.post(baseUrl + "user/project/createProposal", formData,
                    {
                        headers: {
                            'content-type': 'multipart/form-ability',
                            "Authorization": `Bearer ${localStorage.getItem("auth")}`
                        }
                    })
                    .then((response) => {
                        dispatch(loader(false));
                        if (response.data.status) {
                            toast.success("Project proposal created successfully.Once Admin approved the nft will displayed on marketplace")
                            reset();
                            navigate("/")
                        } else {
                            toast.error(response.data.message)
                        }

                    })
                    .catch((err) => {
                        dispatch(loader(false));
                        toast.error("Error occur while creating proposal")
                    })


            }
            
        }).catch((err) => { dispatch(loader(false)); })

        }



    }


    return (
        <Fragment>
            <Header />
            <div className="inrPgCnt crPrj">
                <div className="container">
                    <div className="crPrjHd">
                        <h2>Start Project</h2>

                    </div>
                    <Wizard>
                        <Step1 selected={setPrimarySelect} selectionList={primaryCategory} selected2={setSubSelect} selectionList2={subCategroy} />
                        <Step2 selected={setSelectedCountry} selectionList={countriesList} changeValue={setTaxid} />

                        <>
                            <div className="crPrjStpCrs">
                                <div className="crPjStCr cmplt"><span>1</span></div>
                                <div className="crPjStLn"></div>
                                <div className="crPjStCr cmplt"><span>2</span></div>
                                <div className="crPjStLn"></div>
                                <div className="crPjStCr prgs"><span>3</span></div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="crPrjBd v2">
                                    <div className="ctPjDts">
                                        <h5> Select one more subcategory </h5>
                                        <p>
                                            It’ll help us provide more relevant guidance for your project.
                                        </p>
                                    </div>

                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Funding durations (optional)</h5>
                                                    <p>We’ll provide you with recommendations on when to complete steps that may take a few days to process. You can edit this date up until the moment you launch your project, which must always be done manually.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>Start Time</label>


                                                    <input type="datetime-local" className="form-control ctPjDt"
                                                        onChange={(e) => setFundingStartDuration(e.target.value)}
                                                        {...register("fundingstartduration")}
                                                        onKeyUp={() => {
                                                            trigger("fundingstartduration");
                                                        }} />
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>End Time</label>
                                                    <input type="datetime-local" className="form-control ctPjDt"
                                                        onChange={(e) => setFundingEndingDuration(e.target.value)}
                                                        {...register("fundingendduration")}
                                                        onKeyUp={() => {
                                                            trigger("fundingendduration");
                                                        }}
                                                    />


                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project durations (optional)</h5>
                                                    <p>We’ll provide you with recommendations on when to complete steps that may take a few days to process. You can edit this date up until the moment you launch your project, which must always be done manually.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>Start Time</label>
                                                    <input type="datetime-local" className="form-control ctPjDt"
                                                        onChange={(e) => setProjectStartDuration(e.target.value)}

                                                        {...register("projectstartduration")}
                                                        onKeyUp={() => {
                                                            trigger("projectstartduration");
                                                        }} />



                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>End Time</label>


                                                    <input type="datetime-local" className="form-control ctPjDt"
                                                        onChange={(e) => setProjectEndingDuration(e.target.value)}
                                                        {...register("projectendduration")}
                                                        onKeyUp={() => {
                                                            trigger("projectendduration");
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project document </h5>
                                                    <p>Projects  White paper similar information, along with details about the entity’111s</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-row">
                                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                                        <div className="kVcTyIgIp v2">
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="frSdDc"
                                                                    name="projectfile"
                                                                    autoComplete="off"
                                                                    accept="application/pdf,application/vnd.ms-excel"
                                                                    // onChange={(e) => {
                                                                    //     setProjectFile(e.target.files[0]);

                                                                    // }}
                                                                    {...register("projectfile", {
                                                                        required: "Project File is required",

                                                                    })}
                                                                    onChange={(e) => {
                                                                        setProjectFile(e.target.files[0]);

                                                                        trigger("projectfile");
                                                                    }}
                                                                />
                                                                {errors.projectfile && (
                                                                    <div className="form-error" style={{ color: "red" }}>{errors.projectfile.message}.</div>
                                                                )}

                                                                <label className="custom-file-label" for="frSdDc">
                                                                    <div className="csFlIcTx">
                                                                        <img src={projectFile ? files2Img : files} alt="files-2" />
                                                                        <span>Drop Document here, or select a file.</span>
                                                                    </div>
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                                        <div className="kVcTyIgIp v2">
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="frSdDc2"
                                                                    name="projectfile2"
                                                                    autoComplete="off"
                                                                    accept="application/pdf,application/vnd.ms-excel"
                                                                    // onChange={(e) => {
                                                                    //     setProjectFile2(e.target.files[0]);
                                                                    // }}
                                                                    {...register("projectfile2", {
                                                                        required: "Project File is required",

                                                                    })}
                                                                    onChange={(e) => {
                                                                        setProjectFile2(e.target.files[0]);

                                                                        trigger("projectfile2");
                                                                    }} />
                                                                {errors.projectfile2 && (
                                                                    <div className="form-error" style={{ color: "red" }}>{errors.projectfile2.message}.</div>
                                                                )}
                                                                <label className="custom-file-label" for="frSdDc2">
                                                                    <div className="csFlIcTx">
                                                                        <img src={projectFile2 ? files2Img : files} alt="files-2" />
                                                                        <span>Drop Document here, or select a file.</span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-12 col-md-4 col-lg-4">
                                                        <div className="kVcTyIgIp v2">
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="frSdDc3"
                                                                    name="projectfile3"
                                                                    autoComplete="off"
                                                                    accept="application/pdf,application/vnd.ms-excel"
                                                                    // onChange={(e) => {
                                                                    //     setProjectFile3(e.target.files[0]);
                                                                    // }}
                                                                    {...register("projectfile3", {
                                                                        required: "Project File is required",

                                                                    })}
                                                                    onChange={(e) => {
                                                                        setProjectFile3(e.target.files[0]);

                                                                        trigger("projectfile3");
                                                                    }} />
                                                                {errors.projectfile3 && (
                                                                    <div className="form-error" style={{ color: "red" }}>{errors.projectfile3.message}.</div>
                                                                )}
                                                                <label className="custom-file-label" for="frSdDc3">
                                                                    <div className="csFlIcTx">
                                                                        <img src={projectFile3 ? files2Img : files} alt="files-2" />
                                                                        <span>Drop Document here, or select a file.</span>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Campaign duration</h5>
                                                    <p>Set a time limit for your campaign. You won’t be able to change this after you launch.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>Start Time</label>
                                                    <input type="datetime-local" className="form-control ctPjDt" name="start"
                                                        // onChange={(e) => setStartTime(e.target.value)}
                                                        {...register("start", {
                                                            required: "Start Time is required",

                                                        })}
                                                        onMouseOut={() => {
                                                            trigger("start");
                                                        }}

                                                    />
                                                    {errors.start && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.start.message}.</div>
                                                    )}

                                                </div>

                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>End Time</label>
                                                    <input type="datetime-local" className="form-control ctPjDt" name="end"
                                                        // onChange={(e) => setEndTime(e.target.value)}
                                                        {...register("end", {
                                                            required: "End Time is required",

                                                        })}
                                                        onMouseOut={() => {
                                                            trigger("end");
                                                        }} />
                                                    {errors.end && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.end.message}.</div>
                                                    )}

                                                </div>


                                            </div>

                                        </div>
                                    </div>

                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-12 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project description</h5>
                                                    <p>Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are. Your description should tell backers everything they need to know. If possible, include images to show them what your project is all about and what rewards look like
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg-12 ctPjIpCdC">
                                                <div className="ctPjEdt">
                                                    {/* <img src="images/pics/editor.png" alt="editor" /> */}
                                                    {/* <TextEditor id={id} /> */}
                                                    <textarea rows="5" style={{ padding: "10px", width: "100%", resize: "none", }}
                                                        name="projectdescription"
                                                        onKeyUp={() => {
                                                            trigger("projectdescription");
                                                        }}
                                                        {...register("projectdescription", {
                                                            required: "Project description  is required",
                                                        })}

                                                    ></textarea>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {errors.projectdescription && (
                                        <div className="form-error" style={{ color: "red" }}>{errors.projectdescription.message}.</div>
                                    )}


                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project Name</h5>
                                                    <p>Enter the project Name that best describes where your project is based.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Enter project name"
                                                            // onChange={(event) => setProjectName(event.target.value)}
                                                            name="projectname"
                                                            {...register("projectname", {
                                                                required: "Project Name  is required",

                                                            })}
                                                            onKeyUp={() => {
                                                                trigger("projectname");
                                                            }}
                                                        />



                                                    </div>
                                                    {errors.projectname && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.projectname.message}.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project Symbol</h5>
                                                    <p>Enter the symbol that best describes what your project is based.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>Symbol</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Enter project name"
                                                            // onChange={(event) => setProjectSymbol(event.target.value)}
                                                            name="projectsymbol"
                                                            {...register("projectsymbol", {
                                                                required: "project Symbol is required",

                                                            })}
                                                            onKeyUp={() => {
                                                                trigger("projectsymbol");
                                                            }}
                                                        />



                                                    </div>
                                                    {errors.projectsymbol && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.projectsymbol.message}.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project  supply</h5>
                                                    <p>Enter the suply</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>supply</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Enter supply amount"
                                                            // onChange={(event) => setSupply(event.target.value)}
                                                            name="projectsupply"
                                                            {...register("projectsupply", {
                                                                required: "Project supply is required",


                                                            })}
                                                            onKeyUp={() => {
                                                                trigger("projectsupply");
                                                            }}
                                                        />



                                                    </div>
                                                    {errors.projectsupply && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.projectsupply.message}.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project  Pledge Amount</h5>
                                                    <p>Enter the Pledge amount for the project.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">
                                                <div className="form-group">
                                                    <label>Pledge Amount</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Enter pledge amount"
                                                            // onChange={(event) => setPledgeAmount(event.target.value)}
                                                            name="pledgeamount"
                                                            {...register("pledgeamount", {
                                                                required: "Pledge Amount is required",


                                                            })}
                                                            onKeyUp={() => {
                                                                trigger("pledgeamount");
                                                            }}
                                                        />

                                                    </div>
                                                    {errors.pledgeamount && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.pledgeamount.message}.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-5 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project location</h5>
                                                    <p>Enter the location that best describes where your project is based.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg ctPjIpCdC">

                                                <div className="form-group">
                                                    <label>Location</label>
                                                                                                        
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Start Typing Your  Location"
                                                            // onChange={(event) => setLocation(event.target.value)}
                                                            name="location"
                                                            {...register("location", {
                                                                required: "Location is required",


                                                            })}
                                                            onKeyUp={() => {
                                                                trigger("location");
                                                            }}
                                                        />


                                                        <div className="input-group-append">
                                                            <button className="btn btnIc">
                                                                <img src={searchImg} alt="search" />
                                                            </button>
                                                        </div>
                                                    </div>


                                                    {/* <GooglePlacesAutocomplete
                                                        apiKey="AIzaSyCneXQewu90VNJTWxGkX8zJFKM_9iYud3E"
                                                         name ="location"
                                                        //onSelect={({ description }) => console.log()}
                                                        selectProps={{
                                                            styles: {
                                                                input: (provided) => ({
                                                                    ...provided,
                                                                    color: "blue",
                                                                }),
                                                                option: (provided) => ({
                                                                    ...provided,
                                                                    color: "blue",
                                                                }),
                                                                singleValue: (provided) => ({
                                                                    ...provided,
                                                                    color: "blue",
                                                                }),
                                                            },
                                                        }}
                                                    /> */}

                                                    {errors.location && (
                                                        <div className="form-error" style={{ color: "red" }}>{errors.location.message}.</div>
                                                    )}
                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-12 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project image</h5>
                                                    <p className="mb-0">Add an image that clearly represents your project. Choose one that looks good at different sizes—it’ll appear on your project page, across the House of Crypto website and mobile apps, and (when shared) on social channels.</p>
                                                    <p>Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg-12 ctPjIpCdC">
                                                <div className="ctPjAdIgs">
                                                    <div className="row ctPjAdIgsR">
                                                        <div className="col-sm-12 col-md-6 col-lg-3 ctPjAdIgsC">
                                                            <div className="form-group">
                                                                <label for="">image </label>
                                                                <div className="kVcTyIgIp v3">
                                                                    <div className="custom-file">
                                                                        <input type="file" className="custom-file-input" id="frSdDc9"
                                                                            name="projectimage"
                                                                            accept="image/*"
                                                                            // onChange={(e) => {
                                                                            //     setProjectImage(e.target.files[0]);
                                                                            //     setPreviewImage1(URL.createObjectURL(e.target.files[0]))
                                                                            // }}
                                                                            {...register("projectimage", {
                                                                                required: "Project Image is required",


                                                                            })}
                                                                            onChange={(e) => {
                                                                                setProjectImage(e.target.files[0]);
                                                                                setPreviewImage1(URL.createObjectURL(e.target.files[0]))
                                                                                trigger("projectimage");
                                                                            }} />
                                                                        {errors.projectimage && (
                                                                            <div className="form-error" style={{ color: "red" }}>{errors.projectimage.message}.</div>
                                                                        )}
                                                                        <label className="custom-file-label" for="frSdDc9">
                                                                            <div className="csFlIcTx">
                                                                                <img src={projectImage ? previewImage1 : demoImg} alt="demo-image" />
                                                                                <span>Drop Document here, or select a file.</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12 col-md-6 col-lg-3 ctPjAdIgsC">
                                                            <div className="form-group">
                                                                <label for="">Image</label>
                                                                <div className="kVcTyIgIp v3">
                                                                    <div className="custom-file">
                                                                        <input type="file" className="custom-file-input" id="frSdDc4"
                                                                            name="projectimage2"
                                                                            accept="image/*"
                                                                            // onChange={(e) => {
                                                                            //     setProjectImage2(e.target.files[0]);
                                                                            //     setPreviewImage2(URL.createObjectURL(e.target.files[0]))

                                                                            // }}
                                                                            {...register("projectimage2", {
                                                                                required: "Project Image is required",


                                                                            })}
                                                                            onChange={(e) => {
                                                                                setProjectImage2(e.target.files[0]);
                                                                                setPreviewImage2(URL.createObjectURL(e.target.files[0]))
                                                                                trigger("projectimage2");
                                                                            }} />
                                                                        {errors.projectimage2 && (
                                                                            <div className="form-error" style={{ color: "red" }}>{errors.projectimage2.message}.</div>
                                                                        )}
                                                                        <label className="custom-file-label" for="frSdDc4">
                                                                            <div className="csFlIcTx">
                                                                                <img src={projectImage2 ? previewImage2 : demoImg} alt="demo-image" />
                                                                                <span>Drop Document here, or select a file.</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12 col-md-6 col-lg-3 ctPjAdIgsC">
                                                            <div className="form-group">
                                                                <label for="">Image</label>
                                                                <div className="kVcTyIgIp v3">
                                                                    <div className="custom-file">
                                                                        <input type="file" className="custom-file-input" id="frSdDc5"
                                                                            name="projectimage3"
                                                                            accept="image/*"
                                                                            // onChange={(e) => {
                                                                            //     // setProjectImage3(e.target.files[0]);
                                                                            //     // setPreviewImage3(URL.createObjectURL(e.target.files[0]))

                                                                            // }}
                                                                            {...register("projectimage3", {
                                                                                required: "Project Image is required",


                                                                            })}
                                                                            onChange={(e) => {
                                                                                setProjectImage3(e.target.files[0]);
                                                                                setPreviewImage3(URL.createObjectURL(e.target.files[0]))
                                                                                trigger("projectimage3");
                                                                            }} />
                                                                        {errors.projectimage3 && (
                                                                            <div className="form-error" style={{ color: "red" }}>{errors.projectimage3.message}.</div>
                                                                        )}
                                                                        <label className="custom-file-label" for="frSdDc5">
                                                                            <div className="csFlIcTx">
                                                                                <img src={projectImage3 ? previewImage3 : demoImg} alt="demo-image" />
                                                                                <span>Drop Document here, or select a file.</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-12 col-md-6 col-lg-3 ctPjAdIgsC">
                                                            <div className="form-group">
                                                                <label for="">Image</label>
                                                                <div className="kVcTyIgIp v3">
                                                                    <div className="custom-file">
                                                                        <input type="file" className="custom-file-input" id="frSdDc6"
                                                                            name="projectimage4"
                                                                            accept="image/*"
                                                                            // onChange={(e) => {
                                                                            //     setProjectImage4(e.target.files[0]);
                                                                            //     setPreviewImage4(URL.createObjectURL(e.target.files[0]))

                                                                            // }}
                                                                            {...register("projectimage4", {
                                                                                required: "Project Image is required",


                                                                            })}
                                                                            onChange={(e) => {
                                                                                setProjectImage4(e.target.files[0]);
                                                                                setPreviewImage4(URL.createObjectURL(e.target.files[0]))
                                                                                trigger("projectimage4");
                                                                            }} />
                                                                        {errors.projectimage4 && (
                                                                            <div className="form-error" style={{ color: "red" }}>{errors.projectimage4.message}.</div>
                                                                        )}
                                                                        <label className="custom-file-label" for="frSdDc6">
                                                                            <div className="csFlIcTx">
                                                                                <img src={projectImage4 ? previewImage4 : demoImg} alt="demo-image" />
                                                                                <span>Drop Document here, or select a file.</span>
                                                                            </div>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="ctPjAdIgsRq">
                                                        It must be a JPG, PNG, GIF, TIFF, or BMP, no larger than 200 MB. You Can Modifiy project
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="ctPjIpCd">
                                        <div className="row ctPjIpCdR">
                                            <div className="col-sm-12 col-md-12 col-lg-12 ctPjIpCdC">
                                                <div className="ctPjIpCdTx">
                                                    <h5>Project video (optional)</h5>
                                                    <p className="mb-0">Add a video that describes your project. Tell people what you’re raising funds to do, how you plan to make it happen, who you are, and why you care about this project.</p>
                                                    <p>After you’ve uploaded your video, use our editor to add captions and subtitles so your project is more accessible to everyone.</p>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12 col-lg-12 ctPjIpCdC">
                                                <div className="kVcTyIgIp v4">
                                                    <div className="custom-file">
                                                        <input type="file" className="custom-file-input" id="frSdDc8"
                                                            name="projectvideo"
                                                            accept="video/mp4,video/x-m4v,video/*"
                                                            // onChange={(e) => {
                                                            //     setProjectVideo(e.target.files[0]);
                                                            //     setPreviewVideo(URL.createObjectURL(e.target.files[0]))
                                                            // }}
                                                            {...register("projectvideo", {
                                                                required: "Project Video is required",


                                                            })}
                                                            onChange={(e) => {
                                                                setProjectVideo(e.target.files[0]);
                                                                setPreviewVideo(URL.createObjectURL(e.target.files[0]))
                                                                trigger("projectvideo");
                                                            }} />
                                                        {errors.projectvideo && (
                                                            <div className="form-error" style={{ color: "red" }}>{errors.projectvideo.message}.</div>
                                                        )}
                                                        <label className="custom-file-label" for="frSdDc8">
                                                            <div className="csFlIcTx">
                                                                {previewVideo ? <video src={previewVideo} width="200px" height="100px" alt="demo-video" /> : <img src={demovidImg} alt="demo-video" />}

                                                                <p>Drop a video here, or select a file. </p>
                                                                <p>It must be a MOV, MPEG, AVI, MP4, 3GP, WMV, or FLV, no larger than 5120 MB.</p>
                                                                <p>You Can Modifiy project</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="ctPjIpSbm">
                                        <button className="btn btnGr btn-19044" >
                                            Create a Project
                                        </button>

                                        {/* <button className="btn btnGr2 btn-19044">
                    Reset
                </button> */}
                                    </div>

                                </div>
                            </form>
                        </>

                    </Wizard>
                </div>
            </div>


            <Footer />
        </Fragment>
    );

}

export default Createproject;