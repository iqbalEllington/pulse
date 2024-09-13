import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import { deleteRequest, getRequest, postRequest, postRequestAPI, putRequestAPI } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "components/general/backButton";
import Link from "next/link";
import { HiPlus } from "react-icons/hi"
import debounce from 'lodash.debounce';
import moment from "moment";
import QRScanner from "./qrcodescanner";


const Attendance = (props) => {
  const [regno, setRegNo] = useState("")
  const [camscanner, setCamscanner] = useState(false)
  const router = useRouter();
  // async function saveComment(formData) {
  //   setRegNo(formData.target.value
  //   });

  // }
  const directSave = () => {
    if (regno != "") {
      if (regno.includes(props.eventRef)) {
        var no = regno.split(props.eventRef)
        var no = no[no.length - 1];
      } else {
        var no = regno
      }
    } else {
      var no = ""
    }
    if (no != "") {
      debouncedApiCall(no)
    }
  }
  function setQrcodereg(value) {
    if (value)
      setRegNo((value))
  }
  const debouncedApiCall = React.useCallback(
    debounce(async (regno) => {
      try {
        var checkin = "check-In"
        if (props.action != "check-in") {
          checkin = "check-out"
        }
        var formData = {
          time: moment().format('YYYY-MM-DDTHH:mm:ss.000Z'),
          regno: regno
        }
        var attendance = await postRequestAPI({ API: '/attendance/' + props.eventRef + '/' + props.eventId + '/' + props.action, DATA: formData });
        console.log(attendance.data.status)
        if (attendance.data.status == "200") {
          setRegNo("")
          toast("Attendance Added")
        } else {
          setRegNo("")
          toast("Please Try Again Later or Delegates Not Registered")
        }
      } catch (exception) {
        toast("something went wrong please contact admin")
      }
    }, 100),
    []
  );

  useEffect(() => {
    if (regno != "") {
      if (regno?.includes(props.eventRef)) {
        var no = regno.split(props.eventRef)
        var no = no[no.length - 1];
      } else {
        var no = regno
      }
    } else {
      var no = ""
    }
    if (no != "") {
      debouncedApiCall(no)
    }

  }, [regno]);

  return (
    <div className="container-fluid content-inner openCheckList">
      <BackButton />

      <div className="input-validate">
        <div className="col-12 pb-5 d-flex center text-center">
          <h4 className="page-title">
            Attendance
          </h4>
        </div>
        <input onChange={(e) => setRegNo(e.target.value)} value={regno} type="text" placeholder="Ref No / Registration No" name="validate" />
        {camscanner &&
          <div className="qrcodeReader">
            <QRScanner setQrcodereg={setQrcodereg} />
          </div>
        }
        <input type="submit" onClick={(e) => directSave(e)} className="validte-btn" name="submit" />
        <button className="validte-btn p-2" onClick={()=>setCamscanner(!camscanner)}>QR Code Scanner</button>
      </div>

    </div>
  );
};

export default Attendance;
