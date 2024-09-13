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


const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [pagemeta, setPageMeta] = useState(false);
  async function getevents() {
    const response = await getRequest({ API: API_URLS.GET_EVENTS + "?pagination[page]=" + props.page.replace("page-", "") + "&sort=id:desc" });
    if (response?.status === 200) {
      setEvents(response?.data?.data);
      setPageMeta(response?.data?.meta)
      setIsLoading(false)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  let filterchecklist = (value) => {
    getChecklist();
  }
  useEffect(() => {
    getevents();
  }, [props.page]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  return (
    <div className="container-fluid content-inner openCheckList bg-gray">
      <BackButton />
      <div className="page-header row">
        <div className="col-6">
          <h4 className="page-title">
            Conference {props.event}
          </h4>
          <span>
            {events.length} entries found
          </span>
        </div>
        <div className="col-6 create-button text-right">
          <Link legacyBehavior href={"add"}>
            <a>
              <HiPlus /> Create New Entry
            </a>
          </Link>
        </div>
      </div>

      <div className="filterbar">

        {/* <div className="searchbar">
          <input onChange={(e) => filterchecklist(e.target.value)} placeholder="Search" type="text" />
          <IoSearch />
        </div> */}
        {/* <div className="filteropener" onClick={() => setFilter(!filter)}>
          <IoFilterSharp /> Filters
        </div> */}
      </div>
      <div className="card  mt-3 mb-3">
        <div className="card-body">
          {filter == true &&
            <div className="row filter align-items-center">
              <div>
                <div className="form-group">
                  <label
                    className="form-label"
                    for="exampleFormControlSelect1"
                  >
                    Events
                  </label>
                  <Select
                    // value={selectedVenue}
                    onChange={(value) => onChangeInput('checklist_type', value)}
                    options={eventOption}
                  />
                </div>
              </div>
              <div>
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
              <div>
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
              <div>
                <div className="form-group">
                  <label
                    className="form-label"
                    for="exampleFormControlSelect1"
                  >
                    Date
                  </label>
                  <DatePicker
                    className="white_input datepicker-input"
                    inputmode='none'
                    dateFormat="yyyy-MM-dd"
                    placeholderText={'Please Select Prefered Date*'}
                  // selected={new Date()}
                  >
                  </DatePicker>
                </div>
              </div>
              <div>
                <div className="mt-3">
                  <button
                    type="submit"
                    // onClick={() => Generate()}
                    className="btn btn-primary py-2 px-5"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
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
                {events?.length ? (
                  <div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Ref</th>
                          {/* <th scope="col">VenueChecklist No</th> */}
                          <th scope="col">Event</th>
                          <th scope="col">Type</th>
                          <th scope="col"> Start Date</th>
                          <th scope="col"> End Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((value) => {
                          return <tr>
                            <td>
                              {value.attributes.referenceId}
                            </td>
                            <td>
                              {value.attributes.title}
                            </td>
                            <td>
                              {value.attributes.type}
                            </td>
                            <td>
                              {value.attributes.courseDateFrom}
                            </td>
                            <td>
                              {value.attributes.courseDateTo}
                            </td>
                            <td>
                              {props.pageSource == "samrtPrint" ?

                                <div className="flex-btns">
                                  <Link legacyBehavior href={"/events/manage/smart-print/delegates-badge/" + value.id + "/"}>
                                    <a style={{ margin: "10px" }} className=" bg-l-yellow labelstyle">
                                      <FiEdit /> Delegates Badge
                                    </a>
                                  </Link>
                                  <Link legacyBehavior href={"/events/manage/smart-print/registration-barcode/" + value.id + "/"}>
                                    <a style={{ margin: "10px" }} className="bg-l-violet labelstyle">
                                      <FiEdit /> Registration Barcode
                                    </a>
                                  </Link>
                                </div>
                                :
                                <>
                                  {props.pageSource == "attendance" ?
                                    <div className="flex-btns">
                                      <Link legacyBehavior href={"/attendance/" + value.attributes.referenceId + "/" + value.id + "/check-in"}>
                                        <a style={{ margin: "10px" }} className=" bg-l-yellow labelstyle">
                                          <FiEdit /> check in
                                        </a>
                                      </Link>
                                      <Link legacyBehavior href={"/attendance/" + value.attributes.referenceId + "/" + value.id + "/check-out/"}>
                                        <a style={{ margin: "10px" }} className="bg-l-violet labelstyle">
                                          <FiEdit /> check out
                                        </a>
                                      </Link>
                                    </div>
                                    : <div>
                                      <Link legacyBehavior href={"/events/manage/edit/" + value.id}>
                                        <a className="col-12 bg-l-yellow labelstyle">
                                          <FiEdit /> Edit
                                        </a>
                                      </Link>
                                      <Link legacyBehavior href={"/events/manage/edit/" + value.id}>
                                        <a className="col-12 bg-black labelstyle ml-5">
                                          <AiOutlineEye />  View
                                        </a>
                                      </Link>
                                    </div>
                                  }
                                </>
                              }
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
          <Pagination resultCount={pagemeta.pagination?.total} pageCount={pagemeta.pagination?.pageSize} currentPage={pagemeta.pagination?.page} />

        </div>
      </div>
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

export default Events;
