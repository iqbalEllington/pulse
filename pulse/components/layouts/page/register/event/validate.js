import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import BackButton from "components/general/backButton";
import Link from "next/link";
import { HiPlus } from "react-icons/hi"
import debounce from 'lodash.debounce';
import Registrations from "./registrations";
import { IoSearch } from "react-icons/io5";

const Validate = (props) => {
  const [regno, setRegNo] = useState("")
  const [showsearch, setShowsearch] = useState(false)
  const router = useRouter();
  const directSave = () => {
    if (regno != "") {
      if (regno.includes(props.reference)) {
        var no = regno.split(props.reference)
        var no = no[no.length - 1];
        debouncedApiCall(no)
      } else {
        var no = regno
        debouncedApiCall(no)
      }
    } else {
      var no = ""
    }
  }
  const debouncedApiCall = React.useCallback(
    debounce(async (regno) => {
      router.push("/registration/events/" + props.event + "/edit/" + regno+"?from=validate")
    }, 1500),
    []
  );

  useEffect(() => {
    if (regno != "" && regno.length >= 2) {
      if (regno.includes(props.reference)) {
        var no = regno.split(props.reference)
        var no = no[no.length - 1];
        debouncedApiCall(no)
      } else {
        var no = regno
        debouncedApiCall(no)
      }
    } else {
      var no = ""
    }
  }, [regno]);
  return (
    <div className="container-fluid content-inner openCheckList">
      <BackButton />
      <div className="page-header row">
        <div className="col-6">
          <h4 className="page-title">
            Validate
          </h4>
        </div>
        <div className="col-6 create-button text-right">
          <Link legacyBehavior href={"/registration/events/" + props.event + "/register"}>
            <a>
              <HiPlus /> Create New Entry
            </a>
          </Link>
        </div>
      </div>
      <div className="input-validate">
        <input onChange={(e) => setRegNo(e.target.value)} value={regno} type="text" placeholder="Ref No / Registration No" name="validate" />
        <input type="submit" onClick={(e) => directSave(e)} className="validte-btn" name="submit" />
      </div>
      <div className="w-100 text-center pt-4">
        No Qr code? <br />
        <button onClick={() => setShowsearch(!showsearch)} className="searcDelegate mt-4"><IoSearch /> Toogle Search Delegate</button>
      </div>
      {showsearch == true &&
        <div className="cant-find ml-5">
          <Registrations page="1" event={props.event} fromPage="validate" />
        </div>
      }
    </div>
  );
};

export default Validate;
