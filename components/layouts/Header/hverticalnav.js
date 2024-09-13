import Link from "next/link";
import { useState, useContext, memo, Fragment } from "react";

//Router
import { useRouter } from "next/router";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

//React-bootstrap
import {
  Accordion,
  // useAccordionButton,
  AccordionContext,
  Nav,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

//Componets
import { Modalpopup } from "./modal-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faBuilding,
  faUser,
  faUserLock,
  faGea,
  faSlidersH,
  faHotel,
  faConciergeBell,
  faSwimmer,
  faTable,
  faOutdent,
  faCog,
  faGlobe,
  faFlag,
  faHockeyPuck,
} from "@fortawesome/free-solid-svg-icons";
import { FaUserCog } from "react-icons/fa";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  // const decoratedOnClick = useAccordionButton(eventKey, (active) =>
  //   onClick({ state: !active, eventKey: eventKey })
  // );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link legacyBehavior href="#">
      <a
        className="nav-link"
        role="button"
        aria-expanded={isCurrentEventKey ? "true" : "false"}
        // onClick={(e) => {
        //   decoratedOnClick(isCurrentEventKey);
        // }}
      >
        {children}
      </a>
    </Link>
  );
}

const HverticalNav = memo((props) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [show, setShow] = useState(false)
  
  const router = useRouter();
  const setActiveMenus=(active, url)=>{
    setActiveMenu(active)
    router.push(url)
  }
  const [activeSettingsMenu, setActiveSettingsMenu] = useState("");

  //router

  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        {props.menus.map((data) => {
          return (
            <>
              {data.submenu.length == 0 ?
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
                </li> :

                <Accordion.Item
                  as="li"
                  eventKey={data.menu_title}
                  bsPrefix={`nav-item ${activeSettingsMenu === data.menu_id ? "active" : ""
                    } `}
                  onClick={() => setActiveSettingsMenu(data.menu_id)}
                >
                  <CustomToggle
                    eventKey={data.menu_id}
                    onClick={(activeKey) => setActiveMenus(activeKey,data.url)}
                  >
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>{data.menu_title}</Tooltip>}
                    >
                    <i className={data.icon} />
                    </OverlayTrigger>
                    <span className="item-name">{data.menu_title}</span>
                    <i className="right-icon">
                    <i class="fa ml-2 fa-angle-down"></i>

                    </i>
                  </CustomToggle>

                  <Accordion.Collapse eventKey={data.menu_id}>
                    <ul className="sub-nav">
                      {data.submenu.map((submenu) => {
                        return (<Nav.Item as="li">
                          <Link legacyBehavior href={submenu.url}>
                            <a
                              className={`${router.asPath === submenu.url ? "active" : ""
                                } nav-link`}
                            >
                              <i className={submenu.icon}></i>
                              {/* <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip>{submenu.menu_title}</Tooltip>}
                              >
                                <i className="sidenav-mini-icon">  </i>
                              </OverlayTrigger> */}
                              <span className="item-name"> {submenu.menu_title}</span>
                            </a>
                          </Link>
                        </Nav.Item>)
                      })}
                    </ul>
                  </Accordion.Collapse>
                </Accordion.Item>
              }

            </>
          )
        })}
      </Accordion>
    </Fragment>
  );
});

HverticalNav.displayName = "VerticalNav";
export default HverticalNav;
