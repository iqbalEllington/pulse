import Link from "next/link";
import { useState, useContext, memo, Fragment } from "react";

//Router
import { useRouter } from "next/router";

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
  faHandshake,
  faFile,
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
      
      >
        {children}
      </a>
    </Link>
  );
}

const VerticalNav = memo(() => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [active, setActive] = useState("");
  const [activeNew, setActiveNew] = useState("");
  const [activeSettingsMenu, setActiveSettingsMenu] = useState("");

  //router
  const router = useRouter();

  return (
    <Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          <Link legacyBehavior href="#">
            <a className="nav-link static-item disabled" tabIndex="-1">
              <span className="default-icon">Home</span>
              <span className="mini-icon">-</span>
            </a>
          </Link>
        </li>
        <li className={`${router.asPath === "/" ? "active" : ""} nav-item `}>
          <Link legacyBehavior href="/">
            <a
              className={`${router.asPath === "/" ? "active" : ""} nav-link `}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Dashboard</Tooltip>}
              >
                <i className="icon">
                  <svg
                    className="icon-20"
                    width="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </i>
              </OverlayTrigger>
              <span className="item-name">Dashboard</span>
            </a>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="venues"
          bsPrefix={`nav-item ${
            activeSettingsMenu === "venues" ? "active" : ""
          } `}
          onClick={() => setActiveSettingsMenu("venues")}
        >
          <CustomToggle
            eventKey="venues"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Manage Venues</Tooltip>}
            >
              <FontAwesomeIcon icon={faHotel} className="icon-20" />
            </OverlayTrigger>
            <span className="item-name">Manage Venues</span>
            <i className="right-icon">
              <svg
                className="icon-18"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="venues">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link legacyBehavior href="/manage-venue">
                  <a
                    className={`${
                      router.asPath === "/manage-venue" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faBuilding} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Venues</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> V </i>
                    </OverlayTrigger>
                    <span className="item-name"> Venues</span>
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link legacyBehavior href="/venue-facilities">
                  <a
                    className={`${
                      router.asPath === "/venue-facilities" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon
                      icon={faConciergeBell}
                      className="icon-20"
                    />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Venue Facilities</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> F </i>
                    </OverlayTrigger>
                    <span className="item-name"> Venue Facilities </span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item as="li">
                <Link legacyBehavior href="/manage-activities">
                  <a
                    className={`${
                      router.asPath === "/manage-activities" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faSwimmer} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Manage Activities</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> A </i>
                    </OverlayTrigger>
                    <span className="item-name"> Manage Activities </span>
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link legacyBehavior href="/manage-layouts-group">
                  <a
                    className={`${
                      router.asPath === "/manage-layouts-group" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faTable} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Manage Layout Group</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> G </i>
                    </OverlayTrigger>
                    <span className="item-name"> Manage Layout Group </span>
                  </a>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>

        <li
          className={`${
            router.asPath === "/manage-forms" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/manage-forms">
            <a
              className={`${
                router.asPath === "/manage-forms" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Manage Forms</Tooltip>}
              >
                <FontAwesomeIcon icon={faAlignJustify} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Manage Forms</span>
            </a>
          </Link>
        </li>

        <li
          className={`${
            router.asPath === "/surface-type" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/surface-type">
            <a
              className={`${
                router.asPath === "/surface-type" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Surface Types</Tooltip>}
              >
                <FontAwesomeIcon icon={faAlignJustify} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Surface Types</span>
            </a>
          </Link>
        </li>
        <li
          className={`${
            router.asPath === "/manage-academy" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/manage-academy">
            <a
              className={`${
                router.asPath === "/manage-academy" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Manage Academy</Tooltip>}
              >
                <FontAwesomeIcon icon={faHandshake} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Manage Academy</span>
            </a>
          </Link>
        </li>

        <li className="nav-item static-item mt-4">
          <Link legacyBehavior href="#">
            <a className="nav-link static-item disabled" tabIndex="-1">
              <span className="default-icon">Documents</span>
              <span className="mini-icon">-</span>
            </a>
          </Link>
        </li>

        <li
          className={`${
            router.asPath === "/documents/company-doc-type" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/documents/company-doc-type">
            <a
              className={`${
                router.asPath === "/documents/company-doc-type" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Company Doc Types</Tooltip>}
              >
                <FontAwesomeIcon icon={faFile} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Company Doc Types</span>
            </a>
          </Link>
        </li>

        <li className="nav-item static-item mt-4">
          <Link legacyBehavior href="#">
            <a className="nav-link static-item disabled" tabIndex="-1">
              <span className="default-icon">Users Management </span>
              <span className="mini-icon">-</span>
            </a>
          </Link>
        </li>

        <li
          className={`${
            router.asPath === "/user-groups" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/users">
            <a
              className={`${
                router.asPath === "/user-groups" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>User</Tooltip>}
              >
                <FontAwesomeIcon icon={faUser} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name"> Users </span>
            </a>
          </Link>
        </li>

        <li
          className={`${
            router.asPath === "/permisions" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/permisions">
            <a
              className={`${
                router.asPath === "/permisions" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Permisions</Tooltip>}
              >
                <FontAwesomeIcon icon={faUserLock} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Permisions</span>
            </a>
          </Link>
        </li>

        <li
          className={`${router.asPath === "/roles" ? "active" : ""} nav-item `}
        >
          <Link legacyBehavior href="/roles">
            <a
              className={`${
                router.asPath === "/roles" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Roles</Tooltip>}
              >
                <FaUserCog className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Roles</span>
            </a>
          </Link>
        </li>

        <li
          className={`${
            router.asPath === "/company" ? "active" : ""
          } nav-item `}
        >
          <Link legacyBehavior href="/company">
            <a
              className={`${
                router.asPath === "/company" ? "active" : ""
              } nav-link`}
              aria-current="page"
            >
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Company</Tooltip>}
              >
                <FontAwesomeIcon icon={faBuilding} className="icon-20" />
              </OverlayTrigger>
              <span className="item-name">Company</span>
            </a>
          </Link>
        </li>

        <Accordion.Item
          as="li"
          eventKey="horizontal-menus"
          bsPrefix={`nav-item ${
            activeSettingsMenu === "menustyle" ? "active" : ""
          } `}
          onClick={() => setActiveSettingsMenu("menustyle")}
        >
          <CustomToggle
            eventKey="horizontal-menus"
            onClick={(activeKey) => setActiveMenu(activeKey)}
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Settings</Tooltip>}
            >
              <FontAwesomeIcon icon={faSlidersH} className="icon-20" />
            </OverlayTrigger>
            <span className="item-name">Settings</span>
            <i className="right-icon">
              <svg
                className="icon-18"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </i>
          </CustomToggle>
          <Accordion.Collapse eventKey="horizontal-menus">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link legacyBehavior href="/leave-type">
                  <a
                    className={`${
                      router.asPath === "/leave-type" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faOutdent} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Leave Types</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> H </i>
                    </OverlayTrigger>
                    <span className="item-name"> Leave Types</span>
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link legacyBehavior href="/settings/user-settings">
                  <a
                    className={`${
                      router.asPath === "/settings/user-settings"
                        ? "active"
                        : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faCog} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>User Settings</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> U </i>
                    </OverlayTrigger>
                    <span className="item-name"> User Settings</span>
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link legacyBehavior href="/country">
                  <a
                    className={`${
                      router.asPath === "/country" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faGlobe} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Countries List</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> H </i>
                    </OverlayTrigger>
                    <span className="item-name"> Countries List </span>
                  </a>
                </Link>
              </Nav.Item>

              <Nav.Item as="li">
                <Link legacyBehavior href="/state">
                  <a
                    className={`${
                      router.asPath === "/state" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faFlag} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>State List</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> H </i>
                    </OverlayTrigger>
                    <span className="item-name"> State List </span>
                  </a>
                </Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link legacyBehavior href="/surface-type">
                  <a
                    className={`${
                      router.asPath === "/surface-type" ? "active" : ""
                    } nav-link`}
                  >
                    <FontAwesomeIcon icon={faHockeyPuck} className="icon-20" />
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Surface Types</Tooltip>}
                    >
                      <i className="sidenav-mini-icon"> H </i>
                    </OverlayTrigger>
                    <span className="item-name"> Surface Types </span>
                  </a>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
});

VerticalNav.displayName = "VerticalNav";
export default VerticalNav;
