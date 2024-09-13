import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import { deleteRequest, getRequest, postRequest } from "helper/api";
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
import Pagination from "components/utility/pagination";

const Registrations = (props) => {
  const [registations, setRegistations] = useState([]);
  const [event, setEvent] = useState([]);

  const [paginations, setPaginations] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);

  async function getRegistrations(value = false) {
    var response;
    if (value != false) {
      response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?populate[]=Nationality&pagination[page]=' + props.page.replace("page-", "") + '&filters[$or][0][firstName][$containsi]=' + value + '&filters[$or][1][lastName][$containsi]=' + value + '&filters[$or][2][Email][$containsi]=' + value + '&filters[$or][3][id][$containsi]=' + value+'&filters[$or][4][mobile][$containsi]=' + value +'&pagination[pageSize]=21&filters[regsitration_items][event][id][$eqi]=' + props.event + '&sort=id:desc' });
    } else {
      response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?populate[]=Nationality&pagination[page]=' + props.page.replace("page-", "") + '&pagination[pageSize]=21&filters[regsitration_items][event][id][$eqi]=' + props.event + '&sort=id:desc' });
    }
    var data = []
    if (await response?.status === 200) {
      // data.push(response?.data?.data)
      setPaginations(response?.data?.meta)
      setRegistations(response?.data?.data);
      setIsLoading(false)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  function calcAttendance(attendance) {
    var totalHours = 0
    var total = 0
    // attendance.map((key, val) => {
    //   total = total + totalHours + key.hoursSpend
    // })
    console.log(total, "total")
    return total
  }
  let filterchecklist = (value) => {
    getChecklist();
  }
  async function getEvent() {
    const response = await getRequest({ API: API_URLS.GET_EVENTS + "/" + props.event });
    if (response?.status === 200) {
      setEvent(response?.data?.data);
    }
  }
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
  let filterSearch = (value) => {
    getRegistrations(value);
  }
  useEffect(() => {
    getRegistrations();
    getEvent();
  }, [props.page, props.event]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  return (
    <div className="container-fluid content-inner openCheckList">
      {props.fromPage == undefined && props.fromPage != "validate" &&
        <>
          <BackButton />
          <div className="page-header row">
            <div className="col-6">
              <h4 className="page-title">
                {event?.attributes?.type + ": " + event?.attributes?.title}
              </h4>
              <span>
                {registations.length} entries found
              </span>
            </div>
            <div className="col-6 create-button text-right">
              <Link legacyBehavior href={"/registration/events/" + props.event + "/register"}>
                <a>
                  <HiPlus /> Create New Entry
                </a>
              </Link>
            </div>
          </div>
        </>
      }
      <div className="filterbar">

        <div className="searchbar">
          <input onChange={(e) => filterSearch(e.target.value)} placeholder="Search" type="text" />
          <IoSearch />
        </div>
        <div className="filteropener" onClick={() => setFilter(!filter)}>
          <IoFilterSharp /> Filters
        </div>
      </div>
      <div className="card mt-3" style={{ overflow: "auto" }}>
        <div className="card-body pb-0">
          {filter == true &&
            <></>
            // <div className="row filter align-items-center">
            //   <div>
            //     <div className="form-group">
            //       <label
            //         className="form-label"
            //         for="exampleFormControlSelect1"
            //       >
            //         Events
            //       </label>
            //       {/* <Select
            //         // value={selectedVenue}
            //         onChange={(value) => onChangeInput('checklist_type', value)}
            //         // options={eventOption}
            //       /> */}
            //     </div>
            //   </div>
            //   <div>
            //     <div className="form-group">
            //       <label
            //         className="form-label"
            //         for="exampleFormControlSelect1"
            //       >
            //         Venues
            //       </label>
            //       {/* <Select
            //         onChange={(value) => onChangeInput('venue_id', value)}
            //         options={venueOptions}
            //       /> */}
            //     </div>
            //   </div>
            //   <div>
            //     <div className="form-group">
            //       <label
            //         className="form-label"
            //         for="exampleFormControlSelect1"
            //       >
            //         Section
            //       </label>
            //       {/* <Select
            //         onChange={(value) => onChangeInput('checklist_session', value)}
            //         options={sectionOption}
            //       /> */}
            //     </div>
            //   </div>
            //   <div>
            //     <div className="form-group">
            //       <label
            //         className="form-label"
            //         for="exampleFormControlSelect1"
            //       >
            //         Date
            //       </label>
            //       {/* <DatePicker
            //         className="white_input datepicker-input"
            //         inputmode='none'
            //         dateFormat="yyyy-MM-dd"
            //         placeholderText={'Please Select Prefered Date*'}
            //       // selected={new Date()}
            //       >
            //       </DatePicker> */}
            //     </div>
            //   </div>
            //   <div>
            //     <div className="mt-3">
            //       <button
            //         type="submit"
            //         // onClick={() => Generate()}
            //         className="btn btn-primary py-2 px-5"
            //       >
            //         Search
            //       </button>
            //     </div>
            //   </div>
            // </div>
          }
          <div>
            {isLoading ? (
              <div className="text-center p-5 mt-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>

            ) : (
              <>
                {registations?.length ? (
                  <div>
                    <table class="table mb-0 pb-0">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          {/* <th scope="col">VenueChecklist No</th> */}
                          <th scope="col">Full Name</th>
                          <th scope="col">Nationality</th>
                          <th scope="col">Email</th>
                          <th scope="col">Workplace</th>
                          <th scope="col">Mobile</th>
                          {/* <th scope="col"> Work City</th> */}
                          {/* <th scope="col"> Seat Conformation</th> */}
                          {/* <th scope="col"> Hours Spend</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registations?.map((value) => {
                          return <tr>
                            <td>
                              {event?.attributes?.referenceId + value?.id}
                            </td>
                            <td>
                              {(value.attributes.title != null ? value.attributes.title : "")} {value.attributes.firstName} {value.attributes.lastName}
                            </td>
                            <td>
                              {value.attributes?.Nationality?.data?.attributes?.name}
                            </td>
                            <td>
                              {value.attributes.email}
                            </td>
                            <td>
                              {value.attributes.workPlace}
                            </td>
                            <td>
                              {value.attributes.mobileCountry}  {value.attributes.mobile}
                            </td>
                            {/* <td>
                              {value.attributes.attendances?.data?.length >= 1 ?
                                <>
                                  <span style={{ color: "#fff" }} className="col-12 bg-green labelstyle">Attended</span>
                                </> : <span style={{ color: "#fff" }} className="col-12 bg-at-red labelstyle">No Attendance</span>}
                            </td> */}
                            <td>
                              {props.fromPage == undefined && props.fromPage != "validate" ?
                                <Link legacyBehavior href={"/registration/events/" + props.event + "/edit/" + value.id}>
                                  <a className="col-12 bg-l-red labelstyle">
                                    <FiEdit /> Edit / View
                                  </a>
                                </Link>
                                :
                                <Link legacyBehavior href={"/registration/events/" + props.event + "/edit/" + value.id+ "?from=validate"}>
                                  <a className="col-12 bg-l-red labelstyle">
                                    <FiEdit /> Validate
                                  </a>
                                </Link>
                              }
                              {/* <Link legacyBehavior href={"/registration/events/" + props.event + "/view/" + value.id}>
                                <a className="col-12 bg-l-red labelstyle">
                                  <FiEdit /> View
                                </a>
                              </Link> */}
                            </td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="card">
                    <div class="card-body">
                      <div className="text-center">No Data Found...</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
      {paginations?.pagination?.total &&
        <Pagination resultCount={paginations?.pagination?.total} currentPage={paginations?.pagination?.page} pageCount={21} />
      }
      <ConfirmationModal
        show={isDelete}
        onCloseModal={() => setIsDelete(false)}
        heading="Delete"
        body="Are you sure to delete this facility"
      // handelDelete={onDelete}
      />
    </div>
  );
};

export default Registrations;
