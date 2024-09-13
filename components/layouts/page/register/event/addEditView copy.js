import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';

import { deleteRequest, getRequest, postRequest, putRequest, postRequestAPI } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
// import VenueFacility from "components/venueFacility";
import "react-intl-tel-input/dist/main.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "components/general/backButton";
import { FaSave, FaCheck } from "react-icons/fa"
import IntlTelInput from "react-intl-tel-input";
import Link from "next/link";
import moment from "moment";
import { registration } from "../../../../../services/registrationService";
import PaymentAdd from "components/layouts/forms/payments/paymentAdd";
import { AiOutlinePrinter } from "react-icons/ai";
import { useRouter } from "next/router";



const addEditView = (props) => {
  const [conference, setconference] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registrationType, setRegistrationType] = useState([])
  const [speciality, setSpeciality] = useState([])
  const [addpayment, setAddpayment] = useState(false)
  const [showhistory, setShowhistory] = useState(false)
  const [feeAmount, setFeeAmount] = useState(false)
  const [certificateLoading, setCertificateLoading] = useState(false)
  useEffect(() => {
    getCourseData();
    getRelatedDatas();
    if (props.action == 'edit') {
      loadRegistrationData()
    }
  }, []);

  const router = useRouter();
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
    RegistrationMailSend: false,
    Notes: "",
    NationalitySelected: "",
    course: "",
    RegisteredFeeOption: "",
    RegisteredTotalFee: "",
    discountApplied: "",
    registrationType: "",
    isFullyPaid: "",
    referenceNumber: ""
  })
  const [eroorField, setInputError] = useState({
    Name: false,
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
      const response = await postRequestAPI({ API: API_URLS.GET_CERTIFICATE + "/" + formData.referenceNumber });
      if (response?.status === 200) {
        setCertificateLoading(false)
        window.open(process.env.NEXT_PUBLIC_API_URL + response.data.data, '_blank');
      }

    } catch (error) {
      console.log(error)
    }
  }
  // const countries = require('/helper/countries.json')
  async function getRelatedDatas() {

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
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
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
    const response = await getRequest({ API: API_URLS.GET_EVENTS + '?populate[]=courseFeeCategory&filters[referenceId][$eqi]=' + props.event });
    if (response?.status === 200) {
      setconference(response?.data?.data);

      var feecat = []
      var feeAmounts = {}
      await response?.data?.data[0]?.attributes?.courseFeeCategory?.map((key, val) => {
        feecat.push({ value: key.OptionTitle, label: key.OptionTitle, totalFee: key.courseFee })
        feeAmounts[key.OptionTitle] = key.courseFee
      })
      setFeeAmount(feeAmounts)
      setRegistrationType(feecat)

      setFormData((prevState) => ({
        ...prevState,
        ['event']: response?.data?.data[0].id,
      }));
      setIsLoading(false)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
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
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
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

  const Payments = {
    date: "",
    Mode: "",
    reference: "",
    AmountPaid: "",
    Registration: "",
    invoiceNumber: "",
    emailSend: ""
  }
  const [payments, setPayments] = [{
    date: "",
    Mode: "",
    reference: "",
    AmountPaid: "",
    Registration: "",
    invoiceNumber: "",
    emailSend: ""
  }]
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
  const status = [
    { value: 'Registered', label: 'Registered' },
    { value: 'Conformed', label: 'Conformed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Hold', label: 'Hold' }
  ]
  const paymentModes = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Bank', label: 'Bank' },
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Online', label: 'Online' }
  ]
  const [paymentSummery, setPaymentSummery] = useState({
    totalPaid: 0
  })
  const [paymenthistory, setPaymenthistory] = useState([])

  const handlesubmitter = (async (e) => {
    try {
      e.preventDefault();

      setIsLoading(false)
      if (isLoading == false) {
        setIsLoading(true)
        var data = formData;
        setFormData((prevState) => ({
          ...prevState,
          ['course']: props.event,
        }));
        // var result = await grecaptcha.ready(async function () {
        // var cap = await grecaptcha.execute('6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65', { action: 'login' }).then(async function (token) {
        var registrationService = await postRequestAPI({ API: '/registration/' + props.event + '/register', DATA: formData });
        if (registrationService.status == 200 && registrationService?.data?.status == 200) {
          toast("Registration Successfull");
          // router.push(registrationService?.data?.response);
          console.log(registrationService)
        } else {
          toast("Invalid Data, Cheack Both Email And Mobile Data Exist");
          console.log(registrationService)
        }

        // })
        // return cap
        // })
        console.log(registrationService)

      }
    } catch (err) {
      console.log(err)
    }
  })

  const handlesupdate = (async (e) => {
    try {
      e.preventDefault();

      setIsLoading(false)
      if (isLoading == false) {
        setIsLoading(true)
        var data = formData;
        // var result = await grecaptcha.ready(async function () {
        // var cap = await grecaptcha.execute('6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65', { action: 'login' }).then(async function (token) {

        var registrationService = await postRequestAPI({ API: '/registration/' + props.event + '/register/' + props.id, DATA: formData });
        if (registrationService.status == 200 && registrationService?.data?.status == 200) {
          toast("Update Successfull");
        } else {
          toast("Error");
          console.log(registrationService)
        }
      }
    } catch (err) {
      console.log(err)
    }
  })

  const onChangeInput = (name, value) => {
    console.log(name, value)
    setFormData((prev) => ({ ...prev, [name]: value.value }));
    console.log(formData)
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
        ['discountApplied']: "",
        ['referenceNumber']: response.data?.data?.attributes?.referenceNumber ? response.data?.data?.attributes?.referenceNumber : "",
        ['isFullyPaid']: response.data?.data?.attributes?.isFullyPaid ? response.data?.data?.attributes?.isFullyPaid : "",
      }))
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
      console.log(response.status, response.data?.data?.attributes)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  return (

    <>
 <div className=" content-inner form-add-event openCheckList p-0 d-flex">
        {/* <BackButton /> */}
        <div className="col-8">
        <div className="p-4 d-flex">
              <div className="col-7 px-4">
                <h4 className="page-title p-0 m-0">
                {props.action} Delegates  
                </h4>
                <span>
                  Add New entry
                </span>
              </div>
              <div className="col-5 create-button text-right px-4">
                {/* <Link legacyBehavior href={"add"}> */}
                {(props.action == "edit") ?
                  <button onClick={() => handlesupdate()} className="success">
                    <FaCheck /> Update
                  </button>
                  :
                  <>
                    {/* <Link legacyBehavior href={"add"}>
                      <a>
                        <FaSave /> Save
                      </a>
                    </Link> */}
                    <button onClick={() => handlesubmitter()} className="success">
                      <FaCheck /> Register
                    </button>
                  </>
                }
              </div>
            </div>

      <div className="container-fluid content-inner openCheckList">
        <BackButton />
        <div className="page-header row">
          <div className="col-6">
            <h4 className="page-title">
              {/* {conference[0]?.attributes.type} */}
              Delegates  {props.action}
            </h4>
            <span>
              Add New entry
            </span>
          </div>
          <div className="col-6 create-button text-right">
            {/* <Link legacyBehavior href={"add"}> */}
            {(props.action == "edit") &&
              <button onClick={(e) => handlesupdate(e)} className="bg-green">
                <FaSave className="mr-2 pr-2" />
                update
              </button>
            }

            {/* <Link legacyBehavior href={"add"}>
              <a>
                <FaSave /> Save
              </a>
            </Link> */}
            {/* <Link legacyBehavior href={"add"}> */}
            {(props.action == "register") &&
              <button onClick={(e) => handlesubmitter(e)}>
                <FaCheck /> Register
              </button>

            }
            <Link legacyBehavior href="/registration/validation/validate" onClick={(e) => handlesubmitter(e)}>
              <a style={{ "background": "#e1823e" }}>  <FaCheck /> Validate New</a>
            </Link>
            {/* </Link> */}
            {/* </Link> */}
          </div>
        </div>
        {(props.action == "register" || props.action == "edit") &&
          <>
            <div className="row">
              <div className="col-9">
                <form className="event-form " >
                  <div className="card mt-5 p-5">
                    <div className="card-body">
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
                                className="no-padding-input"
                                value={title.filter(function (types) {
                                  return types.value == formData.title;
                                })}
                                onChange={(value) => onChangeInput('title', value)}
                                options={title}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                First Name
                              </label>
                              <input
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
                                Middle Name
                              </label>
                              <input
                                type="text"
                                value={formData.middleName}
                                defaultValue={formData.middleName}
                                onChange={(value) => onChangeInput('middleName', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Last name
                              </label>
                              <input
                                type="text"
                                value={formData.lastName}
                                defaultValue={formData.lastName}
                                onChange={(value) => onChangeInput('lastName', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Name to Appear on The Certificate
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.NameToAppearOnTheCertificate}
                                defaultValue={formData.NameToAppearOnTheCertificate}
                                onChange={(value) => onChangeInput('NameToAppearOnTheCertificate', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Gender
                              </label>
                              <Select
                                className="no-padding-input z-index01"
                                value={gender.filter(function (types) {
                                  return types.value == formData.Gender;
                                })}
                                onChange={(value) => onChangeInput('Gender', value)}
                                options={gender}
                              />
                            </div>
                          </div>
                          <div className="col-md-10">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                required
                                value={formData.email}
                                defaultValue={formData.email}
                                onChange={(value) => onChangeInput('email', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className={eroorField.Mobile == true ? "eroorField col-12" : "col-12"} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                              <label> Mobile* </label>
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
                          <div className="col-md-6">
                            <div className={eroorField.Mobile == true ? "eroorField col-12" : "col-12"} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                              <label> Landline* </label>
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

                          <div className="col-md-4 mt-3">
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
                                value={formData.workPlace}
                                defaultValue={formData.workPlace}
                                onChange={(value) => onChangeInput('workPlace', value.target)}
                              // options={venueOptions}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 mt-3">
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
                                value={formData.workCity}
                                defaultValue={formData.workCity}
                                onChange={(value) => onChangeInput('workCity', value.target)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Residence Country
                              </label>
                              <Select
                                className="no-padding-input"
                                value={countries.filter(function (types) {
                                  return types.value == formData.ResidenceCountry;
                                })}
                                onChange={(value) => onChangeInput('ResidenceCountry', value)}
                                options={countries}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                Nationality
                              </label>
                              <AsyncSelect
                                cacheOptions
                                className="no-padding-input"
                                defaultInputValue={formData.NationalitySelected}
                                loadOptions={updateCountry}
                                onChange={(value) => { onChangeInput('Nationality', value) }}
                                defaultOptions={countries}
                              />
                              Selected Nationality : {formData.NationalitySelected}
                            </div>
                          </div>
                          <div className="col-md-3">
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
                          <div className="col-md-5">
                            <div className="form-group">
                              <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                              >
                                How did you know about the course
                              </label>
                              <Select
                                className="no-padding-input"
                                value={howdidyouknow.filter(function (types) {
                                  return types.value == formData.HowDidYouKnowThisCourse;
                                })}
                                onChange={(value) => onChangeInput('HowDidYouKnowThisCourse', value)}
                                options={howdidyouknow}
                              />
                            </div>
                          </div>

                          <div className="row course-fee border-1 m-0 p-0">
                            <label
                              className="form-label"
                              for="exampleFormControlSelect1"
                            >
                              Status
                            </label>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="exampleFormControlSelect1"
                                >
                                  Register As
                                </label>
                                <Select
                                  className="no-padding-input"
                                  value={registrationType.filter(function (types) {
                                    return types.value == formData.RegisteredFeeOption;
                                  })}
                                  onChange={(value) => { onChangeInput('RegisteredFeeOption', value) }}
                                  options={registrationType}
                                />

                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="exampleFormControlSelect1"
                                >
                                  Registered Total Fee
                                </label>
                                <input
                                  type="text"
                                  defaultValue={formData.RegisteredTotalFee}
                                  value={formData.RegisteredTotalFee}
                                  onChange={(value) => onChangeInput('RegisteredTotalFee', value)}
                                // options={venueOptions}
                                />

                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label
                                  className="form-label"
                                  for="exampleFormControlSelect1"
                                >
                                  Registration Status
                                </label>
                                <Select
                                  className="no-padding-input"
                                  value={status.filter(function (types) {
                                    return types.value == formData.seatConformation;
                                  })}
                                  onChange={(value) => onChangeInput('seatConformation', value)}
                                  options={status}
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
                                  className="no-padding-input"
                                  value={speciality.filter(function (types) {
                                    return types.value == formData.speciality;
                                  })}
                                  onChange={(value) => onChangeInput('speciality', value)}
                                  options={speciality}
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-5 p-5">
                    <label
                      className="form-label"
                      for="exampleFormControlSelect1"
                    >
                      Payment Status & History
                    </label>
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group">
                          <label
                            className="form-label"
                            for="exampleFormControlSelect1"
                          >
                            Register As
                          </label>
                          <Select
                            className="no-padding-input"
                            value={registrationType.filter(function (types) {
                              return types.value == formData.RegisteredFeeOption;
                            })}
                            onChange={(value) => onChangeInput('RegisteredFeeOption', value)}
                            options={registrationType}
                          />

                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <label
                            className="form-label"
                            for="exampleFormControlSelect1"
                          >
                            Discount
                          </label>
                          <input
                            type="text"
                            defaultValue={0}
                          //  defaultValue={formData.RegisteredTotalFee}
                          //  onChange={(value) => onChangeInput('RegisteredTotalFee', value.value)}
                          // options={venueOptions}
                          />

                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            for="exampleFormControlSelect1"
                          >
                            Registered Total Fee
                          </label>
                          <input
                            type="text"
                            defaultValue={feeAmount?.[formData.RegisteredFeeOption]}
                            onChange={(value) => onChangeInput('RegisteredTotalFee', value.target)}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="form-group">
                          <label
                            className="form-label"
                            for="exampleFormControlSelect1"
                          >
                            Paid
                          </label>
                          <input
                            type="text"
                            disabled
                            Value={paymentSummery.totalPaid}

                            onChange={(value) => onChangeInput('paid', value.value)}
                          // options={venueOptions}
                          />

                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            for="exampleFormControlSelect1"
                          >
                            Balance
                          </label>
                          <input
                            type="text"
                            disabled
                            Value={formData.RegisteredTotalFee - paymentSummery.totalPaid}
                          />

                        </div>
                      </div>
                      <span onClick={() => setAddpayment(!addpayment)} className="btn btn-success">
                        Add a payment
                      </span>

                      <span onClick={() => setShowhistory(!showhistory)} className="btn btn-info">
                        Show History
                      </span>

                      {addpayment == true &&
                        <PaymentAdd registration={props.id} />
                      }
                      {showhistory == true &&
                        <div className="col-12 table-payment">
                          <table>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Mode</th>
                                <th>Reference</th>
                                <th>Amount Paid</th>
                                <th>Invoice Number</th>
                                <th>Email Send</th>
                              </tr>
                            </thead>
                            <tbody>
                              {paymenthistory.map((key) => {
                                return <tr>
                                  <td>{moment(key.paidOn).format('DD-MM-YYYY')}</td>
                                  <td>{key.mode}</td>
                                  <td>{key.reference}</td>
                                  <td>{key.amountPaid}</td>
                                  <td>{key.emailSend}</td>
                                </tr>
                              })}

                            </tbody>
                          </table>

                        </div>
                      }
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-3 bg-white">
                <div>
                  <ul className="list-unstyled">

                    <li>
                      <div className="paymentStatus">
                        <h5>Payment Status</h5>
                        <span className={formData?.isFullyPaid == true ? "paid" : "notpaid"}>
                          {formData?.isFullyPaid == true ? "Paid" : "Payment is Pending"}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="badgePrint">
                        <a href={'/registration/event/badge-dynamic/' + props.event + '/' + props.id} target="blank">
                          <AiOutlinePrinter /> Print Badge
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="certificatePrint">
                        <button onClick={() => downloadCertificate()} target="blank">
                          <AiOutlinePrinter /> {certificateLoading == true && <img src='/icons/ellipsis-icon.gif' />} Print Certificate
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="paymentStatus">
                        <h5>Feedback Link</h5>
                        <a target="_blank" href={process.env.NEXT_PUBLIC_URL+"evaluation-form-2023/mego/"+formData.referenceNumber}>
                          {process.env.NEXT_PUBLIC_URL+"evaluation-form-2023/mego/"+formData.referenceNumber}
                        </a>
                      </div>
                    </li>

                    <li>
                      {/* <img style={{ width: "100%", "margin-top": "14px" }} src="https://crm.medprodocuae.com/images/banner-mego.jpg" /> */}
                    </li>
                    <li className="other">
                      {conference[0]?.attributes.type}: {conference[0]?.attributes.title}
                    </li>
                    <li className="other">  Landing Page: <a href={conference[0]?.attributes.landingPage} target="blank">{conference[0]?.attributes.landingPage}</a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </>
        }
      </div>

    </>
  );
};

export default addEditView;
