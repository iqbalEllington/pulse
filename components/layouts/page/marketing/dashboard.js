import SearchProperty from "components/search/property";
import { getRequest } from "helper/api";
import React, { Component, useState, useEffect } from "react";
// import ProfileSideBar from "../myprofile/profileSideBar";
import { API_URLS } from "helper/apiConstant";
import { RiShareLine, RiPrinterLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import CircleChart from "components/modals/circlechart";
import Semicircelpie from "components/modals/Semicircelpie";
import Kpibox from "components/modals/kpibox";
import Imageslider from "components/layouts/Sidebar/Imageslider";
import LineProgress from "components/modals/LineProgress";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import moment from "moment";
import { covertToCurrency } from "/services/utilsService";
import Dropdown from 'react-bootstrap/Dropdown';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import rehypeRaw from "rehype-raw";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaList } from "react-icons/fa6";
import styles from './assets/dashboard.module.scss'
import Elcirc2 from "components/modals/elcirc2";
import { CiLocationOn } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import PolarAreaChart from './PolarAreaChart';

const index = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  const [ELproperties, setELproperties] = useState([]);
  const routers = useRouter();

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
  const getTargetElement = () => document.getElementById('salesprops-body');

  const differencepercentage = (actual, sold) => {
    let actualSales = actual;
    let soldAmount = sold;
    let difference = soldAmount - actualSales;
    let percentageDifference = (difference / actualSales) * 100;
    return percentageDifference.toFixed(2) + "%"
  }
  const [userDetail, setUserDetails] = useState(false)
  const getpercentage = (value, total) => {
    return (value * 100 / total).toFixed(2)
  }
  async function activateProeprty(id = false) {
    if (id == false) {
      var response3;
      response3 = await getRequest({ API: API_URLS.GET_PROPERTIES + '?filters[name][$eq]=' + 'all project' });

      if (await response3?.status == 200) {
        id = response3.data?.data[0]?.id
      } else {
        id = properties[propindex]?.['id']
      }
    }
    if (propindex > properties.length) {
      setPropIndex(0)
      return
    }
    var response;
    if (id != false) {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&filters[id]=' + id + '&launchDate=id:desc' });
    } else {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?filters[occuarance]=All Time&populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&launchDate=id:desc' });
    }
    if (await response?.status === 200) {
      setIsLoading(false)
      if (response.data?.data?.[0]) {
        setELproperties(response.data?.data?.[0])
      } else {
        setPropIndex(0)
      }
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  async function getroeprties(search = false) {
    var response;
    var filters = "";
    if (search) {
      filters = "&filters[name][$containsi]=" + search
    }
    response = await getRequest({ API: API_URLS.GET_MARKETING_PROPERTIES + "?populate[]=featuredImage" + filters });
    var data = []
    if (await response?.status === 200) {
      setIsLoading(false)
      setproperties(response.data?.data)
      if (propindex != 'loading') {
        setPropIndex(0)
      }
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
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
  const [properties, setproperties] = useState({})
  const [loop, setloop] = useState(false)
  const [propindex, setPropIndex] = useState("loading")
  useEffect(() => {
    getroeprties()
  }, [])
  useEffect(() => {
    if (propindex != "loading") {
      activateProeprty()
    }
  }, [propindex])

  useEffect(() => {
    getuserdata()
  }, [])
  async function filterSearch(value) {
    getroeprties(value)
  }
  useEffect(() => {
    // Ensure the router is ready before accessing query parameters
    if (routers.isReady) {
      const { property } = routers.query; // Get the 'property' query parameter
      if (property) {
        activateProeprty(property); // Call with the property value
        setloop(false)
      } else {
        activateProeprty(); // Call without argument if no property in the URL
      }
    } else {
      activateProeprty();
    }
  }, [routers.isReady, routers.query]);
  return (
    <>
      <div className={styles.marketingDashboardContain}>
        <div className="wishbanner pb w-100">
          <div className="container-fluid ">
            <div className="row">
              <div className="pl-5 salesprops">
                <div className="search-input">
                  <div className={styles.search + " searchbox"}>
                    <input onChange={(e) => filterSearch(e.target.value)} placeholder="Search" type="text" />
                    <IoSearch />
                  </div>

                  {/* <span className="result-count">Properties {property?.data?.length}</span> */}
                </div>
                {/* <SearchProperty active={ELproperties.id} activateProeprty={activateProeprty} setloop={setloop} /> */}
                <div className={styles.loginbar + " actionbar"}>
                  <span className="last-updated">Latest Data as of:  {moment(ELproperties?.attributes?.LastUpdatedDate).format('DD MMM YYYY')} </span>
                  <button className="downloadPdf" onClick={() => generatePDF(getTargetElement, options)}> Download PDF <FaArrowDown /></button>

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
                <div id="marketingDashboard" className={styles.marketingDashboard}>
                  {Object.keys(properties).map((key) => {
                    return <div className={styles.invbox}>

                      <div className={styles.imageHolder}>
                        {properties[key]["attributes"]?.["featuredImage"]?.["data"]?.["attributes"]["url"] ?
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + properties[key]["attributes"]?.["featuredImage"]?.["data"]?.["attributes"]["url"]} />
                  :
                  <img src={"https://strapi.ellington.ae/uploads/dd_87bfa85455.jpg"} />
                  }
                        <div className={styles.project_title}>
                          <div>
                            <CiLocationOn />
                          </div>
                          <div>
                            <h3>{properties[key]["attributes"]["name"]}</h3>
                            <p>
                              {properties[key]["attributes"]["community"] + ", " + properties[key]["attributes"]["city"]}
                            </p>

                          </div>

                          <div className={styles.howold}>
                            <div >

                              {moment().diff(moment(properties[key]["attributes"]["launchDate"]), 'months') > 12 ?
                                <div>
                                  <span>
                                    {(moment().diff(moment(properties[key]["attributes"]["launchDate"]), 'months') / 12).toFixed(1)}
                                  </span>
                                  <span>Years</span>
                                </div>
                                :
                                <div>
                                  <span>
                                    {moment().diff(moment(properties[key]["attributes"]["launchDate"]), 'months')}
                                  </span>
                                  <span>Months</span>
                                </div>
                              }
                            </div>

                            {/* {properties[key]["attributes"]["launchDate"]} */}
                          </div>
                        </div>
                        <div className={styles.project_construction_status}>
                          <Elcirc2 kpiText="Construction" kpiValue={{
                            total: properties[key]["attributes"]["completionProgress"],
                            value1: {
                              "unit": "Completed",
                              "value": properties[key]["attributes"]["completionProgress"]
                            },
                            value2: {
                              "unit": "Under Construction",
                              "value": properties[key]["attributes"]["completionProgress"]
                            },
                            isamount: false
                          }} size={{ Width: "100px", Height: "100px" }} percentage={properties[key]["attributes"]["completionProgress"]} color="#EDEAE3" />
                          {/* {properties[key]["attributes"]["completionProgress"]} */}
                        </div>
                        <div className={styles.project_sold}>
                          <Elcirc2 kpiText="Sold" kpiValue={{
                            total: (properties[key]["attributes"]["soldUnits"] * 100) / properties[key]["attributes"]["totalUnits"],
                            value1: {
                              "unit": "Sold",
                              "value": properties[key]["attributes"]["soldUnits"]
                            },
                            value2: {
                              "unit": "Available",
                              "value": properties[key]["attributes"]["totalUnits"]
                            },
                            isamount: false
                          }} size={{ Width: "100px", Height: "100px" }} 
                          percentage={properties[key]["attributes"]["soldUnits"] * 100 / properties[key]["attributes"]["totalUnits"]} color="#EDEAE3" />
                        </div>
                        <div className={styles.projectHandover}>
                          <div className="cal-box">
                            <span className="title">
                              ESTIMATED
                              COMPLETION
                            </span>
                            <span className="date">
                              {properties[key]["attributes"]["launchDate"] != null ? moment(properties[key]["attributes"]["launchDate"]).format('MMM YYYY') : "TBA ..."}
                              <span>{moment(properties[key]["attributes"]["launchDate"]).diff(moment(), 'months') > 0 ? moment(properties[key]["attributes"]["launchDate"]).diff(moment(), 'months') + " onths" : ""}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="summery">
                        <div className={styles.dataBlBox}>
                          <span>AVAILABLE</span>
                          <span className={styles.available}>{properties[key]["attributes"]["availableUnits"]}</span>
                        </div>
                        <div className={styles.dataBlBox}>

                          <span>SOLD</span>
                          <span className={styles.sold}>{properties[key]["attributes"]["soldUnits"]}</span>
                        </div>
                        <div className={styles.dataBlBox}>

                          <span>Blocked</span>
                          <span className={styles.blocked}>{properties[key]["attributes"]["blockedUnits"] >0 ? properties[key]["attributes"]["blockedUnits"] : 0}</span>
                        </div>

                      </div>
                    </div>
                  })}
                  {/* {properties?.map((proeprty)=>{
                    return <div>{JSON.stringify(proeprty)}</div>
                })} */}

                  {/* {JSON.stringify(properties)} */}
                </div>

              </div>
            </div>
          </div>
          {/* <PolarAreaChart data={properties}/> */}
        </div>
      </div>
    </>
  );
};

export default index;
