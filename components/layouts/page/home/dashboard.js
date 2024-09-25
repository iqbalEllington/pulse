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

const index = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  const [ELproperties, setELproperties] = useState(false);
 
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
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&populate[]=latestImages&filters[id]=' + id + '&sort=id:desc' });
    } else {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&populate[]=latestImages&sort=id:desc' });
    }
    if (await response?.status === 200) {
      setIsLoading(false)
      console.log(response.data?.data, "response.data?.data?response.data?.data?")
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
    response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?fields[0]=id&sort=id:desc' });
    var data = []
    if (await response?.status === 200) {
      setIsLoading(false)
      setproperties(response.data?.data)
      setPropIndex(0)
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
      getuserdata()
    }
  }, [propindex])


  return (
    <>
      <div className="wishbanner pb w-100">
        <div className="container-fluid">
          <div className="row dashboard-sales">
            <div className="pl-5 salesprops">
              <SearchProperty activateProeprty={activateProeprty} setloop={setloop} />
              <div className="actionbar">

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
                      <h2>{ELproperties?.attributes?.name}</h2>
                      <div className="db-hdesc">
                        <span>{(ELproperties?.attributes?.emirates != null ? ELproperties?.attributes?.emirates : "UAE") + " " + (ELproperties?.attributes?.city != null ? ELproperties?.attributes?.city : "")}</span>
                        <span> Launch Month: {moment(ELproperties?.attributes?.launchDate).format('MMM YYYY')}</span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <Kpibox withhead={false} padding="15px">
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
                          Age
                        </span>
                        <span>
                          {moment().diff(moment(ELproperties?.attributes?.launchDate), 'months')} Months
                        </span>
                      </div>
                      <div>
                        <span>
                          Completed %
                        </span>
                        <span className="flex-end">
                          {ELproperties?.attributes?.completionProgress != null ? ELproperties?.attributes?.completionProgress : 0}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div className="col-12">
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
                    <div className="col-12  mt-4">
                      <Kpibox title="Sales Progression" withhead={true} theme="light">
                        <div className="vis-data">
                          <div className="p-4">
                            <CircleChart kpiText="Generated" kpiValue={{
                              total: ELproperties?.attributes?.SalesProgressionGenerated,
                              value1: {
                                "unit": "SPA Signed",
                                "value": ELproperties?.attributes?.SalesProgressionSigned
                              },
                              value2: {
                                "unit": "SPA Executed",
                                "value": ELproperties?.attributes?.SalesProgressionExecuted
                              },
                              isamount: false
                            }} size={{ Width: "150px", Height: "150px" }} percentage={ELproperties?.attributes?.SalesProgressionSigned * 100 / ELproperties?.attributes?.SalesProgressionGenerated} color="#00A171" />
                          </div>
                          <div className="data-summery">
                            <div>
                              <h3>SPA Signed</h3>
                              <span className="fg-dgreen">{ELproperties?.attributes?.SalesProgressionSigned} <b>({(ELproperties?.attributes?.SalesProgressionSigned && ELproperties?.attributes?.SalesProgressionGenerated)
                                ? (ELproperties.attributes.SalesProgressionSigned * 100 / ELproperties.attributes.SalesProgressionGenerated).toFixed(2)
                                : 0}%)</b></span>
                            </div>
                            <div>
                              <h3>SPA Executed</h3>
                              <span className="fg-lpink">{ELproperties?.attributes?.SalesProgressionExecuted} <b>({ELproperties?.attributes?.SalesProgressionExecuted > 0 ? (ELproperties?.attributes?.SalesProgressionExecuted * 100 / ELproperties?.attributes?.SalesProgressionGenerated).toFixed(2) + "%" : "0%"})</b></span>
                            </div>
                          </div>
                        </div>
                      </Kpibox>
                    </div>
                    <div className="col-12 mt-4">
                      <Kpibox title="Down payments" withhead={true} theme="light">
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
                              isamount: false
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
                  </Kpibox>
                  <hr />

                </div>
                <div className="dashboard-body-right">
                  <div className="row">
                    <div className="collectionbars">
                      <div className="col-12 mt-4">
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
                                    "unit": "DP Outstanding",
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
                      <div className="col-12 mt-4">
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
                    <div className="col-12 col-md-8 pl-0 pr-0-mobile">
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
                                  <span>Units</span>
                                  {/* <LineProgress length={100} thick={2} color="#252526" percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" /> */}

                                </td>
                                <td>
                                  <h5 className="fg-green">{ELproperties?.attributes?.soldUnits}</h5>
                                  <span className="fg-green">Units</span>
                                  <LineProgress length={100} thick={2} color="#C9FFCE" percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" />

                                </td>
                                <td>
                                  <h5 className="fg-lpink">{ELproperties?.attributes?.availableUnits}</h5>
                                  <span className="fg-lpink">Units</span>
                                  <LineProgress length={100} thick={2} color="#FF9191" percentage={Math.round(ELproperties?.attributes?.availableUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" />
                                </td>
                                <td>
                                  <h5>{ELproperties?.attributes?.blockedUnits}</h5>
                                  <span>Units</span>
                                  <LineProgress length={100} thick={2} color="#FFF" percentage={Math.round(ELproperties?.attributes?.blockedUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" />
                                </td>
                              </tr>
                              <tr className="area">
                                <td>
                                  <h5>{Math.round(ELproperties?.attributes?.totalUnitsArea)}</h5>
                                  <span>Area Sqft</span>
                                  {/* <LineProgress length={100} thick={2} color="#252526" percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} start="begining" /> */}
                                </td>
                                <td>
                                  <h5 className="fg-green">{Math.round(ELproperties?.attributes?.soldunitsArea)}</h5>
                                  <span className="fg-green">Area Sqft</span>
                                  <LineProgress length={100} thick={2} color="#C9FFCE" percentage={Math.round(ELproperties?.attributes?.soldunitsArea * 100 / ELproperties?.attributes?.totalUnitsArea)} start="begining" />

                                </td>
                                <td>
                                  <h5 className="fg-lpink">{Math.round(ELproperties?.attributes?.availableUnitsArea)}</h5>
                                  <span className="fg-lpink">Area Sqft</span>
                                  <LineProgress length={100} thick={2} color="#FF9191" percentage={Math.round(ELproperties?.attributes?.availableUnitsArea * 100 / ELproperties?.attributes?.totalUnitsArea)} start="begining" />
                                </td>
                                <td>
                                  <h5>{Math.round(ELproperties?.attributes?.blockedUnitsArea)}</h5>
                                  <span>Area Sqft</span>
                                  <LineProgress length={100} thick={2} color="#FFF" percentage={Math.round(ELproperties?.attributes?.blockedUnitsArea * 100 / ELproperties?.attributes?.totalUnitsArea)} start="begining" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <h4 style={{ fontSize: "1rem", paddingLeft: "15px" }}>In Finance</h4>
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
                                  <h5>{covertToCurrency(ELproperties?.attributes?.unitAmountTotal_og, false)}</h5>
                                  {/* <h5 className={ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? "fg-green" : "fg-lpink"}>Sold:{ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.unitAmountTotal, false)}</h5> */}
                                  <span>{covertToCurrency((ELproperties?.attributes?.unitAmountTotal_og / ELproperties?.attributes?.totalUnitsArea), false)}/sq.ft</span>
                                </td>
                                <td>
                                  <h5 className="fg-green">Sold: {covertToCurrency(ELproperties?.attributes?.soldUnitAMount, false)}</h5>
                                  <h5> Actual: {covertToCurrency(ELproperties?.attributes?.unitAmountsSold_og, false)}</h5>


                                  {/* <span>Sold: {covertToCurrency(ELproperties?.attributes?.unitAmountTotal,false)}</span> */}
                                </td>
                                <td>
                                  <span className="fg-green" >{covertToCurrency((ELproperties?.attributes?.soldUnitAMount / ELproperties?.attributes?.soldunitsArea), false)}/sq.ft</span>
                                  <span className="mt-1">{covertToCurrency((ELproperties?.attributes?.unitAmountTotal_og / ELproperties?.attributes?.totalUnitsArea), false)}/sq.ft</span>

                                </td>
                                <td>
                                  <h5 className="fg-lpink">{covertToCurrency(ELproperties?.attributes?.unitAmountAvailable_og, false)}</h5>
                                  {/* <h5 className={ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? "fg-green" : "fg-lpink"}>Sold:{ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.unitAmountTotal, false)}</h5> */}

                                </td>
                                <td>
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
                      <Kpibox title="Inventory Insights" withhead={true} theme="dark" padding="0px">
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
