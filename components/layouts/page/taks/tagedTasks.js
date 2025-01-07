
import { Avatar, Tooltip } from "@mui/material";
import { getRequest, putRequest_cms } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import { FaRegEdit, FaRegStar, FaStar, FaWhatsapp } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";

import { FaChevronDown } from "react-icons/fa";
import UpdateForm from "./updateForm";
import LineProgress from "components/modals/LineProgress";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";


const tagedTasks = (props) => {
    const [tasks, setTasks] = useState({})
    const gettaskWhatsapp = (mobile, project, task) => {
        return "https://wa.me/" + mobile + "?text=Hi%2C%0A%0AI%20am%20following%20up%20on%20the%20 *" + project + "* %2C%20specifically%20the%20 *" + task + "* %20Kindly%20share%20a%20status%20update%20at%20the%20earliest.%0A%0AThank%20you."
    }
    const buildFilters = (filterType) => {
        let filter = "";
        const today = moment();
        const tomorrow = moment().add(1, 'days');
        const startOfWeek = moment().startOf('week').add(1, 'days'); // Monday
        const endOfWeek = moment().endOf('week').add(1, 'days'); // Sunday
        const startOfMonth = moment().startOf('month');
        const endOfMonth = moment().endOf('month');

        switch (filterType) {
            case 'Overdue':
                filter = `&filters[dueDate][$lte]=${today.format('YYYY-MM-DD')}`;
                break;
            case 'Today':
                filter = `&filters[dueDate][$eq]=${today.format('YYYY-MM-DD')}`;
                break;

            case 'Tomorrow':
                filter = `&filters[dueDate][$eq]=${tomorrow.format('YYYY-MM-DD')}`;
                break;

            case 'This Week':
                filter = `&filters[dueDate][$lte]=${endOfWeek.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$gt]=${tomorrow.format('YYYY-MM-DD')}`; // Exclude tomorrow
                console.log(filter, "this week")
                break;

            case 'This Month':
                filter = `&filters[dueDate][$gte]=${endOfWeek.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$lte]=${endOfMonth.format('YYYY-MM-DD')}`
                break;

            case 'Other':
                filter = `&filters[$or][0][dueDate][$gt]=${endOfMonth.format('YYYY-MM-DD')}&filters[$or][1][dueDate][$null]=true`; // After this month
                break;

            default:
                throw new Error("Invalid filter type");
        }

        return filter;
    };
    const [loading, SetLoading] = useState(false)
    async function getTagedTask(tag) {
        SetLoading(true)
        let filter = "";
        if (tag?.type == "Date") {
            filter = buildFilters(tag?.filterValue)
        } else if (tag?.type == "tag") {
            if (tag?.filterValue == "Top Updates") {
                filter += "&filters[isStarred][$eq]=True"
            } else if (tag?.filterValue == "Today") {
                const formattedDate = moment().format('YYYY-MM-DD');
                filter += "&filters[dueDate][$eq]=" + formattedDate
            }
            else if (tag?.filterValue == "Top Priority") {
                filter += "&filters[priority][$eq]=1"
            }
            else if (tag?.filterValue == "This Week") {
                // Get the start (Monday) and end (Sunday) of the current week
                const startOfWeek = moment().startOf('week').add(1, 'days'); // Monday
                const endOfWeek = moment().endOf('week').add(1, 'days'); // Sunday

                // Format the dates as 'YYYY-MM-DD'
                const startDate = startOfWeek.format('YYYY-MM-DD');
                const endDate = endOfWeek.format('YYYY-MM-DD');

                // Build the filter query
                filter = `&filters[dueDate][$gte]=${startDate}&filters[dueDate][$lte]=${endDate}`;
            }
            else if (tag?.filterValue == "Overdue") {
                const formattedDate = moment().format('YYYY-MM-DD');
                filter += "&filters[dueDate][$lte]=" + formattedDate
            }
            else if (tag?.filterValue == "Completed") {
                filter += "&filters[status][$eq]=Completed"
            }
        }
        else if (tag?.type == "Priority") {
            filter += "&sort[0]=priority:asc&sort[1]=dueDate:asc"
        }
        else if (tag?.type == "Project") {
            filter += "&filters[projects][name][$eq]=" + tag.filterValue + "&sort=dueDate:asc"
        }
        if (tag.search) {
            filter += "&filters[$or][0][projects][name][$containsi]=" + tag.search + "&filters[$or][1][Task][$containsi]=" + tag.search + "&filters[$or][2][responsible_leads][Name][$containsi]=" + tag.search
        }

        var response;
        response = await getRequest({ API: API_URLS.GET_TASKS + "?populate[]=responsible_leads&populate[]=projects&populate[]=updates" + filter });

        if (await response?.status === 200) {
            setTasks(response.data)
            SetLoading(false)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }

    }
    const handleChanges = async (values, id) => {
        // e.preventDefault();

        try {
            // Create FormData for multipart data
            // const formPayload = new FormData();
            // formPayload.append("name", formData.name);
            // formPayload.append("startDate", formData.startDate); // Ensure date is formatted correctly
            // formPayload.append("expectedCompletionDate", formData.expectedCompletionDate);
            // formPayload.append("area", formData.area);
            // SetShowError(false)
            let formDataProcess = values

            let formPayload = {
                data: formDataProcess
            }
            // if (formData.photos) {
            //     formPayload.append("files.photos", formData.photos); // Strapi expects "files.[fieldname]"
            // }
            let response;
            // Make POST request
            response = await putRequest_cms({
                API: "/api/tasks",
                ID: id,
                DATA: formPayload,
                HEADER: {
                    "Content-Type": "multipart/form-data", // Required for file uploads
                },
            });


            if (response?.status === 200 || response?.status === 201) {
                toast.success("Updated successfully!");
                props.setForceload(`id-${Date.now()}`)
                // props.Closepopup(); // Close form popup
            } else {
                toast.error(`Failed to create project: ${response?.data?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred while submitting the form.");
        }
    };
    const handleStatus = (value, id) => {
        // console.log(eventKey, id)
        var data = { status: value }
        handleChanges(data, id); // Update the state with the selected value
        // setFormData((prevState) => ({
        //     ...prevState,
        //     ["status"]: eventKey,
        // }));
        // handleChanges()
    };
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        if (typeof name === 'string' && name.trim()) {
            const trimmedName = name.trim();
            return {
                sx: {
                    bgcolor: stringToColor(trimmedName),
                },
                children: trimmedName.includes(' ')
                    ? `${trimmedName.split(' ')[0][0]}${trimmedName.split(' ')[1][0]}`
                    : trimmedName[0],
            };
        } else {
            return {
                sx: {
                    bgcolor: '#ccc', // Default background color
                },
                children: '?', // Default character
            };
        }
    }
    async function SetIsstarred(value, id) {
        let formPayload = {
            data: {
                "isStarred": value
            }
        }
        let response = await putRequest_cms({
            API: "/api/tasks",
            ID: id,
            DATA: formPayload,
            HEADER: {
                "Content-Type": "multipart/form-data", // Required for file uploads
            },
        });
        if (response?.status === 200 || response?.status === 201) {
            props.setForceload(`id-${Date.now()}`)
        }

    }
    useEffect(() => {
        getTagedTask(props.tag)
    }, [props.tag])
    function calculateDaysPercentage(publishedAt, dueDate) {
        const publishedDate = new Date(publishedAt);
        const dueDateObj = new Date(dueDate);
        const today = new Date();

        // Ensure today is within the range of publishedAt and dueDate
        if (today < publishedDate) return 0;
        if (today > dueDateObj) return 100;

        const totalDays = (dueDateObj - publishedDate) / (1000 * 60 * 60 * 24); // Total days in range
        const completedDays = (today - publishedDate) / (1000 * 60 * 60 * 24); // Days completed until today

        const percentage = (completedDays / totalDays) * 100;

        return percentage.toFixed(2); // Return percentage with 2 decimal places
    }

    function getlastUpdates(data) {
        let updates = data
        console.log(updates, "updatesupdates")
        if (updates.length) {
            const latestUpdate = updates.reduce((latest, current) => {
                return new Date(current.date) > new Date(latest.date) ? current : latest;
            });
            return latestUpdate.update
            // console.log(latestUpdate.update)
            // return latestUpdate
        } else {
            return ""
        }

    }
    return (
        <>
            <div className="task-list-container">

                <div className="header">
                    <h3 className="ontoptitle" >
                        {props.tag.keyword}
                    </h3>
                </div>
                <div className="body">
                    {loading == true && <div className="loading" id="loader">
                        <div className="spinner"> </div>
                    </div>}
                    <table className="tasks-list">

                        {tasks.data?.length > 0 ?
                            <>
                                <thead>
                                    <tr>
                                        {!props.hideElements &&
                                            <th></th>
                                        }
                                        <th>Task/Notification</th>
                                        <th>Project</th>
                                        <th>Status</th>
                                        <th>Priority</th>
                                        <th>Due Date</th>
                                        {!props.hideElements &&
                                            <th>Type</th>
                                        }
                                        {!props.hideElements &&
                                            <th >Responisble</th>
                                        }
                                        {!props.hideElements &&
                                            <th>Updates</th>
                                        }
                                        {!props.hideElements &&
                                            <th >Action</th>
                                        }
                                        <th >Last Update</th>
                                    </tr>
                                </thead>
                                {tasks.data?.map((task) => {
                                    return <tr className="page-break">
                                        {!props.hideElements &&
                                            <td className="star">
                                                <div onClick={() => SetIsstarred(!task.attributes.isStarred, task.id)}>
                                                    {task.attributes.isStarred ?
                                                        <IoMdStar className="active" />
                                                        :
                                                        <IoMdStar />
                                                        // <FaRegStar />
                                                    }
                                                </div>
                                            </td>
                                        }
                                        <td className="taskTitle">
                                            <h4 onClick={() => { props.SetUpdateData(task), props.SetFormaction("update") }}>
                                                {task.attributes.Task}
                                            </h4>
                                        </td>
                                        <td className="projectName">
                                            <div>
                                                <label className="mobile-view">Project: </label>
                                                {task.attributes.projects?.data?.[0]?.attributes?.name}
                                                {task.attributes.projects?.data?.[0]?.attributes?.plotNum && <div>Plot No: {task.attributes.projects?.data?.[0]?.attributes?.plotNum}</div>}
                                            </div>
                                        </td>

                                        <td className={task.attributes?.status?.replace(" ", "") + " status"}>
                                            <label className="mobile-view">Status</label>

                                            {!props.hideElements ?
                                                <Dropdown className="color-drop-multy hash" onSelect={((e) => handleStatus(e, task.id))}>
                                                    <Dropdown.Toggle id="dropdown-basic">
                                                        {task.attributes?.status || ''}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item eventKey="To Do" className="todo">To Do</Dropdown.Item>
                                                        <Dropdown.Item eventKey="In Progress" className="progress">In Progress</Dropdown.Item>
                                                        <Dropdown.Item eventKey="Completed" className="Completed">Completed</Dropdown.Item>
                                                        <Dropdown.Item eventKey="On Hold" className="Hold">On Hold</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                :
                                                <span style={{ color: "black" }}>{task.attributes?.status}</span>
                                            }
                                            {/* <span onClick={(e)=>showstatusPop(e,task)}>{task.attributes.status}</span> */}
                                        </td>
                                        <td className="Priority">
                                            <span>{task.attributes.priority}</span>
                                        </td>
                                        <td className="dueDate">
                                            <label className="mobile-view">Due Date</label>
                                            <span>{task.attributes.dueDate}</span>
                                            <span className="theprogressline">
                                                <LineProgress length={100} thick={1} color={calculateDaysPercentage(task.attributes.publishedAt, task.attributes.dueDate) > 75 ? "#FF9191" : "#FFF1DF"} percentage={calculateDaysPercentage(task.attributes.publishedAt, task.attributes.dueDate)} start="begining" />
                                            </span>
                                        </td>
                                        {!props.hideElements &&
                                            <td className={task.attributes.type + " type"}>
                                                <span>{task.attributes.type}</span>
                                            </td>
                                        }
                                        {!props.hideElements &&
                                            <td className="responsible no-print">
                                                <label className="mobile-view">Responisble </label>
                                                <div>
                                                    {task.attributes.responsible_leads?.data?.[0]?.["attributes"]?.Name &&
                                                        <>
                                                            <Tooltip title={task.attributes.responsible_leads?.data?.[0]?.["attributes"]?.Name}>

                                                                <span>
                                                                    <Avatar
                                                                        {...stringAvatar(task.attributes.responsible_leads?.data?.[0]?.attributes?.Name || 'Not Assigned')}
                                                                    />
                                                                    {/* {task.attributes.responsible_leads?.data?.[0]?.["attributes"].Name} */}
                                                                </span>

                                                            </Tooltip>
                                                            <span className="wahtsapp">
                                                                <a target="_blank" href={gettaskWhatsapp(task.attributes.responsible_leads?.data?.[0]?.["attributes"].whatsapp, task.attributes.projects?.data?.[0]?.attributes?.name, task.attributes.Task)}><FaWhatsapp /></a>
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                            </td>
                                        }
                                        {!props.hideElements &&
                                            <td className="responses no-print">
                                                <span onClick={() => { props.SetUpdateData(task), props.SetFormaction("update") }}>
                                                    <span className="ondesk">  {task.attributes?.updates.length}</span>
                                                    <span className="mobile-view"> Updates <FaChevronDown /></span>
                                                    <sup className="mobile-view">
                                                        {JSON.stringify(task.attributes?.updates.length)}
                                                    </sup>
                                                </span>
                                            </td>
                                        }
                                        {!props.hideElements &&
                                            <td className="editAction no-print">
                                                <span onClick={() => { props.SetUpdateData(task), props.SetFormaction("edit") }}>
                                                    <FaRegEdit /> Edit
                                                </span>
                                            </td>
                                        }
                                        <td className="responsesItem">
                                            <div>{getlastUpdates(task.attributes?.updates)}</div>

                                        </td>
                                        {/*     <td>
                                    {JSON.stringify("Responses")}
                                </td>
                                <td>
                                    {JSON.stringify("Read More")}
                                </td> */}
                                        {/* <td>
                                <UpdateForm id={task.id} />
                                   
                                </td> */}
                                    </tr>
                                })}
                            </>
                            :
                            <tr>
                                <td className="notfound-tasks"> No Task Found for {props.tag.keyword}</td>

                            </tr>
                        }

                    </table>
                </div>
            </div>
        </>
    );
};

export default tagedTasks;
