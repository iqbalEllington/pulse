
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


const ProjectForm = ({ router }, props) => {
    const [isStarred, SetIsstarred] = useState(false)
    const [formData,SetFormdata] = useState({
        name:"",

    })
    return (
        <>
            <div className="formbox">
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Start Date</th>
                                <th>Expected Completion Date</th>
                                <th>Area</th>
                                <th>Photo</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td className="star">
                                    <input type="text" name="projectName" />
                                </td>
                                <td>
                                    <DatePicker
                                        className="white_input"
                                        inputmode='none'
                                        // minDate={state.startDate}
                                        dateFormat="yyyy-MM-dd"
                                        name="startDate" 
                                        // value={props.bookingForm.Date}
                                        placeholderText={'Please Select Prefered Date*'}
                                        // selected={state.selectedDate}
                                    >
                                    </DatePicker>
                                </td>
                                <td>
                                <DatePicker
                                        className="white_input"
                                        inputmode='none'
                                        // minDate={state.startDate}
                                        dateFormat="yyyy-MM-dd"
                                        name="EndDate" 
                                        // value={props.bookingForm.Date}
                                        placeholderText={'Please Select Prefered Date*'}
                                        // selected={state.selectedDate}
                                    >
                                    </DatePicker>
                                </td>
                                <td>
                                <DatePicker
                                        className="white_input"
                                        inputmode='none'
                                        // minDate={state.startDate}
                                        dateFormat="yyyy-MM-dd"
                                        name="startDate" 
                                        // value={props.bookingForm.Date}
                                        placeholderText={'Please Select Prefered Date*'}
                                        // selected={state.selectedDate}
                                    >
                                    </DatePicker>
                                </td>
                              <td>
                                <input type="file" />
                              </td>
                            </tr>

                        </tbody>
                    </table>

                </form>
            </div>
        </>
    );
};

export default ProjectForm;
