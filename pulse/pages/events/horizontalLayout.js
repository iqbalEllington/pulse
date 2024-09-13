import React, { useEffect, useState } from "react";
// import FooterMain from "./Footer/Footer";
import { connect } from "react-redux";

// import Headerpro from "./Header/header-pro";
// import { withRouter } from "next/router";
// import Loader from "./Header/loader";
// import Sidebar from "./Header/sidebar";

import * as SettingSelector from "store/setting/selectors";
import { useSelector } from "react-redux";
// import Hrheader from "./Header/hrheader";
// import Hsidebar from "./Header/hsidebar";
import Head from "next/head";
import { setMenu } from "store/actions/nav/navActions";
// import { getRequest } from "helper/api";

function horizontalLayout(props) {
  // const [menus, setMenus] = useState(false)
  // const [loaded, setLoaded] = useState(false)
  // // useEffect(async () => {
  // //   // if (props.activated == false) {
  // //     const saved = import HorizontalLayout from "components/layouts/horizontalLayout";rage.getItem("menu");
  // //     if (saved !== null) {
  // //       const initialValue = JSON.parse(saved);
  // //       setMenus(initialValue || []);
  // //     } else {
  // //       let response = await getRequest({
  // //         API: `api/nav/full-list`,
  // //       });
  // //       if (response?.data?.success) {
  // //         setMenus(response?.data?.response || []);
  // //         if (response?.data?.response) {
  // //           import HorizontalLayout from "components/layouts/horizontalLayout";rage.setItem("menu", JSON.stringify(response?.data?.response))
  // //         }
  // //       } else {
  // //         toast(response?.data?.message ?? "Something went wrong!");
  // //       }
  // //     } 
  // //     setLoaded(true)
  // //   // }
  // // }, [])
  // const appName = useSelector(SettingSelector.app_name);
  // const SetActives = (active) => {
  //   props.setMenu(active)
  // }

  return (
    <>
      {/* <Loader />
      <Hsidebar active={props.activated} menus={menus} />
      <Hrheader SetActive={SetActives} active={props.activated} />
        
      <main className="main-content newSliderContent">
        <Head>
          <Link legacyBehavior rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" /></Head>
        {/* <div className={`iq-banner default position-relative `}> */}
       {/* {props.children} */}
        {/* </div> */}
      {/* </main> */}
      {/* <FooterMain /> */}
      <p>horizontalLayout</p>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    activated: state.NavReducer.active,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    setMenu: (value) =>
      dispatch(setMenu(value)),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(horizontalLayout);

// export default withRouter(horizontalLayout);
