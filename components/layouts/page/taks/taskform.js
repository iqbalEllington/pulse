
import { getRequest, postRequest_cms, putRequest_cms } from "helper/api";
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
import ResponsibleForm from "./responsibleForm";
import UpdateForm from "./updateForm";

const Taskform = (props) => {
    const initialFormData = {
        id: null,
        isStarred: false,
        Task: "",
        type: null,
        status: null,
        priority: null,
        projects: null,
        responsible_leads: null,
        dueDate: null,
    };

    const [fomrData, SetFormData] = useState(initialFormData)

    const [popupValue, SetPopupvalue] = useState(false)
    // const ClosepopupSwitch = async (e) => {
    //     if (e.target.getAttribute("data-closepop") == 'true') {
    //         setPopup(false);
    //     }
    // };
    const [tab, SetTab] = useState("form")
    const [formData, setFormData] = useState({

    })
    const Closepopup = async (e) => {
        setPopup(false);
    };
    const popupSwitch = async (type, value = false) => {
        setPopup(type);
        SetPopupvalue(value)
    };
    const activateProeprty = async (value) => {
        setFormData((prevState) => ({
            ...prevState,
            ["projects"]: [value],
        }));
    }
    const activateEmployee = async (value) => {
        setFormData((prevState) => ({
            ...prevState,
            ["responsible_leads"]: [value],
        }));
    }
    // useEffect(() => {
    //     props.setFormOpen(props.formstatus)
    // }, [props.formstatus])
    useEffect(() => {
        if (props.updateDatas !== false) {
            var existngdata = props.updateDatas;
            var dateString = existngdata?.attributes["dueDate"];
            const defaultDate = dateString != null ? new Date(dateString) : null;

            // console.log(defaultDate)
            setFormData((prevState) => ({
                ...prevState,
                ["id"]: [existngdata?.id],
                ["isStarred"]: existngdata?.attributes.isStarred,
                ["Task"]: existngdata?.attributes.Task,
                ["dueDate"]: defaultDate,
                ["status"]: existngdata?.attributes["status"],
                ["type"]: existngdata?.attributes["type"],
                ["projects"]: existngdata?.attributes.projects?.data?.[0]?.id,
                ["responsible_leads"]: existngdata?.attributes.responsible_leads?.data?.[0]?.id,
                ["priority"]: existngdata?.attributes["priority"]
            }));
            if (existngdata?.attributes.projects?.data?.[0]?.attributes["name"]) {

                SetSelectedProject(existngdata?.attributes.projects?.data?.[0]?.attributes["name"])
            } else {
                SetSelectedProject(null)
            }
            if (existngdata?.attributes.responsible_leads?.data?.[0]?.attributes["Name"]) {
                SetResponsible(existngdata?.attributes.responsible_leads?.data?.[0]?.attributes["Name"])
            } else {
                SetResponsible(null)
            }

        } else {
            setFormData(initialFormData)
        }
    }, [props.updateDatas])
    useEffect(() => {
        if (props.isUpdate != false) {
            setFormData((prevState) => ({
                ...prevState,
            }));
        }

    }, [props.isUpdate])
    const [selectedProject, SetSelectedProject] = useState(null)
    const [Responsible, SetResponsible] = useState(null)
    // const [formOpen, setFormOpen] = useState(false)

    const [selectedValue, setSelectedValue] = useState('');
    // const [formStatus, setFormStatus] = useState('');
    const [popup, setPopup] = useState(false);
    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey); // Update the state with the selected value
        setFormData((prevState) => ({
            ...prevState,
            ["type"]: eventKey,
        }));
    };
    const handleStatus = (eventKey) => {
        // setFormStatus(eventKey); // Update the state with the selected value
        setFormData((prevState) => ({
            ...prevState,
            ["status"]: eventKey,
        }));
    };
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
    const [showError, SetShowError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create FormData for multipart data
            // const formPayload = new FormData();
            // formPayload.append("name", formData.name);
            // formPayload.append("startDate", formData.startDate); // Ensure date is formatted correctly
            // formPayload.append("expectedCompletionDate", formData.expectedCompletionDate);
            // formPayload.append("area", formData.area);
            SetShowError(false)
            let formDataProcess = formData
            if (formData["responsible_leads"] == null || formData["responsible_leads"] == "") {
                toast.error(`Please Select Responisble Person`);
                SetShowError(true)
                return
            }
            let formPayload = {
                data: formDataProcess
            }
            // if (formData.photos) {
            //     formPayload.append("files.photos", formData.photos); // Strapi expects "files.[fieldname]"
            // }
            let response;
            // Make POST request
            if (formData.id != null) {
                response = await putRequest_cms({
                    API: "/api/tasks",
                    ID: formData.id,
                    DATA: formPayload,
                    HEADER: {
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                });
            } else {
                response = await postRequest_cms({
                    API: "/api/tasks",
                    DATA: formPayload,
                    HEADER: {
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                });
            }


            if (response?.status === 200 || response?.status === 201) {
                setFormData((prevState) => ({
                    ...initialFormData,
                }));
                props.setForceload(`id-${Date.now()}`)
                toast.success("Task/Alert created successfully!");
                // props.Closepopup(); // Close form popup
            } else {
                toast.error(`Failed to create project: ${response?.data?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            // Create FormData for multipart data
            // const formPayload = new FormData();
            // formPayload.append("name", formData.name);
            // formPayload.append("startDate", formData.startDate); // Ensure date is formatted correctly
            // formPayload.append("expectedCompletionDate", formData.expectedCompletionDate);
            // formPayload.append("area", formData.area);
            SetShowError(false)
            var data={
                data:{
                    "publishedAt" : null
                }
            }
            var response = await putRequest_cms({
                API: "/api/tasks",
                ID: formData.id,
                DATA: data,
                HEADER: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });


            if (response?.status === 200 || response?.status === 201) {
               
                props.setForceload(`id-${Date.now()}`)
                toast.success((formData?.type? formData?.type : "Task/Alert") +" deleted successfully!");
                props.SetFormActive(false)
                // props.Closepopup(); // Close form popup
            } else {
                toast.error(`Failed to deleted the Task/Alert: ${response?.data?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    };
    useEffect(() => {
        if (props.action == "update") {
            SetTab("Updates")
        } else {
            SetTab("form")
        }
    }, [props.action])
    return (
        <>
            <div className={props.formstatus == true ? "form-active" : "form-hidden"}>
                <div className="header-form">
                    <span className={tab == "form" ? "active" : ""} onClick={() => SetTab("form")}>Add or Edit</span>
                    <span className={tab == "Updates" ? "active" : ""} onClick={() => SetTab("Updates")}>Updates</span>
                    {props.formstatus &&
                        <div className="absoulte-close-right" onClick={() => props.SetFormActive(!props.formstatus)}> {props.formstatus ? "Close X" : ""}</div>
                    }
                </div>
                {tab == "form" &&
                    <div className={"formbox"}>
                        <div className={tab == "form" ? "" : "d-none"} >
                            <form className="taskform" onSubmit={handleSubmit} action={"projects"}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label>Type</label>
                                                <Dropdown className="color-drop-multy" onSelect={handleSelect}>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        {formData.type || 'Select Type'}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="Task">Task</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Notification">Notification</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Alert">Alert</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            {/* <td className="star">
                                    <span>Task, Alert or Notification</span>
                                    <div onClick={() => SetIsstarred(!isStarred)}>
                                        {isStarred ?
                                            <FaStar />
                                            :
                                            <FaRegStar />
                                        }
                                    </div>
                                </td> */}
                                            <td>
                                                <label>Task, Alert or Notification</label>
                                                <textarea onChange={handleInputChange} className="taskInput" value={formData.Task} name="Task" placeholder="Task, Alert, or Notification" />
                                            </td>
                                            <td>
                                                <label>Project</label>
                                                <div>
                                                    <ProjectSearch keyword={selectedProject} popupSwitch={popupSwitch} activateProeprty={activateProeprty} />
                                                </div>
                                            </td>

                                            <td>
                                                <td>
                                                    <label>Due Date Estimation</label>
                                                    <DatePicker
                                                        className="white_input"
                                                        showYearDropdown
                                                        dateFormat="yyyy-MM-dd"
                                                        selected={formData.dueDate != null ? formData.dueDate : null}
                                                        onChange={(date) => handleDateChange("dueDate", date)}
                                                        placeholderText="Start Date"
                                                    />
                                                </td>
                                            </td>

                                            <td>
                                                <label>Status</label>
                                                <Dropdown className="color-drop-multy hash" onSelect={handleStatus}>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        {formData.status || 'Select Status'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="To Do">To Do</Dropdown.Item>
                                                        <Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                                                        <Dropdown.Item eventKey="On Hold">On Hold</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            <td>

                                                <label>Priority</label>
                                                <input
                                                    type="Number"
                                                    placeholder="Priority in Number "
                                                    name="priority"
                                                    value={formData.priority}
                                                    onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label>Responsible</label>
                                                <ResponisbleSearch keyword={Responsible} popupSwitch={popupSwitch} activateEmployee={activateEmployee} />
                                                {showError && <span className="error">Please Select Responsible Person</span>}
                                            </td>
                                            <td>

                                                <input className="submit bg-white fg-black" type="submit" value={formData.id != null ? "Update" : "Create"} />
                                                 
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </form>
                            <input onClick={(e)=>handleDelete(e)} className="submit bg-black fg-white" type="button" value={"Delete"} />
                                              
                            <div className={popup != false ? "popup active" : "popup notActive"}>
                                {/* <span className="close-button" data-closepop={true} onClick={(e) => ClosepopupSwitch(e)}>
                    x
                </span> */}
                                {popup == "project" &&
                                    <>
                                        <div className="col-12 row">
                                            <ProjectForm id={false} popupValue={popupValue} Closepopup={Closepopup} />
                                        </div>
                                    </>
                                }
                                {popup == "responisble" &&
                                    <>
                                        <ResponsibleForm popupValue={popupValue} Closepopup={Closepopup} />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
                {tab == "Updates" &&
                    <div className="updates">
                        <div style={{ width: "100%", display: "block" }}>
                            <UpdateForm id={formData.id} />
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Taskform;
