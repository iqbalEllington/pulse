import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
// import styles from "../../styles/manage-venue/venuefac.module.scss";
// check
import {FiEdit} from "react-icons/fi"
import {AiOutlineEye} from "react-icons/ai"
const openchecklsit = ({ checklistgenerated, key, setIsDelete }) => {
  const router = useRouter();
  return (
    <div key={key}>
      {" "}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Submitted at</th>
            {/* <th scope="col">VenueChecklist No</th> */}
            <th scope="col">Venue Name</th>
            <th scope="col">Session</th>
            <th scope="col">Staff Member</th>
            <th scope="col">Concern</th>
            <th scope="col">Venue Check list type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {checklistgenerated.map((key, index) => {
            return (
              <tr class="border-right">
                <td> {moment(key.createdAt).format('dddd DD MMMM YYYY')}</td>
                <td>  {key.venue?.venue_name}</td>
                {/* <td>{key.venue?.venue_name}</td> */}
                <td>{key.checklist_session = 'AM' ? "Morning" : "Evening"}</td>
                <td>{"Muhammed"}</td>
                <td>{(key.remarks != null ? <span className="notgood"> Yes</span>: <span className="good">No Concerns</span>)}</td>
                <td><span className={`labelstyle ${key.checklist_type.toLowerCase()=="opening"?"bg-l-blue":"bg-l-violet"}`}>{key.checklist_type}</span></td>
                <td>{key.is_submitted == true ? "" :
                  <Link legacyBehavior href={"/facility/venue/check-lists/open-checklist/edit/" + key._id}>
                    <a className="col-12 bg-l-yellow labelstyle">
                     <FiEdit/> Edit
                    </a>
                  </Link>
                }
                  <Link legacyBehavior href={"/facility/venue/check-lists/open-checklist/view/" + key._id}>
                    <a className="col-12 bg-black labelstyle ml-5">
                    <AiOutlineEye/>  View
                    </a>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default openchecklsit;
