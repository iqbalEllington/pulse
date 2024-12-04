
import { getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";



const tagedTasks = ({ router }, props) => {
    const [tasks, setTasks] = useState({})
    async function getTagedTask(tag) {
        if (tag?.type == "date") {

        } else if (tag?.type == "tag") {

        }
        else if (tag?.type == "priority") {

        }
        else if (tag?.type == "project") {

        }
        if (tag?.sort == "date") {

        } else {

        }
        if (tag?.search != false) {

        }

        var response;
        response = await getRequest({ API: API_URLS.GET_TASKS + "?populate[]=responsible_leads&populate[]=projects&" });
        var data = []
        if (await response?.status === 200) {
            setTasks(response.data)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }
    function SetIsstarred() {
        return
    }
    useEffect(() => {
        getTagedTask(props.tag)
    }, [props.tag])
    return (
        <>
            <div className="task-list-container">
                <div className="header">
                    <h3>
                        {props.tag?.keyword}
                    </h3>
                </div>
                <div className="body">
                    <table className="tasks-list">
                        {tasks.data?.map((task) => {
                            return <tr>
                                <td className="star">
                                    <div onClick={() => SetIsstarred(!isStarred)}>
                                        {task.attributes.isStarred ?
                                            <FaStar />
                                            :
                                            <FaRegStar />
                                        }
                                    </div>
                                </td>
                                <td>
                                    <h4>
                                        {task.attributes.Task}
                                    </h4>
                                </td>
                                <td>
                                    <div>
                                        {task.attributes.projects?.data?.[0]?.["attributes"].name}
                                    </div>
                                </td>
                                <td>
                                    <span>{task.attributes.type}</span>
                                </td>
                                <td>
                                    <span>{task.attributes.dueDate}</span>
                                </td>
                                <td>
                                    <span>{task.attributes.status}</span>
                                </td>
                                <td>
                                    <div>
                                        <span>
                                            {task.attributes.responsible_leads?.[0]?.["attributes"].Name}
                                        </span>
                                        <span>
                                            {task.attributes.responsible_leads?.[0]?.["attributes"].whatsapp}
                                        </span>
                                    </div>
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
