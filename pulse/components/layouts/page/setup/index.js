import React, { useEffect, useState } from "react";
import { Accordion, Form, FormCheck, Table } from "react-bootstrap";
import { getRequest, postRequest } from "helper/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import FormError from "components/errors/FormError";
import ConfirmationModal from "components/modal/ConfirmationModal";

// import "styles/fms/wizard.scss";
import styles from "styles/manage-venue/academy.module.scss";

import { FaCheck, FaHandshake, FaIdCard, FaMinusCircle, FaPlusCircle, FaQuestion } from "react-icons/fa";

import Select from "react-select";
import { API_URLS } from "helper/apiConstant";

const GetSetUpWindow = ({ user }) => {
  const router = useRouter()

  const [qnStep, setQnStep] = useState(0);

  const [validated, setValidated] = useState(false);
  const [count, setCount] = useState(0);
  const [deleteRow, setDeleteRow] = useState(0);
  const [sportOptions, setSportOption] = useState([]);
  const [areaOptions, setAreaOptions] = useState([
    {
      value: 0,
      label: 'Select Area'
    }
  ]);

  const [loader, setLoader] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const box_name = {
    'trading_name': '',
    'ded_trade_name': '',
    'main_office_area': '',
    'sport_id': [],
    'address': '',
    'same_academy_admin': false,
    'academy_admin_fname': '',
    'academy_admin_lname': '',
    'academy_admin_contact': '',
    'academy_admin_email': '',

  };
  const [boxes, setBoxes] = useState({});

  const [boxesError, setBoxesError] = useState({
    [0]: box_name
  });

  const [multiSport, setMultiSport] = useState(false);

  const [multiAcademy, setMultiAcademy] = useState(false);

  const { register, handleSubmit, errors, setValue, reset } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleCompanyCreation = async (data) => {
    setIsLoading(true);
    try {
      let obj = {
        company_name: data.company_name,
          is_multiple_academy: multiSport,
          is_sport_sub_academy: multiAcademy,
          main_office_address: data.main_office_address,
          country: data.country,
          state: data.state,
          md_first_name: data.md_first_name,
          md_last_name: data.md_last_name,
          md_email: data.md_email,
          md_contact: data.md_contact,
           // latitude: data.latitude,
          // longitude: data.longitude,
      }
      if(Object.keys(data.logo)?.length){
        obj[logo]= data.logo;
      }
      await postRequest({
        API: "company/create",
        DATA: obj
      });
      setIsLoading(false);
      toast("Company data has been updated.");
      setQnStep(2);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      // toast(err?.response?.data?.message || "Something went wrongs.");
    }
  };

  const [companyInfo, setCompanyInfo] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  // const [sports, setSports] = useState([]);

  const getCompanyInfo = async () => {
    let response = await getRequest({ API: `/user/company-info` });
    if (response?.data?.success) {
      setCompanyInfo(response?.data?.response || []);

      setMultiSport(response?.data?.response[0]?.is_multiple_academy)
      setMultiAcademy(response?.data?.response[0]?.is_sport_sub_academy)
      reset(response?.data?.response[0])
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
      router.push("/login");
    } else {
      // toast(response?.data?.message ?? "Something went wrong!");
    }
  };

  const onClickSubmit = async (e) => {

    setLoader(true);
    setValidated(true)

    let is_valid = true;

    Object.keys(boxes).map((row, index) => {
      // assigning value from parrent academy
      var data=boxes;
      data[row].academy_admin_fname = Object.values(boxes)[0].academy_admin_fname
      data[row].academy_admin_lname = Object.values(boxes)[0].academy_admin_lname
      data[row].academy_admin_contact = Object.values(boxes)[0].academy_admin_contact
      data[row].academy_admin_email = Object.values(boxes)[0].academy_admin_email
      // Validation
      if (data[row].trading_name == ''
        || data[row].ded_trade_name == ''
        || data[row].address == ''
        || data[row].academy_admin_fname == ''
        || data[row].academy_admin_lname == ''
        || data[row].academy_admin_contact == ''
        || data[row].academy_admin_email == ''
        || data[row].sport_id.length == 0
        || data[row].main_office_area == 0

      ) {
        is_valid = false;
      }
    });
    console.log(is_valid,boxes )
    if (is_valid) {

      var data = boxes;
      const response = await postRequest({
        API: `${process.env.NEXT_PUBLIC_API_SERVER_URL}academy/create-multiple`,
        DATA: data,
      });
      if (response?.data?.success) {
        toast("Academy Information updated");

      } else if (response?.status === 401) {
        toast("Unauthorize access please re-login.");
        router.push("/login");
      } else {
        toast(response?.data?.message || "Some thing went wrong");
      }
      nextButton(2);
    }



    setLoader(false);

  };

  const getSelectData = async () => {
    let response_c = await getRequest({ API: `country/list` });
    if (response_c?.data?.success) {
      setCountries(response_c?.data?.response || []);
    } else if (response_c?.status === 401) {
      toast("Unauthorize access please re-login.");
      router.push("/login");
    }

    let response_sport = await getRequest({ API: `activity/list` });
    if (response_sport?.data?.success) {

      const data_s = response_sport?.data?.response.map((list) => ({
        label: list.name,
        value: list._id,
      }));

      setSportOption(data_s);

      // setSports(response_sport?.data?.response || []);
    } else if (response_sport?.status === 401) {
      toast("Unauthorize access please re-login.");
      router.push("/login");
    }
    let response_area = await getRequest({ API: API_URLS.GET_VENUE_AREA });
    if (response_area?.data?.success) {
      const data_a = response_area?.data?.response.map((list) => ({
        label: list.locality_name,
        value: list._id,
      }));
      console.log(data_a);
      setAreaOptions(data_a);

      // setSports(response_sport?.data?.response || []);
    } else if (response_sport?.status === 401) {
      toast("Unauthorize access please re-login.");
      router.push("/login");
    }

    let response_s = await getRequest({ API: `state/list` });
    if (response_s?.data?.success) {
      setStates(response_s?.data?.response || []);
    } else if (response_s.status === 401) {
      toast("Unauthorize access please re-login.");
      router.push("/login");
    }
  };

  useEffect(() => {
    var newboxes = boxes;
    newboxes[Object.keys(boxes).length] = box_name
    setBoxes({
      ...newboxes
    })
    getSelectData();
    getCompanyInfo();

  }, []);

  const enableMutiSport = (value) => {
    setMultiSport(value);
    setValidated(false);
    setBoxes({ box_name })
    if (!value) {

      setMultiAcademy(false);
      setQnStep(1);
    }
  };


  const setSelectedCountry = (country_id) => {
    let response_s = getRequest({ API: `state/list` });
    if (response_s?.data?.success) {
      setStates(response_s?.data?.response || []);
    }
  };

  const enableMutiAcademy = (value) => {
    setMultiAcademy(value);

    setValidated(false);
    setBoxes([box_name])
    setQnStep(1);
  };


  const nextButton = (value) => {
    setQnStep(value + 1);
  };

  const prevButton = (value) => {
    setQnStep(value - 1);
  };



  const fixQnStep = (step) => {
    setQnStep(step);
  };

  const addItems = () => {
    if (multiAcademy && multiSport) {
      // setCount(count + 1);
      var newboxes = boxes;
      newboxes[Object.keys(boxes).length] = box_name
      setBoxes({
        ...newboxes
      })
      // boxes.push(
      //   box_name

      // )
    }

  };


  const removeItems = (index) => {
    setDeleteModal(true)
    setDeleteRow(index)
  };

  const removeItemBox = async () => {
    setDeleteModal(false)
    await delete boxes[deleteRow]
  };

  const setBoxValue = (index, name, value, data_type) => {
    // console.log(value);
    var new_data = boxes[index];

    if(data_type == 'single_array'){
      new_data[name] = value.split(',');
    }else if(data_type == 'multi_array'){ 
      const selected_sports =value.map((list) => list.value);
      new_data[name] = selected_sports;  
    }else{
      if (name == 'same_academy_admin' && value) {
        new_data[name] = true;
      } else {
        new_data[name] = value
      }
    }



    
    setBoxes({
      ...boxes,
      [index]: new_data
    })
  };
  return (

    <div className="container-fluid content-inner">
      <div className="row">
        <div className="col-sm-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <ul id="top-tab-list" className="p-0 row list-inline setup-content">
                <li onClick={(e) => fixQnStep(0)}
                  className={`mb-2 col-lg-3 col-md-6 text-start ${qnStep > 0 ? 'done' : ''}  ${qnStep >= 0 ? 'active' : ''}`}
                  id="account">
                  <a href="javascript:void(0);">
                    <div className="iq-icon me-3">
                      <FaQuestion width={20} />
                    </div>
                    <span className="dark-wizard">About Academy</span>
                  </a>
                </li>
                <li onClick={(e) => fixQnStep(1)} id="personal"
                  className={`mb-2 col-lg-3 col-md-6 text-start ${qnStep > 1 ? 'done' : ''} ${qnStep >= 1 ? 'active' : ''}`}
                >
                  <a href="javascript:void(0);">
                    <div className="iq-icon me-3">
                      <FaIdCard width={20} />
                    </div>
                    <span className="dark-wizard">Company Profile</span>
                  </a>
                </li>

                <li onClick={(e) => fixQnStep(2)} id="academy-info"
                  className={`mb-2 col-lg-3 col-md-6 text-start ${qnStep > 2 ? 'done' : ''} ${qnStep >= 2 ? 'active' : ''}`}
                >
                  <a href="javascript:void(0);">
                    <div className="iq-icon me-3">
                      <FaHandshake width={20} />
                    </div>
                    <span className="dark-wizard">Academy Info</span>
                  </a>
                </li>
                <li onClick={(e) => fixQnStep(3)} id="confirm"
                  className={`mb-2 col-lg-3 col-md-6 text-start ${qnStep > 3 ? 'done' : ''} ${qnStep >= 3 ? 'active' : ''}`}
                >
                  <a href="javascript:void(0);">
                    <div className="iq-icon me-3">
                      <FaCheck width={20} />
                    </div>
                    <span className="dark-wizard">Finish</span>
                  </a>
                </li>
              </ul>
              {/* fieldsets */}
              <fieldset className={`${qnStep == 0 ? 'd-block' : 'd-none'}`} >
                <div className="form-card text-start">
                  <div className="row">
                    <div className="col-12">
                      <h3 className="mb-4"></h3>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Is Your Academy a Multi Sports Academy?</label>
                        <div>
                          <span onClick={(e) => enableMutiSport(true)} className={`btn btn-round btn-primary ${styles.answerOption + ' ' + ((multiSport) ? styles.answerSelected : '')} `}><i className="fa fa-check"></i> Yes</span>
                          <span onClick={(e) => enableMutiSport(false)} className={`btn btn-round btn-danger ${styles.answerOption + ' ' + ((!multiSport) ? styles.answerSelected : '')} `} style={{ marginLeft: "10px" }}><i className="fa fa-times"></i> No</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    (multiSport && <div className="row pt-5">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Does each sports have their own Sub Academy Name?</label>
                          <div>
                            <span onClick={(e) => enableMutiAcademy(true)} className={`btn btn-round btn-primary ${styles.answerOption + ' ' + ((multiAcademy) ? styles.answerSelected : '')} `}><i className="fa fa-check"></i> Yes</span>
                            <span onClick={(e) => enableMutiAcademy(false)} className={`btn btn-round btn-danger ${styles.answerOption + ' ' + ((!multiAcademy) ? styles.answerSelected : '')} `} style={{ marginLeft: "10px" }}><i className="fa fa-times"></i> No</span>
                          </div>
                        </div>
                      </div>
                    </div>)
                  }



                </div>
                <button onClick={(e) => nextButton(0)} type="button" name="next" className="btn btn-primary next action-button float-end" value="Next">Save & Next</button>

              </fieldset>
              <fieldset className={`${qnStep == 1 ? 'd-block' : 'd-none'}`} >
                <form onSubmit={handleSubmit(handleCompanyCreation)} className="form-card text-start" encType="mutipart/form-data">
                  <div className="container-fluid">
                    <div className="forms">
                      <div className="row">
                        <h5 className="mb-3">Company Information</h5>
                        <div className="col-md-6 text-left">
                          <div className="form-group text-left">
                            <label className="form-label  text-left">Company Name</label>

                            <input
                              name="company_name"
                              type="text"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="Company Name"
                            />
                            {errors.company_name &&
                              errors.company_name.type === "required" ? (
                              <FormError error="Company Name is required" />
                            ) : null}
                          </div>
                        </div>
                        {!!companyInfo.logo && (
                          <div className="col-md-6">
                            <div className="form-group">
                              <img height={200} width={200} src={companyInfo.logo} />
                            </div>
                          </div>
                        )}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Company Logo</label>
                            <input
                              name="logo"
                              type="file"
                              accept="image/*"
                              ref={register}
                              className="form-control"
                              placeholder="Company Logo"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label">
                              Main Office Address
                            </label>
                            <textarea
                              name="main_office_address"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="Main Office Address"
                            ></textarea>
                            {errors.main_office_address &&
                              errors.main_office_address.type === "required" ? (
                              <FormError error="Main office address is required" />
                            ) : null}
                          </div>
                        </div>

                        {/* <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Latitude</label>
                          <input
                            name="latitude"
                            type="text"
                            ref={register}
                            className="form-control"
                            placeholder="Latitude"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-label">Longitude</label>
                          <input
                            name="longitude"
                            type="text"
                            className="form-control"
                            placeholder="Longitude"
                          />
                        </div>
                      </div> */}

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">Country</label>


                            <select
                              name="country"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-select"
                              placeholder="Country"
                              onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                              <option value=''>Select Country</option>
                              {countries.map((row) => (
                                <option value={row._id} key={row._id}>
                                  {row.name}
                                </option>
                              ))}
                            </select>


                            {errors.country &&
                              errors.country.type === "required" ? (
                              <FormError error="Country is required" />
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">State</label>
                            <select
                              name="state"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-select"
                              placeholder="State"
                            >
                              <option value=''>Select State</option>

                              {states.map((row) => (
                                <option value={row._id} key={row?._id}>
                                  {row.name}
                                </option>
                              ))}
                            </select>
                            {errors.state && errors.state.type === "required" ? (
                              <FormError error="State is required" />
                            ) : null}
                          </div>
                        </div>
                        <hr></hr>
                        <h5 className="mb-3">Managing Director Information</h5>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">MD First Name</label>
                            <input
                              name="md_first_name"
                              type="text"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="MD First Name"
                            />
                            {errors.md_first_name &&
                              errors.md_first_name.type === "required" ? (
                              <FormError error="MD First Name is required" />
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">MD Last Name</label>
                            <input
                              name="md_last_name"
                              type="text"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="MD Last Name"
                            />
                            {errors.md_last_name &&
                              errors.md_last_name.type === "required" ? (
                              <FormError error="MD Last Name is required" />
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">MD Email</label>
                            <input
                              name="md_email"
                              type="email"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="Md Email"
                            />
                            {errors.md_email &&
                              errors.md_email.type === "required" ? (
                              <FormError error="MD Email is required" />
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label">MD Contact</label>
                            <input
                              name="md_contact"
                              type="text"
                              {...register('test', {
                                required: true,
                              })}
                              className="form-control"
                              placeholder="MD Contact"
                            />
                            {errors.md_contact &&
                              errors.md_contact.type === "required" ? (
                              <FormError error="MD Contact is required" />
                            ) : null}
                          </div>
                        </div>


                      </div>



                    </div>
                  </div>
                  <button type="submit" name="next" className="btn btn-primary next action-button float-end" value="Next">Save & Next</button>
                  <button onClick={(e) => prevButton(1)} type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous">Previous</button>
                </form>
              </fieldset>
              <fieldset className={`${qnStep == 2 ? 'd-block' : 'd-none'}`} >
                <div className="form-card text-start">
                  <div className="forms mt-1">
                    <div className="row">

                      {Object.keys(boxes).map((row, index) => (
                        <>
                          {/* {(boxes[row] && <> */}
                          <div className="col-md-3">
                            <label className="form-label">
                              Academy Name
                              <span className={styles["span"]}>*</span>
                            </label>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Academy Name"
                                className="form-control"
                                name="trading_name"
                                value={boxes[row].trading_name}
                                onChange={(e) => setBoxValue(row, 'trading_name', e.target.value)}

                              />
                              {validated && boxes[row].trading_name == '' && <FormError error="Academy Name is required" />}

                            </div>

                          </div>
                          <div className="col-md-3">
                            <label className="form-label">
                              DED Trade Name
                              <span className={styles["span"]}>*</span>
                            </label>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="DED Trade Name"
                                className="form-control"
                                value={boxes[row].ded_trade_name}
                                name="ded_trade_name"
                                onChange={(e) => setBoxValue(index, 'ded_trade_name', e.target.value)}

                              />
                              {validated && boxes[row].ded_trade_name == '' && <FormError error="Trade Name is required" />}

                            </div>
                          </div>

                          <div className="col-md-3">
                            <label className="form-label">
                              Sports
                              <span className={styles["span"]}>*</span>
                            </label>
                            <div className="form-group">

                              {multiSport && !multiAcademy ? <Select
                                name="sport_id"
                                isMulti
                                defaultValue={boxes[row].sport_id || 'Select'}
                                onChange={(e) => setBoxValue(index, 'sport_id', e, 'multi_array')}
                                options={sportOptions}
                              /> : <Select
                                name="sport_id"
                                defaultValue={boxes[row].sport_id || 'Select'}
                                onChange={(e) => setBoxValue(index, 'sport_id', e.value, 'single_array')}
                                options={sportOptions}
                              />}

                              {validated && boxes[row].sport_id.length == 0 && <FormError error="Select Sport" />}




                            </div>
                          </div>

                          <div className="col-md-3">
                            <label className="form-label">
                              Main Office Area
                              <span className={styles["span"]}>*</span>
                            </label>
                            <div className="form-group">
                              <Select
                                name="main_office_area"
                                defaultValue={boxes[row].main_office_area || 'Select'}
                                onChange={(e) => setBoxValue(index, 'main_office_area', e.value)}
                                options={areaOptions}
                              />

                              {validated && boxes[row].main_office_area == 0 && <FormError error="Select Area" />}




                            </div>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">
                              Main Office Address
                              <span className={styles["span"]}>*</span>
                            </label>
                            <div className="form-group">
                              <input
                                value={boxes[row].address}
                                type="text"
                                placeholder="Main Office Address"
                                className="form-control"
                                name="address"
                                onChange={(e) => setBoxValue(index, 'address', e.target.value)}

                              />
                              {validated && boxes[row].address == '' && <FormError error="Main Office Address is required" />}


                            </div>
                          </div>
                          <h5 className="mb-2">Academy Admin Information</h5>
                          <div className="col-md-12">

                            {index > 0 &&
                              <div class="form-group">
                                <div class="form-check d-block">
                                  <input
                                    onChange={(e) => setBoxValue(index, 'same_academy_admin', e.target.checked)}
                                    //checked={row.same_academy_admin ? true:false}
                                    checked={boxes[row].same_academy_admin}
                                    class="form-check-input" type="checkbox" value="1" id={index} name="same_academy_admin" />
                                  <label class="form-check-label" for={index}>
                                    Is this the same admin details as the above admin?
                                  </label>
                                </div>
                              </div>
                            }
                          </div>
                          {boxes[row].same_academy_admin == false &&
                            <>
                              <div className="col-md-3">
                                <label className="form-label">
                                  First Name
                                  <span className={styles["span"]}>*</span>
                                </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    placeholder="First Name"
                                    value={boxes[row].same_academy_admin == true ? Object.values(boxes)[0].academy_admin_fname : boxes[row].academy_admin_fname}
                                    className="form-control"
                                    name="academy_admin_fname"
                                    onChange={(e) => setBoxValue(row, 'academy_admin_fname', e.target.value)}

                                  />
                                  {validated && boxes[row].academy_admin_fname == '' && <FormError error="Academy Admin First Name is required" />}

                                </div>
                              </div>
                              <div className="col-md-3">
                                <label className="form-label">
                                  Last Name
                                  <span className={styles["span"]}>*</span>
                                </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={boxes[row].same_academy_admin == true ? Object.values(boxes)[0].academy_admin_fname : boxes[row].academy_admin_lname}
                                    className="form-control"
                                    name="academy_admin_lname"
                                    onChange={(e) => setBoxValue(index, 'academy_admin_lname', e.target.value)}

                                  />
                                  {validated && boxes[row].academy_admin_lname == '' && <FormError error="Academy Admin Last Name is required" />}

                                </div>
                              </div>
                              <div className="col-md-3">
                                <label className="form-label">
                                  Contact Number
                                  <span className={styles["span"]}>*</span>
                                </label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    placeholder="Contact Number"
                                    className="form-control"
                                    name="academy_admin_contact"
                                    value={boxes[row].same_academy_admin == true ? Object.values(boxes)[0].academy_admin_fname : boxes[row].academy_admin_contact}
                                    onChange={(e) => setBoxValue(index, 'academy_admin_contact', e.target.value)}

                                  />
                                  {validated && boxes[row].academy_admin_contact == '' && <FormError error="Academy Admin Contact is required" />}

                                </div>
                              </div>
                              <div className="col-md-3">
                                <label className="form-label">
                                  Email ID
                                  <span className={styles["span"]}>*</span>
                                </label>
                                <div className="form-group">
                                  <input
                                    type="email"
                                    placeholder="Email ID"
                                    className="form-control"
                                    name="academy_admin_email"
                                    value={boxes[row].same_academy_admin == true ? Object.values(boxes)[0].academy_admin_fname : boxes[row].academy_admin_email}
                                    onChange={(e) => setBoxValue(index, 'academy_admin_email', e.target.value)}

                                  />
                                  {validated && boxes[row].academy_admin_email == '' && <FormError error="Academy Admin Email is required" />}

                                </div>
                              </div>
                            </>
                          }
                          {
                            multiAcademy && multiSport && (
                              <div className="col-md-3">
                                <label className="form-label">

                                </label>
                                <div className="form-group mt-1">

                                  <button onClick={addItems} className="btn btn-round btn-primary"><FaPlusCircle /></button>
                                  {index > 0 &&
                                    <button onClick={() => removeItems(row)} className="btn btn-round  btn-danger ms-1"><FaMinusCircle /></button>
                                  }
                                </div>
                              </div>

                            )}
                          <hr />
                          {/* </> */}
                          {/* // )} */}
                        </>
                      ))}
                    </div>
                  </div>
                </div>

                {loader ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <button onClick={(e) => onClickSubmit()} type="button" name="next" className="btn btn-primary next action-button float-end" value="Next">Save & Next</button>
                )}


                <button onClick={(e) => prevButton(2)} type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous">Previous</button>
              </fieldset>
              <fieldset className={`${qnStep == 3 ? 'd-block' : 'd-none'}`} >
                <div className="form-card">

                  <br /><br />
                  <h2 className="text-center text-success"><strong>SUCCESS !</strong></h2>
                  <br />
                  <div className="row justify-content-center">
                    <div className="col-12 text-center">
                      <FaCheck width={400} />
                    </div>
                  </div>
                  <br /><br />
                  <div className="row justify-content-center">
                    <div className="text-center col-7">
                      <h5 className="text-center purple-text">You Have Successfully Set Up Company Profile</h5>
                    </div>
                  </div>
                </div>
              </fieldset>
              <ConfirmationModal
                heading="Confirm"
                body="Are you sure to delete this row?"
                show={deleteModal}
                onCloseModal={() => setDeleteModal(false)}
                handelDelete={() => removeItemBox()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSetUpWindow;