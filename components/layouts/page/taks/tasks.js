
import { getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import moment from "moment";
import React, { Component, useState, useEffect, useRef } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowDown } from "react-icons/fa";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { toast } from "react-toastify";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Taskform from "./taskform";
import Link from "next/link";
import TagedTasks from "./tagedTasks";
import { FaSortAmountDown } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import EscapeKeyListener from "components/utility/EscapeKeyListener";

import jsPDF from 'jspdf';


const Tasks = ({ router }, props) => {
    useEffect(() => {
        getuserdata()
    }, [])
    const groupedRef = useRef(null);

    const handleSelect = (eventKey) => {
        if (eventKey == "Project") {
            getProjects();
            setSort(eventKey);
        } else {
            setSort(eventKey);
        }
        groupedRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start", // Ensures the section starts at the top of the page
        });

        // Update the state with the selected value

    };
    const [formaction, SetFormaction] = useState("edit")
    const [sort, setSort] = useState("Date")
    const [formActive, setFormActive] = useState(false)
    const [updateDatas, SetUpdateDatas] = useState(false)
    const SetUpdateData = (data) => {
        SetUpdateDatas(data);
        setFormActive(true)
    }
    const [ontop, SetOntop] = useState("Top Updates")
    const [forceLoad, setForceload] = useState(false)
    const getTargetElement = () => document.getElementById('grouped');
    const [userDetail, setUserDetails] = useState(false)
    async function getuserdata() {
        var response;
        response = await getRequest({ API: API_URLS.GET_USER + '?populate[]=profilePhoto' });
        if (await response?.status === 200) {
            setUserDetails(response.data)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }
    async function getProjects(value) {
        var response;
        response = await getRequest({ API: API_URLS.GET_PROJECTS });
        if (await response?.status === 200) {
            // setIsLoading(false)
            setProject(response.data)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }
    const [projects, setProject] = useState(false)
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
            mimeType: 'image/jpeg',
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
    const [search, SetSearch] = useState("")
    const filterSearch = (value) => {
        SetSearch(value)
    };
    const [sortDate, SetsortDate] = useState(["Today", "Tomorrow", "This Week", "This Month", "Other"]);
    const handleEscape = () => {
        setFormActive(false)
    };
    const [hideElements, setHideElements] = useState(true);
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    const handleGeneratePdf = async () => {
        // Hide elements before PDF generation
        await new Promise((resolve) => {
            setHideElements(true);
            resolve();
        });
       
        await wait(1000); 
        const customStyle = document.createElement('style');
        // customStyle.innerHTML = `
        //     #grouped{
        //     font-size: 7px;
        //     color:black;
        //     }
        //     .task-list-container .header h3{
        //         font-size: 7px;
        //         color:black;
        //     }
        //         table{
        //         width:100%;
        //         color:black;
        //         }
        //     table tr td,table tr th {
        //         font-size: 7px;
        //         color:black;
        //     }
        //    table tr td h4,table tr td label,table tr td h4,table tr td div, table tr td span, table tr th {
        //         font-size: 7px;
        //         color:black;
        //     }
        // `;
        // document.head.appendChild(customStyle);

        const doc = new jsPDF(
            {
                orientation: "landscape",    
                unit: "px",
                autoPaging: true,
                // html2canvas: { scale: 3 },
            });
        
        doc.html(groupedRef.current, {
            // 'pt', 'px', 'cm', 'in'
            // format: 'a4',
            callback: function (doc) {
                const pageHeight = doc.internal.pageSize.height;
                let currentY = 10;
                const contentHeight = groupedRef.current.offsetHeight;
        
                if (contentHeight > pageHeight - currentY) {
                    doc.addPage();
                    currentY = 30; // Reset Y position
                }
                doc.save('document.pdf');
                // document.head.removeChild(customStyle);
            },
            autoPaging: true,
            html2canvas: {
                scale: .69, // Adjust scale to shrink or expand content
            },
            
            margin: [4, 4, 14, 4],
          
            x: 0, // Adjust x-axis position
            y: 0, // Adjust y-axis position
        });
        // generatePDF(getTargetElement, options)
        setHideElements(false);
    };
    return (
        <>
            <EscapeKeyListener onEscape={handleEscape} />
            <div className="wishbanner tasks-board pb w-100">
                <div className="container-fluid">
                    <div className="header">
                        <div className="welcome-message">
                            <h1>
                                Hello{userDetail.FullName != null ? " " + userDetail.FullName : ""},
                            </h1>
                            <p>Here are the top-priority Tasks & Alerts requiring your attention.</p>
                        </div>
                        <div className="actionbar">
                            {/* <button className="downloadPdf" onClick={() => generatePDF(getTargetElement, options)}> Download PDF <FaArrowDown /></button> */}
                            <button className="downloadPdf" onClick={() => handleGeneratePdf()}> Download PDF <FaArrowDown /></button>

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
                        <button className="add-task" onClick={() => { setFormActive(!formActive), SetUpdateDatas(false) }}><span className="mobile-view">+</span> <span className="ondesk"> Add a task </span> </button>

                    </div>
                    <div className="form">
                        <Taskform
                            formstatus={formActive}
                            SetFormActive={setFormActive}
                            setForceload={setForceload}
                            updateDatas={updateDatas}
                            action={formaction}
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
                                <div className="search-box-task">
                                    <input type="text" value={search} onChange={(e) => filterSearch(e.target.value)} placeholder="search" />
                                    <IoSearch />
                                </div>
                            </div>
                        </div>
                        <div className="show-me-top">
                            <TagedTasks tag={{
                                keyword: ontop,
                                type: "tag",
                                search: search,
                                forceLoad: { forceLoad },
                                filterValue: ontop
                            }}
                                hideElements={hideElements}
                                SetFormaction={SetFormaction}
                                setForceload={setForceload}
                                SetUpdateData={SetUpdateData}
                                SetFormActive={setFormActive}
                                formActive={formActive}
                                updateDatas={updateDatas}
                            />
                        </div>
                        {/* formstatus={formActive}
                          
                            setForceload={setForceload}
                            updateDatas={updateDatas}
                            action={formaction} */}

                        <div className="Grouped" >
                            <div className="GroupBySort">
                                <label>Group By: </label>
                                <Dropdown className="color-drop-multy" onSelect={handleSelect}>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <FaSortAmountDown />   {sort || 'Group By'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Date">Date Ascending</Dropdown.Item>
                                        <Dropdown.Item eventKey="Project">Latest Project</Dropdown.Item>
                                        <Dropdown.Item eventKey="Priority">Priority</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div id="grouped" className={!hideElements ? "" : "White-Theme"} ref={groupedRef} >
                                {sort == "Date" &&
                                    <>
                                        <div className="pages">
                                            <TagedTasks tag={{
                                                keyword: "Overdue",
                                                search: search,
                                                type: sort,
                                                forceLoad: { forceLoad },
                                                filterValue: "Overdue"
                                            }}
                                                hideElements={hideElements}
                                                SetFormaction={SetFormaction}
                                                setForceload={setForceload}
                                                SetUpdateData={SetUpdateData}
                                            />
                                        </div>
                                        <div className="page-break"></div>
                                        {sortDate.map((value) => {
                                            return <div className="pages">
                                                <TagedTasks tag={{
                                                    keyword: value,
                                                    search: search,
                                                    type: sort,
                                                    forceLoad: { forceLoad },
                                                    filterValue: value
                                                }}
                                                hideElements={hideElements}
                                                    SetFormaction={SetFormaction}
                                                    setForceload={setForceload}
                                                    SetUpdateData={SetUpdateData}
                                                />
                                                 <div className="page-break"></div>
                                            </div>
                                        })}
                                    </>}
                                {sort == "Project" &&
                                    <>
                                        {projects?.data?.length > 0 &&
                                            // {JSON.stringify(typeof(projects?.data))}
                                            <>
                                                {Object.keys(projects?.data).map((value, key) => {
                                                    return <div>
                                                        <TagedTasks tag={{
                                                            keyword: projects?.data[value]?.["attributes"]?.["name"],
                                                            type: sort,
                                                            search: search,
                                                            forceLoad: { forceLoad },
                                                            filterValue: projects?.data[value]?.["attributes"]?.["name"],
                                                        }}
                                                        hideElements={hideElements}
                                                            SetFormaction={SetFormaction}
                                                            setForceload={setForceload}
                                                            SetUpdateData={SetUpdateData}
                                                        />
                                                    </div>
                                                })}
                                            </>
                                        }
                                    </>}
                                {sort == "Priority" &&
                                    <>
                                        <div>
                                            <TagedTasks tag={{
                                                keyword: "Priority",
                                                type: "Priority",
                                                search: search,
                                                forceLoad: { forceLoad },
                                                filterValue: "Priority",
                                            }}
                                            hideElements={hideElements}
                                                SetFormaction={SetFormaction}
                                                setForceload={setForceload}
                                                SetUpdateData={SetUpdateData}
                                            />
                                        </div>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Tasks;
