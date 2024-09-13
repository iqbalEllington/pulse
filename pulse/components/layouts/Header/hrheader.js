import { useState, memo, Fragment } from 'react'

//React-bootstrap
import { Navbar, Dropdown, Container, Form, Image, Button, Card } from 'react-bootstrap'
import { logoutUserData } from "store/actions/auth/LoginAction";
import { HiBars3 } from "react-icons/hi2"
// Logo
// import logo from '/images/MedPro-logo.png'
import Link from 'next/link'
import CustomToggle from './dropdowns'
// import MobildeOffcanvas from 'components/components/partials/components/mobile-offcanvas'
import HorizontalNav from './horizontal-nav'
import MobildeOffcanvas from './MobildeOffcanvas';
import { useDispatch, useSelector } from "react-redux";
import { router } from 'next/router';
import BackButton from 'components/general/backButton';
const hrheader = memo((props) => {
    const [show, setShow] = useState(true)
    const dispatch = useDispatch();
    const logoutUser = async () => {
        dispatch(logoutUserData())
        // router.push("/login")
    }
    const minisidebar = () => {
        document.getElementsByTagName("main")[0].classList.toggle("menumini");
        document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
    };
    //fullscreen
    const openfullscreen = () => {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement && // Mozilla
            !document.webkitFullscreenElement && // Webkit-Browser
            !document.msFullscreenElement) { // MS IE ab version 11
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
            this.fullscreen = true
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
            this.fullscreen = false
        }
    }
    return (
        <Fragment>
            {/* {JSON.stringify(props?.userData)} */}
            <Navbar expand="xl" className="nav iq-navbar">
                <Container fluid className="navbar-inner p-0">
                    <MobildeOffcanvas />
                    <BackButton />
                    <Navbar.Brand as="div" className="">
                        {/* <div
                            className={"header-toogler"}
                            data-toggle="sidebar"
                            data-active="true"
                            onClick={(() => minisidebar())}
                        >
                            <HiBars3 />
                        </div> */}
                        <Link legacyBehavior href="/dashboard" className="d-flex">
                            <a className='brand-logo'>
                                {/* <Logo/> */}
                                <img style={{ width: '40px' }} src={"/images/med-pro-black.png"} />
                                {/* <h4 className="logo-title">Artemis.</h4> */}
                            </a>
                        </Link>
                     </Navbar.Brand> 

                    <HorizontalNav SetActive={props.SetActive} active={props.active} />


                    <Navbar.Toggle aria-controls="navbarSupportedContent" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                            <span className="navbar-toggler-bar bar1 mt-2"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="col-md-2" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 right-nav">
                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant="nav-link ps-3">
                                    <div className="btn btn-primary btn-icon btn-sm rounded-pill btn-action">
                                        <span className="btn-inner">
                                            <i className='fa fa-bell'></i>
                                        </span>
                                        <span className="notification-alert"></span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="end">
                                    <Dropdown.Item href="#">Notifications 1</Dropdown.Item>
                                    <Dropdown.Item href="#">Notifications 2</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <li className="nav-item iq-full-screen d-none d-xl-block" id="fullscreen-item">
                                <Button href="#" bsPrefix=" nav-link" id="btnFullscreen" data-bs-toggle="dropdown" >
                                    <div className="btn btn-primary btn-icon btn-sm rounded-pill" onClick={() => setShow(!show)}>
                                        <span className="btn-inner" onClick={() => openfullscreen()} >
                                            <svg className={`normal-screen ${show === true ? '' : 'd-none'} icon-24`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.5528 5.99656L13.8595 10.8961" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                <path d="M14.8016 5.97618L18.5524 5.99629L18.5176 9.96906" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                <path d="M5.8574 18.896L10.5507 13.9964" stroke="white" strokeWidth="1.5" strokeLinejoin="round" ></path>
                                                <path d="M9.60852 18.9164L5.85775 18.8963L5.89258 14.9235" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                            <svg className={`full-normal-screen ${show === false ? '' : 'd-none'} icon-24`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.7542 10.1932L18.1867 5.79319" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                <path d="M17.2976 10.212L13.7547 10.1934L13.7871 6.62518" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                <path d="M10.4224 13.5726L5.82149 18.1398" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                <path d="M6.74391 13.5535L10.4209 13.5723L10.3867 17.2755" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </Button>
                            </li>
                            <li className="nav-item iq-full-screen d-none d-xl-block" id="fullscreen-item">
                                <Button href="#" bsPrefix=" nav-link" id="btnFullscreen" data-bs-toggle="dropdown" >
                                    <div title='Refresh Menu' onClick={() => props.refreshmenu()} className="btn btn-primary btn-icon btn-sm rounded-pill">
                                        <span className="btn-inner" >
                                            <i class="fa-solid fa-rotate-right"></i>
                                        </span>
                                    </div>
                                </Button>
                            </li>
                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant="nav-link d-flex align-items-center"  >
                                    <div className="btn btn-primary btn-icon btn-sm rounded-pill">
                                        <span className="btn-inner prof-cont">
                                            <img src='https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg' />
                                        </span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="end">
                                    <Dropdown.Item href="#" className='Name'>{props?.userData?.firstName + " " + props?.userData?.lastName}</Dropdown.Item>
                                    <Dropdown.Item href="#">Profile</Dropdown.Item>
                                    <Dropdown.Item href="#">Privacy Setting</Dropdown.Item>
                                    <hr className="dropdown-divider" />
                                    <Dropdown.Item href="#" onClick={() => logoutUser()}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </ul>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
})

hrheader.displayName = "HeaderStyle1"
export default hrheader;
