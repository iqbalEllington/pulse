
import { getRequest, putRequest_cms } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";



const tagedTasks = (props) => {
    const [tasks, setTasks] = useState({})
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
                filter = `&filters[dueDate][$gte]=${startOfWeek.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$lte]=${endOfWeek.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$ne]=${today.format('YYYY-MM-DD')}` + // Exclude today
                    `&filters[dueDate][$ne]=${tomorrow.format('YYYY-MM-DD')}`; // Exclude tomorrow
                break;

            case 'This Month':
                filter = `&filters[dueDate][$gte]=${startOfMonth.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$lte]=${endOfMonth.format('YYYY-MM-DD')}` +
                    `&filters[dueDate][$lt]=${startOfWeek.format('YYYY-MM-DD')}`; // Exclude this week
                break;

            case 'Other':
                filter = `&filters[dueDate][$lt]=${startOfMonth.format('YYYY-MM-DD')}` + // Before this month
                    `&filters[dueDate][$gt]=${endOfMonth.format('YYYY-MM-DD')}`; // After this month
                break;

            default:
                throw new Error("Invalid filter type");
        }

        return filter;
    };
    async function getTagedTask(tag) {
        let filter;
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
        console.log(tag.search, filter)
        var response;
        response = await getRequest({ API: API_URLS.GET_TASKS + "?populate[]=responsible_leads&populate[]=projects" + filter });
        var data = []
        if (await response?.status === 200) {
            setTasks(response.data)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
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
                                            <IoMdStar className="active"/>
                                            :
                                            <IoMdStar/>
                                            // <FaRegStar />
                                        }
                                    </div>
                                </td>
                                <td className="taskTitle">
                                    <h4>
                                        {task.attributes.Task}
                                    </h4>
                                </td>
                                <td className="projectName">
                                    <div>
                                        {task.attributes.projects?.data?.[0]?.attributes?.name}
                                    </div>
                                </td>
                                <td className={task.attributes.type +" type"}>
                                    <span>{task.attributes.type}</span>
                                </td>
                                <td className="Priority">
                                    <span>{task.attributes.priority}</span>
                                </td>
                                <td className="dueDate">
                                    <span>{task.attributes.dueDate}</span>
                                </td>
                                <td className="status">
                                    <span>{task.attributes.status}</span>
                                </td>
                                <td className="responsible">
                                    <div>
                                        <span>
                                            {task.attributes.responsible_leads?.data?.[0]?.["attributes"].Name}
                                        </span>
                                        <span>
                                            {task.attributes.responsible_leads?.data?.[0]?.["attributes"].whatsapp}
                                        </span>
                                    </div>
                                </td>

                                <td>
                                    <span onClick={() => props.SetUpdateData(task)}>
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
