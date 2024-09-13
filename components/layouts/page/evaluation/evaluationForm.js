import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import { Rating } from 'react-simple-star-rating'

import { deleteRequest, getRequest, postRequestNoAuth, postRequestAPI, getRequestAPI } from "helper/api";
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
import PaymentAdd from "components/layouts/forms/payments/paymentAdd";
import { AiOutlinePrinter } from "react-icons/ai";
import { useRouter } from "next/router";



const Evaluationform = (props) => {
  const [conference, setconference] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationType, setRegistrationType] = useState([])
  const [speciality, setSpeciality] = useState([])
  const [addpayment, setAddpayment] = useState(false)
  const [showhistory, setShowhistory] = useState(false)
  const [feeAmount, setFeeAmount] = useState(false)
  const [certificateLoading, setCertificateLoading] = useState(false)
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (field, rate) => {
    onChangeInputDirect(field, rate)
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  useEffect(() => {
    getRelatedDatas();
    loadRegistrationData()
  }, []);

  const router = useRouter();
  const [formData, setFormData] = useState({
    registration: "",
    didYouAttendDay1: "null",
    didYouAttendDay2: "null",
    TheConferenceAmbianceIsPleasantAndWelcoming: "",
    TheOrganizingTeamWasFriendlyAndAccommodating: "",
    TheAgendaProgramsContentsAreInformativeAndUseful: "",
    TheOverallConferenceTopicsWereDeliveredWithAnAppropriateLevelOfUnderstanding: "",
    TheLecturePresentationsAreEngagingAndInformative: "",
    AllFacultiesAreWellPreparedAndknowledgeable: "",
    TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate: "",
    TheLearningObjectivesWereWellCommunicatedAndAchieved: "",
    TheConferenceWasOrganizedOverall: "",
    WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023: {},
    WhatChangesOrAdditionsWouldYouSuggestToTheRegistrationPackageToEnhanceYourLevelOfEngagement: "",
    HowDidYouKnowAboutTheMEGOconference: "",
    WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable: {},
    ToBeSatisfactoryAndMostEnjoyableUserFeedback: "",
    AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant: "null",
    commentsSuggession: "",
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
    referenceNumber: ""
  })
  const [eroorField, setInputError] = useState({
    didYouAttendDay1: false,
    didYouAttendDay2: false,
    TheConferenceAmbianceIsPleasantAndWelcoming: false,
    TheOrganizingTeamWasFriendlyAndAccommodating: false,
    TheAgendaProgramsContentsAreInformativeAndUseful: false,
    TheOverallConferenceTopicsWereDeliveredWithAnAppropriateLevelOfUnderstanding: false,
    TheLecturePresentationsAreEngagingAndInformative: false,
    AllFacultiesAreWellPreparedAndknowledgeable: false,
    TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate: false,
    TheLearningObjectivesWereWellCommunicatedAndAchieved: false,
    TheConferenceWasOrganizedOverall: false,
    WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023: false,
    WhatChangesOrAdditionsWouldYouSuggestToTheRegistrationPackageToEnhanceYourLevelOfEngagement: false,
    HowDidYouKnowAboutTheMEGOconference: false,
    WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable: false,
    ToBeSatisfactoryAndMostEnjoyableUserFeedback: false,
    AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant: 'null',
    commentsSuggession: false,
    title: false,
    firstName: false,
    mobileCountry: false,
    mobileCountryName: false,
    landlineCountry: false,
    landlineCountryName: false,
    middleName: false,
    lastName: false,
    email: false,
    mobile: false,
    NameToAppearOnTheCertificate: false,
    Gender: false,
    landline: false,
    speciality: false,
    workPlace: false,
    workCity: false,
    Nationality: false,
    ResidenceCountry: false,
    DateofBirth: false,
    event: false,
    referenceNumber: false,
    changed:""
  })

  const [countries, setCountries] = useState(
    [
      { value: 'Social Media', label: 'Social Media' }
    ]
  )
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
  const checkbox = ((key, value) => {
    var olddata = formData.WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023
    if (value.target.checked == true) {
      olddata[key] = value.target.value
    } else {
      delete olddata[key]
    }
    setFormData((prevState) => ({
      ...prevState,
      ['WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023']: olddata
    }));
  })
  const checkbox2 = ((key, value) => {
    var olddata = formData.WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable
    if (value.target.checked == true) {
      olddata[key] = value.target.value
    } else {
      delete olddata[key]
    }
    setFormData((prevState) => ({
      ...prevState,
      ['WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable']: olddata
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

  const handlesubmitt = (async (e) => {
    try {
      e.preventDefault();
      console.log(isLoading)
      if (isLoading == false) {
        setIsLoading(true)
        var error = false;
        var data = eroorField;

        if (formData.didYouAttendDay1 == 'null') {
          data.didYouAttendDay1 = true
          error = true;
        }else{
          data.didYouAttendDay1 = false
        }
        if (formData.didYouAttendDay2 == 'null') {
          data.didYouAttendDay2 = true
          error = true;
        }else{
          data.didYouAttendDay2 = false
        }
        if (formData.TheLecturePresentationsAreEngagingAndInformative == '') {
          data.TheLecturePresentationsAreEngagingAndInformative = true
          error = true;
        }else{
          data.TheLecturePresentationsAreEngagingAndInformative = false
        }
        if (formData.AllFacultiesAreWellPreparedAndknowledgeable == '') {
          data.AllFacultiesAreWellPreparedAndknowledgeable = true
          error = true;
        }else{
          data.AllFacultiesAreWellPreparedAndknowledgeable = false
        }
        if (formData.TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate == '') {
          data.TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate = true
          error = true;
        }else{
          data.TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate = false
        }
        if (formData.TheLearningObjectivesWereWellCommunicatedAndAchieved == '') {
          data.TheLearningObjectivesWereWellCommunicatedAndAchieved = true
          error = true;
        }else{
          data.TheLearningObjectivesWereWellCommunicatedAndAchieved = false
        }
        if (formData.TheConferenceWasOrganizedOverall == '') {
          data.TheConferenceWasOrganizedOverall = true
          error = true;
        }else{
          data.TheConferenceWasOrganizedOverall = false
        }
        if (Object.keys(formData.WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023).length < 3 ) {
          data.WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023 = true
          error = true;
        }else{
          data.WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023 = false
        }
        // if (formData.WhatChangesOrAdditionsWouldYouSuggestToTheRegistrationPackageToEnhanceYourLevelOfEngagement == '') {
        //   data.WhatChangesOrAdditionsWouldYouSuggestToTheRegistrationPackageToEnhanceYourLevelOfEngagement = true
        //   error = true;
        // }
        // if (formData.HowDidYouKnowAboutTheMEGOconference == '') {
        //   data.HowDidYouKnowAboutTheMEGOconference = true
        //   error = true;
        // }
        if (Object.keys(formData.WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable).length < 3) {
          data.WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable = true
          error = true;
        }else{
          data.WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable = false
        }
        // if (formData.ToBeSatisfactoryAndMostEnjoyableUserFeedback == '') {
        //   data.ToBeSatisfactoryAndMostEnjoyableUserFeedback = true
        //   error = true;
        // }else{
        //   data.ToBeSatisfactoryAndMostEnjoyableUserFeedback = false
        // }
        if (formData.AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant == 'null') {
          data.AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant = true
          error = true;
        }else{
          data.AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant = false
        }
        if (formData.email == '') {
          data.email = true
          error = true;
        }else{
          data.email = false
        }
        if (formData.mobile == '') {
          data.mobile = true
          error = true;
        }else{
          data.mobile = false
        }
        if (formData.Nationality == '') {
          data.Nationality = true
          error = true;
        }else{
          data.Nationality = false
        }
        if (formData.TheConferenceAmbianceIsPleasantAndWelcoming == '') {
          data.TheConferenceAmbianceIsPleasantAndWelcoming = true
          error = true;
        }else{
          data.TheConferenceAmbianceIsPleasantAndWelcoming = false
        }
        if (formData.TheOrganizingTeamWasFriendlyAndAccommodating == '') {
          data.TheOrganizingTeamWasFriendlyAndAccommodating = true
          error = true;
        }else{
          data.TheOrganizingTeamWasFriendlyAndAccommodating = false
        }
        if (formData.TheAgendaProgramsContentsAreInformativeAndUseful == '') {
          data.TheAgendaProgramsContentsAreInformativeAndUseful = true
          error = true;
        }else{
          data.TheAgendaProgramsContentsAreInformativeAndUseful = false
        }
        if (formData.TheOverallConferenceTopicsWereDeliveredWithAnAppropriateLevelOfUnderstanding == '') {
          data.TheOverallConferenceTopicsWereDeliveredWithAnAppropriateLevelOfUnderstanding = true
          error = true;
        }else{
          data.TheOverallConferenceTopicsWereDeliveredWithAnAppropriateLevelOfUnderstanding = false
        }
        console.log(error, data)
        if (error == false) {
          var registrationService = await postRequestNoAuth({ API: '/feedback/mego/feedback/' + formData.registration, DATA: formData });
          if (registrationService.status == 200 && registrationService?.data?.status == 200) {
            toast("Registration Successfull");
            setIsLoading(false)
            // router.push(registrationService?.data?.response);
            console.log(registrationService)
          } else {
            setIsLoading(false)

            toast("Invalid Data, Cheack Both Email And Mobile Data Exist");
            console.log(registrationService)
          }
        } else {

          setInputError(data);
          setFormData((prevState) => ({
            ...prevState,
            ['changed']: "true",
          }));
          setIsLoading(false)
          toast("Some data is missing");
        }

      }
    } catch (err) {

      setIsLoading(false)

      console.log(err)
    }
  })


  const onChangeInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.value }));
    console.log(formData)
  };
  const onChangeInputDirect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData)
  };
  async function loadRegistrationData() {
    setIsLoading(true)
    const response = await getRequestAPI({ API: API_URLS.GET_DELEGATE_REF + "/" + props.del });
    if (response?.status === 200) {
      setFormData((prevState) => ({
        ...prevState,
        ['registration']: response.data?.data?.id,
        ['title']: (response.data?.data?.title ? response.data?.data?.title : ""),
        ['firstName']: (response.data?.data?.firstName ? response.data?.data.firstName : ""),
        ['middleName']: response.data?.data?.middleName ? response.data?.data?.middleName : "",
        ['lastName']: response.data?.data?.lastName ? response.data?.data?.lastName : "",
      }))
      setIsLoading(false)
      // setPaymenthistory
    } else if (response?.status === 401) {
      setIsLoading(false)
      toast("User Doesnt Exist.");
    } else {
      setIsLoading(false)
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  return (

    <>
      <div className="container-fluid openCheckList p-0">
        {/* <BackButton /> */}
        <div className="page-header row evaluationForm mt-0 pt-0">
          <div className="col-12 p-0">
            <img src="https://crm.medprodocuae.com/images/banner-mego.jpg" />
            <div className="welcome">
              <p className="col-12 text-left titles">
                Dear {formData.title}  {formData.firstName}  {formData.lastName},
              </p>
              <p>Thank you for becoming part of MEGO Dubai 2023.</p>
              <p>
                Your feedback holds great significance for us as it helps us gain insights into your thoughts and perspectives regarding the event. We value all feedback received and utilize it to improve the content and enhance the overall experience at our forthcoming events.
              </p><p>

                Once again, we extend our gratitude for your active participation and eagerly look forward to welcoming you at our upcoming events. Best regards,
              </p>


            </div>
          </div>
          <div className="col-12 create-button text-center pt-4">
            <h3 className="titles titleColor">Evaluation Form</h3>
          </div>
          <div className="row content">
            <div className="col-12">
              <form className="evaluation-form" onSubmit={(e) => handlesubmitt(e)} >
                <div className="forms mt-3">
                  <div className="row align-items-center">
                    <div className="col-12 text-left">
                      <p>As an attendee who joined the program, can you share your experience regarding the following aspects:
                      </p>

                    </div>
                    <div className="boxed-form pt-5">
                      <div className="col-12 mb-4 mt-4">

                        <h2>Did You attend conference on Friday 12th May 2023* </h2>
                        <div className="col-12 pt-3">
                          <label onClick={() => onChangeInputDirect("didYouAttendDay1", true)} className={formData.didYouAttendDay1 == true ? "radioLabel true active" : "radioLabel true"}>
                            Yes
                          </label>
                          <label onClick={() => onChangeInputDirect("didYouAttendDay1", false)} className={formData.didYouAttendDay1 == false ? "radioLabel false active" : "radioLabel false"}>
                            No
                          </label>
                        </div>
                        <div className="errorfield">
                          {eroorField.didYouAttendDay1 == true && "Please Select your Answer *"}
                        </div>
                      </div>
                      <div className="col-12">

                        <h2>Did You attend conference on Saturday 13th May 2023 </h2>
                        <div className="col-12 pt-3">
                          <label onClick={() => onChangeInputDirect("didYouAttendDay2", true)} className={formData.didYouAttendDay2 == true ? "radioLabel true active" : "radioLabel true"}>
                            Yes
                          </label>
                          <label onClick={() => onChangeInputDirect("didYouAttendDay2", false)} className={formData.didYouAttendDay2 == false ? "radioLabel false active" : "radioLabel false"}>
                            No
                          </label>
                        </div>
                        <div className="errorfield">
                          {eroorField.didYouAttendDay2 == true && "Please Select your Answer *"}
                        </div>
                      </div>

                    </div>
                    <h2 className="pt-5 pb-5">Please rate the following questions using the rating scale below.
                    </h2>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">1. The conference ambiance is pleasant and welcoming</h5>
                      <Rating
                        onClick={(e) => handleRating('TheConferenceAmbianceIsPleasantAndWelcoming', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div className="errorfield">
                        {eroorField.TheConferenceAmbianceIsPleasantAndWelcoming == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">2. The organizing team was friendly and accommodating</h5>
                      <Rating
                        onClick={(e) => handleRating('TheOrganizingTeamWasFriendlyAndAccommodating', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div className="errorfield">
                        {eroorField.TheOrganizingTeamWasFriendlyAndAccommodating == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">3. The conference was organized overall</h5>
                      <Rating
                        onClick={(e) => handleRating('TheConferenceWasOrganizedOverall', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />

                      <div className="errorfield">
                        {eroorField.TheConferenceWasOrganizedOverall == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">4. The learning objectives were well communicated and achieved</h5>
                      <Rating
                        onClick={(e) => handleRating('TheLearningObjectivesWereWellCommunicatedAndAchieved', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div className="errorfield">
                        {eroorField.TheLearningObjectivesWereWellCommunicatedAndAchieved == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">5. The agenda/ program’s contents are informative and useful</h5>
                      <Rating
                        onClick={(e) => handleRating('TheAgendaProgramsContentsAreInformativeAndUseful', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div className="errorfield">
                        {eroorField.TheAgendaProgramsContentsAreInformativeAndUseful == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">6. The overall conference topics were delivered with an appropriate level of understanding</h5>
                      <Rating
                        onClick={(e) => handleRating('TheOverallConferenceTopicsWereDeliveredWithAnAppropriateLevelOfUnderstanding', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div className="errorfield">
                        {eroorField.TheAgendaProgramsContentsAreInformativeAndUseful == true && "Please Select your Answer *"}
                      </div>

                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">7. The lecture presentations are engaging and informative</h5>
                      <Rating
                        onClick={(e) => handleRating('TheLecturePresentationsAreEngagingAndInformative', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                      <div className="errorfield">
                        {eroorField.TheLecturePresentationsAreEngagingAndInformative == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3">8. All faculties are well prepared & knowledgeable</h5>
                      <Rating
                        onClick={(e) => handleRating('AllFacultiesAreWellPreparedAndknowledgeable', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                       <div className="errorfield">
                        {eroorField.AllFacultiesAreWellPreparedAndknowledgeable == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div className="col-12 pb-4">
                      <h5 className="mb-3"> 9. The opportunity for interaction & engagement during the program were adequate</h5>
                      <Rating
                        onClick={(e) => handleRating('TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate', e)}
                        onPointerEnter={onPointerEnter}
                        onPointerLeave={onPointerLeave}
                        onPointerMove={onPointerMove}
                      /* Available Props */
                      />
                        <div className="errorfield">
                        {eroorField.TheOpportunityForInteractionEngagemenDuringTheProgramWereAdequate == true && "Please Select your Answer *"}
                      </div>
                    </div>
                    <div>
                      <h5 className="mb-3">10. What are the three main reasons why you decided to attend MEGO Dubai 2023?</h5>
                      <div class="form-check">
                        <input value="The quality of the educational content and its relevance to the attendee's interests" class="form-check-input" onChange={(e) => checkbox("a", e)} type="checkbox" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          The quality of the educational content and its relevance to the attendee's interests
                        </label>
                      </div>
                      <div class="form-check">
                        <input value="Whether the program has been recommended by colleagues" onChange={(e) => checkbox("b", e)} class="form-check-input" type="checkbox" id="flexCheckChecked" />
                        <label class="form-check-label" for="flexCheckChecked">
                          Whether the program has been recommended by colleagues
                        </label>
                      </div>
                      <div class="form-check">
                        <input value="The date and time of the event" onChange={(e) => checkbox("c", e)} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          The date and time of the event
                        </label>
                      </div>
                      <div class="form-check">
                        <input value="The perceived value of the knowledge received" onChange={(e) => checkbox("d", e)} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          The perceived value of the knowledge received
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" onChange={(e) => checkbox("e", e)} value="The opportunity to attend sessions featuring specific sponsors or speakers" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          The opportunity to attend sessions featuring specific sponsors or speakers
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" onChange={(e) => checkbox("f", e)} value="The availability of continuing medical education (CME) credits" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          The availability of continuing medical education (CME) credits
                        </label>
                      </div>
                      {/* <div class="form-check">
                        <input class="form-check-input" type="checkbox" onChange={(e)=>checkbox("d",e)} value="Any other relevant comments or suggestions." id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                          Any other relevant comments or suggestions.
                        </label>
                      </div> */}
                       <div className="errorfield mb-3">
                        {eroorField.WhatAreTheThreeMainReasonsWhyYouDecidedToAttendMEGODubai2023 == true && "Please Select 3 Answer"}
                      </div>
                    </div>
                    <div>
                      <h5>What changes or additions would you suggest to the registration package to enhance your level of engagement?</h5>
                      <textarea value={formData.WhatChangesOrAdditionsWouldYouSuggestToTheRegistrationPackageToEnhanceYourLevelOfEngagement} onChange={(target) => onChangeInput("WhatChangesOrAdditionsWouldYouSuggestToTheRegistrationPackageToEnhanceYourLevelOfEngagement", target.target)} />
                    </div>
                    <div className="form-group mt-4">
                      <h5>How did you know about the MEGO conference?</h5>
                      <input type="text" className="fulwidth-input" onChange={(target) => onChangeInput("HowDidYouKnowAboutTheMEGOconference", target.target)} value={formData.HowDidYouKnowAboutTheMEGOconference} />
                    </div>
                    <div>
                      <h5>Which aspects of the congress did you find to be satisfactory and most enjoyable? You can choose multiple options, but please select at least three.</h5>
                      <div>
                        <div class="form-check">
                          <input value="Onsite Program" onChange={(e) => checkbox2("a", e)} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Onsite Program
                          </label>
                        </div>
                        <div class="form-check">
                          <input value="Sponsor's Sessions" onChange={(e) => checkbox2("b", e)} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Sponsor's Sessions
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="Lectures, Debates, Tutorials and" onChange={(e) => checkbox2("c", e)} id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Lectures, Debates, Tutorials and
                          </label>
                        </div>
                        <div class="form-check">
                          <input onChange={(e) => checkbox2("d", e)} class="form-check-input" type="checkbox" value="Presentations" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Presentations                            </label>
                        </div>
                        <div class="form-check">
                          <input onChange={(e) => checkbox2("e", e)} class="form-check-input" type="checkbox" value="CME Credits" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            CME Credits
                          </label>
                        </div>

                        <div class="form-check">
                          <input onChange={(e) => checkbox2("f", e)} class="form-check-input" type="checkbox" value="All of the Above" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            All of the Above
                          </label>
                        </div>
                        <div className="errorfield mb-3">
                        {eroorField.WhichAspectsOfTheCongressDidYouFindToBeSatisfactoryAndMostEnjoyable == true && "Please Select 3 Answer"}
                      </div>
                        <div class="form-check">
                          <input onChange={(e) => checkbox2("g", e)} value="Others" class="form-check-input" type="checkbox" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Other, please specify below or if you
                          </label>
                          <textarea value={formData.ToBeSatisfactoryAndMostEnjoyableUserFeedback} onChange={(target) => onChangeInput("ToBeSatisfactoryAndMostEnjoyableUserFeedback", target.target)} />

                        </div>
                        
                        <div class="form-check">
                          <label class="form-check-label" for="flexCheckDefault">
                            have comments/suggestions:
                          </label>

                          <textarea value={formData.commentsSuggession} onChange={(target) => onChangeInput("commentsSuggession", target.target)} />
                        </div>
                        <div className="errorfield mb-3">
                        {eroorField.whic == true && "Please Select 3 Answer"}
                      </div>
                      </div>
                      <div>
                        <h5>Additionally, would you be interested in attending MEGO Dubai 2024 as a participant?
                          ?</h5>
                        <div className="col-12 pt-3">
                          <label onClick={() => onChangeInputDirect("AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant", true)} className={formData.AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant == true ? "radioLabel true active" : "radioLabel true"}>
                            Yes
                          </label>
                          <label onClick={() => onChangeInputDirect("AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant", false)} className={formData.AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant == false ? "radioLabel false active" : "radioLabel false"}>
                            No
                          </label>
                          <div className="errorfield ">
                        {eroorField.AdditionallyWouldYouBeInterestedInAttendingMEGODubai2024asAParticipant == true && "Please Select your Answer"}
                      </div>
                        </div>
                        {/* <input type="text" /> */}
                      </div>

                    </div>
                    <div className="formdata row mt-4">
                      <div className="col-md-3">
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
                      <div className="col-md-5">
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
                      <div className="col-md-4">
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
                      <div className="col-md-6">
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



                      <div className="col-md-6">
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
                        <div className="errorfield ">
                        {eroorField.email == true && "Please enter your email"}
                      </div>
                      </div>
                      <div className="col-md-5">
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
                        </div>
                        <div className="errorfield ">
                        {eroorField.Nationality == true && "Please select your nationality"}
                      </div>
                      </div>
                      <div className="col-md-7">
                        <div className={eroorField.Mobile == true ? "eroorField col-12" : "col-12"} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                          <label> Contact* </label>
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
                        <div className="errorfield ">
                        {eroorField.mobile == true && "Please enter your mobile number"}
                      </div>
                      </div>

                      <div className="col-md-12 mt-3">
                        <div className="form-group">
                          <label
                            className="form-label"
                            for="exampleFormControlSelect1"
                          >
                            Work Place
                          </label>
                          <input
                            type="text"
                            placeholder="Work Place"
                            required
                            value={formData.workPlace}
                            defaultValue={formData.workPlace}
                            onChange={(value) => onChangeInput('workPlace', value.target)}
                          // options={venueOptions}
                          />
                        </div>
                      </div>
                      <button onClick={(e) => handlesubmitt(e)}> Submit </button>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>


    </>
  );
};

export default Evaluationform;
