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
import { AiOutlineEye, AiOutlinePrinter } from "react-icons/ai"
import BackButton from "components/general/backButton";
import Link from "next/link";
import { HiPlus } from "react-icons/hi"
import { IoFilterSharp, IoSearch } from "react-icons/io5"
import QRCode from 'qrcode.react';


const Badge = (props) => {
  const [conference, setconference] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);

  async function getRegistrations() {
    if(props.badges!="" || props.badges!=null){
      console.log(props)
      let badges=props?.badges.split("-")
      let filtersArray=''
      badges.map((key,index)=>{
        filtersArray+='&filters[id][$in]['+index+']=' + key
      })
      if(props.id!=undefined){
        const response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?populate=*&pagination[page]=1&pagination[pageSize]=100' + filtersArray});
      }else{
        const response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS + '?populate=*&pagination[page]=1&pagination[pageSize]=100' + filtersArray});
      }
      console.log(response)
      var data=[]
      if (response?.status === 200) {
        data.push(response?.data?.data)
         setconference(data);
        setIsLoading(false)
      } else if (response?.status === 401) {
        toast("Unauthorize access please re-login.");
      } else {
        toast(response?.data?.error || "Some thing went wrong.");
      }
    }
    
   
   
  }
  function calcAttendance(attendance) {
    var totalHours = 0
    var total = 0
    attendance.map((key, val) => {
      total = total + totalHours + key.hoursSpend
    })
    console.log(total, "total")
    return total
  }
  let filterchecklist = (value) => {
    getChecklist();
  }
  useEffect(() => {
    console.log("asaas")
    getRegistrations();
  }, []);
  const [defaultOptions, setDefaultOptions] = useState([]);
  return (
    <div>

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
                {conference?.length ? (
                  <div className="print-badge" style={{ "display": "flex", "gap": "1px", "flex-wrap": "wrap", "position": "relative" }}>
                  {registations[0]?.map((value) => {
                    return <div className="print-badge-box" style={{ "position": "relative","width": "357px", "min-height" : "500px" }}>
                      <img className="qrcode" alt="Qr code is Missing please set qr code image on the event creation form" style={{ "width": "100%" }} src={event.attributes.qrcodeDelegates?.data?.attributes?.url} />
                      <QRCode className="qrcode-read" value={"https://crm.medprodocuae.com/"+event.attributes.referenceNumber +"/"+event.attributes.referenceNumber + value.id} renderAs="canvas" />
                      <span className="refnomss">{event.attributes.referenceNumber}</span>
                      <h2 style={{
                        "position": "absolute",
                        "z-index": "999",
                        "textOverflow": "ellipsis",
                        "font-weight": "bold",
                        "font-size": ((value.attributes.title != null ? value.attributes.title : "") + (value.attributes.firstName != null ? value.attributes.firstName : "") + " " + (value.attributes.lastName != null ? value.attributes.lastName : "")).length > 27 ? ".95rem" : "1.2rem",
                        "bottom": "29.2%",
                        "width": "100%",
                        "text-align": "center"
                      }}>{(value.attributes.title != null ? value.attributes.title + " " : "") + (value.attributes.firstName != null ? value.attributes.firstName + " " : "") + " " + (value.attributes.lastName != null ? value.attributes.lastName + " " : "")}</h2>
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

export default Badge;
