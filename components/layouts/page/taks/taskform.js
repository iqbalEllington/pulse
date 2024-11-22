
import { getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowDown } from "react-icons/fa";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ProjectSearch from "./projectSearch";
import DatePicker from "react-datepicker";

import ResponisbleSearch from "./responisbleSearch";
import ProjectForm from "./projectForm";

const Taskform = ({ router }, props) => {
    const ClosepopupSwitch = async (e) => {
        if (e.target.getAttribute("data-closepop") == 'true') {
            setPopup(false);
        }
    };
    const popupSwitch = async (type) => {
        setPopup(type);
    };
    const [popup, setPopup] = useState(false);
    const [isStarred, SetIsstarred] = useState(false)
    return (
        <>
            <div className="formbox">
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task, Alert or Notification</th>
                                <th>Project</th>
                                <th>Type</th>
                                <th>Estimated Due Date</th>
                                <th>Current Status</th>
                                <th>Responsible Person</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className="star">
                                    <div onClick={() => SetIsstarred(!isStarred)}>
                                        {isStarred ?
                                            <FaStar />
                                            :
                                            <FaRegStar />
                                        }
                                    </div>
                                </td>
                                <td>
                                    <textarea className="taskInput" placeholder="Task, Alert, or Notification" />
                                </td>
                                <td>
                                    <div>
                                        <ProjectSearch popupSwitch={popupSwitch} />
                                    </div>
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Select Type
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Task</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Notification</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Alert</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>
                                    <DatePicker
                                        className="white_input"
                                        inputmode='none'
                                        // minDate={state.startDate}
                                        dateFormat="yyyy-MM-dd"

                                        // value={props.bookingForm.Date}
                                        placeholderText={'Please Select Prefered Date*'}
                                    // selected={state.selectedDate}
                                    >
                                    </DatePicker>
                                </td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Select Type
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">To do</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">In Progress</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Completed</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">On Hold</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                                <td>
                                    <ResponisbleSearch />
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </form>
                <div className={popup != false ? "popup active" : "popup notActive"}>
                <span className="close-button" data-closepop={true} onClick={(e) => ClosepopupSwitch(e)}>
                    x
                </span>
                {popup == "project" &&
                    <>
                        <div className="col-12 row">
                            <ProjectForm/>
                        </div>
                    </>
                }
                {popup == "responsible" &&
                    <>
                        <CareerApplication jobId={props.job.data.id} />
                    </>
                }
            </div>
            </div>
            
        </>
    );
};

export default Taskform;
