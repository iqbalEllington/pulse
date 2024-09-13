import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { FaSave, FaCheck } from "react-icons/fa"
import { addDays } from 'date-fns';
import Dropdown from 'react-bootstrap/Dropdown';
import Router from "next/router";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import Link from "next/link";
import { GrCertificate, GrTest } from "react-icons/gr";
import { BsCameraVideo, BsPeople } from "react-icons/bs";
import Addfee from "./addfee";
import { API_URLS } from "helper/apiConstant";
import { postRequestAPI, putRequestAPI, getRequest } from "helper/api";
import { toast } from "react-toastify";
import moment from "moment";
import AsyncSelect from "react-select/async";
// import debounce from 'lodash.debounce';
// import { FaPeopleGroup } from "react-icons/fa"

const addEditView = (props) => {
  const [error, setError] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: false,
    eventType: "",
    title: "",
    ref: "",
    landingPage: "",
    date: "",
    EventFee: {

    },
    EmailConformation: "",
    EmailFeedback: "",
    EmailRegistations: "",
    EmailRemainder: "",
    EmailCancel: "",
    EmailHolded: "",
  })
  const [formError, setFormError] = useState({
    id: false,
    eventType: false,
    title: false,
    ref: false,
    landingPage: false,
    date: false,
    EventFee: false,
    EmailConformation: false,
    EmailFeedback: false,
    EmailRegistations: false,
    EmailRemainder: false,
    EmailCancel: false,
    EmailHolded: false,
  })
  const [emailTemplates, SetEmailTemplates] = useState([
    { value: '1', label: 'defaults' },
  ])
  const setformFee = (fee) => {
    setFormData((prevState) => ({
      ...prevState,
      ["EventFee"]: fee
    }))
  }
  const inputchange = (key, value) => {
    if (key == "eventType") {
      if (value.checked) {
        value = value.value
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [key]: value
    }))
    setFormData[key] = value;
  }
  async function loadEventData() {
    setLoading(true)
    const response = await getRequest({ API: API_URLS.GET_EVENTS + "/" + props.id + '?populate=*' });
    if (response?.status === 200) {
      var data = response.data.data.attributes
      setDateRanges({
        selection1: {
          startDate: moment(data.courseDateFrom).toDate(),
          endDate: moment(data.courseDateTo).toDate(),
          key: 'selection1'
        }
      }
      )
      setFormData((prevState) => ({
        ...prevState,
        id: response.data.data.id,
        eventType: data.type,
        title: data.title,
        ref: data.referenceId,
        date: {
          selection1: {
            startDate: moment(data.courseDateFrom).format("YYYY-MM-DDT00:00:00.000Z"),
            endDate: moment(data.courseDateTo).format("YYYY-MM-DDT00:00:00.000Z"),
            key: 'selection1'
          }
        },
        landingPage: data.landingPage,
        EmailFeedback: "",
        EmailRegistations: "",
        EmailRemainder: "",
        EmailConformation: {
          label: data.conformation_email?.data?.attributes?.name,
          value: data.conformation_email?.data?.id
        },
        EmailFeedback: {
          label: data.feedback_email?.data?.attributes?.name,
          value: data.feedback_email?.data?.id
        },
        EmailRegistations: {
          label: data.registration_email?.data?.attributes?.name,
          value: data.registration_email?.data?.id
        },
        EmailRemainder: {
          label: data.remainder_email?.data?.attributes?.name,
          value: data.remainder_email?.data?.id
        },
        EmailCancel: {
          label: data.cancelation_email?.data?.attributes?.name,
          value: data.cancelation_email?.data?.id
        },
        EmailHolded: {
          label: data.hold_template?.data?.attributes?.name,
          value: data.hold_template?.data?.id
        },
      }))
    }
  }
  async function loaddefaultemailTemplates() {
    var defemailTemplates = await getemailtemplates("")
    SetEmailTemplates(defemailTemplates)
  }
  useEffect(() => {
    loaddefaultemailTemplates()
    if (props.action == 'edit') {
      loadEventData()
    }
  }, []);
  const getemailtemplates = async (keyword) => {
    const response = await getRequest({ API: API_URLS.EMAIL_TEMPLATES + '?filters[name][$containsi]=' + keyword });

    if (response?.status === 200) {
      var data = []
      await response?.data?.data.map((key, val) => {
        data.push({ value: key.id, label: key.attributes.name })
      })
      return data
    } else {
      var data = []
      data.push(
        { value: 'default', label: 'default' },
      )
      return data
    }
  }
  const [dateRanges, setDateRanges] = useState(
    {
      selection1: {
        startDate: new Date(),
        endDate: null,
        key: 'selection1'
      }
      // selection2: {
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   key: 'selection2'
      // },
      // selection3: {
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   key: 'selection3',
      //   autoFocus: false
      // }
    }
  );
  const formsubmit = () => {
    document.getElementById("eventForm").submit();
  }
  const enableStructures = async (classes, e) => {
    // e.preventDefault();
    // console.log(classes)
    // document.getElementById(classes).innerHTML =FeeAdded
  }
  const eventType = [
    { value: 'conference', label: 'Conference' },
    { value: 'Course', label: 'Course' },
  ]

  const handlesubmit = async () => {
    try {
      var formDatas = formData;
      formDatas.date = {
        startDate:moment(dateRanges.selection1.startDate).format('YYYY-MM-DD'),
        endDate:moment(dateRanges.selection1.endDate).format('YYYY-MM-DD')
      }
      // dateRanges.selection1
      formDatas.action = props.action;
      var response = false;
      var error = false;
      if (formDatas.eventType == "" || formDatas.eventType == false) {
        toast.error("Please select one of the event type.");
        setFormError((prevState) => ({
          ...prevState,
          ["eventType"]: true
        }))
        error = true;
      }
      if (formDatas.title == "" || formDatas.title == false) {
        toast.error("Event title is empty.");
        setFormError((prevState) => ({
          ...prevState,
          ["title"]: true
        }))
        error = true;
      }
      if (formDatas.ref == "" || formDatas.ref == false) {
        toast.error("Event reference code is required.");
        setFormError((prevState) => ({
          ...prevState,
          ["ref"]: true
        }))
        error = true;
      }
      if (formDatas.EmailFeedback == "" || formDatas.EmailFeedback == false) {
        toast.error("Event feedback email is required.");
        setFormError((prevState) => ({
          ...prevState,
          ["EmailFeedback"]: true
        }))
        error = true;
      }

      if (formDatas.EmailRegistations == "" || formDatas.EmailRegistations == false) {
        toast.error("Event registration email is required.");
        setFormError((prevState) => ({
          ...prevState,
          ["EmailRegistations"]: true
        }))
        error = true;
      }

      if (formDatas.EmailRemainder == "" || formDatas.EmailRemainder == false) {
        toast.error("Event remainder email is required.");
        setFormError((prevState) => ({
          ...prevState,
          ["EmailRemainder"]: true
        }))
        error = true;
      }

      if (formDatas.EmailConformation == "" || formDatas.EmailConformation == false) {
        toast.error("Event seet conformation email is required.");
        setFormError((prevState) => ({
          ...prevState,
          ["EmailConformation"]: true
        }))
        error = true;
      }

      if (error == true) {
        return
      }
      if (props.action == "edit") {
        response = await putRequestAPI({ API: API_URLS.PUT_EVENT + "create", DATA: formDatas });
      } else {
        response = await postRequestAPI({ API: API_URLS.PUT_EVENT + "create", DATA: formDatas });
      }
      if (response?.status === 200) {
        if (response.data.status == 200) {
          if (props.action == "edit") {
            toast.success("Event Updated Successfully");
          } else {
            toast.success("Event Created Successfully");
          }

          Router.push("/events/manage/edit/" + response.data.data.data.id)
        } else {
          if (response?.data?.data?.id) {
            toast.success("Event Updated Successfully");
          } else {
            toast.error(response.data.response);
          }
          // setError(response.data.response)
        }
      } else if (response?.status === 401) {
        toast.error("Unauthorize access please re-login.");
      } else if (response?.status === 400) {
        console.log(response.data)
        toast.error("un expected error occuered.");
      } else {
        if (response == undefined) {

          toast(response?.data?.error || "Server is down, Please contact your tech team.");
        } else {
          toast(response?.data?.error || "Some thing went wrong.");
        }
      }
    } catch (exception) {
      console.log(exception)
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  const onChangeInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: { value: value.value, label: value.label } }));
  };

  return (

    <>
      <div className=" content-inner form-add-event openCheckList p-0 d-flex">
        {/* <BackButton /> */}
        <div className="col-8 bg-white">
          <div className="page-header row b-bottom">
            <div className="p-4 d-flex">
              <div className="col-7 px-4">
                <h4 className="page-title p-0 m-0">
                  {props.action} event
                </h4>
                <span>
                  Add New entry
                </span>
              </div>
              <div className="col-5 create-button text-right px-4">
                {/* <Link legacyBehavior href={"add"}> */}
                {(props.action == "edit") ?
                  <button onClick={() => handlesubmit()} className="success">
                    <FaCheck /> Update
                  </button>
                  :
                  <>
                    {/* <Link legacyBehavior href={"add"}>
                      <a>
                        <FaSave /> Save
                      </a>
                    </Link> */}
                    <button onClick={() => handlesubmit()} className="success">
                      <FaCheck /> Publish
                    </button>
                  </>
                }
              </div>
            </div>
          </div>
          {(props.action == "edit" || props.action == "add") &&
            <form className="event-form" onSubmit={() => handlesubmit()}>
              <div className="p-5">
                <div className="card-body">
                  <div className="forms mt-3">
                    <div className="row align-items-center">
                      <div className="col-12">
                        <h4>Event Type</h4>
                        <div className="eventype mt-5">
                          <div className="form-check">
                            <input value="conference" checked={formData.eventType == "conference"} onChange={(e) => inputchange("eventType", e.target)} className="form-check-input-type" name="type" type="radio" id="Conference" />
                            <label className="form-check-label-type" for="Conference">
                              <BsPeople />
                              <span>Conference</span>
                            </label>
                          </div>
                          <div className="form-check">
                            <input value="course" checked={formData.eventType == "course"} onChange={(e) => inputchange("eventType", e.target)} className="form-check-input-type" name="type" type="radio" id="Courses" />
                            <label className="form-check-label-type" for="Courses">
                              <GrCertificate />
                              <span>Course</span>
                            </label>
                          </div>
                          <div className="form-check">
                            <input value="hands-on-workshop" checked={formData.eventType == "hands-on-workshop"} onChange={(e) => inputchange("eventType", e.target)} className="form-check-input-type" name="type" type="radio" id="Hands-on" />
                            <label className="form-check-label-type" for="Hands-on">
                              <GrTest />
                              <span>Hands-on
                                Training</span>
                            </label>
                          </div>
                          <div className="form-check">
                            <input value="online-hybrid" checked={formData.eventType == "online-hybrid"} onChange={(e) => inputchange("eventType", e.target)} className="form-check-input-type" name="type" type="radio" id="Online" />
                            <label className="form-check-label-type" for="Online">
                              <BsCameraVideo />
                              <span>Online / <br />Hybrid Event</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <h4>Event Title</h4>
                        <div className="eventype mt-5">
                          <textarea value={formData.title} onChange={(e) => inputchange("title", e.target.value)} placeholder="Event Title" className={(formError.title == true && "error") + " form-check-input-type"} id="title" />
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <h4>Landing Page Url</h4>
                        <div className="eventype mt-5">
                          <textarea required value={formData.landingPage} onChange={(e) => inputchange("landingPage", e.target.value)} placeholder="Event Landing Page" className="form-check-input-type" id="title" />
                        </div>
                      </div>
                      <div className="col-12 mt-5">
                        <h4>Event Reference Code</h4>
                        <div className="eventype mt-5">
                          <input disabled={props.action=="edit"} value={formData.ref} type="text" onChange={(e) => inputchange("ref", e.target.value)} placeholder="Event Reference" className={(formError.ref == true && "error ") + "form-check-input-type"} id="reference" />
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <h4>Event Date</h4>
                        {/* {JSON.stringify(dateRanges)} */}
                        <div className="d-flex d-center">
                          <div className="eventype mt-4 date-holder">
                            <DateRange
                              editableDateInputs={false}
                              onChange={item => setDateRanges({ ...dateRanges, ...item })}
                              ranges={[dateRanges.selection1]}
                              moveRangeOnFirstSelection={false}
                              showDateDisplay={true}
                              // ranges={dateRange}
                              rangeColors={["#000000"]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <h4>Event Fee/ Seats</h4>
                        <div className="d-flex d-center">
                          <ul className="feebox">

                            <Addfee setformFee={setformFee} eventid={props.action == 'edit' ? props.id : false} />


                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 pt-5">
                          <h4>Automatted Email Templates</h4>
                        </div>
                        <div className="col-6 mt-4">

                          <div className="col-12 emailtemplatesselected">
                            <h4 className="col-12">Upon Registration</h4>
                            <ul className="feebox">
                              <AsyncSelect
                                cacheOptions
                                className={(formError.EmailRegistations == true && "errorselect ") + "no-padding-input"}
                                defaultOptions={emailTemplates}
                                loadOptions={getemailtemplates}
                                onChange={(value) => { onChangeInput('EmailRegistations', value) }}
                              />
                              {formData?.EmailRegistations != "" &&
                                <span className="selected">
                                  {formData?.EmailRegistations["label"]}
                                </span>
                              }
                            </ul>
                          </div>
                        </div>
                        <div className="col-6 mt-4 emailtemplatesselected">
                          <h4>Upon Conformation</h4>
                          <div className="d-flex d-center">
                            <ul className="feebox">

                              <AsyncSelect
                                cacheOptions
                                className={(formError.EmailConformation == true && "errorselect ") + "no-padding-input"}
                                defaultOptions={emailTemplates}
                                loadOptions={getemailtemplates}
                                onChange={(value) => { onChangeInput('EmailConformation', value) }}

                              />
                              {formData?.EmailConformation != "" &&
                                <span className="selected">
                                  {formData?.EmailConformation["label"]}
                                </span>
                              }
                            </ul>
                          </div>
                        </div>
                        <div className="col-6 mt-4 emailtemplatesselected">
                          <h4>Remainder</h4>
                          <div className="d-flex d-center">
                            <ul className="feebox">

                              <AsyncSelect
                                cacheOptions
                                className={(formError.EmailRemainder == true && "errorselect ") + "no-padding-input"}
                                defaultOptions={emailTemplates}
                                loadOptions={getemailtemplates}
                                onChange={(value) => { onChangeInput('EmailRemainder', value) }}

                              />
                              {formData?.EmailRemainder != "" &&
                                <span className="selected">
                                  {formData?.EmailRemainder["label"]}
                                </span>

                              }
                            </ul>
                          </div>
                        </div>
                        <div className="col-6 mt-4 emailtemplatesselected">
                          <h4>Feedback Request</h4>
                          <div className="d-flex d-center">
                            <ul className="feebox">

                              <AsyncSelect
                                cacheOptions
                                className={(formError.EmailFeedback == true && "errorselect ") + "no-padding-input"}
                                loadOptions={getemailtemplates}
                                onChange={(value) => { onChangeInput('EmailFeedback', value) }}

                                defaultOptions={emailTemplates}
                              />
                              {formData?.EmailFeedback != "" &&
                                <span className="selected">
                                  {formData?.EmailFeedback["label"]}
                                </span>
                              }
                            </ul>
                          </div>
                        </div>

                        <div className="col-6 mt-4">

                          <div className="col-12 emailtemplatesselected">
                            <h4 className="col-12">Upon Holding</h4>
                            <ul className="feebox">
                              <AsyncSelect
                                cacheOptions
                                className={(formError.EmailHolded == true && "errorselect ") + "no-padding-input"}
                                defaultOptions={emailTemplates}
                                loadOptions={getemailtemplates}
                                onChange={(value) => { onChangeInput('EmailHolded', value) }}
                              />
                              {formData?.EmailHolded != "" &&
                                <span className="selected">
                                  {formData?.EmailHolded["label"]}
                                </span>
                              }
                            </ul>
                          </div>
                        </div>
                        <div className="col-6 mt-4">

                          <div className="col-12 emailtemplatesselected">
                            <h4 className="col-12">Upon Cancellation</h4>
                            <ul className="feebox">
                              <AsyncSelect
                                cacheOptions
                                className={(formError.EmailCancel == true && "errorselect ") + "no-padding-input"}
                                defaultOptions={emailTemplates}
                                loadOptions={getemailtemplates}
                                onChange={(value) => { onChangeInput('EmailCancel', value) }}
                              />
                              {formData?.EmailCancel != "" &&
                                <span className="selected">
                                  {formData?.EmailCancel["label"]}
                                </span>
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          }
        </div>
        <div className="col-4 bg-gray showsummery">
          <div>
            <h1>
              <span>
                Event Type
              </span>
              {formData.eventType}
            </h1>
            <h1 className="mt-5">
              <span>
                Event Title
              </span>
              {formData.title}
            </h1>
            <h1 className="mt-5">
              <span>
                Event Ref
              </span>
              {formData.ref}
            </h1>
            <h1 className="mt-5">
              <span>
                Landing Page
              </span>
              <Link href={formData.landingPage}>{formData.landingPage}</Link>
            </h1>
            <h1 className="mt-5">
              <span>
                Date
              </span>
              <span>

                {addDays(dateRanges.selection1.startDate,0).toDateString("D MM YY")}
                &nbsp; to &nbsp;
                {addDays(dateRanges.selection1.endDate,0).toDateString("D MM YY")}
              </span>
            </h1>

            <h1 className="mt-5">
              <span>
                Registration Email
              </span>
              {formData.EmailRegistations?.label}
            </h1>
            <h1 className="mt-5">
              <span>
                Conformation Email
              </span>
              {formData.EmailConformation?.label}
            </h1>
            <h1 className="mt-5">
              <span>
                Remainder Email
              </span>
              {formData.EmailRemainder?.label}
            </h1>
            <h1 className="mt-5">
              <span>
                Feedback Email
              </span>
              {formData.EmailFeedback?.label}
            </h1>
            <h1 className="mt-5">
              <span>
                Holded Email
              </span>
              {formData.EmailHolded?.label}
            </h1>
            <h1 className="mt-5">
              <span>
                Cancelled Email
              </span>
              {formData.EmailCancel?.label}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default addEditView;
