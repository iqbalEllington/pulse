import React, { useEffect, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import Loader from "./loader";
import Sidebar from "./sidebar";

import * as SettingSelector from "../../../store/setting/selectors";
import { useSelector } from "react-redux";
import Headerpro from "./header-pro";

const Header = () => {
  const appName = useSelector(SettingSelector.app_name);
  return (
    <>
      <Loader />
      <Sidebar app_name={appName} />
      <main className="main-content">
        <div className={`iq-banner default position-relative `}>
          <Headerpro />
          {/* {subHeader} */}
        </div>
      </main>
    </>
  );
};

export default withRouter(Header);
