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
import QRCode from 'qrcode.react';
import Barcode from 'react-jsbarcode';


const Barcodeprint = (props) => {
  const [registations, setRegistations] = useState([]);
  const [event, setEvent] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  async function getRegistrations() {
    if(props.badges!=undefined){
      var response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?filters[id][$eqi]='+props.badges+'&populate[]=Nationality&pagination[page]=1&pagination[pageSize]=100&filters[regsitration_items][event][id][$eqi]=' + props.event+'&sort=id:desc' });
    }else{
      var response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?populate[]=Nationality&pagination[page]=1&pagination[pageSize]=100&filters[regsitration_items][event][id][$eqi]=' + props.event+'&sort=id:desc' });
    }
    console.log(props.badges, "props.badgesprops.badges")
    var data = []
    if (await response?.status === 200) {
      data.push(response?.data?.data)
      setPagination(response?.data?.meta)
      setRegistations(data);
      setIsLoading(false)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  async function getEvent() {
    const response = await getRequest({ API: API_URLS.GET_EVENTS + "/"+props.event + "?populate[]=qrcodeDelegates" });
    if (response?.status === 200) {
      setEvent(response?.data?.data);
    }
  }
  useEffect(() => {
    getRegistrations();
    getEvent()
  }, []);
  return (
    <div className="container-fluid content-inner openCheckList">

      <div className="card  mt-3 mb-3">
        <div className="card-body">
          <div>
            {isLoading ? (
              <div className="text-center p-5 mt-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>

            ) : (
              <>
                 {Object.keys(event).length ? (
                  <div className="print-badge" style={{ "display": "flex", "gap": "1px", "flex-wrap": "wrap", "position": "relative" }}>

                    {registations[0]?.map((value, index) => {
                      return <div key="index" className={index%6==0?"pagebreak print-badge-box-bar": "print-badge-box-bar"} style={{ "position": "relative" }}>
                        <h1>
                          {event.attributes.title}
                        </h1>
                        {/* <img className="qrcode" style={{ "width": "260px" }} src="/images/qrcode.jpg" /> */}
                        <Barcode value={value.id} />
                        <h2 style={{
                          "z-index": "999",
                          "font-size": "1rem",
                          "bottom": "31%",
                          "width": "100%",
                          "text-align": "center"
                        }}> {(value.attributes.title != null ? value.attributes.title + " ": "") + value.attributes.firstName + " " + value.attributes.lastName}</h2>
                        <p>{(event.attributes.referenceNumber != "" && event.attributes.referenceNumber != null)==true ? "Ref : "+ value.attributes.referenceNumber: ""}</p>
                      </div>
                    })}
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
    </div>
  );
};

export default Barcodeprint;
