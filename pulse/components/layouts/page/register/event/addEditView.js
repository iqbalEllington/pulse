import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

import { deleteRequest, getRequest, postRequest, putRequestAPI, postRequestAPI, getRequestAPI } from "helper/api";
import { API_URLS } from "helper/apiConstant";
// import VenueFacility from "components/venueFacility";
import "react-intl-tel-input/dist/main.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "components/general/backButton";
import { FaSave, FaCheck } from "react-icons/fa"
import IntlTelInput from "react-intl-tel-input";
import Link from "next/link";
import moment from "moment";
import { AiOutlinePrinter } from "react-icons/ai";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { HiPlus } from "react-icons/hi"
import RegistraionPayment from "./registrationPayment";
import { AiOutlineCopy } from "react-icons/ai"
import RegistraionItems from "./registrationItems";
import { validateRegistrationItems } from "store/actions/registration/registrationAction";
import { covertToCurrency } from "/services/utilsService";
import Attendance from "./attendance";

const addEditView = (props) => {
  
  const router = useRouter();
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 43,
      border: '1px solid black !important',
      '&:hover': {
        border: '1px solid black !important',
        // boxShadow: '0px 0px 6px black',
      },
      '&:focus': {
        border: '1px solid black',
        // boxShadow: '0px 0px 6px black',
      },

    }),
    indicator: (provided) => ({
      ...provided,
      color: 'black', // Customize the color of the indicator separator
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: 'black', // Customize the color of the indicator separator
    }),
  };
  const [fromdb, setFromdb] = useState(false);
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationType, setRegistrationType] = useState([])
  const [feeStructure, setFeeStructure] = useState([])
  const [speciality, setSpeciality] = useState([])
  const [feeAmount, setFeeAmount] = useState(false)
  const [paymentData, setPaymentData] = useState({})
  const [certificateLoading, setCertificateLoading] = useState(false)
  const [isValidate,setIsvalidete]=useState(false)
  useEffect(() => {
    getCourseData();
    getRelatedDatas();
    if (props.action == 'edit') {
      loadRegistrationData()
    }
    const { from } = router.query;
    if(from !=undefined){
      setIsvalidete(true)
    }
  }, []);
  const [balanceAmount, setBalanceAmount] = useState(false);
  
  const [registrationData, setRegistrationData] = useState({});
  const [updateTriggered, setUpdateTriggered] = useState(false);
  const [formValidated, setFormValidated] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    mobileCountry: "",
    mobileCountryName: "",
    landlineCountry: "",
    landlineCountryName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    NameToAppearOnTheCertificate: "",
    Gender: "",
    landline: "",
    speciality: "",
    workPlace: "",
    workCity: "",
    Nationality: "",
    ResidenceCountry: "",
    DateofBirth: "",
    event: "",
    seatConformation: "",
    HowDidYouKnowThisCourse: "",
    Notes: "",
    NationalitySelected: "",
    course: "",
    registrationEmailSend: "",
    conformationEmailSend: "",
    holdEmailSend: "",
    cancelledEmailSend: "",
    RegisteredFeeOption: "",
    RegisteredFeeOptionSub: "",
    RegisteredTotalFee: "",
    discountApplied: "",
    registrationType: "",
    isFullyPaid: false,
    referenceNumber: "",
    createdAt: ""
  })
  const [SeatConformationNotFound,setSeatConformationNotFound]= useState(false);
  const [seatConformationLoading, setSeatConformationLoading] =useState(false);
  const [eroorField, setInputError] = useState({
    firstName: false,
    Email: false,
    Mobile: false,
    Location: false,
    date: false,
    time: false,
    propertyType: false,
    mobileCountry: false,
    mobileCountryName: false,
  })

  const [countries, setCountries] = useState(
    [
      { value: 'Social Media', label: 'Social Media' }
    ]
  )
  async function downloadCertificate() {
    try {
      setCertificateLoading(true)
      const response = await postRequestAPI({ API: API_URLS.GET_CERTIFICATE + "/" + props.event + "/"+ props.id });
      if (response?.status === 200) {
        setCertificateLoading(false)
        window.open(process.env.NEXT_PUBLIC_API_URL + response.data.data, '_blank');
      }

    } catch (error) {
      console.log(error)
    }
  }
  async function downloadSeatConformation() {
    try {
      setSeatConformationLoading(true);
      const response = await getRequestAPI({ API: API_URLS.SEAT_CONFORMATION + "/" + props.event + "/"+ props.id });
      console.log(response?.status,response.data?.file,response.data?.file, "response?.statusresponse?.statusresponse?.status")
      if (response?.status === 200 && response.data?.file!=undefined) {
        setCertificateLoading(false)
        window.open(process.env.NEXT_PUBLIC_API_URL + response.data?.file, '_blank');
        setSeatConformationLoading(false);
        setSeatConformationNotFound(false)

      }else{
        setSeatConformationNotFound(true)
        setSeatConformationLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // const countries = require('/helper/countries.json')
  async function getRelatedDatas() {
    // get lead source 
    // //////// To be done
    // Get Countries
    const response = await getRequest({ API: API_URLS.GET_COUNTRIES + "?pagination[pageSize]=1000" });
    if (response?.status === 200) {
      var countries = []
      // var feeAmounts = {}
      await response?.data?.data.map((key, val) => {
        countries.push({ value: key.id, label: key.attributes.name })
      })
      setCountries(countries)

    } else if (response?.status === 401) {
      toast.error("Unauthorize access please re-login.");
    } else {
      toast.error(response?.data?.error || "Some thing went wrong.");
    }
    const responseSp = await getRequest({ API: API_URLS.GET_SPECIALITY + "?pagination[pageSize]=100" });
    if (responseSp?.status === 200) {
      // var feeAmounts = {}

      var specialities = []
      await responseSp?.data?.data.map((key, val) => {
        specialities.push({ value: key.id, label: key.attributes.SpecialityName })
      })
      setSpeciality(specialities)
    }
  }
  async function getCourseData() {
    const response = await getRequest({ API: API_URLS.GET_EVENTS + '/' + props.event });
    if (response?.status === 200) {
      setEvent(response?.data?.data);
      const responseFee = await getRequest({ API: API_URLS.GET_COURSE_FEE + "?filters[events][id][$in]=" + props.event + "&populate[]=events&populate[]=course_fees&filters[isEarlyBird][$eq]=false" });
      var feecat = []
      var feeAmounts = {}
      var feestructues = {}
      if (responseFee?.status == 200) {
        var data = responseFee.data;
        await data.data.map(async (value, key) => {
          feecat.push({ value: value["attributes"]["category"], label: value["attributes"]["category"] });
          feeAmounts[value["attributes"]["category"]] = value["attributes"]["fee"];
          feestructues[value["attributes"]["category"]] = [];
          await value["attributes"]?.["course_fees"]?.['data'].map((value2, key2) => {
            feestructues[value["attributes"]["category"]].push({ value: value2["id"], label: value2["attributes"]["category"] });
          })
        })
      }
      setRegistrationType(feecat)
      setFeeStructure(feestructues)
      setFeeAmount(feeAmounts)

      setFormData((prevState) => ({
        ...prevState,
        ['event']: props.event,
      }));
      setIsLoading(false)
    } else if (response?.status === 401) {
      alert("Unauthorize access please re-login.");
    } else {
      alert(response?.data?.error || "Some thing went wrong.");
    }
  }

  async function updateCountry(data) {
    const response = await getRequest({ API: API_URLS.GET_COUNTRIES + '?filters[name][$containsi]=' + data });
    if (response?.status === 200) {
      var countries = []
      // var feeAmounts = {}
      await response?.data?.data.map((key, val) => {
        countries.push({ value: key.id, label: key.attributes.name })
      })
      // setCountries(countries)
      return countries
    } else if (response?.status === 401) {
      alert("Unauthorize access please re-login.");
    } else {
      alert(response?.data?.error || "Some thing went wrong.");
    }
  }
  const setdefaulttotal = (() => {
    var total = registrationType.filter(function (types) {
      return types.value == formData.RegisteredFeeOption;
    })
    handlespecialfield("RegisteredTotalFee", total[Object.keys(total)[0]]?.totalFee)
  })
  const handlespecialfield = ((key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  })
  const handlespecialfielddate = ((key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: moment(value).format('YYYY-MM-DD'),
    }));
  })


  useEffect(() => {
    setdefaulttotal()
  }, [formData.RegisteredFeeOption]);


  const title = [
    { value: 'Dr', label: 'Dr' },
    { value: 'Prof', label: 'Prof' },
    { value: 'Mr', label: 'Mr' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Miss', label: 'Miss' },
    { value: 'Master', label: 'Master' },
  ]
  const gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ]
  const howdidyouknow = [
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Google', label: 'Google' },
    { value: 'Friends', label: 'Friends' },
    { value: 'Email', label: 'Email' },
    { value: 'Website', label: 'Website' },
    { value: 'Other', label: 'Other' }
  ]

  const [paymentSummery, setPaymentSummery] = useState({
    totalPaid: 0
  })
  const [paymenthistory, setPaymenthistory] = useState([])
  async function validateForm() {
    var validate = true;
    if (formData.email == "") {
      setInputError((prevState) => ({
        ...prevState,
        ['Email']: true,
      }));
      validate = false;
    } else {
      setInputError((prevState) => ({
        ...prevState,
        ['Email']: false,
      }));
    }
    if (formData.mobile == "") {
      setInputError((prevState) => ({
        ...prevState,
        ['Mobile']: true,
      }));
      validate = false;
    } else {
      setInputError((prevState) => ({
        ...prevState,
        ['Mobile']: false,
      }));
    }
    if (formData.firstName == "") {
      setInputError((prevState) => ({
        ...prevState,
        ['firstName']: true,
      }));
      validate = false;
    } else {
      setInputError((prevState) => ({
        ...prevState,
        ['firstName']: false,
      }));
    }
    return await validate;
  }
  const register = (async (e) => {
    try {
      if (e != undefined) {
        e.preventDefault();
      }
      setUpdateTriggered(true)
      var validate = await validateForm();
      if (!validate) {
        var oldUrl = window.location.href.replace("#basic", "").replace("#details", "")
        router.push(oldUrl + "#basic")
        toast("Kindly complete all mandatory fields");
        return
      }
      if (registrationData.RegisteredFeeOption == "" || registrationData.RegisteredFeeOption == false || registrationData.RegisteredFeeOption == null) {
        toast("Kindly complete all mandatory fields");
        var oldUrl = window.location.href.replace("#details", "").replace("#basic", "")
        router.push(oldUrl + "#details")
        return
      }
      var validate = true;
      var result = await registrationData.workShops?.map((val, key) => {
        if (val.Workshop == "" || val.Workshop == null || val.RegisteredFeeOption == "" || val.RegisteredFeeOption == null) {
          validate = false;
        }
      })
      await result;
      if (validate == false) {
        toast("Please select a valid registration details");
        return
      }

      setIsLoading(false)

      if (isLoading == false) {
        setIsLoading(true)
        var data = formData;
        data["registrationData"] = registrationData;
        setFormData((prevState) => ({
          ...prevState,
          ['event']: props.event,
        }));
        var registrationService = await postRequestAPI({ API: '/registration/' + props.event + '/register', DATA: formData });

        if (registrationService.status == 200 && registrationService?.data?.status == 200) {
          toast("Registration Successfull");
          setIsLoading(false)
          router.push("/registration/events/" + props.event + "/edit/" + registrationService?.data?.data?.data?.id)
        } else {
          setIsLoading(false)
          if (registrationService.status == 409) {
            toast("This email has already been registered for this course");
            setInputError((prevState) => ({
              ...prevState,
              ['Email']: true,
            }));
          }
          else if (registrationService.status == 200){
            if(registrationService?.data?.data?.[0]?.field=="mobile"){
              toast(registrationService?.data?.data[0].error);
              setInputError((prevState) => ({
                ...prevState,
                ['Mobile']: true,
              }));
            }else{
              toast("Registration is not successfull please try again");
            }
            
          }
          else {

          toast(registrationService.status);
            toast("Registration is not successfull please try again");
          }
        }
      }
    } catch (err) {
      setIsLoading(false)
      toast(err);
      console.log(err)
    }
  })
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handlesupdate = (async (e) => {
    try {
      if (e != undefined) {
        e.preventDefault();
      }
      setIsLoading(true);
      setUpdateTriggered(true)
      if (registrationData.RegisteredFeeOption == "" || registrationData.RegisteredFeeOption == false || registrationData.RegisteredFeeOption == null) {
        setIsLoading(false);
        return
      }
      var validate = true;
      var result = await registrationData.workShops?.map((val, key) => {
        if (val.Workshop == "" || val.Workshop == null || val.RegisteredFeeOption == "" || val.RegisteredFeeOption == null) {
          validate = false;
        }
      })
      await result;
      if (validate == false) {
        setIsLoading(false);
        return
      }

      // e.preventDefault();  
      setIsLoading(false)
      if (isLoading == false) {
        setIsLoading(true)
        var data = formData;
        data["registrationData"] = registrationData;
        var registrationService = await putRequestAPI({ API: '/registration/' + props.event + '/register/' + props.id, DATA: formData });
        setFromdb(false)
        if (registrationService.status == 200 && registrationService?.data?.status == 200) {
          setFromdb(true)
          setUpdateTriggered(false)
          setIsLoading(false)
          toast("Update Successfull");
        } else {
          setIsLoading(false)
          toast(registrationService?.data?.status);
        }
      }
    } catch (err) {
      setIsLoading(false)
      console.log(err)
    }
  })

  const onChangeInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.value }));
    if (name == "RegisteredFeeOption") {

    }
  };
  async function loadRegistrationData() {
    setIsLoading(true)
    const response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + "/" + props.id + '?populate=*' });

    if (response?.status === 200) {
      setFormData((prevState) => ({
        ...prevState,
        ['title']: (response.data?.data?.attributes?.title ? response.data?.data?.attributes?.title : ""),
        ['firstName']: (response.data?.data?.attributes?.firstName ? response.data?.data?.attributes?.firstName : ""),
        ['mobileCountry']: (response.data?.data?.attributes?.mobileCountry ? response.data?.data?.attributes?.mobileCountry : ""),
        ['mobileCountryName']: (response.data?.data?.attributes?.mobileCountryName ? response.data?.data?.attributes?.mobileCountryName : ""),
        ['landlineCountry']: (response.data?.data?.attributes?.landlineCountry ? response.data?.data?.attributes?.landlineCountry : ""),
        ['landlineCountryName']: (response.data?.data?.attributes?.landlineCountryName ? response.data?.data?.attributes?.landlineCountryName : ""),
        ['middleName']: response.data?.data?.attributes?.middleName ? response.data?.data?.attributes?.middleName : "",
        ['lastName']: response.data?.data?.attributes?.lastName ? response.data?.data?.attributes?.lastName : "",
        ['email']: response.data?.data?.attributes?.email ? response.data?.data?.attributes?.email : "",
        ['mobile']: response.data?.data?.attributes?.mobile ? response.data?.data?.attributes?.mobile : "",
        ['NameToAppearOnTheCertificate']: response.data?.data?.attributes?.NameToAppearOnTheCertificate ? response.data?.data?.attributes?.NameToAppearOnTheCertificate : "",
        ['Gender']: response.data?.data?.attributes?.Gender ? response.data?.data?.attributes?.Gender : "",
        ['landline']: response.data?.data?.attributes?.landline ? response.data?.data?.attributes?.landline : "",
        ['speciality']: response.data?.data?.attributes?.speciality?.data?.id ? response.data?.data?.attributes?.speciality?.data?.id : "",
        ['workPlace']: response.data?.data?.attributes?.workPlace ? response.data?.data?.attributes?.workPlace : "",
        ['workCity']: response.data?.data?.attributes?.workCity ? response.data?.data?.attributes?.workCity : "",
        ['NationalitySelected']: response.data?.data?.attributes?.Nationality?.data?.attributes?.name ? response.data?.data?.attributes?.Nationality?.data?.attributes?.name : "",
        ['Nationality']: response.data?.data?.attributes?.Nationality?.data?.id ? response.data?.data?.attributes?.Nationality?.data?.id : "",
        ['ResidenceCountry']: response.data?.data?.attributes?.ResidenceCountry?.data?.id ? response.data?.data?.attributes?.ResidenceCountry?.data?.id : "",
        ['DateofBirth']: response.data?.data?.attributes?.DateofBirth ? response.data?.data?.attributes?.DateofBirth : "",
        ['event']: response.data?.data?.attributes?.event?.data?.id ? response.data?.data?.attributes?.event?.data.id : "",
        ['seatConformation']: response.data?.data?.attributes?.seatConformation ? response.data?.data?.attributes?.seatConformation : "",
        ['HowDidYouKnowThisCourse']: response.data?.data?.attributes?.HowDidYouKnowThisCourse ? response.data?.data?.attributes?.HowDidYouKnowThisCourse : "",
        ['RegistrationMailSend']: response.data?.data?.attributes?.RegistrationMailSend ? response.data?.data?.attributes?.RegistrationMailSend : "",
        ['Notes']: response.data?.data?.attributes?.Notes ? response.data?.data?.attributes?.Notes : "",
        ['RegisteredFeeOption']: response.data?.data?.attributes?.RegisteredFeeOption ? response.data?.data?.attributes?.RegisteredFeeOption : "",
        ['RegisteredTotalFee']: response.data?.data?.attributes?.RegisteredTotalFee ? response.data?.data?.attributes?.RegisteredTotalFee : "",
        ['createdAt']: response.data?.data?.attributes.createdAt,
        ['status']: response.data?.data?.attributes?.regsitration_items?.data?.[0]?.attributes?.status,
        ['referenceNumber']: response.data?.data?.attributes?.referenceNumber ? response.data?.data?.attributes?.referenceNumber : "",
        ['isFullyPaid']: response.data?.data?.attributes?.isFullyPaid ? response.data?.data?.attributes?.isFullyPaid : "",
        ['registrationEmailSend']: response.data?.data?.attributes?.registrationEmailSend ? response.data?.data?.attributes?.registrationEmailSend : "",
        ['conformationEmailSend']: response.data?.data?.attributes?.conformationEmailSend ? response.data?.data?.attributes?.conformationEmailSend : "",
        ['holdEmailSend']: response.data?.data?.attributes?.holdEmailSend ? response.data?.data?.attributes?.holdEmailSend : "",
        ['cancelledEmailSend']: response.data?.data?.attributes?.cancelledEmailSend ? response.data?.data?.attributes?.cancelledEmailSend : "",
      }))
      setIsLoading(false)
      var history = []
      var totalPaid = 0;
      response.data?.data?.attributes?.payments.data.map((key, value) => {
        history.push(key.attributes)
        totalPaid += key.attributes.amountPaid
      })
      setPaymentSummery({
        totalPaid: totalPaid
      })
      setPaymenthistory(history)
      // setPaymenthistory
    } else if (response?.status === 401) {
      setIsLoading(true)
      alert("Unauthorize access please re-login.");
    } else {
      setIsLoading(true)
      alert(response?.data?.error || "Some thing went wrong.");
    }
  }
  return (

    <>
      <div className={props.action == "edit" ? "content-inner bg-white form-add-event openCheckList p-0 d-flex" : "content-inner form-add-event openCheckList p-0 d-flex"}>
        {/* <BackButton /> */}
        <div className={props.action != "edit" ? "col-12" : "col-7"}>
          <div className="page-header row b-bottom">
            <div className="p-4 d-flex">
              <div className="col-7 px-4">
                <h4 className="page-title p-0 m-0">
                  {props.action} Delegates
                </h4>
                <span>
                  Event: {event.attributes?.title}
                </span>
              </div>
              <div className="col-5 create-button text-right px-4">
                {/* <Link legacyBehavior href={"add"}> */}
                {(props.action == "edit") ?
                  <button onClick={() => handlesupdate()} className="success">
                    <FaCheck /> {!isLoading ? "Update" : "Updating..."}
                  </button>
                  :
                  <>
                    {(props.action == "register") &&
                      <button onClick={() => register()} className="success">
                        <FaCheck /> {!isLoading ? "Register" : "Registering..."}
                      </button>
                    }
                  </>
                }
              </div>
            </div>
          </div>

          {(props.action == "register" || props.action == "edit") &&
            <>
              <div className="container-fluid mx-auto px-4">
                <form className={props.action == "edit" ? "event-form" : "event-form card bg-white card-body px-4 container-fluid mx-auto"} >

                  <div className="col-12 px-4">
                    <h3
                      className="form-label mt-4"
                      for="exampleFormControlSelect1"
                    >
                      Basic Detail
                    </h3>
                  </div>
                  <div className="p-2 px-4" id="basic">

                    <div>
                      <div className="forms mt-3">
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Title
                              </label>
                              <Select
                                styles={customStyles}
                                className="no-padding-input z-index01"
                                value={title.filter(function (types) {
                                  return types.value == formData.title;
                                })}
                                onChange={(value) => onChangeInput('title', value)}
                                options={title}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 p-0">
                            <div className={eroorField.firstName == true ? "eroorField form-group" : "form-group"}>
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Name*
                              </label>
                              <input
                                placeholder="First Name"
                                type="text"
                                value={formData.firstName}
                                defaultValue={formData.firstName}
                                onChange={(value) => onChangeInput('firstName', value.target)}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                &nbsp;
                                {/* Middle Name */}
                              </label>
                              <input
                                placeholder="Middle Name"
                                type="text"
                                value={formData.middleName}
                                defaultValue={formData.middleName}
                                onChange={(value) => onChangeInput('middleName', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-3 p-0">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                &nbsp;
                                {/* Last name */}
                              </label>
                              <input
                                placeholder="Last Name"
                                type="text"
                                value={formData.lastName}
                                defaultValue={formData.lastName}
                                onChange={(value) => onChangeInput('lastName', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>



                          <div className="col-md-12 pe-0">
                            <div className={eroorField.Email == true ? "eroorField form-group" : "form-group"}>
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Email*
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="Email"
                                value={formData.email}
                                defaultValue={formData.email}
                                onChange={(value) => onChangeInput('email', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 pe-0">
                            <div className={eroorField.Mobile == true ? "eroorField form-group" : "form-group"} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                              <label class="form-label"> Mobile* </label>
                              <IntlTelInput
                                autoHideDialCode="false"
                                onPhoneNumberChange={(b, n, c, number) => {
                                  handlespecialfield("mobileCountry", c.dialCode);
                                  handlespecialfield("mobileCountryName", c.iso2);
                                  handlespecialfield("mobile", n);
                                }}
                                value={formData.mobile}
                                onSelectFlag={(number, n) => {
                                  handlespecialfield("mobileCountry", n.dialCode);
                                  handlespecialfield("mobileCountryName", n.iso2);
                                }}
                                defaultCountry={"ae"}
                                preferredCountries={['ae', 'gb', 'us']}
                                containerclassName="intl-tel-input"
                                inputclassName="form-control col-12"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 pe-0">
                            <div className={eroorField.landline == true ? "eroorField form-group" : "form-group"} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                              <label class="form-label"> Landline </label>
                              <IntlTelInput
                                autoHideDialCode="false"
                                onPhoneNumberChange={(b, n, c, number) => {
                                  handlespecialfield("landlineCountry", c.dialCode);
                                  handlespecialfield("landlineCountryName", c.iso2);
                                  handlespecialfield("landline", n);
                                }}
                                value={formData.landline}
                                onSelectFlag={(number, n) => {
                                  handlespecialfield("landlineCountry", n.dialCode);
                                  handlespecialfield("landlineCountryName", n.iso2);
                                }}
                                defaultCountry={"ae"}
                                preferredCountries={['ae', 'gb', 'us']}
                                containerclassName="intl-tel-input"
                                inputclassName="form-control col-12"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 bg-gray rounded mt-4 ">
                            <div className="form-group">
                              <h5
                                className="form-label mt-4 pb-2"
                                for="exampleFormControlSelect1"
                              >
                                Name to Appear on The Certificate
                              </h5>
                              <input
                                placeholder="Name to Appear on The Certificate"
                                type="text"
                                required
                                value={formData.NameToAppearOnTheCertificate}
                                defaultValue={formData.NameToAppearOnTheCertificate}
                                onChange={(value) => onChangeInput('NameToAppearOnTheCertificate', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-12 b-bottom">&nbsp;</div>
                          <div className="col-12">
                            <h3
                              className="form-label mt-4"
                              for="exampleFormControlSelect1"
                            >
                              Personal Detail
                            </h3>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Gender
                              </label>
                              <Select
                                styles={customStyles}
                                className="no-padding-input z-index"
                                value={gender.filter(function (types) {
                                  return types.value == formData.Gender;
                                })}
                                onChange={(value) => onChangeInput('Gender', value)}
                                options={gender}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Date of birth
                              </label>
                              <DatePicker
                                className="white_input"
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                adjustDateOnChange
                                inputmode='none'
                                dateFormat="yyyy-MM-dd"
                                minDate={new Date("01-01-1900")}
                                maxDate={new Date("01-01-2015")}
                                onChange={(value) => handlespecialfielddate('DateofBirth', value)}
                                value={formData.DateofBirth}
                                placeholderText={'Date of Birth'}
                              // selected={state.selectedDate}
                              >
                              </DatePicker>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Nationality
                              </label>
                              <AsyncSelect
                                styles={customStyles}
                                cacheOptions
                                className="no-padding-input"
                                // defaultInputValue={formData.NationalitySelected}
                                loadOptions={updateCountry}
                                onChange={(value) => { onChangeInput('Nationality', value) }}
                                defaultOptions={countries}
                                value={countries.filter(function (types) {
                                  return types.value == formData.Nationality;
                                })}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Work Place
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="Work Place"
                                value={formData.workPlace}
                                defaultValue={formData.workPlace}
                                onChange={(value) => onChangeInput('workPlace', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mt-3">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="City"
                                value={formData.workCity}
                                defaultValue={formData.workCity}
                                onChange={(value) => onChangeInput('workCity', value.target)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mt-3">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Residence Country
                              </label>
                              <Select
                                styles={customStyles}
                                className="no-padding-input"
                                value={countries.filter(function (types) {
                                  return types.value == formData.ResidenceCountry;
                                })}
                                onChange={(value) => onChangeInput('ResidenceCountry', value)}
                                options={countries}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Speciality
                              </label>
                              <Select
                                styles={customStyles}
                                className="no-padding-input"
                                value={speciality.filter(function (types) {
                                  return types.value == formData.speciality;
                                })}
                                onChange={(value) => onChangeInput('speciality', value)}
                                options={speciality}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                How did you know about the course
                              </label>
                              <Select
                                styles={customStyles}
                                className="no-padding-input"
                                value={howdidyouknow.filter(function (types) {
                                  return types.value == formData.HowDidYouKnowThisCourse;
                                })}
                                onChange={(value) => onChangeInput('HowDidYouKnowThisCourse', value)}
                                options={howdidyouknow}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            Selected Nationality : {formData.NationalitySelected}
                          </div>

                          <div className="row course-fee border-1 m-0 p-0" id="details">
                            <h3
                              className="form-label mt-5"
                              for="exampleFormControlSelect1"
                            >
                              Registration Details
                            </h3>
                            <RegistraionItems fromDb={fromdb} setFromdb={() => setFromdb()} updateTriggered={updateTriggered} setUpdateTriggered={setUpdateTriggered} setFormValidated={setFormValidated} setRegistrationData={setRegistrationData} event={props.event} id={props.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {props.action == "edit" &&
                    <div className="card mt-5 p-5">
                      <div className="col-12">

                        <RegistraionPayment setBalanceAmount={setBalanceAmount} keys={"base"} setPaymentData={setPaymentData} event={props.event} registrationid={props.action == "edit" ? props.id : "add"} />

                      </div>

                      {registrationData.workShops?.map((value, key) => {
                        return <>
                          <div className="col-12 mt-5">
                            <RegistraionPayment setBalanceAmount={setBalanceAmount} keys={key} setPaymentData={setPaymentData} event={value.Workshop} registrationid={value.registrationLink} />
                          </div>
                        </>
                      })}
                    </div>
                  }
                </form>
              </div>
            </>
          }
        </div>
        {props.action == "edit" &&
          <div className="col-5 bg-gray showsummery">
            <div>
              <div>
                <ul className="list-unstyled summery-registration">
                  <li className="col-12">
                    <div className="row">
                      <div className="col-6">
                        <div className="printbadge-widget">
                          <h5>
                            Registration Number
                          </h5>
                          <p>
                            {props.id != false ?
                              <>
                                {event?.attributes?.referenceId}{props.id}
                              </> :
                              <>
                                #New Registration
                              </>
                            }
                          </p>
                        </div>
                      </div>
                      <div className="col-6 p-0">
                        <div className="printbadge-widget">
                          <h5>
                            Registration Date
                          </h5>
                          <p className="mb-0">
                            {moment(formData.createdAt).format('DD MMM YYYY')}
                          </p>
                          <h6 className="m-0">
                            source :{formData.HowDidYouKnowThisCourse}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="col-12">
                    <div className="paymentStatus-widget">
                      <div className="course-pay mb-4">
                        <div className={(paymentData?.base?.totalAmountPaid >= paymentData?.base?.totalAmount && balanceAmount == false) ? "main-body bg-green" : (paymentData?.base?.totalAmountPaid > 0) ? "main-body bg-orange" : "main-body bg-black"}>
                          <h5>Delegate  Payment <br />
                            Status</h5>
                          <h4>{Math.ceil(paymentData?.base?.totalAmountPaid * 100 / paymentData?.base?.totalAmount)}% Paid</h4>

                          {paymentData?.base?.totalAmountPaid >= paymentData?.base?.totalAmount ?
                            <p>
                              The complete payment has been
                              received. Review the payment section for further details
                            </p> : <p>The full payment has not been received. Please refer to the payment section for additional information </p>}
                        </div>
                        <div>
                          <div className="col-12  mb-4">
                            <div className={formData.status + " printbadge-widget"}>
                              <h5>
                                Registration Status
                              </h5>
                              <p>
                                {formData.status}
                              </p>
                            </div>
                          </div>
                          <div className="footer-body">
                            <div className="col-12 d-flex">
                              <div className="col-6 d-flex">
                                <span className="circle-green me-2">&nbsp;</span>
                                <div> {covertToCurrency("AED", "AED", paymentData?.base?.totalAmountPaid)}</div>
                              </div>
                              <div className="col-6 d-flex justify-content-end text-right p-0">
                                <div className="me-2">{covertToCurrency("AED", "AED", paymentData?.base?.balance)}</div>
                                <span className="circle-red ">&nbsp;</span>
                              </div>
                            </div>
                            <p className="pt-3">
                              For additional details regarding payment, please navigate to the payment section.
                            </p>
                          </div>
                        </div>
                      </div>
                      {Object.keys(paymentData).length > 1 &&
                        <div className="col-12">
                          <div><h5 className="title-blacked">Workshops<span className="count">{Object.keys(paymentData).length}</span></h5>
                            {Object.keys(paymentData).length > 1 &&
                              <ul className="workshop-payment">
                                {/* <li className="heading"><span>Course</span><span>Balance</span></li> */}
                                {Object.keys(paymentData).map((balancePay, key) => {
                                  return <>
                                    {balancePay != "base" &&
                                      <li className="col-12">
                                        <div className="row">
                                          <span className="num">{parseInt(key) + 1}</span>

                                          <span className="col-12 title">{paymentData[balancePay].workshop}</span>
                                          <span className="summery">
                                            <span className="balance">
                                              Balance
                                              <span>
                                                {covertToCurrency("AED", "AED", paymentData[balancePay].balance)}
                                              </span>
                                            </span>
                                            <span className="paid">
                                              Paid
                                              <span>
                                                {covertToCurrency("AED", "AED", JSON.stringify(paymentData[balancePay].totalAmountPaid))}
                                              </span>
                                            </span>
                                          </span>
                                        </div>
                                      </li>
                                    } </>
                                })}
                              </ul>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </li>
                  <li className="col-12">
                    <div className="printbadge-widget">
                      <div className="course-pay">
                        <div className="main-body">
                          <h5 className="title-blacked">Conversation Status</h5>
                        </div>
                        <div className="main-content">
                          <table className="col-12">
                            <tr>
                              <th>
                                Status
                              </th>
                              <th>
                                Email
                              </th>
                              <th>
                                SMS
                              </th>
                              <th>
                                Whatsapp
                              </th>
                            </tr>
                            <tr>
                              <td>
                                Registration
                              </td>
                              <td>
                                {formData.registrationEmailSend ?
                                  <span class="badge bg-success">Send</span>
                                  :
                                  <span class="badge rounded-pill bg-dark">Not Send</span>
                                }
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Conformation
                              </td>
                              <td>
                                {formData.conformationEmailSend ?
                                  <span class="badge bg-success">Send</span>
                                  :
                                  <span class="badge rounded-pill bg-dark">Not Send</span>
                                }
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Seat Conformation
                              </td>
                              <td>
                                {formData.conformationEmailSend ?
                                  <span class="badge bg-success">Send</span>
                                  :
                                  <span class="badge rounded-pill bg-dark">Not Send</span>
                                }
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Cancelled
                              </td>
                              <td>
                                {formData.cancelledEmailSend ?
                                  <span class="badge bg-success">Send</span>
                                  :
                                  <span class="badge rounded-pill bg-dark">Not Send</span>
                                }
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                Hold
                              </td>
                              <td>
                                {formData.holdEmailSend ?
                                  <span class="badge bg-success">Send</span>
                                  :
                                  <span class="badge rounded-pill bg-dark">Not Send</span>
                                }
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                              <td>
                                <span class="badge rounded-pill bg-dark">Not Send</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="col-12">
                    <div className="printbadge-widget">
                      <h5>
                        Badge Printing
                      </h5>
                      <p>
                        Generate and print delegate badges
                      </p>
                      <a href={'/events/manage/smart-print/delegates-badge/' + props.event + '/' + props.id+ (isValidate !=false ? "?from=validate" : "")} target="blank">
                        <AiOutlinePrinter /> Print Badge
                      </a>
                    </div>
                    {/* <div className="printbadge-widget mt-3">

                    <div className="col-12 d-flex justify-content-between">

                      <div>
                        <h5>
                          Source
                        </h5>
                        <p>
                          {formData.HowDidYouKnowThisCourse}
                        </p>
                      </div>
                    </div>
                  </div> */}
                  </li>

                  {/*
                <li className="col-11">
                  <div className="feedback-link-widget">
                    <h5>Course Feedback Link</h5>
                    <a target="_blank" href={process.env.NEXT_PUBLIC_URL + "evaluation-form-2023/" + props.event + "/" + formData.referenceNumber}>
                      {process.env.NEXT_PUBLIC_URL + "evaluation-form-2023/" + props.event + "/" + formData.referenceNumber}
                    </a>
                    <div className="copy" onClick={navigator.clipboard.writeText("hello")}><AiOutlineCopy /></div>
                  </div>
                </li>

                <li className="col-11 p-0">
                  <div className="certificatePrints">
                    <button onClick={() => downloadCertificate()} target="blank">
                      <AiOutlinePrinter /> {certificateLoading == true && <img src='/icons/ellipsis-icon.gif' />} Print Certificate
                    </button>
                  </div>
                </li>
*/}

                  <li className="col-12">
                    <div className="printbadge-widget">
                      <h5>
                        Certificate Printing
                      </h5>
                      <p>
                        Generate and print delegate badges
                      </p>
                      <div className="certificatePrints">
                        <button onClick={() => downloadCertificate()} target="blank">
                          <AiOutlinePrinter /> {certificateLoading == true && <img style={{height:"15px"}} src='/icons/ellipsis-icon.gif' />} Print Certificate
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="col-12">
                    <div className="printbadge-widget">
                      <h5>
                      Seat Conformation
                      </h5>
                      <p>
                        Download Seat Conformation
                      </p>
                      <div className="seatConformationprint bg-red">
                        <button onClick={() => downloadSeatConformation()} target="blank">
                          <AiOutlinePrinter /> {seatConformationLoading == true && <img style={{height:"15px"}} src='/icons/ellipsis-icon.gif' />} Download Seat Conformation
                        </button>
                        {SeatConformationNotFound ==true && 
                        <div style={{display:"block", paddingTop: "20px", color: '#B80909'}}> 
                          Please Select Seat Conformation Template from CMS
                          </div>
                        }
                      </div>
                    </div>
                  </li>
                  {/* <li className="col-11 p-0">
                    <div className="certificatePrints">
                      <button onClick={() => downloadCertificate()} target="blank">
                        <AiOutlinePrinter /> {certificateLoading == true && <img src='/icons/ellipsis-icon.gif' />} Print Certificate
                      </button>
                    </div>
                  </li> */}
                  <li className="col-12 p-0">
                    <Attendance registrationId={props.id} />
                    {/* <div className="attendance">
                    <div className="attendancetitle">
                      <h4>Attendance</h4>
                      <div className="totalHours">
                        <div className="cirle-total">
                          <span className="hours-holder">
                            <span className="hours"> 55 </span>
                            <span className="hoursText">Hours</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <h5>25 Oct 2025</h5>
                        <table>
                          <tr>
                            <td><span className="checkin">Check In</span></td>
                            <td>8am</td>
                            <td><span className="checkout">Check Out</span></td>
                            <td>5pm</td>
                            <td>3 Hours</td>
                          </tr>
                        </table>
                      </li>
                    </ul>

                  </div> */}
                  </li>

                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default addEditView;
