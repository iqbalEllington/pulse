import React from "react";
import FooterMain from "./Footer/Footer";

import Headerpro from "./Header/header-pro";
import { withRouter } from "next/router";
import Loader from "./Header/loader";
import Sidebar from "./Header/sidebar";

import * as SettingSelector from "store/setting/selectors";
import { useSelector } from "react-redux";

const ProfileLayout = (props) => {
  const appName = useSelector(SettingSelector.app_name);

  return (
    <>
      <Loader />
      <Sidebar app_name={appName} />
      <main className="main-content">
        <div className={`iq-banner default position-relative `}>
          <Headerpro />
          {props.children}
        </div>
      </main>
      <FooterMain />
    </>
  );
};

export default withRouter(ProfileLayout);
