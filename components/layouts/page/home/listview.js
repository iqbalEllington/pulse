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
import { FaArrowUp, FaEyeSlash, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import moment from "moment";
import { covertToCurrency } from "/services/utilsService";
import Dropdown from 'react-bootstrap/Dropdown';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import rehypeRaw from "rehype-raw";
import { IoSearch } from "react-icons/io5";

const listview = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  // const [ELproperties, setELproperties] = useState(false);

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
        // setELproperties(response.data?.data?.[0])
      } else {
        setPropIndex(0)
      }
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  async function getroeprties(value = "") {
    var response;
    response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&populate[]=latestImages&sort=id:desc&pagination[pageSize]=100&filters[name][$containsi]=' + value + '' });
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
  async function filterSearch(value) {
    getroeprties(value)
  }
  const [visibilityArray,setVisibilityarray]=useState([]);
  async function toggleVisibility(id){
       let visibilityArrays =visibilityArray
       visibilityArrays.push(id)
       setVisibilityarray([...visibilityArrays])
  }
  
  return (
    <>
      <div className="wishbanner pb w-100">
        <div className="container-fluid">
          <div className="row dashboard-sales_list dashboard-sales">
            <div className="salesprops">
              <div className="searchbar">
                <div className="search-input">
                  <div className="searchbox">
                    <input onChange={(e) => filterSearch(e.target.value)} placeholder="Search" type="text" />
                    <IoSearch />
                  </div>
                  <span className="result-count">Properties {properties?.length}</span>
                </div>
              </div>
              <div className="actionbar">

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
              {/* <Kpibox title="title" withhead={false}>
                <CircleChart size={{ Width: "250px", Height: "250px" }} percentage={70} color="#000" />
              </Kpibox> */}
            </div>
            <div className="table-list">

              <table>
                <thead>
                  <th>

                  </th>
                  <th>
                    Project
                  </th>
                  <th>
                    Status Completion
                  </th>
                  <th>
                    Launch Month
                  </th>
                  <th>
                    Total Units
                  </th>
                  <th>
                    Sold Units
                  </th>
                  <th>
                    Available Units
                  </th>
                  <th>
                    Blocked Units
                  </th>
                  <th>
                    Outstanding Amount
                  </th>
                  <th>
                    DP Amount Outstanding
                  </th>
                </thead>
                <tbody>
                  <tr>

                    {/* {JSON.stringify(properties)} */}
                  </tr>
                  {properties.length && properties?.map((ELproperties, value) => {
                    return <tr className={visibilityArray.includes(value) ? "d-none": ""}>
                      <td> {value + 1}  
                        <button onClick={(e)=>{toggleVisibility(value)}} className="eye-icon">  <FaEyeSlash/></button>
                      </td>
                      <td className="image-nd-name">
                        <div className="imageholder"><img src={(ELproperties.attributes?.featuredImage?.data?.attributes?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + ELproperties.attributes?.featuredImage?.data?.attributes?.url : "https://strapi.ellington.ae/uploads/imagenotfound_2b380da6d1.jpg")}></img></div>
                        {ELproperties?.attributes?.name}
                      </td>
                      <td>
                        {ELproperties?.attributes?.completionProgress != null ? ELproperties?.attributes?.completionProgress + "%" : "TBA"}
                      </td>
                      <td>
                        {moment(ELproperties?.attributes?.launchDate).format('MMM YYYY')}
                      </td>
                      <td>
                        {ELproperties?.attributes?.totalUnits}
                      </td>
                      <td className="span-lgreen">
                        <span> {ELproperties?.attributes?.soldUnits}</span>
                      </td>
                      <td className="span-lpink">
                        <span> {ELproperties?.attributes?.availableUnits} </span>
                      </td>
                      <td>
                        {ELproperties?.attributes?.blockedUnits}
                      </td>
                      <td>{covertToCurrency(ELproperties?.attributes?.total_outstanding)}</td>
                      <td>{covertToCurrency(ELproperties?.attributes?.DPamountOutstanding)}</td>
                    </tr>
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default listview;
