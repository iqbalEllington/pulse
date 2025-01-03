import SearchProperty from "components/search/property";
import { getRequest } from "helper/api";
import React, { Component, useState, useEffect } from "react";
// import ProfileSideBar from "../myprofile/profileSideBar";
import { API_URLS } from "helper/apiConstant";
import { RiShareLine, RiPrinterLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import CircleChart from "components/modals/circlechart";

// import CircleChart2 from "components/modals/CircleChart2";

import Semicircelpie from "components/modals/Semicircelpie";
import Kpibox from "components/modals/kpibox";
import Imageslider from "components/layouts/Sidebar/Imageslider";
import LineProgress from "components/modals/LineProgress";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp, FaLongArrowAltDown, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import moment from "moment";
import { covertToCurrency, covertToMIllion } from "/services/utilsService";
import Dropdown from 'react-bootstrap/Dropdown';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import rehypeRaw from "rehype-raw";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaList } from "react-icons/fa6";
import Linechart from "components/layouts/charts/linechart";
import Verticalmultichart from "components/layouts/charts/verticalmultichart";

import VerticalSignlechart from "components/layouts/charts/verticalSignlechart";

import { TbCurrencyDollar } from "react-icons/tb";
import { FaLongArrowAltUp } from "react-icons/fa";
import Elcirc2 from "components/modals/elcirc2";
import CompareTableRow from "./compareTableRow";

