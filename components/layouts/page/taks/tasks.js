
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
import Taskform from "./taskform";
import Link from "next/link";
import TagedTasks from "./tagedTasks";



const Tasks = ({ router }, props) => {





    useEffect(() => {
        getuserdata()
    }, [])

    const[formActive, setFormActive] = useState(false)
    const [updateDatas, SetUpdateDatas] = useState(false)
    const SetUpdateData = (data) => {
        SetUpdateDatas(data);
        setFormActive(true)
    }
    const [ontop, SetOntop] = useState("Top Updates")
    const [forceLoad, setForceload] = useState(false)
    const getTargetElement = () => document.getElementById('salesprops-body');
    const [userDetail, setUserDetails] = useState(false)
    async function getuserdata() {
        var response;
        response = await getRequest({ API: API_URLS.GET_USER + '?populate[]=profilePhoto' });
        var data = []
        if (await response?.status === 200) {
            setUserDetails(response.data)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }
    const options = {
        // default is `save`
        method: 'open',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.LOW,

        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: 0,
            // default is 'A4'
            format: 'A4',

            // default is 'portrait'
            orientation: 'landscape',
        },
        canvas: {
            // default is 'image/jpeg' for better size performance
            mimeType: 'image/png',
            qualityRatio: 1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break, 
        // so use with caution.
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true
            },
            // see https://html2canvas.hertzen.com/configuration for more options
            canvas: {
                useCORS: true
            }
        },
    };

    return (
        <>
            <div className="wishbanner tasks-board pb w-100">
                <div className="container-fluid">
                    <div className="header">
                        <div className="welcome-message">
                            <h1>
                                Hello Elie,
                            </h1>
                            <p>Here are the top-priority Tasks & Alerts requiring your attention.</p>
                        </div>
                        <div className="actionbar">
                            <button className="downloadPdf" onClick={() => generatePDF(getTargetElement, options)}> Download PDF <FaArrowDown /></button>
                            <button className="add-task" onClick={() => {setFormActive(!formActive),SetUpdateDatas(false)}}> Add a task </button>

                            <Dropdown className="profile-user">
                                <Dropdown.Toggle id="dropdown-basic">
                                    <div className="profile-image-holder">
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + userDetail?.profilePhoto?.url} />
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                                    {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="form">
                        <Taskform
                            updateData={{
                                a: "b"
                            }}
                            formstatus={formActive}
                            SetFormActive={setFormActive}
                            setForceload={setForceload}
                            updateDatas={updateDatas}
                        />
                    </div>
                    <div className="Task-List-body">
                        <div className="header">
                            <div className="filter">
                                <h2>Show me on Top</h2>
                                <ul>
                                    <li className="top">
                                        <Link onClick={() => SetOntop("Top Updates")} href="/tasks/top-updates">
                                            Top Updates
                                        </Link>
                                    </li>
                                    <li className="today" >
                                        <Link href="/tasks/today" onClick={() => SetOntop("Today")}>
                                            Today
                                        </Link>
                                    </li>
                                    <li className="priority">
                                        <Link href="/tasks/top-priority" onClick={() => SetOntop("Top Priority")}>
                                            Top Priority
                                        </Link>
                                    </li>
                                    <li className="this-week">
                                        <Link href="/tasks/this-week" onClick={() => SetOntop("This Week")}>
                                            This Week
                                        </Link>
                                    </li>
                                    <li className="overdue">
                                        <Link href="/tasks/overdue" onClick={() => SetOntop("Overdue")}>
                                            Overdue
                                        </Link>
                                    </li>
                                    <li className="completed" onClick={() => SetOntop("Completed")}>
                                        <Link href="/tasks/completed">
                                            Completed
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="search">
                                <div>
                                    <input type="text" placeholder="search" />
                                </div>
                            </div>
                        </div>
                        <div className="show-me-top">

                            <TagedTasks tag={{
                                keyword: ontop,
                                type: "tag",
                                forceLoad: { forceLoad },
                                filterValue: ontop
                            }}
                                SetUpdateData={SetUpdateData}
                            />
                        </div>

                        <div className="Grouped">

                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </>
    );
};

export default Tasks;
