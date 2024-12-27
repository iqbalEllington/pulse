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
  async function getroeprties() {
    var response;
    response = await getRequest({ API: API_URLS.GET_MARKETING_PROPERTIES + "?populate[]=featuredImage" });
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
      <div className="wishbanner pb w-100">
        <div className="container-fluid">
          <div className="row dashboard-sales">
            <div className="pl-5 salesprops">
              <SearchProperty active={ELproperties.id} activateProeprty={activateProeprty} setloop={setloop} />
              <div className="actionbar">
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
              <div className={styles.marketingDashboard} id="marketingDashboard">
                {Object.keys(properties).map((key) => {
                  return <div className={styles.invbox}>

                    <div className={styles.imageHolder}>
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + properties[key]["attributes"]["featuredImage"]["data"]?.["attributes"]["url"]} />
                      <div className="project_title">
                        {properties[key]["attributes"]["name"]}
                        <p>
                          {properties[key]["attributes"]["community"] + ", " + properties[key]["attributes"]["city"]}
                        </p>

                        <div>
                          {properties[key]["attributes"]["launchDate"]}
                        </div>
                      </div>
                      <div className="project_construction_status">

                        {properties[key]["attributes"]["completionProgress"]}
                      </div>
                      <div className="project_sold">90%</div>
                      <div className="project_Handover">
                        <div className="cal-box">
                          <span className="title">
                            ESTIMATED
                            COMPLETION
                          </span>
                          <span className="date">
                            {properties[key]["attributes"]["launchDate"] != null ? moment(properties[key]["attributes"]["launchDate"]).format('MMM YYYY') : "TBA ..."}
                            {/* // Jun 2024 */}
                          </span>
                        </div>


                      </div>
                    </div>
                    <div className="summery">
                      <div className="data-bl-box">
                        <span>AVAILABLE</span>
                        <span>264</span>
                      </div>
                      <div className="data-bl-box">

                        <span>SOLD</span>
                        <span>264</span>
                      </div>
                      <div className="data-bl-box">

                        <span>Blocked</span>
                        <span>264</span>
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
      </div>
    </>
  );
};

export default index;
