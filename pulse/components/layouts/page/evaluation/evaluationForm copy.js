import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import VenueFacility from "components/venueFacility";
import ConfirmationModal from "components/modal/ConfirmationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit } from "react-icons/fi"
import { AiOutlineEye } from "react-icons/ai"
import BackButton from "components/general/backButton";
import Link from "next/link";
import { HiPlus } from "react-icons/hi"
import { IoFilterSharp, IoSearch } from "react-icons/io5"
import debounce from 'lodash.debounce';
import moment from "moment";
import { getRequestAPI } from "helper/api";


const EvaluationForm = (props) => {
  const [conference, setconference] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [regno, setRegNo] = useState("")

  const router = useRouter();
  // async function saveComment(formData) {
  //   setRegNo(formData.target.value
  //   });

  // }
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
    course: "",
    RegisteredFeeOption: "",
    RegisteredTotalFee: "",
    discountApplied: "",
    registrationType: ""
  })
  async function loadRegistrationData(id) {
    setIsLoading(true)
    const response = await getRequestAPI({ API: API_URLS.GET_DELEGATE_REF + "/" + id });
    if (response?.data?.status == 200) {
      setFormData((prevState) => ({
        ...prevState,
        ['title']: (response?.data?.data?.title ? response?.data?.data?.title : ""),
        ['firstName']: (response?.data?.data?.firstName ? response?.data?.data?.firstName : ""),
        ['middleName']: response?.data?.data?.middleName ? response?.data?.data?.middleName : "",
        ['lastName']: response?.data?.data?.lastName ? response?.data?.data?.lastName : "",

      }))
      // setPaymenthistory(history)
      // setPaymenthistory
      // console.log(response.status, response.data?.data?.attributes)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  useEffect(() => {
    if (props.del != "" && props.del.length >= 2) {
      loadRegistrationData(props.del)
    } else {
      var no = ""
    }
  }, []);
  const [defaultOptions, setDefaultOptions] = useState([]);
  return (
    <div className="container-fluid content-inner openCheckList">
      {/* <BackButton /> */}
      <div className="page-header row evaluationForm">
        <div className="col-12">
          <img src="https://crm.medprodocuae.com/images/banner-mego.jpg" />
          <p className="col-12 text-left mt-5">
            Dear, {formData.title}  {formData.firstName}  {formData.lastName}
            </p>
            <p>Thank you for becoming part of MEGO Dubai 2023.</p>
            <p>
            Your feedback is crucial to us as it allows us to understand your thoughts and opinions on the event. 
            We take all feedback seriously and use it to enhance the content and experience we provide at future events.
            </p><p> 
            Once again, we thank you for your participation and hope to see you at our future events.
            Best regards,
          </p>

          <div className="col-12 create-button text-center pt-4">
            <h3>Evaluation Form</h3>
            <form></form>

          </div>
        </div>
      </div>

    </div>
  );
};

export default EvaluationForm;
