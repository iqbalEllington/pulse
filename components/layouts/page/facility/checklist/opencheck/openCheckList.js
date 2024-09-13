import React, { useEffect, useState } from "react";
import Select from "react-select";
import { deleteRequest, getRequest, postRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import VenueFacility from "components/venueFacility";
import ConfirmationModal from "components/modal/ConfirmationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Openchecklsit from "../datatable/openchecklsit";
import BackButton from "components/general/backButton";
import Link from "next/link";
import {HiPlus} from "react-icons/hi"
import {IoFilterSharp,IoSearch} from "react-icons/io5"
const OpenCheckList = () => {
  const [openchecklists, setOpenchecklists] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter,setFilter]= useState(false);
  const [formData, setFormData] = useState({
    "venue_id": "63fe2e827531c65e55ce3521",
    "checklist_session": "AM",
    "checklist_type": "Opening"
  });
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
    const response = await getRequest({ API: API_URLS.VENUE_CHECKLIST });
    if (response?.status === 200) {
      const data = response.data.response.map((list) => ({
        label: list.venue_name,
        value: list._id,
      }));
      setVenueOption(data);
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  async function getChecklist() {
    const response = await getRequest({ API: API_URLS.VENUE_CHECKLIST + "/list" });
    console.log(response)
    if (response?.status === 200) {
      // const data = response.data.response.map((list) => ({
      //   label: list.venue_name,
      //   value: list._id,
      // }));
      setOpenchecklists(response.data?.response);
      setIsLoading(false)
    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  async function Generate() {
    const response = await postRequest({ API: API_URLS.GENERATE_CHECKLIST, DATA: formData, });
    if (response?.status === 200) {
      console.log(response.data)
      toast("here are we.");

    } else if (response.status === 401) {
      toast("Unauthorize access please re-login.");
    } else if (response.status === 400) {
      toast("Check List Already Exist.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }

  useEffect(() => {
    getVenueList();
    getChecklist();
  }, []);

  const resetFilter = () => {
    setSelectedVenue("");
  };
  const onChangeInput = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value.value }));
  };

  return (
    <div className="container-fluid content-inner openCheckList">
      <BackButton />
      <div className="page-header row">
      <div className="col-6">
        <h4 className="page-title">
          Open Checklist
        </h4>
        <span>
          {openchecklists.length} entries found
        </span>
      </div>
      <div className="col-6 create-button text-right">
        <Link legacyBehavior href={"add"}>
          <a>
            <HiPlus/> Create New Entry
            </a>
        </Link>
      </div>
      </div>

      <div className="filterbar"> 
      <div className="searchbar">
        <IoSearch/>
        <input placeholder="Search" type="text"/>
      </div>
      <div className="filteropener" onClick={()=>setFilter(!filter)}>
      <IoFilterSharp/> Filters
      </div>
      </div>
      <div className="card  mt-3 mb-3">
        <div className="card-body">
        {filter==true &&
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
                {openchecklists?.length ? (
                  <div>
                    {/* {openchecklists?.map((facility) => ( */}
                    <Openchecklsit
                      checklistgenerated={openchecklists}
                      setIsDelete={setIsDelete}
                    // key={facility?._id}
                    />
                    {/* ))} */}
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

export default OpenCheckList;
