
import { getRequest, postRequest_cms, putRequest_cms } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaAngleDown, FaArrowDown } from "react-icons/fa";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ProjectSearch from "./projectSearch";
import DatePicker from "react-datepicker";

import ResponisbleSearch from "./responisbleSearch";
import ProjectForm from "./projectForm";
import ResponsibleForm from "./responsibleForm";

const updateForm = (props) => {
    const initialFormData = {
        id: null,
        date: false,
        update: ""
    };

    const [formData, setFormData] = useState(initialFormData)
    const [updates, setUpdates] = useState([])
    const [task, setTask] = useState({})
    const [updatesSorted, setUpdatesSorted] = useState([])
    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            ["id"]: props.id,
        }));
        getUpdates()
    }, [props.id])


    const getUpdates = async () => {
        let response = await getRequest({ API: API_URLS.GET_TASKS + "/" + props.id + "?populate[]=updates" });

        if (await response?.status === 200) {
            var data = response.data?.data?.attributes?.updates;
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setUpdates(response.data?.data?.attributes?.updates)
            setTask(response.data?.data?.attributes)
            if (response.data?.data?.attributes?.updates) {
                setUpdatesSorted(sortedData)
            } else {
                setUpdatesSorted([])
            }
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let formPayload = {
                data: {
                    updates: [
                        ...updates,
                        { update: formData.update, date: formData.date ? formData.date : moment().format("YYYY-MM-DD") }
                    ]
                }
            }
            let response = await putRequest_cms({
                API: "/api/tasks",
                ID: formData.id,
                DATA: formPayload,
                HEADER: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });


            if (response?.status === 200 || response?.status === 201) {
                toast.success("Update created successfully!");
                getUpdates()
                setFormData((prevState) => ({
                    ...prevState,
                    ["update"]: "",
                    ["date"]: false,
                }));
            } else {
                toast.error(`Failed to create project: ${response?.data?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    };
    const deleteme = async (key) => {
        try {
           
            var updatedArray = updates.filter(item => item.id !== key);
            console.log(updatedArray, "updatesupdatesupdates",key);
            let formPayload = {
                data: {
                    updates: [
                        ...updatedArray,
                    ]
                }
            }
            let response = await putRequest_cms({
                API: "/api/tasks",
                ID: formData.id,
                DATA: formPayload,
                HEADER: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });


            if (response?.status === 200 || response?.status === 201) {
                toast.success("Deleted the update successfully!");
                getUpdates()
                setFormData((prevState) => ({
                    ...prevState,
                    ["update"]: "",
                    ["date"]: false,
                }));
            } else {
                toast.error(`Failed to create project: ${response?.data?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    }
    const handleDateChange = (key, date) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: date,
        }));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const LineSVG = (props) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={9}
            height={63}
            fill="none"
            {...props}
        >
            <path
                fill="#fff"
                fillOpacity={0.4}
                d="M4.854.646a.5.5 0 0 0-.708 0L.964 3.828a.5.5 0 1 0 .708.708L4.5 1.707l2.828 2.829a.5.5 0 1 0 .708-.708L4.854.646ZM4.5 57.333a2.667 2.667 0 1 0 0 5.334 2.667 2.667 0 0 0 0-5.334ZM4 1v59h1V1H4Z"
            />
        </svg>
    );
    return (
        <>
            <div>
                <form className="updateForm" onSubmit={(e) => handleSubmit(e)}>

                    <div className="input-box">
                        <div className="selectedDate">
                            {formData.date ?
                                <>
                                    <span>
                                        {moment(formData.date).format("DD MMM")}
                                    </span>
                                    <span>
                                        {moment(formData.date).format("YYYY")}
                                    </span>
                                </> :
                                <span className="date-pick">
                                    Select Date
                                </span>
                            }
                            <span>
                                <FaAngleDown />
                            </span>
                            {/* // {formData.date ? moment(formData.date).format() : "Select Date"} */}
                        </div>
                        <DatePicker
                            className="dateinput"
                            showYearDropdown
                            dateFormat="yyyy-MM-dd"
                            maxDate={new Date()}
                            selected={formData.date != null ? formData.date : null}
                            onChange={(date) => handleDateChange("date", date)}
                            placeholderText="Select Date"
                        />

                    </div>
                    <textarea onChange={handleInputChange} name="update" placeholder="Type your Update" value={formData.update} />

                    <button type="submit">Add</button>
                </form>


                <div>
                    <div className="updates-list">
                        <div className="updated-head">
                            <h4> Latest Updates for the {task?.type} <b>{task?.Task}</b>
                            </h4>

                        </div>
                        {updatesSorted.map((key, value) => {
                            return <div>
                                <span className="line-break">
                                    <LineSVG />
                                </span>
                                <div className="update-data">
                                    <span className="date">
                                        <span>
                                            {moment(key.date).format("DD MMM")}
                                        </span>
                                        <span>
                                            {moment(key.date).format("YYYY")}
                                        </span>
                                    </span>
                                    <span className="update">
                                        {key.update}
                                    </span>


                                    <sup onClick={() => deleteme(key.id)}>Delete</sup>
                                </div>
                            </div>
                        })}
                        {!updatesSorted.length &&
                            <div className="noupdate">
                                There are no updates available for this task at the moment
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* <div className="popup active conform-delete">
                        <div className="form">
                                <h3>Are you sure you want to delete?</h3>
                                <button>Yes</button>  <button>No</button>
                        </div>
            </div> */}
        </>
    );
};

export default updateForm;
