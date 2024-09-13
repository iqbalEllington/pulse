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


const Fucultybadge = (props) => {
  const [conference, setconference] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);

  async function getRegistrations() {
    const response = await getRequest({ API: API_URLS.GET_EVENTS_FACULTY + '?populate=*&pagination[page]=1&pagination[pageSize]=100&filters[event][referenceId][$eqi]=' + props.event });
    var data=[]
    if (response?.status === 200) {
      data.push(response?.data?.data)
      const response2 = await getRequest({ API: API_URLS.GET_EVENTS_FACULTY + '?populate=*&pagination[page]=2&pagination[pageSize]=100&filters[event][referenceId][$eqi]=' + props.event });
      data.push(response2?.data?.data)
      const response3 = await getRequest({ API: API_URLS.GET_EVENTS_FACULTY + '?populate=*&pagination[page]=3&pagination[pageSize]=100&filters[event][referenceId][$eqi]=' + props.event });
      data.push(response3?.data?.data)
      const response4 = await getRequest({ API: API_URLS.GET_EVENTS_FACULTY + '?populate=*&pagination[page]=4&pagination[pageSize]=100&filters[event][referenceId][$eqi]=' + props.event });
      data.push(response4?.data?.data)
      const response5 = await getRequest({ API: API_URLS.GET_EVENTS_FACULTY + '?populate=*&pagination[page]=5&pagination[pageSize]=100&filters[event][referenceId][$eqi]=' + props.event });
      data.push(response5?.data?.data)
      setconference(data);
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
    getRegistrations();
  }, []);
  const [defaultOptions, setDefaultOptions] = useState([]);
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
                {conference?.length ? (
                  <div className="print-badge" style={{ "display": "flex","gap":"1px", "flex-wrap": "wrap", "position": "relative" }}>
                    {conference[0]?.map((value) => {
                      return <div className="print-badge-box" style={{ "position": "relative" }}>
                        <img className="qrcode" style={{ "width": "260px" }} src="/images/qrcodeFac.jpg" />
                        <QRCode className="qrcode-read fac" value={"https://crm.medprodocuae.com/mego/faculty/MEGO-23-"+value.id} renderAs="canvas" />
                        <h2 style={{
                          "position": "absolute",
                          "z-index": "999",
                          "font-weight":"bold",
                          "font-size":((value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")).length>27 ?".95rem" :"1.2rem",
                          "bottom": "31%",
                          "width": "100%",
                          "text-align": "center"
                        }}>{(value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")}</h2>
                      </div>
                    })}
                    {conference[1]?.map((value) => {
                      return <div className="print-badge-box" style={{ "position": "relative" }}>
                        <img className="qrcode" style={{ "width": "260px" }} src="/images/qrcodeFac.jpg" />
                        <QRCode className="qrcode-read fac" value={"https://crm.medprodocuae.com/mego/faculty/MEGO-23-"+value.id} renderAs="canvas" />
                        <h2 style={{
                          "position": "absolute",
                          "z-index": "999",
                          "font-weight":"bold",
                          "font-size":((value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")).length>27 ?".95rem" :"1.2rem",
                          "bottom": "31%",
                          "width": "100%",
                          "text-align": "center"
                        }}> {(value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")}</h2>
                      </div>
                    })}
                    {conference[2]?.map((value) => {
                      return <div className="print-badge-box" style={{ "position": "relative" }}>
                        <img className="qrcode" style={{ "width": "260px" }} src="/images/qrcodeFac.jpg" />
                        <QRCode className="qrcode-read fac" value={"https://crm.medprodocuae.com/mego/faculty/MEGO-23-"+value.id} renderAs="canvas" />
                        <h2 style={{
                          "position": "absolute",
                          "z-index": "999", 
                          "font-weight":"bold",
                          "font-size":((value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")).length>27 ?".95rem" :"1.2rem",
                          "bottom": "31%",
                          "width": "100%",
                          "text-align": "center"
                        }}> {(value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")}</h2>
                      </div>
                    })}
                    {conference[3]?.map((value) => {
                      return <div className="print-badge-box" style={{ "position": "relative" }}>
                        <img className="qrcode" style={{ "width": "260px" }} src="/images/qrcodeFac.jpg" />
                        <QRCode className="qrcode-read" value={"https://crm.medprodocuae.com/mego/faculty/MEGO-23-"+value.id} renderAs="canvas" />
                        <h2 style={{
                          "position": "absolute",
                          "z-index": "999",
                          "font-weight":"bold",
                          "font-size":((value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")).length>27 ?".95rem" :"1.2rem",
                          "bottom": "31%",
                          "width": "100%",
                          "text-align": "center"
                        }}> {(value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")}</h2>
                      </div>
                    })}
                    {conference[4]?.map((value) => {
                      return <div className="print-badge-box" style={{ "position": "relative" }}>
                        <img className="qrcode" style={{ "width": "260px" }} src="/images/qrcode.jpg" />
                        <QRCode className="qrcode-read" value={"https://crm.medprodocuae.com/mego/faculty/MEGO-23-"+value.id} renderAs="canvas" />
                        <h2 style={{
                          "position": "absolute",
                          "z-index": "999",
                          "font-weight":"bold",
                          "font-size":((value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")).length>27 ?".95rem" :"1.2rem",
                          "bottom": "31%",
                          "width": "100%",
                          "text-align": "center"
                        }}> {(value.attributes.Title != null ? value.attributes.Title : "") + (value.attributes.FirstName !=null ? value.attributes.FirstName : "") + " " + (value.attributes.lastName!=null? value.attributes.lastName: "")}</h2>
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

export default Fucultybadge;
