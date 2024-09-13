import React, { useEffect, useState } from "react";
import Select from "react-select";
import { deleteRequest, getRequest, postRequest, putRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import VenueFacility from "components/venueFacility";
import ConfirmationModal from "components/modal/ConfirmationModal";
import moment from "moment";
import { HiPlus } from "react-icons/hi"
import BackButton from "components/general/backButton";
import { FaSave } from "react-icons/fa"
import { IoIosAttach } from "react-icons/io"
import Link from "next/link";
import debounce from 'lodash.debounce';

const addEditView = (props) => {
  const router = useRouter()
  const [facilityList, setFacilityList] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    venue_id: "63fe2e827531c65e55ce3521",
    checklist_session: "AM",
    checklist_type: "Opening"
  });
  const [openchecklsitq, setOpenchecklsitq] = useState([])
  const [venueOptions, setVenueOption] = useState([]);
  const [eventOption, setEventOption] = useState([
    {
      label: "Opening",
      value: "Opening",
    },
    {
      label: "Closing",
      value: "Closing",
    }
  ]);
  const [sectionOption, setSectionOption] = useState([
    {
      label: "Morning",
      value: "AM",
    },
    {
      label: "Evening",
      value: "PM",
    }
  ]);

  // const router = useRouter();


  async function getVenueList() {
    const response = await getRequest({ API: API_URLS.GET_VENUE_LIST });
    if (response?.status === 200) {
      const data = response.data.response.map((list) => ({
        label: list.venue_name,
        value: list._id,
      }));
      setVenueOption(data);
      setIsLoading(false)
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }

  async function Generate() {
    const response = await postRequest({ API: API_URLS.VENUE_CHECKLIST + '/create/', DATA: formData, });
    if (response?.status === 200) {
      // console.log(response.data.response);
      router.push("/facility/venue/check-lists/open-checklist/edit/" + response.data.response[0]._id)
      toast("Generated");
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else if (response.status === 400) {
      console.log(response.data)
      toast("Open Check List Already Exist.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  const debouncedApiCall = React.useCallback(
    debounce(async (value) => {
      var response = await postRequest({ API: API_URLS.SAVE_CHECKLIST_ANSWER + "question-comment", DATA: value })
      if (response?.status === 200) {
        toast("Comment Updated");
      } else if (response.status === 401) {
        toast("Unauthorize access please re-login.");
      } else if (response.status === 400) {
        toast("Check List Already Exist.");
      } else {
        toast(response?.data?.error || "Some thing went wrong.");
      }
    }, 1500),
    []
  );
  async function saveAnswer(formData) {
    const response = await postRequest({ API: API_URLS.SAVE_CHECKLIST_ANSWER + "question-check", DATA: formData });
    if (response?.status === 200) {
      // router.push("/facility/venue/check-lists/open-checklist/edit/" + response.data.response[0]._id)
      toast("Answer Saved");
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else if (response.status === 400) {
      console.log(response.data)
      toast("Open Check List Already Exist.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  async function saveComment(formData) {
    debouncedApiCall(formData)
  }

  async function viewgeneratedchecklist(id) {
    const response = await getRequest({ API: API_URLS.VENUE_CHECKLIST + '/view/' + id });
    if (response?.status === 200) {
      console.log(response.data)
      setOpenchecklsitq(response.data.response)
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else if (response.status === 400) {
      toast("Check List Already Exist.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }

  useEffect(() => {
    // if (props.action == "add") {
    //   getVenueList();
    // }
    getVenueList();
    if (props.action == "edit" || props.action == "view") {
      viewgeneratedchecklist(props.id);
    }
  }, []);

  const resetFilter = () => {
    setSelectedVenue("");
  };
  const onChangeInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.value }));
  };
  const submitChecklist = async (id) => {
    const response = await putRequest({ API: API_URLS.VENUE_CHECKLIST + '/submit/' + id });
    if (response?.status === 200) {
      setOpenchecklsitq(response.data.response)
      router.push("/facility/venue/check-lists/open-checklist/view/" + id)
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else if (response.status === 400) {
      toast("Check List Already Exist.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  const handlesubmit = async () => {
    const response = await postRequest({ API: API_URLS.VENUE_CHECKLIST + "update", DATA: formData });
    if (response?.status === 200) {
      // router.push("/facility/venue/check-lists/open-checklist/edit/" + response.data.response[0]._id)
      toast("Answer Saved");
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else if (response.status === 400) {
      console.log(response.data)
      toast("Open Check List Already Exist.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  return (

    <>


      <div className="container-fluid content-inner openCheckList">
        <BackButton />
        <div className="page-header row">
          <div className="col-6">
            <h4 className="page-title">
              {props.action} Checklist
            </h4>
            <span>
              Add New entry
            </span>
          </div>
          <div className="col-6 create-button text-right">
            {/* <Link legacyBehavior href={"add"}> */}
            {(openchecklsitq[0]?.is_submitted != true && props.action == "edit") &&
              <button onClick={() => submitChecklist(openchecklsitq[0]._id)} className="bg-green">
                <FaSave className="mr-2 pr-2" />
                Save and Publish
              </button>
            }
            <Link legacyBehavior href={"add"}>
              <a>
                <HiPlus /> Create New Entry
              </a>
            </Link>
            {/* </Link> */}
          </div>
        </div>
        {(props.action == "add") &&
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
                        Event
                      </label>
                      <Select
                        // value={selectedVenue}
                        onChange={(value) => onChangeInput('checklist_type', value)}
                        options={eventOption}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label
                        className="form-label"
                        for="exampleFormControlSelect1"
                      >
                        Venues
                      </label>
                      <Select
                        onChange={(value) => onChangeInput('venue_id', value)}
                        options={venueOptions}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label
                        className="form-label"
                        for="exampleFormControlSelect1"
                      >
                        Section
                      </label>
                      <Select
                        onChange={(value) => onChangeInput('checklist_session', value)}
                        options={sectionOption}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div>
                      <button
                        type="submit"
                        onClick={() => Generate()}
                        className="btn btn-primary col-12 mt-3"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {openchecklsitq.length > 0 &&
          <>

            {isLoading == true ?
              <div className="text-center p-5 mt-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
              :
              <>
                <div className="card mt-3 mb-3">
                  <div className="card-body pb-0">
                    <table className="col-12 table caption">
                      <thead>
                        <tr>
                          <th scope="col">Submitted at</th>
                          {/* <th scope="col">VenueChecklist No</th> */}
                          <th scope="col">Venue Name</th>
                          <th scope="col">Session</th>
                          <th scope="col">Staff Member</th>
                          <th scope="col">Concern</th>
                          <th scope="col">Venue Check list type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-right">
                          <td> {moment(openchecklsitq[0].createdAt).format('dddd DD MMMM YYYY')}</td>
                          <td>  {openchecklsitq[0].venue?.venue_name}</td>
                          {/* <td>{openchecklsitq[0].venue?.venue_name}</td> */}
                          <td><span className={`labelstyle ${openchecklsitq[0].checklist_type.toLowerCase() == "opening" ? "bg-l-blue" : "bg-l-violet"}`}>{openchecklsitq[0].checklist_session = 'AM' ? "Morning" : "Evening"}</span></td>
                          <td>{"Muhammed"}</td>
                          <td>{(openchecklsitq[0].remarks != null ? <span className="notgood"> Yes</span> : <span className="good">No Concerns</span>)}</td>
                          <td>{openchecklsitq[0].checklist_type}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card card-body mt-3 mb-3">

                  <table className="col-12 table">
                    <thead>
                      <tr>
                        <th scope="col">Q No</th>
                        {/* <th scope="col">VenueChecklist No</th> */}
                        <th scope="col">Normal Checks</th>
                        <th scope="col">Checked</th>
                        <th scope="col">Time Checked</th>
                        <th scope="col">Comment/Concerns</th>
                      </tr>
                    </thead>
                    <tbody>
                      {openchecklsitq[0].checklist.map((key, index) => {
                        return (<tr class="border-right">
                          <td> N{index}</td>
                          <td> {key.checklist_questions.name}</td>
                          <td>
                            <label class="modernchecklist">
                              <input onChange={(target) => saveAnswer(
                                {
                                  "checklist_question_id": key.checklist_questions._id,
                                  "venue_checklist_id": key.venue_checklist_id,
                                  "is_checked": target.target.checked
                                }
                              )} type="checkbox" disabled={openchecklsitq[0]?.is_submitted} defaultChecked={key.is_checked} />
                              <span class="checkmark"></span>
                            </label>
                          </td>
                          <td>{key.checklist_questions.checked_at}</td>
                          <td>
                            <div className="input-group">
                              {openchecklsitq[0]?.is_submitted != true ?
                                <textarea onChange={(target) => saveComment(
                                  {
                                    "checklist_question_id": key.checklist_questions._id,
                                    "venue_checklist_id": key.venue_checklist_id,
                                    "comment": target.target.value
                                  }
                                )} defaultValue={key.comment != "" && key.comment} placeholder="Comment" />
                                : <span>{key.comment}</span>
                              }
                            </div>

                          </td>

                        </tr>)
                      }
                      )
                      }
                    </tbody>
                  </table>

                  <ul className="bottom-closing-table list-unstyled">
                    <form onSubmit={() => handlesubmit()}>
                      <li className="row">
                        <div className="col-12"> <div className="col-12 pb-2"><b>Remarks :</b> </div><textarea placeholder="concerns" /></div>
                        <div className="col-12"> 
                        {openchecklsitq[0]?.is_submitted != true &&
                        <li>
                          <label className="atachments bg-l-violet-dk">
                            <input type="file" />
                            <IoIosAttach className="mr-2 pr-2 ml-2" />
                            Upload Document
                          </label>
                        </li>
                      }
                        <label class="modernchecklist concern">
                              <input type="checkbox" />
                              <span class="checkmark"></span>
                              Cause For Concern
                            </label>
                          </div>
                      </li>
                      {/* {JSON.stringify(openchecklsitq[0].is_submitted)} */}
                      {openchecklsitq[0]?.is_submitted != true &&
                        <li>
                          <button type="submit" className="bg-green atachments">
                            <FaSave className="mr-2 pr-2" />
                            Save
                          </button>
                        </li>
                      }
                    </form>
                  </ul>

                </div>
                <ConfirmationModal
                  show={isDelete}
                  onCloseModal={() => setIsDelete(false)}
                  heading="Delete"
                  body="Are you sure to delete this facility"
                // handelDelete={onDelete}
                />
              </>

            }
          </>
        }
      </div>

    </>
  );
};

export default addEditView;
