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

const index = ({ router }, props) => {
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
    response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?fields[0]=id&pagination[page]=1&pagination[pageSize]=100&filters[occuarance]=All Time&sort=id:desc' });
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
                <div className="dashboard-body-left">
                  <div className="col-12 mob-m-10">
                    <div className="db-header">
                      <h2>{ELproperties?.attributes?.name == "all project" ? "All Projects" : ELproperties?.attributes?.name}</h2>
                      <div className="db-hdesc">
                        <span>{(ELproperties?.attributes?.emirates != null ? ELproperties?.attributes?.emirates : "UAE") + ", " + (ELproperties?.attributes?.area != null ? ELproperties?.attributes?.area : "")}</span>
                        {ELproperties?.attributes?.name != "all project" && <span> Launch Month: {moment(ELproperties?.attributes?.launchDate).format('MMM YYYY')}</span>}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Kpibox withhead={false} padding="15px">
                    <div className="row">
                      <div className="col-12 col-md-6 col-xl-12">
                        <div className="constructionstatus mt-5">
                          <div className="semipie">
                            <Semicircelpie size={{ Width: "250px", Height: "250px" }} percentage={ELproperties?.attributes?.completionProgress != null ? ELproperties?.attributes?.completionProgress : 0} pathFill='#2B2B36' lineStroke='#C9FFCE' />
                          </div>

                          <div className="cal-box">
                            <span className="title">
                              ESTIMATED
                              COMPLETION
                            </span>
                            <span className="date">
                              {ELproperties?.attributes?.completionDate != null ? moment(ELproperties?.attributes?.completionDate).format('MMM YYYY') : "TBA ..."}
                              {/* // Jun 2024 */}
                            </span>
                          </div>
                        </div>
                        <div className="age">

                          <div>
                            <span>
                              Completed %
                            </span>
                            <span className="flex-start">
                              {ELproperties?.attributes?.completionProgress != null ? ELproperties?.attributes?.completionProgress : 0}
                            </span>
                          </div>
                          <div>
                            <span>
                              Age
                            </span>
                            <span>
                              {moment().diff(moment(ELproperties?.attributes?.launchDate), 'months') < 12 ? `${moment().diff(moment(ELproperties?.attributes?.launchDate), 'months')} months` : `${(moment().diff(moment(ELproperties?.attributes?.launchDate), 'months') / 12).toFixed(1)} years`}

                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <hr /> */}
                      <div className="col-md-6 col-12 col-xl-12">
                        <Kpibox title="Units" withhead={true} theme="light">
                          <div className="vis-data">
                            <div className="p-4">
                              <CircleChart kpiText="Total Units" size={{ Width: "150px", Height: "150px" }}

                                percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} kpiValue={{
                                  total: ELproperties?.attributes?.totalUnits,
                                  value1: {
                                    "unit": "Sold Units",
                                    "value": ELproperties?.attributes?.soldUnits
                                  },
                                  value2: {
                                    "unit": "Available",
                                    "value": ELproperties?.attributes?.availableUnits
                                  },
                                  isamount: false
                                }}
                                color="#00A171" />
                            </div>
                            <div className="data-summery">
                              <div>
                                <h3>Sold Units</h3>
                                <span className="fg-dgreen">{ELproperties?.attributes?.soldUnits}<b>({Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)}%)</b></span>
                              </div>
                              <div>
                                <h3>Available Units</h3>
                                <span className="fg-lpink">{ELproperties?.attributes?.availableUnits}<b>({Math.round(ELproperties?.attributes?.availableUnits * 100 / ELproperties?.attributes?.totalUnits)}%)</b></span>
                              </div>
                            </div>

                          </div>
                        </Kpibox>
                      </div>
                      <div className="col-md-6 col-12 col-xl-12 mt-4">
                        <Kpibox title="Sales Progression" withhead={true} theme="light">
                          <div className="vis-data">
                            <div className="p-4">
                              <CircleChart kpiText="SPA Generated" kpiValue={{
                                total: ELproperties?.attributes?.SalesProgressionGenerated,
                                value1: {
                                  "unit": "Registered",
                                  "value": ELproperties?.attributes?.registrations
                                },
                                value2: {
                                  "unit": "Not Registered",
                                  "value": ELproperties?.attributes?.SalesProgressionGenerated - ELproperties?.attributes?.registrations
                                },
                                isamount: false
                              }} size={{ Width: "150px", Height: "150px" }}
                                percentage={ELproperties?.attributes?.registrations * 100 / ELproperties?.attributes?.SalesProgressionGenerated} color="#00A171" />
                            </div>
                            <div className="data-summery pt-4 pb-3" style={{ flexWrap: "wrap" }}>
                              <div>
                                <h3>SPA Generated</h3>
                                <span style={{ color: "#9E856F" }} className="fg-gold">{ELproperties?.attributes?.SalesProgressionGenerated} <b>({(ELproperties?.attributes?.SalesProgressionSigned && ELproperties?.attributes?.SalesProgressionGenerated)
                                  ? (ELproperties.attributes.SalesProgressionGenerated * 100 / ELproperties.attributes.SalesProgressionGenerated).toFixed(2)
                                  : 0}%)</b></span>
                              </div>
                              <div>
                                <h3>SPA Executed</h3>
                                <span className="fg-lpink">{ELproperties?.attributes?.SalesProgressionExecuted} <b>({ELproperties?.attributes?.SalesProgressionExecuted > 0 ? (ELproperties?.attributes?.SalesProgressionExecuted * 100 / ELproperties?.attributes?.SalesProgressionGenerated).toFixed(2) + "%" : "0%"})</b></span>
                              </div>
                              <div>
                                <h3>Registered <sup>New</sup></h3>
                                <span className="fg-dgreen">{ELproperties?.attributes?.registrations} <b>({ELproperties?.attributes?.registrations > 0 ? (ELproperties?.attributes?.registrations * 100 / ELproperties?.attributes?.SalesProgressionGenerated).toFixed(2) + "%" : "0%"})</b></span>
                              </div>
                            </div>
                          </div>
                        </Kpibox>
                      </div>
                      <div className="col-md-6 col-12 col-xl-12 mt-4">
                        <Kpibox title="Down Payments" withhead={true} theme="light">
                          <div className="vis-data">
                            <div className="p-4">
                              <CircleChart kpiText="Total Due" kpiValue={{
                                total: ELproperties?.attributes?.DpAmountPaidCount + ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpAmountPaidCount,
                                value1: {
                                  "unit": "DP Paid",
                                  "value": ELproperties?.attributes?.DpAmountPaidCount
                                },
                                value2: {
                                  "unit": "DP Outstanding",
                                  "value": (ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpOutstandingCount)
                                },
                                isamount: true
                              }} size={{ Width: "150px", Height: "150px" }} percentage={ELproperties?.attributes?.DpAmountPaidCount * 100 / (Math.round(ELproperties?.attributes?.DpAmountPaidCount + (ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpAmountPaidCount)))} color="#00A171" />
                            </div>
                            <div className="data-summery">
                              <div>
                                <h3>DP Collected</h3>
                                <span className="fg-dgreen">{ELproperties?.attributes?.DpAmountPaidCount} <b>({Math.round(ELproperties?.attributes?.DpAmountPaidCount * 100 / (Math.round(ELproperties?.attributes?.DpAmountPaidCount + (ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpAmountPaidCount))))}%)</b></span>
                              </div>
                              <div>
                                <h3>DP Outstanding</h3>
                                <span className="fg-lpink">{ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpAmountPaidCount} <b>({Math.round((ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpAmountPaidCount) * 100 / (Math.round(ELproperties?.attributes?.DpAmountPaidCount + (ELproperties?.attributes?.soldUnits - ELproperties?.attributes?.DpAmountPaidCount))))}%)</b></span>
                              </div>
                            </div>
                          </div>
                        </Kpibox>
                      </div>
                    </div>
                  </Kpibox>
                  <hr />

                </div>
                <div className="dashboard-body-right">
                  <div className="row">
                    <div className="collectionbars row m-0 p-0">
                      <div className="col-12 col-md-6 mt-4 col-xl-12">
                        {/* <Kpibox withhead={false}> */}
                        <Kpibox title="Overall Collection" withhead={true} theme="dark" padding="0px">
                          <div className="vis-data">

                            <div className="data-summery">
                              <div>
                                <h3>Due</h3>
                                <span className="fg-white">{covertToCurrency(ELproperties?.attributes?.totalDue, false)}<b> {Math.round(getpercentage(ELproperties?.attributes?.totalDue, ELproperties?.attributes?.unitAmountsSold_og))}% of sold Value </b> </span>
                              </div>
                              <div className="mt-2">
                                <h3 className="fg-dgreen">Collection</h3>
                                <span className="fg-dgreen">{covertToCurrency(ELproperties?.attributes?.total_collection, false)}  <b> {Math.round(getpercentage(ELproperties?.attributes?.total_collection, ELproperties?.attributes?.totalDue))}% of due</b></span>
                              </div>
                              <div className="mt-2">
                                <h3 className="fg-lpink">Outstanding</h3>
                                <span className="fg-lpink">{covertToCurrency(ELproperties?.attributes?.total_outstanding, false)}  <b>{Math.round(getpercentage(ELproperties?.attributes?.total_outstanding, ELproperties?.attributes?.totalDue))}% of Due</b></span>
                              </div>
                            </div>
                            <div className="p-3">
                              <CircleChart
                                kpiText="Total Due" kpiValue={{
                                  total: Math.round(ELproperties?.attributes?.totalDue),
                                  value1: {
                                    "unit": "Collection",
                                    "value": ELproperties?.attributes?.total_collection
                                  },
                                  value2: {
                                    "unit": "Outstanding",
                                    "value": ELproperties?.attributes?.total_outstanding
                                  },
                                  isamount: true
                                }} bodyColor="black" size={{ Width: "150px", Height: "150px" }} percentage={ELproperties?.attributes?.total_collection * 100 / ELproperties?.attributes?.totalDue} color="#00A171"

                              />
                              {/* kpiText="Outstanding" size={{ Width: "150px", Height: "150px" }} percentage={70} color="#00A171" bodyColor="black"  */}
                            </div>
                          </div>
                        </Kpibox>
                      </div>
                      <div className="col-12 col-md-6 mt-4 col-xl-12">
                        {/* <Kpibox withhead={false}> */}
                        <Kpibox title="Down payments" withhead={true} theme="dark" padding="0px">
                          <div className="vis-data">

                            <div className="data-summery">
                              <div>
                                <h3>Due</h3>
                                <span className="fg-white">{covertToCurrency(Math.round(ELproperties?.attributes?.DPamountDue), false)} <b>{Math.round(getpercentage(ELproperties?.attributes?.DPamountDue, ELproperties?.attributes?.totalDue))}% of sold value</b></span>
                              </div>
                              <div className="mt-2">
                                <h3 className="fg-dgreen">Collection</h3>
                                <span className="fg-dgreen">{covertToCurrency(ELproperties?.attributes?.DPamountCollection, false)}  <b>{Math.round(getpercentage(ELproperties?.attributes?.DPamountCollection, ELproperties?.attributes?.DPamountDue))}% of due</b></span>
                              </div>
                              <div className="mt-2">
                                <h3 className="fg-lpink">Outstanding</h3>
                                <span className="fg-lpink">{covertToCurrency(ELproperties?.attributes?.DPamountOutstanding, false)} <b>{Math.round(getpercentage(ELproperties?.attributes?.DPamountOutstanding, ELproperties?.attributes?.DPamountDue))}% due</b></span>
                              </div>
                            </div>
                            <div className="p-3">
                              <CircleChart
                                kpiText="Total Due" kpiValue={{
                                  total: Math.round(ELproperties?.attributes?.DPamountDue),
                                  value1: {
                                    "unit": "Collection",
                                    "value": ELproperties?.attributes?.DPamountCollection
                                  },
                                  value2: {
                                    "unit": "DP Outstanding",
                                    "value": ELproperties?.attributes?.DPamountOutstanding
                                  },
                                  isamount: true
                                }} bodyColor="black" size={{ Width: "150px", Height: "150px" }} percentage={ELproperties?.attributes?.total_collection * 100 / ELproperties?.attributes?.totalDue} color="#00A171"

                              />
                              {/* <CircleChart kpiText="Outstanding" size={{ Width: "150px", Height: "150px" }} percentage={50} color="#00A171" bodyColor="black" /> */}
                            </div>
                          </div>
                        </Kpibox>
                      </div>
                    </div>
                    <div className="right-d-t mt-4 pl-0">
                      <div className="imagebar">
                        <Imageslider images={ELproperties?.attributes?.latestImages} />
                      </div>
                      <div className="mt-3 grapgh-elb">
                        <Kpibox righttitle={"Ageing Total " + covertToCurrency(ELproperties?.attributes?.AgeingTotal, false)} title={"Ageing - " + ELproperties?.attributes?.AgeingTotal_default + " Defaults"} withhead={true} theme="dark" padding="0px">

                          <ul className="pt-5 p-3 pb-5">
                            <li>
                              <div >
                                <span style={{ color: "#FFF1DF" }}>{covertToCurrency(ELproperties?.attributes?.Ageing1_30, false)}</span>
                                <LineProgress length={130} thick={1} color="#FFF1DF" percentage={getpercentage(ELproperties?.attributes?.Ageing1_30, ELproperties?.attributes?.AgeingTotal)} start="begining" />
                                <span style={{ color: "#FFF1DF" }}>1 to 30 days</span>
                                <span style={{ color: "#FFF1DF" }}>{ELproperties?.attributes?.Ageing1_30_default > 0 ? ELproperties?.attributes?.Ageing1_30_default : 0} Defaults</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FFC9C9" }}>{covertToCurrency(ELproperties?.attributes?.Ageing_31_60, false)}</span>
                                <LineProgress length={130} thick={1} color="#FFC9C9" percentage={getpercentage(ELproperties?.attributes?.Ageing_31_60, ELproperties?.attributes?.AgeingTotal)} start="begining" />
                                <span style={{ color: "#FFC9C9" }}>31 to 60 days</span>
                                <span style={{ color: "#FFC9C9" }}>{ELproperties?.attributes?.Ageing_31_60_default > 0 ? ELproperties?.attributes?.Ageing_31_60_default : 0} Defaults</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FEA9A9" }} >{covertToCurrency(ELproperties?.attributes?.Ageing_61_90, false)}</span>
                                <LineProgress style={{ color: "#FEA9A9" }} length={130} thick={1} color="white" percentage={getpercentage(ELproperties?.attributes?.Ageing_61_90, ELproperties?.attributes?.AgeingTotal)} start="begining" />
                                <span style={{ color: "#FEA9A9" }} >61 to 90 days</span>
                                <span style={{ color: "#FEA9A9" }} >{ELproperties?.attributes?.Ageing_61_90_default > 0 ? ELproperties?.attributes?.Ageing_61_90_default : 0} Defaults</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FF8D8D" }} >{covertToCurrency(ELproperties?.attributes?.Ageing_91_120, false)}</span>
                                <LineProgress style={{ color: "#FF8D8D" }} length={130} thick={1} color="white" percentage={getpercentage(ELproperties?.attributes?.Ageing_91_120, ELproperties?.attributes?.AgeingTotal)} start="begining" />
                                <span style={{ color: "#FF8D8D" }} >91 to 120 days</span>
                                <span style={{ color: "#FF8D8D" }} >{ELproperties?.attributes?.Ageing_91_120_default > 0 ? ELproperties?.attributes?.Ageing_91_120_default : 0} Defaults</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FF3C3C" }}>{covertToCurrency(ELproperties?.attributes?.Ageing_120, false)}</span>
                                <LineProgress length={130} thick={1} color="#FF3C3C" percentage={getpercentage(ELproperties?.attributes?.Ageing_120, ELproperties?.attributes?.AgeingTotal)} start="begining" />
                                <span style={{ color: "#FF3C3C" }}>120+ days</span>
                                <span style={{ color: "#FF3C3C" }}>{ELproperties?.attributes?.Ageing_120_default > 0 ? ELproperties?.attributes?.Ageing_120_default : 0} Defaults</span>
                              </div>
                            </li>

                          </ul>
                        </Kpibox>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 row mx-0 p-0 mt-4">
                    <div className="col-12 col-md-8 pl-0 pr-0-mobile width-for-md">
                      <Kpibox title="Inventory Insights" withhead={true} theme="dark" padding="0px">
                        <div className="tablegraph">
                          <table>
                            <thead>
                              <th>Total</th>
                              <th>Sold</th>
                              <th>Available</th>
                              <th>Blocked</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <h5>{ELproperties?.attributes?.totalUnits}</h5>
                                  <span><span className="mb-view">Total </span>Units</span>
                                  {/* <LineProgress length={100} thick={2} color="#252526" percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" /> */}

                                </td>
                                <td>
                                  <h5 className="fg-green">{ELproperties?.attributes?.soldUnits}</h5>
                                  <span className="fg-green"><span className="mb-view">Sold </span>Units</span>
                                  <LineProgress length={100} thick={2} color="#C9FFCE" percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" />

                                </td>
                                <td>
                                  <h5 className="fg-lpink">{ELproperties?.attributes?.availableUnits}</h5>
                                  <span className="fg-lpink"><span className="mb-view">Available </span>Units</span>
                                  <LineProgress length={100} thick={2} color="#FF9191" percentage={Math.round(ELproperties?.attributes?.availableUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" />
                                </td>
                                <td>
                                  <h5>{ELproperties?.attributes?.blockedUnits}</h5>
                                  <span><span className="mb-view">Blocked </span>Units</span>
                                  <LineProgress length={100} thick={2} color="#FFF" percentage={Math.round(ELproperties?.attributes?.blockedUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" />
                                </td>
                              </tr>
                              <tr className="area">
                                <td>
                                  <h5>{covertToCurrency(Math.round(ELproperties?.attributes?.totalUnitsArea), false)}</h5>
                                  <span><span className="mb-view">Total </span>Area Sq.ft</span>
                                  {/* <LineProgress length={100} thick={2} color="#252526" percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" /> */}
                                </td>
                                <td>
                                  <h5 className="fg-green">{covertToCurrency(Math.round(ELproperties?.attributes?.soldunitsArea), false)}</h5>
                                  <span className="fg-green"><span className="mb-view">Sold </span>Area Sq.ft</span>
                                  <LineProgress length={100} thick={2} color="#C9FFCE" percentage={Math.round(ELproperties?.attributes?.soldunitsArea * 100 / ELproperties?.attributes?.totalUnitsArea)} start="begining" />

                                </td>
                                <td>
                                  <h5 className="fg-lpink">{covertToCurrency(Math.round(ELproperties?.attributes?.availableUnitsArea), false)}</h5>
                                  <span className="fg-lpink"><span className="mb-view">Available </span>Area Sq.ft</span>
                                  <LineProgress length={100} thick={2} color="#FF9191" percentage={Math.round(ELproperties?.attributes?.availableUnitsArea * 100 / ELproperties?.attributes?.totalUnitsArea)} start="begining" />
                                </td>
                                <td>
                                  <h5>{covertToCurrency(Math.round(ELproperties?.attributes?.blockedUnitsArea), false)}</h5>
                                  <span><span className="mb-view">Blocked </span>Area Sq.ft</span>
                                  <LineProgress length={100} thick={2} color="#FFF" percentage={Math.round(ELproperties?.attributes?.blockedUnitsArea * 100 / ELproperties?.attributes?.totalUnitsArea)} start="begining" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <h4 style={{ fontSize: "1rem", paddingLeft: "15px" }}>Inventory Insights in Finance</h4>
                        <div className="tablegraph footer-tablekpi">

                          <table>
                            <thead>
                              <th>Original Value</th>
                              <th>Sold {ELproperties?.attributes?.unitAmountsSold_og <= ELproperties?.attributes?.soldUnitAMount ? <FaArrowUp /> : <FaArrowDown />}  <span>({differencepercentage(ELproperties?.attributes?.unitAmountsSold_og, ELproperties?.attributes?.soldUnitAMount)})</span></th>
                              <th>sq.ft Avarage</th>
                              <th>Available</th>
                              <th>Blocked</th>
                            </thead>
                            <tbody>
                              <tr className="amount">
                                <td>
                                  <span className="mb-view mb-2">Original Value </span>
                                  <h5>{covertToCurrency(ELproperties?.attributes?.unitAmountTotal_og, false)}</h5>
                                  {/* <h5 className={ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? "fg-green" : "fg-lpink"}>Sold:{ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.unitAmountTotal, false)}</h5> */}
                                  <span>{covertToCurrency((ELproperties?.attributes?.unitAmountTotal_og / ELproperties?.attributes?.totalUnitsArea), false)}/sq.ft</span>
                                </td>
                                <td>

                                  <h5 className="fg-green">Sold : <span className="d-flex mb-view"> </span> {covertToCurrency(ELproperties?.attributes?.soldUnitAMount, false)}</h5>
                                  <h5> <span className="d-flex mb-view mt-4"> </span>Actual: <span className="d-flex mb-view"> </span>{covertToCurrency(ELproperties?.attributes?.unitAmountsSold_og, false)}</h5>


                                  {/* <span>Sold: {covertToCurrency(ELproperties?.attributes?.unitAmountTotal,false)}</span> */}
                                </td>
                                <td>
                                  <span className="fg-green" ><span className="mb-view">Sold per sq.ft</span>{covertToCurrency((ELproperties?.attributes?.soldUnitAMount / ELproperties?.attributes?.soldunitsArea), false)}/sq.ft</span>
                                  <span className="mt-1"><span className="mb-view d-flex mt-4">Actual per sq.ft</span>{covertToCurrency((ELproperties?.attributes?.unitAmountTotal_og / ELproperties?.attributes?.totalUnitsArea), false)}/sq.ft</span>

                                </td>
                                <td>
                                  <span className="mb-view">Available</span>
                                  <h5 className="fg-lpink">{covertToCurrency(ELproperties?.attributes?.unitAmountAvailable_og, false)}</h5>
                                  {/* <h5 className={ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? "fg-green" : "fg-lpink"}>Sold:{ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.unitAmountTotal, false)}</h5> */}

                                </td>
                                <td>
                                  <span className="mb-view">Blocked</span>
                                  <h5>{covertToCurrency(ELproperties?.attributes?.unitAmountBlocked_og, false)}</h5>
                                  {/* <h5 className={ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? "fg-green" : "fg-lpink"}>Sold:{ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.unitAmountTotal, false)}</h5> */}

                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Kpibox>
                    </div>
                    <div className="ai-insight">
                      <Kpibox title="PulseAI" withhead={true} theme="dark" padding="0px">
                        <ul className="ai-indicate">
                          {ELproperties?.attributes?.pulseAI &&
                            <>
                              {Object.keys(ELproperties?.attributes?.pulseAI).map((key) => (
                                <li>
                                  <div className={(ELproperties?.attributes?.pulseAI[key]?.['label'])}>
                                    <i className="circle"></i>
                                    <p>
                                      <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={ELproperties?.attributes?.pulseAI[key]?.['content']}
                                        escapeHtml={true} /></p>
                                  </div>
                                </li>
                              ))}
                            </>
                          }
                          {/* {ELproperties?.attributes?.pulseAI.map(()=>{
                            return <li>
                            <div className="danger">
                              <i className="circle"></i>
                              <p><span>50%</span> of the downpayment yet to collect</p>
                            </div>
                          </li>
                          })} */}
                          {/* <li>
                            <div className="danger">
                              <i className="circle"></i>
                              <p><span>50%</span> of the downpayment yet to collect</p>
                            </div>
                          </li>
                          <li>
                            <div className="danger">
                              <i cx="8" cy="8" r="8" className="circle"></i>
                              <p><span>50%</span> of the downpayment yet to collect</p>
                            </div>
                          </li>
                          <li>
                            <div className="warning">
                              <i cx="8" cy="8" r="8" className="circle"></i>
                              <p><span>50%</span> of the downpayment yet to collect</p>
                            </div>
                          </li>
                          <li>
                            <div className="warning">
                              <i cx="8" cy="8" r="8" className="circle"></i>
                              <p><span>50%</span> of the downpayment yet to collect</p>
                            </div>
                          </li>
                          <li>
                            <div className="safe">
                              <i cx="8" cy="8" r="8" className="circle"></i>
                              <p><span>50%</span> of the downpayment yet to collect</p>
                            </div>
                          </li> */}
                        </ul>
                      </Kpibox>
                    </div>
                  </div>
                </div>

                <div>

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

export default index;
