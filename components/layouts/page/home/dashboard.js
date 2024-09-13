import SearchProperty from "components/search/property";
import { getRequest } from "helper/api";
import React, { Component, useState, useEffect } from "react";
// import ProfileSideBar from "../myprofile/profileSideBar";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import CircleChart from "components/modals/circlechart";
import Piechart from "components/modals/piechart";

const index = ({ router }, props) => {
  const [loading, setIsLoading] = useState(false)
  const [ELproperties, setELproperties] = useState(false);
  async function activateProeprty(id) {
    var response;
    if (id != false) {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&filters[id]=' + id + '&sort=id:desc' });
    } else {
      response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&sort=id:desc' });
    }
    var data = []
    if (await response?.status === 200) {
      setIsLoading(false)
      setELproperties(response.data)
    } else if (response?.status === 401) {
      toast("Unauthorize access please re-login.");
    } else {
      toast(response?.data?.error || "Some thing went wrong.");
    }
  }
  useEffect(() => {
    activateProeprty(1)
  }, [])
  return (
    <>
      <div className="wishbanner pb">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 offset-lg-1 salesprops">
              <SearchProperty activateProeprty={activateProeprty} />
              <CircleChart size={{Width:"250px", Height: "250px"}} percentage={70} color="#000"/>
            <Piechart size={{Width:"250px", Height: "250px"}} percentage={70} color="#000"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
