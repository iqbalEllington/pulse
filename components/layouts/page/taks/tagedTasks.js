
import { Avatar, Tooltip } from "@mui/material";
import { getRequest, putRequest_cms } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import { FaRegStar, FaStar, FaWhatsapp } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";

import { FaChevronDown } from "react-icons/fa";


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
                filter =`&filters[dueDate][$lte]=${endOfWeek.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$gt]=${tomorrow.format('YYYY-MM-DD')}`; // Exclude tomorrow
                console.log(filter, "this week")
                break;

            case 'This Month':
                filter = `&filters[dueDate][$gte]=${endOfWeek.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$lte]=${endOfMonth.format('YYYY-MM-DD')}` 
                break;

            case 'Other':
                filter = `&filters[dueDate][$gt]=${endOfMonth.format('YYYY-MM-DD')}`; // After this month
                break;

            default:
                throw new Error("Invalid filter type");
        }

        return filter;
    };
    async function getTagedTask(tag) {
        let filter="";
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
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }

    }
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
        if (name) {
            return {
                sx: {
                    bgcolor: stringToColor(name),
                },
                children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        } else {
            return
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

    return (
        <>
            <div className="task-list-container">
                <div className="header">
                    <h3 className="ontoptitle">
                        {props.tag.keyword}
                    </h3>
                </div>
                <div className="body">
                    <table className="tasks-list">
                        {tasks.data?.map((task) => {
                            return <tr>
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
                                <td className="taskTitle">
                                    <h4 onClick={() => { props.SetUpdateData(task), props.SetFormaction("update") }}>
                                        {task.attributes.Task}
                                    </h4>
                                </td>
                                <td className="projectName">
                                    <div>
                                        <label className="mobile-view">Project: </label>
                                        {task.attributes.projects?.data?.[0]?.attributes?.name}
                                    </div>
                                </td>
                                <td className={task.attributes.type + " type"}>
                                    <span>{task.attributes.type}</span>
                                </td>
                                <td className="Priority">
                                    <span>{task.attributes.priority}</span>
                                </td>
                                <td className="dueDate">
                                <label className="mobile-view">Due Date</label>
                                    <span>{task.attributes.dueDate}</span>
                                </td>
                                <td className={task.attributes?.status?.replace(" ", "") + " status"}>
                                <label className="mobile-view">Status</label>
                                    <span>{task.attributes.status}</span>
                                </td>
                                <td className="responsible">
                                <label className="mobile-view">Responisble</label>
                                    <div>
                                        <Tooltip title={task.attributes.responsible_leads?.data?.[0]?.["attributes"]?.Name}>
                                            <span>
                                                <Avatar {...stringAvatar(task.attributes.responsible_leads?.data?.[0]?.["attributes"]?.Name)} />
                                                {/* {task.attributes.responsible_leads?.data?.[0]?.["attributes"].Name} */}
                                            </span>
                                        </Tooltip>
                                        <span className="wahtsapp">
                                            <a target="_blank" href={gettaskWhatsapp(task.attributes.responsible_leads?.data?.[0]?.["attributes"].whatsapp, task.attributes.projects?.data?.[0]?.attributes?.name, task.attributes.Task)}><FaWhatsapp /></a>
                                        </span>
                                    </div>
                                </td>
                                <td className="responses">
                                    <span onClick={() => { props.SetUpdateData(task), props.SetFormaction("update") }}>
                                        <span className="ondesk">  Responses</span>
                                        <span className="mobile-view"> Expand <FaChevronDown/></span>
                                        <sup>
                                            {JSON.stringify(task.attributes?.updates.length)}
                                        </sup>
                                    </span>
                                </td>
                                <td className="editAction">
                                    <span onClick={() => { props.SetUpdateData(task), props.SetFormaction("edit") }}>
                                        Edit
                                    </span>
                                </td>
                                {/*     <td>
                                    {JSON.stringify("Responses")}
                                </td>
                                <td>
                                    {JSON.stringify("Read More")}
                                </td> */}
                            </tr>
                        })}

                    </table>
                </div>
            </div>
        </>
    );
};

export default tagedTasks;
