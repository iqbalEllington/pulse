import React, { useEffect, useState } from "react";
import FooterMain from "./Footer/Footer";
import { connect } from "react-redux";

import Loader from "./Header/loader";
// import { useSelector } from "react-redux";
import Hrheader from "./Header/hrheader";
import Hsidebar from "./Header/hsidebar";
import Head from "next/head";
import { setMenu, setIsMini } from "store/actions/nav/navActions";
import { getRequest, getRequestAPI } from "helper/api";
import { useDispatch, useSelector } from "react-redux";
// import { getUserDataAction } from "components/getUserData/Action/UserDataAction";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import Login from "./page/login/Login";
import { getAuthData } from "store/actions/auth/LoginAction";
import { toast } from "react-toastify";
import Link from "next/link";

function horizontalLayout(props) {
  const [menus, setMenus] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter();

  const changeMenutype=(value)=>{
     dispatch(setIsMini(value))
  }
  useEffect(() => {
    dispatch(getAuthData())
    loadDefault()
    // console.log(props.isLogedIn, "props.isLogedIn")
    // if (props.isLogedIn == false || props.isLogedIn == undefined) {
    //   router.push("/login");
    // }
    // if (props.activated == false) {
    
    // }
  }, [props.isLogedIn])
  const loadDefault= async () => {
    const saved = localStorage.getItem("menu");
    if (saved !== null && saved !== 'null' && saved !== "" && saved !== 'undefined' && saved !== undefined) {
      const initialValue = await JSON.parse(saved);
      setMenus(initialValue || []);
    } else {
      let response = await getRequestAPI({
        API: `api/nav/full-list`,
      });
      if (response?.data?.success) {
        setMenus(response?.data.nav || []);
        if (response?.data.nav) {
          localStorage.setItem("menu", JSON.stringify(response?.data.nav))
        }
      }
    }
  }
  const refreshmenu = async () => {
    let response = await getRequestAPI({
      API: `api/nav/full-list`,
    });
    if (response?.data?.success) {
      setMenus(response?.data.nav || []);
      if (response?.data.nav) {
        localStorage.setItem("menu", JSON.stringify(response?.data.nav))
      }
    } 
  
  }
  // const appName = useSelector(SettingSelector.app_name);
  const SetActives = (active) => {
    props.setMenu(active);
  };

  return (
    <>
      {(props.isLogedIn == false || props.isLogedIn == undefined) ? <>
        <Login />
      </> : <>
        <Loader />
        <Hsidebar changeMenutype={changeMenutype} active={props.activated} menus={menus} />
       
        <Hrheader changeMenutype={changeMenutype} refreshmenu={refreshmenu} userData={props.userData} SetActive={SetActives} active={props.activated} />
        <main className="main-content newSliderContent menumini">
          <Head>
            <Link legacyBehavior rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />            {/* <Link legacyBehavior rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
           */}
          </Head>
          {/* <div className={`iq-banner default position-relative `}> */}
          {props.children}
          {/* </div> */}
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <FooterMain />
      </>
      }
    </>
  );
}

const mapStateToProps = (state) => {  
  return {
    activated: state.NavReducer.active,
    ismini:state.NavReducer.ismini,
    userData: state.authReducer.userData,
    isLogedIn: state.authReducer.isLoggedIn
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    setMenu: (value) => dispatch(setMenu(value)),
    setIsMini:(value) => dispatch(setIsMini(value)),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(horizontalLayout);

// export default withRouter(horizontalLayout);
