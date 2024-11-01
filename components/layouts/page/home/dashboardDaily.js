import SearchProperty from "components/search/property";
import { getRequest } from "helper/api";
import React, { Component, useState, useEffect } from "react";
// import ProfileSideBar from "../myprofile/profileSideBar";
import { API_URLS } from "helper/apiConstant";
import { RiShareLine, RiPrinterLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import CircleChart from "components/modals/circlechart";

import CircleChart2 from "components/modals/circlechart2";
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
import Linechart from "components/layouts/charts/linechart";
import Verticalmultichart from "components/layouts/charts/Verticalmultichart";
import { TbCurrencyDollar } from "react-icons/tb";

const DashboardDaily = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  const [ELproperties, setELproperties] = useState(false);
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
      id = properties[propindex]?.['id']
    }
    if (propindex > properties.length) {
      setPropIndex(0)
      return
    }
    var response;
    if (id != false) {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&filters[id]=' + id + '&launchDate=id:desc' });
    } else {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&launchDate=id:desc' });
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
    response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?fields[0]=id&pagination[page]=1&pagination[pageSize]=100&sort=id:desc' });
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
  const [properties, setproperties] = useState(false)
  const [loop, setloop] = useState(true)
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
    }
  }, [routers.isReady, routers.query]);
  return (
    <>
      <div className="wishbanner pb w-100">
        <div className="container-fluid">
          <div className="row dashboard-sales">
            <div className="pl-5 salesprops">
              <SearchProperty activateProeprty={activateProeprty} setloop={setloop} />
              <div className="actionbar">
                <span className="last-updated">Latest Data as of:  {moment(ELproperties?.attributes?.LastUpdatedDate).format('DD MMM YYYY')} </span>
                <button className="downloadPdf" onClick={() => generatePDF(getTargetElement, options)}> Download PDF <FaArrowDown /></button>
                <div className="playpause">
                  <div onClick={() => { setloop(!loop) }}>
                    <CountdownCircleTimer
                      className="countown"
                      isPlaying={loop}
                      size="40"
                      strokeWidth="2"
                      isGrowing={true}
                      duration={13}
                      rotation={"counterclockwise"}
                      colors={['#C9FFCE', '#9E856F']}
                      colorsTime={[0, 7]}
                      onComplete={() => {
                        setPropIndex(propindex + 1)
                        // do your stuff here
                        return { shouldRepeat: true, delay: 1 } // repeat animation in 1.5 seconds
                      }}
                    >
                    </CountdownCircleTimer>
                    {loop == true ?

                      <FaPause className="pause" /> :

                      <FaPlay className="pause" />
                    }
                  </div>
                </div>
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
              <div className="salesprops-body" id="salesprops-body">
                <div>

                  <Kpibox title="Last 7 days" withhead={true} theme="dark">
                    <Verticalmultichart />
                  </Kpibox>
                </div>
                <div>
                  <div className="col-md-6 col-12 col-xl-12 mt-4">
                    <Kpibox withhead={false} theme="el-gray">
                      <div className="figure-box">
                        <div className="col-12 title">
                          <h2>
                            <span><TbCurrencyDollar /></span>
                            Total Sales
                          </h2>
                        </div>
                        <div className="data">
                          <div>
                            <span>
                              AED
                            </span>
                            <span>
                              140,189,748
                            </span>
                          </div>
                          <div>
                            <CircleChart2 kpiText="Generated" kpiValue={{
                              total: ELproperties?.attributes?.SalesProgressionGenerated,
                              value1: {
                                "unit": "Sales",
                                "value": ELproperties?.attributes?.SalesProgressionSigned
                              },
                              value2: {
                                "unit": "Sales",
                                "value": ELproperties?.attributes?.SalesProgressionExecuted
                              },
                              isamount: false
                            }} size={{ Width: "80px", Height: "80px" }} percentage={ELproperties?.attributes?.SalesProgressionSigned * 100 / ELproperties?.attributes?.SalesProgressionGenerated} color="#000000" />

                          </div>
                        </div>
                      </div>
                    </Kpibox>

                  </div>
                </div>
              </div>
              {/* <Kpibox title="title" withhead={false}>
                <CircleChart size={{ Width: "250px", Height: "250px" }} percentage={70} color="#000" />
              </Kpibox> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDaily;
