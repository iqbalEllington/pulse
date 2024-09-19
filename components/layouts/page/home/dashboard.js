import SearchProperty from "components/search/property";
import { getRequest } from "helper/api";
import React, { Component, useState, useEffect } from "react";
// import ProfileSideBar from "../myprofile/profileSideBar";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import CircleChart from "components/modals/circlechart";
import Semicircelpie from "components/modals/Semicircelpie";
import Kpibox from "components/modals/kpibox";
import Imageslider from "components/layouts/Sidebar/imageslider";
import LineProgress from "components/modals/LineProgress";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import moment from "moment";
import { covertToCurrency } from "/services/utilsService";

const index = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  const [ELproperties, setELproperties] = useState(false);
  const differencepercentage=(actual,sold)=>{
    let actualSales = actual;
    let soldAmount = sold;
    let difference = soldAmount - actualSales;
    let percentageDifference = (difference / actualSales) * 100;
    return percentageDifference.toFixed(2)+"%"
  }
  async function activateProeprty(id = false) {
    if (id != false) {
      let id = properties[propindex]['id']
    }
    if (propindex > properties.length) {
      setPropIndex(0)
      return
    }
    console.log(index, properties.length, id)
    var response;
    if (id != false) {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&populate[]=latestImages&filters[id]=' + id + '&sort=id:desc' });
    } else {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&sort=id:desc' });
    }
    var data = []
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


  return (
    <>
      <div className="wishbanner pb w-100">
        <div className="container-fluid">
          <div className="row dashboard-sales">
            <div className="pl-5 salesprops">
              <SearchProperty activateProeprty={activateProeprty} setloop={setloop} />
              <div className="actionbar">
                <button> Download PDF <FaArrowDown /></button>
                <div className="playpause">
                  <div onClick={() => { setloop(!loop) }}>
                    <CountdownCircleTimer
                      className="countown"
                      isPlaying={loop}
                      size="40"
                      strokeWidth="2"
                      isGrowing={true}
                      duration={7}
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
              </div>
              <div className="salesprops-body">
                <div className="dashboard-body-left">
                  {/* Header */}
                  <div className="col-12">
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
                            <CircleChart kpiText="Total Units" size={{ Width: "150px", Height: "150px" }} percentage={Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)} kpiValue={{
                              total: ELproperties?.attributes?.totalUnits,
                              value1:{
                                "unit":"Sold",
                                "value":ELproperties?.attributes?.soldUnits
                              },
                              value2:{
                                "unit":"Available",
                                "value":ELproperties?.attributes?.availableUnits
                              }
                            }}  color="#000" />
                          </div>
                          <div className="data-summery">
                            <div>
                              <h3>Sold Units</h3>
                              <span className="fg-dgreen">{ELproperties?.attributes?.soldUnits}<b>({Math.round(ELproperties?.attributes?.soldUnits * 100 / ELproperties?.attributes?.totalUnits)}%)</b></span>
                            </div>
                            <div>
                              <h3>Available Units</h3>
                              <span className="fg-lpink">{ELproperties?.attributes?.availableUnits}<b>({Math.round(ELproperties?.attributes?.availableUnits * 100 / ELproperties?.attributes?.totalUnits)})%</b></span>
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
                              value1:{
                                "unit":"SPA Signed",
                                "value":ELproperties?.attributes?.SalesProgressionSigned
                              },
                              value2:{
                                "unit":"SPA Executed",
                                "value":ELproperties?.attributes?.SalesProgressionExecuted
                              }
                            }} size={{ Width: "150px", Height: "150px" }} percentage={30} color="#000" />
                          </div>
                          <div className="data-summery">
                            <div>
                              <h3>SPA Signed</h3>
                              <span className="fg-dgreen">{ELproperties?.attributes?.SalesProgressionSigned} <b>( { (ELproperties?.attributes?.SalesProgressionSigned && ELproperties?.attributes?.SalesProgressionGenerated) 
                                ? (ELproperties.attributes.SalesProgressionSigned * 100 / ELproperties.attributes.SalesProgressionGenerated).toFixed(2) 
                                : 0}% )</b></span>
                            </div>
                            <div>
                              <h3>SPA Executed</h3>
                              <span className="fg-lpink">{ELproperties?.attributes?.SalesProgressionExecuted} <b>( {(ELproperties?.attributes?.SalesProgressionExecuted * 100/ELproperties?.attributes?.SalesProgressionGenerated).toFixed(2)}%  )</b></span>
                            </div>
                          </div>
                        </div>
                      </Kpibox>
                    </div>
                    <div className="col-12 mt-4">
                      <Kpibox title="Down payments" withhead={true} theme="light">
                        <div className="vis-data">
                          <div className="p-4">
                            <CircleChart kpiText="Outstanding" size={{ Width: "150px", Height: "150px" }} percentage={50} color="#000" />
                          </div>
                          <div className="data-summery">
                            <div>
                              <h3>Sold Units</h3>
                              <span className="fg-dgreen">265 <b>(43%)</b></span>
                            </div>
                            <div>
                              <h3>Available Units</h3>
                              <span className="fg-lpink">265 <b>(43%)</b></span>
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
                        <Kpibox title="Down payments" withhead={true} theme="dark" padding="0px">
                          <div className="vis-data">

                            <div className="data-summery">
                              <div>
                                <h3>Sold Units</h3>
                                <span className="fg-white">265 <b>(43%)</b></span>
                              </div>
                              <div>
                                <h3>Sold Units</h3>
                                <span className="fg-dgreen">265 <b>(43%)</b></span>
                              </div>
                              <div>
                                <h3>Available Units</h3>
                                <span className="fg-lpink">265 <b>(43%)</b></span>
                              </div>
                            </div>
                            <div className="p-3">
                              <CircleChart kpiText="Outstanding" size={{ Width: "150px", Height: "150px" }} percentage={70} color="#C9FFCE" bodyColor="black" />
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
                                <h3>Sold Units</h3>
                                <span className="fg-white">265 <b>(43%)</b></span>
                              </div>
                              <div>
                                <h3>Sold Units</h3>
                                <span className="fg-dgreen">265 <b>(43%)</b></span>
                              </div>
                              <div>
                                <h3>Available Units</h3>
                                <span className="fg-lpink">265 <b>(43%)</b></span>
                              </div>
                            </div>
                            <div className="p-3">
                              <CircleChart kpiText="Outstanding" size={{ Width: "150px", Height: "150px" }} percentage={50} color="#C9FFCE" bodyColor="black" />
                            </div>
                          </div>
                        </Kpibox>
                      </div>
                    </div>
                    <div className="right-d-t mt-4">
                      <div className="imagebar">
                        {/* {JSON.stringify(ELproperties?.attributes.latestImages)} */}
                        <Imageslider images={ELproperties?.attributes?.latestImages} />
                      </div>
                      <div className="mt-4 grapgh-elb">
                        <Kpibox righttitle="Ageing Total 140,189,748" title="Ageing(81 Defaults)" withhead={true} theme="dark" padding="0px">

                          <ul className="p-3">
                            <li>
                              <div >
                                <span style={{ color: "#FFF1DF" }}>AED 3124234</span>
                                <LineProgress length={130} thick={1} color="#FFF1DF" percentage={96.9} start="begining" />
                                <span style={{ color: "#FFF1DF" }}>1 to 30 days</span>
                                <span style={{ color: "#FFF1DF" }}>1 to 30 days</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FFC9C9" }}>AED 3124234</span>
                                <LineProgress length={130} thick={1} color="#FFC9C9" percentage={96.9} start="begining" />
                                <span style={{ color: "#FFC9C9" }}>1 to 30 days</span>
                                <span style={{ color: "#FFC9C9" }}>1 to 30 days</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FEA9A9" }} >AED 3124234</span>
                                <LineProgress style={{ color: "#FEA9A9" }} length={130} thick={1} color="white" percentage={96.9} start="begining" />
                                <span style={{ color: "#FEA9A9" }} >1 to 30 days</span>
                                <span style={{ color: "#FEA9A9" }} >1 to 30 days</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FF8D8D" }} >AED 3124234</span>
                                <LineProgress style={{ color: "#FF8D8D" }} length={130} thick={1} color="white" percentage={96.9} start="begining" />
                                <span style={{ color: "#FF8D8D" }} >1 to 30 days</span>
                                <span style={{ color: "#FF8D8D" }} >1 to 30 days</span>
                              </div>
                            </li>
                            <li>
                              <div >
                                <span style={{ color: "#FF3C3C" }}>AED 3124234</span>
                                <LineProgress length={130} thick={1} color="#FF3C3C" percentage={96.9} start="begining" />
                                <span style={{ color: "#FF3C3C" }}>1 to 30 days</span>
                                <span style={{ color: "#FF3C3C" }}>1 to 30 days</span>
                              </div>
                            </li>

                          </ul>
                        </Kpibox>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 row mt-4">
                    <div className="col-7">
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
                              <th>Total</th>
                              <th>Sold</th>
                              <th>Available</th>
                              <th>Blocked</th>
                            </thead>
                            <tbody>
                              <tr className="amount">
                                <td>
                                  <h5>{covertToCurrency(ELproperties?.attributes?.unitAmountTotal_og, false)}</h5>
                                  {/* <h5 className={ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? "fg-green" : "fg-lpink"}>Sold:{ELproperties?.attributes?.unitAmountTotal_og <= ELproperties?.attributes?.unitAmountTotal ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.unitAmountTotal, false)}</h5> */}
                                  <span>{covertToCurrency((ELproperties?.attributes?.unitAmountTotal_og/ELproperties?.attributes?.totalUnitsArea),false)}/sq.ft</span>
                                </td>
                                <td>
                                  <h5>Actual: {covertToCurrency(ELproperties?.attributes?.unitAmountsSold_og, false)}</h5>
                                  <span>{covertToCurrency((ELproperties?.attributes?.unitAmountTotal_og/ELproperties?.attributes?.totalUnitsArea),false)}/sq.ft</span>
                             
                                  <h5 className={ELproperties?.attributes?.unitAmountsSold_og <= ELproperties?.attributes?.soldUnitAMount ? "fg-green mt-2" : "fg-lpink mt-3"}>Sold:{ELproperties?.attributes?.unitAmountsSold_og <= ELproperties?.attributes?.soldUnitAMount ? <FaArrowUp /> : <FaArrowDown />} {covertToCurrency(ELproperties?.attributes?.soldUnitAMount, false)} <span>({differencepercentage(ELproperties?.attributes?.unitAmountsSold_og,ELproperties?.attributes?.soldUnitAMount)})</span></h5>
                                  <span style={{display: "inl"}} className="mt-1">{covertToCurrency((ELproperties?.attributes?.soldUnitAMount/ELproperties?.attributes?.soldunitsArea),false)}/sq.ft</span>
                             
                                 
                                  {/* <span>Sold: {covertToCurrency(ELproperties?.attributes?.unitAmountTotal,false)}</span> */}
                                </td>
                                <td>
                                  <h5>{covertToCurrency(ELproperties?.attributes?.unitAmountAvailable_og, false)}</h5>
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
                          <li>
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
                          </li>
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
