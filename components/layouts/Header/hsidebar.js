import { useEffect, memo, Fragment, useState } from "react";

//router
//components
import VerticalNav from "./vertical-nav";

import Logo from "./logo";

//scrollbar
import Scrollbar from "smooth-scrollbar";
import { useRouter } from "next/router";
import { MdOutlineAutoGraph } from "react-icons/md";

// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import Link from "next/link";
import HverticalNav from "./hverticalnav";
import {
  Accordion,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { HiBars3 } from "react-icons/hi2";
const Hsidebar = memo((props) => {
  // const [menus, setMenus] = props.menus
  const router = useRouter();

  // const sidebarColor = useSelector(SettingSelector.sidebar_color);
  // const sidebarHide = useSelector(SettingSelector.sidebar_show); // array
  // const sidebarType = useSelector(SettingSelector.sidebar_type); // array
  // const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style);

  const minisidebar = () => {
    document.getElementsByTagName("main")[0].classList.toggle("menumini");
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  // const resizePlugins = () => {
  //     // For sidebar-mini & responsive

  //   }
  useEffect(() => {
    // Scrollbar.init(document.querySelector("#my-scrollbar"));
    window.addEventListener("resize", () => {
      const tabs = document.querySelectorAll(".nav");
      const sidebarResponsive = document.querySelector(
        '[data-sidebar="responsive"]'
      );
      if (window.innerWidth < 1025) {
        Array.from(tabs, (elem) => {
          if (
            !elem.classList.contains("flex-column") &&
            elem.classList.contains("nav-tabs") &&
            elem.classList.contains("nav-pills")
          ) {
            elem.classList.add("flex-column", "on-resize");
          }
          return elem.classList.add("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains("sidebar-mini")) {
            sidebarResponsive.classList.add("sidebar-mini", "on-resize");
          }
        }
      } else {
        Array.from(tabs, (elem) => {
          if (elem.classList.contains("on-resize")) {
            elem.classList.remove("flex-column", "on-resize");
          }
          return elem.classList.remove("flex-column", "on-resize");
        });
        if (sidebarResponsive !== null) {
          if (
            sidebarResponsive.classList.contains("sidebar-mini") &&
            sidebarResponsive.classList.contains("on-resize")
          ) {
            sidebarResponsive.classList.remove("sidebar-mini", "on-resize");
          }
        }
      }
    });
  });

  return (
    <Fragment>
      <aside
        className={`sidebar-black left-bordered sidebar sidebar-base newSlider sidebar-mini`}
        data-sidebar="responsive"
      >
        <div className={"menuActive active"}>

          <div className="sidebar-header d-flex align-items-center justify-content-start">
            <Link legacyBehavior href="/dashboard">
              <a className="navbar-brand">
                <img src="/images/ellington-logo-Vector.svg" />
              </a>
            </Link>
          </div>
          {/* <div
            className="pt-0  my-scrollbar sidebar-body data-scrollbar"
            data-scroll="1"
            id="my-scrollbar"
          >
            <div className="sidebar-list navbar-collapse" id="sidebar"> 
              <div
                className={"header-toogler"}
                data-toggle="sidebar"
                data-active="true"
                onClick={(() => minisidebar())}
              >
                <HiBars3 />

                <span style={{ color: "white" }}>Expand Menu</span>
              </div>
            </div>
          </div> */}
          {/* <div
            className="pt-0  my-scrollbar sidebar-body data-scrollbar"
            data-scroll="1"
            id="my-scrollbar"
          >
            <div className="sidebar-list navbar-collapse" id="sidebar"> */}
          {/* <div
                className={"header-toogler"}
                data-toggle="sidebar"
                data-active="true"
                onClick={(() => minisidebar())}
              >
                <HiBars3 />

                <span style={{ color: "white" }}>Expand Menu</span>
              </div> */}
          {/* <div
                className={"menu-item"}
                data-toggle="sidebar"
                data-active="true"
              >
                <Link href="#">
                  <MdOutlineAutoGraph />

                  <span style={{ color: "white" }}>Sales</span>
                </Link>
              </div>
              <div
                className={"menu-item marketing"}
                data-toggle="sidebar"
                data-active="true"
              >
                <Link href="#">
                  <MdOutlineAutoGraph />

                  <span style={{ color: "white" }}>Markeing</span>
                </Link>
              </div>
              <div
                className={"menu-item property"}
                data-toggle="sidebar"
                data-active="true"
              >
                <Link href="#">
                  <MdOutlineAutoGraph />

                  <span style={{ color: "white" }}>Property <br/>Board</span>
                </Link>
              </div>
              <div
                className={"menu-item leaders"}
                data-toggle="sidebar"
                data-active="true"
              >
                <Link href="#">
                  <MdOutlineAutoGraph />

                  <span style={{ color: "white" }}>Leader <br/>Board</span>
                </Link>
              </div> */}

          {/* <div className="quick-links">

      <Fragment>
        <Accordion as="ul" className="navbar-nav iq-main-menu">
          {data.quick_links.map((data) => {
            return (
              <>
                {
                  <li className={`${router.asPath === data.url ? "active" : ""} nav-item `}>
                    <Link legacyBehavior href={data.url}>
                      <a
                        className={`${router.asPath === data.url ? "active" : ""} nav-link `}
                        aria-current="page"
                      >

                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>{data.menu_title}</Tooltip>}
                        >
                          <i className="icon">
                            <i className={data.icon} />
                          </i>
                        </OverlayTrigger>
                        <span className="item-name">{data.menu_title}</span>
                      </a>
                    </Link>
                  </li>
                }</>
            )
          })
          }
        </Accordion>
      </Fragment>
    </div> */}
          {/* <HverticalNav menus={data.menus} /> */}
          {/* </div> */}
          {/* </div> */}
          <div className="sidebar-footer"></div>
        </div>
        {props.menus.length > 0 &&
          <>
            {props.menus.map((data) => {
              return (
                <div className={props.active == data.category_id ? "menuActive active" : "active"}>

                  <div className="sidebar-header d-flex align-items-center justify-content-start">
                    <Link legacyBehavior href="#">
                      <a className="navbar-brand">
                        <h4 className="logo-title" style={{ fontSize: "1rem" }}>{data.category_name}</h4>
                      </a>
                    </Link>
                  </div>
                  <div
                    className="pt-0  my-scrollbar sidebar-body data-scrollbar"
                    data-scroll="1"
                    id="my-scrollbar"
                  >
                    {/* sidebar-list class to be added after replace css */}
                    <div className="sidebar-list navbar-collapse" id="sidebar">
                      <div
                        className={"header-toogler"}
                        data-toggle="sidebar"
                        data-active="true"
                        onClick={(() => minisidebar())}
                      >
                        <HiBars3 />

                        <span style={{ color: "white" }}>Expand Menu</span>
                      </div>
                      {/* <div className="quick-links">

                        <Fragment>
                          <Accordion as="ul" className="navbar-nav iq-main-menu">
                            {data.quick_links.map((data) => {
                              return (
                                <>
                                  {
                                    <li className={`${router.asPath === data.url ? "active" : ""} nav-item `}>
                                      <Link legacyBehavior href={data.url}>
                                        <a
                                          className={`${router.asPath === data.url ? "active" : ""} nav-link `}
                                          aria-current="page"
                                        >

                                          <OverlayTrigger
                                            placement="right"
                                            overlay={<Tooltip>{data.menu_title}</Tooltip>}
                                          >
                                            <i className="icon">
                                              <i className={data.icon} />
                                            </i>
                                          </OverlayTrigger>
                                          <span className="item-name">{data.menu_title}</span>
                                        </a>
                                      </Link>
                                    </li>
                                  }</>
                              )
                            })
                            }
                          </Accordion>
                        </Fragment>
                      </div> */}
                      <HverticalNav menus={data.menus} />
                    </div>
                  </div>
                  <div className="sidebar-footer"></div>
                </div>
              )
            })}
          </>
        }
      </aside>

    </Fragment>
  );
});

Hsidebar.displayName = "Sidebar";
export default Hsidebar;