const DashboardDaily = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  const [ELproperties, setELproperties] = useState(false);
  const [allOccuaranceData, setAllOccuaranceData] = useState([]);
  const routers = useRouter();
  function isToday(dateString) {
    const givenDate = new Date(dateString);
    const today = new Date();

    // Check if year, month, and day match
    return (
      givenDate.getFullYear() === today.getFullYear() &&
      givenDate.getMonth() === today.getMonth() &&
      givenDate.getDate() === today.getDate()
    );
  }
  function calculatePercentageDifference(yesterday, today) {
    if (yesterday === 0) {
      return {
        status: today > 0 ? "up" : today < 0 ? "down" : "no change",
        percentage: today > 0 ? "100" : today < 0 ? "-100" : "0"
      };
    }

    const difference = today - yesterday;
    const percentageChange = (difference / yesterday) * 100;
    const status = difference > 0 ? "up" : difference < 0 ? "down" : "no change";

    return {
      status: status,
      percentage: percentageChange.toFixed(2)
    };
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
  async function activateProeprty(property = false) {
    var propertyName;
    if (property == false) {
      var response3;
      response3 = await getRequest({ API: API_URLS.GET_PROPERTIES + '?filters[name][$eq]=' + 'all project' });
      console.log("response3",response3)
      if (await response3?.status == 200) {
         propertyName = response3.data?.data[0]?.id
      }else{
         propertyName = "All project"
      }
    } else {
       propertyName = property
    }
    var response;

    response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&filters[id][$eq]=' + propertyName });
    if (await response?.status === 200) {
    var occuarance=[
      "All Time",
      "This Year",
      "Last Year",
      "Last Month",
      "This Month",
      "Last Week",
      "This Week",
      "Yesterday",
      "Today",
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "Last Week Same Day",
      "Last Month Same Day"
    ]
    let containString="";
    occuarance.map((key, val)=>{
      containString+="&filters[$or]["+val+"][name][$containsi]="+response?.data?.data[0]?.attributes?.name+" "+key
    })
    containString+="&filters[$or]["+occuarance.length+"][id][$eq]="+propertyName
    var response2;
    response2 = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages'+ containString});
    if (await response2?.status === 200) {
      setIsLoading(false)
      var alldata = {};
      response2.data?.data?.map((values, key) => {
        if (values?.attributes?.occuarance != undefined) {
          alldata[values?.attributes?.occuarance] = values
        }
      })
      setELproperties(alldata["All Time"])
      setAllOccuaranceData(alldata)
    } else if (response2?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }

  }
    // else {
    //   var response;
    //   if (id != false) {
    //     response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&filters[id]=' + id + '&launchDate=id:desc' });
    //   } else {
    //     response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&pagination[pageSize]=100&populate[]=latestImages&launchDate=id:desc' });
    //   }
    //   if (await response?.status === 200) {
    //     setIsLoading(false)
    //     if (response.data?.data?.[0]) {
    //       setELproperties(response.data?.data?.[0])
    //     } else {
    //       setPropIndex(0)
    //     }
    //   } else if (response?.status === 401) {
    //     toast("Unauthorize access please re-login.");
    //   } else {
    //     toast(response?.data?.error || "Some thing went wrong.");
    //   }
    // }

  }
  function formatAmount(value) {
    if (value > 1000000000) {
      return convertToMillion(value / 1000000000) + "B";
    } else if (value > 1000000) {
      return convertToMillion(value / 1000000) + "M";
    } else if (value > 1000) {
      return convertToMillion(value / 1000) + "K";
    } else {
      return value?.toFixed(2)
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
    getuserdata()
    // activateProeprty(false)
  }, [])
  useEffect(() => {
    // Ensure the router is ready before accessing query parameters
    if (routers.isReady) {
      const { property } = routers.query; // Get the 'property' query parameter
      
      if (property) {
        activateProeprty(property); // Call with the property value
        setloop(false)
      } else {
        activateProeprty(false); // Call without argument if no property in the URL
      }
    }
  }, [routers.isReady, routers.query]);
  return (
    <>
      <div className="wishbanner pb w-100">
        <div className="container-fluid">
          <div className="row dashboard-sales dashboard-sales-daily">
            <div className="pl-5 salesprops">
              <SearchProperty from="daily" active={ELproperties?.id} activateProeprty={activateProeprty} setloop={setloop} />
           
             <div className="col-12 row p-relative row ">
                <div className="actionbar">
                  <span className="last-updated">Latest Data as of:  {moment(ELproperties?.attributes?.LastUpdatedDate).format('DD MMM YYYY')} </span>
                
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
              <div className="salesDaily-body mt-5" id="salesprops-body">
                <div className="col-12 d-flex bodyrow-1 mt-5">
                  <div className="col-12 col-xl-12 mt-0 header mb-4">
                    <Kpibox withhead={false} theme="el-gray">
                      <div className="figure-box-long">
                        <div className="col-12 title">
                          <h2>
                            <span><TbCurrencyDollar /></span>
                            Total Sales
                          </h2>

                        </div>
                        <div className="data">
                          <div>
                            <span>
                              {ELproperties?.attributes?.soldUnitAMount > 1000000000 ? covertToMIllion(ELproperties?.attributes?.soldUnitAMount / 1000000000) + "B" : covertToMIllion(ELproperties?.attributes?.soldUnitAMount / 1000000) + "M"}
                            </span>
                          </div>
                          <div className="absolute-top">
                            <Elcirc2 kpiText="Total Price" kpiValue={{
                              total: ((ELproperties?.attributes?.soldUnitAMount * 100) / ELproperties?.attributes?.unitAmountTotal_og),
                              value1: {
                                "unit": "Sold",
                                "value": ELproperties?.attributes?.soldUnitAMount
                              },
                              value2: {
                                "unit": "Total Value",
                                "value": ELproperties?.attributes?.unitAmountTotal_og
                              },
                              isamount: false
                            }} size={{ Width: "80px", Height: "80px" }} percentage={ELproperties?.attributes?.soldUnitAMount * 100 / ELproperties?.attributes?.unitAmountTotal_og} color="#000000" />
                          </div>
                        </div>
                      </div>
                    </Kpibox>
                    <Kpibox withhead={false} theme="el-gold">
                      <div className="figure-box-long">
                        <div className="col-12 title">
                          <h2>
                            <span><TbCurrencyDollar /></span>
                            Total Collection
                          </h2>

                        </div>
                        <div className="data">
                          <div>
                            <span>
                              {ELproperties?.attributes?.recieptCollection > 1000000000 ? covertToMIllion(ELproperties?.attributes?.recieptCollection / 1000000000) + "B" : ELproperties?.attributes?.recieptCollection > 1000000 ? covertToMIllion(ELproperties?.attributes?.recieptCollection / 1000000) + "M" : covertToMIllion(ELproperties?.attributes?.recieptCollection / 1000) + "K"}
                            </span>
                          </div>
                          <div className="absolute-top">
                            <Elcirc2 kpiText="Total Sales" kpiValue={{
                              total: ELproperties?.attributes?.recieptCollection * 100 / ELproperties?.attributes?.soldUnitAMount,
                              value1: {
                                "unit": "Collection",
                                "value": ELproperties?.attributes?.recieptCollection
                              },
                              value2: {
                                "unit": "Sold Toltal Amount",
                                "value": ELproperties?.attributes?.soldUnitAMount
                              },
                              isamount: false
                            }} size={{ Width: "80px", Height: "80px" }} percentage={ELproperties?.attributes?.recieptCollection * 100 / ELproperties?.attributes?.soldUnitAMount} color="#000000" />

                          </div>
                        </div>
                      </div>
                    </Kpibox>
                    <div className="imagebar-single">
                      {ELproperties?.attributes?.featuredImage?.data == null ?
                        <img src="https://strapi.ellington.ae/uploads/imagenotfound_2b380da6d1.jpg" />
                        :
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL+ELproperties?.attributes?.featuredImage?.data?.attributes.url} />

                      }
                      <div className="title">
                        <h2>
                          {ELproperties?.attributes?.name == "all project" ? "All Projects":ELproperties?.attributes?.name}

                        </h2>
                        <span>
                          {ELproperties?.attributes?.name == "all project" ? "UAE " : ELproperties?.attributes?.community + ", " + ELproperties?.attributes?.city}
                        </span>
                      </div>
                    </div>


                  </div>

                </div>
                {Object.keys(allOccuaranceData).length > 0 &&
                <div className="col-12 d-flex bodyrow-2">
                  <div>
                    <Kpibox title="Sales - Last 7 days" withhead={true} theme="dark">
                      <VerticalSignlechart data="daily-7-days" theme="light" datakey="TotalSale"  project={allOccuaranceData}/>
                    </Kpibox>
                  </div>
                  <div>
                    <Kpibox title="Collection - Last 7 days" withhead={true} theme="dark">
                      <VerticalSignlechart data="daily-7-days" theme="gold" datakey="Collection" project={allOccuaranceData} />
                    </Kpibox>
                  </div>
                </div>
}
                <div className="col-12 mt-4">
                  <Kpibox withhead={false} theme="dark">
                    <div className="col-12 over-scroll">
                      <table className="table-black ">
                        <thead>
                          <tr>
                            <th>

                            </th>
                            <th>
                              Collection
                            </th>
                            <th>
                              Sales Value
                            </th>
                            <th>
                              Avg. psft
                            </th>
                            <th>
                              SPA Generated
                            </th>
                            <th>
                              SPA Executed
                            </th>
                            <th>
                              Unit Sold
                            </th>
                            {/* <th>
                              Registration
                            </th> */}
                          </tr>
                        </thead>
                        {/* {JSON.stringify(allOccuaranceData["Today"]["attributes"])} */}
                        <tbody>
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="Today" toCompare="Yesterday" isCompare={true} />
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="Yesterday" isCompare={false} />
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="This Week" toCompare="Last Week Same Day" isCompare={true} />
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="Last Week" isCompare={false} />

                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="This Month" toCompare="Last Month Same Day" isCompare={true} />

                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="Last Month" isCompare={false} />
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="This Year" isCompare={false} />
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="Last Year" isCompare={false} />
                          <CompareTableRow allOccuaranceData={allOccuaranceData} base="All Time" isCompare={false} />
                        </tbody>
                      </table>
                    </div>
                  </Kpibox>
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
