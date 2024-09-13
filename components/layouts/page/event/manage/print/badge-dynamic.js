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


const Badge = (props) => {
  const [registations, setRegistations] = useState([]);
  const [event, setEvent] = useState([]);
  const router = useRouter();

  const [pagination, setPagination] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  async function getRegistrations() {
    if (props.badges != undefined) {
      var response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?filters[id][$eqi]=' + props.badges + '&populate[]=Nationality&pagination[page]=1&pagination[pageSize]=1000&filters[regsitration_items][event][id][$eqi]=' + props.event + '&sort=id:desc' });
    } else {
      var response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?populate[]=Nationality&pagination[page]=1&pagination[pageSize]=1000&filters[regsitration_items][event][id][$eqi]=' + props.event + '&sort=id:desc' });
    }
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
    const response = await getRequest({ API: API_URLS.GET_EVENTS + "/" + props.event + "?populate[]=badge_design.background" });
    if (response?.status === 200) {
      setEvent(response?.data?.data);
    }
  }
  const [isValidate,setIsvalidete]=useState(false)

  useEffect(() => {
    getRegistrations();
    getEvent()
    const { from } = router.query;

    if(from !=undefined){
      setIsvalidete(true)
    }
  }, []);
  useEffect(() => {

    const printPage = () => {
      window.print();
    };

    // Call printPage after component has finished rendering
    // by scheduling it in the next event loop iteration
    
    if(event.length!=0 && registations.length != 0){
      setTimeout(printPage, 400);
    }
  }, [event,registations]);
  const [defaultOptions, setDefaultOptions] = useState([]);
  return (
    <div className="container-fluid content-inner openCheckList p-0 m-0">
      <div className="card m-0">
        <div className="card-body m-0 p-0">
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
                    {registations[0]?.map((value) => {
                      return <div className="print-badge-box" style={{ "position": "relative", "width": event.attributes.badge_design.data.attributes.BadgewidthCM + "cm", "height": event.attributes.badge_design.data.attributes.badgeHeightCM + "cm" }}>
                        {(event.attributes.badge_design?.data?.attributes?.background?.data?.attributes?.url && isValidate==false) &&
                          <img className="qrcode" alt="Qr code is Missing please set qr code image on the event creation form" style={{ "width": "100%" }} src={event.attributes.badge_design?.data?.attributes?.background?.data?.attributes?.url} />
                        }
                        <QRCode className="qrcode-read" style={{ left: event.attributes.badge_design.data.attributes.QRCodeLeft + "cm", top: event.attributes.badge_design.data.attributes.QRCodeTop + "cm", position: "absolute", width: event.attributes.badge_design.data.attributes.QRCodeSizeWidthCM + "cm", height: event.attributes.badge_design.data.attributes.QRCodeSizeHeightCM + "cm" }} value={"https://crm.medprodocuae.com/delegate/" + event.attributes.referenceId + "/" + event.attributes.referenceId + value.id} renderAs="canvas" />
                        {event.attributes.badge_design.data.attributes.showRegNo &&
                          <span style={{ position: "absolute", fontSize: ".8rem", top: event.attributes.badge_design.data.attributes.regNoTop + "cm", left: event.attributes.badge_design.data.attributes.regNoLeft + "cm" }} className="refnomss">{event.attributes.referenceId + value.id}</span>
                        }
                        <h2 style={{
                          "position": "absolute",
                          "z-index": "999",
                          "textOverflow": "ellipsis",
                          "font-weight": "bold",
                          "font-size": ((value.attributes.title != null ? value.attributes.title : "") + (value.attributes.firstName != null ? value.attributes.firstName : "") + (value.attributes.middleName != null ? value.attributes.middleName : "") + " " + (value.attributes.lastName != null ? value.attributes.lastName : "")).length > 27 ? ".95rem" : "1.2rem",
                          "top": event.attributes.badge_design.data.attributes.delegateNameTop + "cm",
                          "width": "90%",
                          "left": "5%",
                          "text-align": "center"
                        }}>{(value.attributes.title != null ? value.attributes.title + ". " : "") + (value.attributes.firstName != null ? value.attributes.firstName + " " : "") + (value.attributes.middleName != null ? value.attributes.middleName + " " : "") + " " + (value.attributes.lastName != null ? value.attributes.lastName + " " : "")}</h2>

<h2 style={{
                          "position": "absolute",
                          "z-index": "999",
                          "textOverflow": "ellipsis",
                          "font-weight": "bold",
                          "font-size": "1.2rem",
                          "top": event.attributes.badge_design.data.attributes.visitorTypeTop + "cm",
                          "width": "90%",
                          "left": event.attributes.badge_design.data.attributes.visitorTypeLeft + "cm",
                          "text-align": "center"
                        }}>{event.attributes.badge_design.data.attributes.visitorType}</h2>
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

export default Badge;
