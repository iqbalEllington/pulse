import {useState,useEffect,memo} from 'react'

//react-bootstrap
import { Navbar,Container, Nav, Dropdown, Form, Image, Button,Collapse, Card} from 'react-bootstrap'

//component
import CustomToggle from "./dropdowns"

// import Card from "../../../bootstrap/card"

// import Modalpopup from '../../../../views/modules/auth/components/modal-popup'
// Modalpopup
//img
import img1 from "../../../assets/images/shapes/01.png";
import img2 from "../../../assets/images/shapes/02.png"
import img3 from "../../../assets/images/shapes/03.png"
import img4 from "../../../assets/images/shapes/04.png"

// logo

// import Logo from '../../components/logo'

// Redux Selector / Action
import { useSelector } from 'react-redux';


// Import selectors & action from setting store
import * as SettingSelector from '../../../store/setting/selectors'

// import RadioBtn from '../../../setting/elements/radio-btn'
// import Modalpopup from './modal-popup'
import Logo from './logo';
import Link from 'next/link';
import Modalpopup from './modal-popup';

const Headerpro = memo((props) => {
    const navbarHide = useSelector(SettingSelector.navbar_show); // array
    const themeFontSize = useSelector(SettingSelector.theme_font_size)
    const headerNavbar = useSelector(SettingSelector.header_navbar)
    useEffect(() =>{
        document.body.classList.add('theme-color-default', 'light', 'theme-default', 'theme-with-animation');

        if(headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass')
         {
             window.onscroll=() =>{
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add( 'menu-sticky')
                  } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                  }
             }
          }
          
          document.getElementsByTagName('html')[0].classList.add(themeFontSize) 

         
          //offcanvase code
          const result = window.matchMedia("(max-width: 1200px)");
          window.addEventListener('resize', 
                                        () =>{ 
                                            if(result.matches === true){
                                                if(show1 === true){
                                                    document.documentElement.style.setProperty('overflow' ,'hidden');
                                                }
                                                else{
                                                    document.documentElement.style.removeProperty('overflow')
                                                }
                                            
                                            }
                                            else{
                                            document.documentElement.style.removeProperty('overflow')
                                            }
                                    
                                        }
                         )
            if(window.innerWidth <= '1200'){
                    if(show1 === true){
                        document.documentElement.style.setProperty('overflow' ,'hidden');
                    }
                    else{
                        document.documentElement.style.removeProperty('overflow')
                    }

                }
                else{
                    document.documentElement.style.removeProperty('overflow')
                }
       
    })

    const[show, setShow] = useState(true)
      
    const [show1, setShow1] = useState(false);
    
    //collapse
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);
    const [open7, setOpen7] = useState(false);
    const [open8, setOpen8] = useState(false);
    const [open9, setOpen9] = useState(false);
    const [open10, setOpen10] = useState(false);
    const [open11, setOpen11] = useState(false);
    const [open12, setOpen12] = useState(false);
    const [open13, setOpen13] = useState(false);
    const [open14, setOpen14] = useState(false);
    const [open15, setOpen15] = useState(false);
    const [open16, setOpen16] = useState(false);
    const [open17, setOpen17] = useState(false);

    //fullscreen
    const fullscreen= () => {
        if (!document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
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
        }
    }




       
    const minisidebar =() =>{
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }
    
    let location = "/";

    const [show3, setShow3] = useState(false);

    const handleClose = () => setShow3(false);
    const handleShow = () => setShow3(true);

    const [show4, setShow4] = useState(false);

    const handleClose1 = () => setShow4(false);
    const handleShow1 = () => setShow4(true);

    return (
        <Navbar expand="xl" className={`nav iq-navbar header-hover-menu left-border ${headerNavbar} ${navbarHide.join( " " )}`}>
            <Container fluid className="navbar-inner">
                <Link legacyBehavior href="/dashboard" className="navbar-brand">
                    <> 
                    <Logo color={true} />
                    <h4 className="logo-title  ms-3 mb-0">Hope UI</h4>
                    </>

                </Link>
                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon d-flex">
                        <svg width="20px" viewBox="0 0 24 24" className="icon-20" >
                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </i>
                </div>
                <div className="d-flex align-items-center justify-content-between product-offcanvas">
                    <div className="breadcrumb-title border-end me-3 pe-3 d-none d-xl-block">
                    <small className="mb-0 text-capitalize">{`${location.pathname === '/dashboard' ? 'home' : '' || location.pathname === '/dashboard/alternate-dashboard' ? 'alternate dashboard' : '' || location.pathname === '/e-commerce/admin/admin-dashboard' ? 'admin dashboard' : '' || location.pathname === '/e-commerce/user/vendor-dashbord' ? 'vendor dashboard' : '' || location.pathname === '/e-commerce/shop-main' ? 'shop main' : '' || location.pathname === '/e-commerce/shop-left-filter' ? 'shop - left filter' : '' || location.pathname === '/e-commerce/shop-right-filter' ? 'shop - right filter' : '' || location.pathname === '/e-commerce/product-full-grid' ? 'product grid view' : '' || location.pathname === '/e-commerce/product-list' ? 'product list view' : '' || location.pathname === '/e-commerce/categories-list' ? 'categories list' : '' || location.pathname === '/e-commerce/product-details' ? 'product detail' : '' || location.pathname === '/e-commerce/product-details-3d' ? '3d product detail' : '' || location.pathname === '/e-commerce/product-details-360' ? '360 product detail' : '' || location.pathname === '/e-commerce/order-process' ? 'order process' : '' || location.pathname === '/e-commerce/invoice' ? 'invoice' : '' || location.pathname === '/e-commerce/wishlist' ? 'wishlist' : '' || location.pathname === '/e-commerce/app/user-profile' ? 'user profile' : '' || location.pathname === '/e-commerce/app/user-list' ? 'user list' : '' 
                    || location.pathname === '/social/dashboard' ? 'dashboard' : '' || location.pathname === '/social/newsfeed' ? 'newsfeed' : '' || location.pathname === '/social/friend-list' ? 'friend list' : '' || location.pathname === '/social/friend-requset' ? 'friend request' : '' || location.pathname === '/social/friend-profile' ? 'friend profile' : '' || location.pathname === '/social/profile-badges' ? 'profile badges' : '' || location.pathname === '/social/profile-images' ? 'profile images' : '' || location.pathname === '/social/profile-video' ? 'profile video' : '' || location.pathname === '/social/birthday' ? 'birthday' : '' || location.pathname === '/social/notification' ? 'notification' : '' || location.pathname === '/social/notification' ? 'notification' : '' || location.pathname === '/social/notification' ? 'notification' : '' || location.pathname === '/social/account-setting' ? 'account setting' : '' || location.pathname === '/social/event-list' ? 'event list' : '' || location.pathname === '/social/event-detail' ? 'event detail' : '' || location.pathname === '/social/group' ? 'group' : '' || location.pathname === '/social/group-detail' ? 'group detail' : '' || location.pathname === '/social/social-profile' ? 'social profile' : '' 
                    || location.pathname === '/blog/index' ? 'dashboard' : '' || location.pathname === '/blog/blog-main' ? 'blog main' : '' || location.pathname === '/blog/blog-details' ? 'blog details' : '' || location.pathname === '/blog/blog-grid' ? 'blog grid' : '' || location.pathname === '/blog/blog-list' ? 'blog list' : '' || location.pathname === '/blog/blog-trending' ? 'blog treding' : '' || location.pathname === '/blog/blog-comments' ? 'comment list' : '' || location.pathname === '/blog/blog-category' ? 'blog category' : ''
                    || location.pathname === '/appointment/appointment' ? 'appointment' : ''  || location.pathname === '/appointment/book-appointment' ? 'book appointment' : ''  || location.pathname === '/appointment/doctor-visit' ? 'doctor visit' : '' 
                    || location.pathname === '/file-manager/dashboard' ? 'appointment' : '' || location.pathname === '/file-manager/image-folder' ? 'image' : '' || location.pathname === '/file-manager/video-folder' ? 'video' : '' || location.pathname === '/file-manager/document-folder' ? 'document' : '' || location.pathname === '/file-manager/all-file' ? 'all file' : '' || location.pathname === '/file-manager/trash' ? 'trash' : ''
                    || location.pathname === '/mail/email' ? 'email' : ''  || location.pathname === '/mail/email-compose' ? 'email compose' : '' 
                    || location.pathname === '/dashboard/table/bootstrap-table' ? 'Bootstrap Table' : '' || location.pathname === '/dashboard/table/table-data' ? 'Data Table' : '' || location.pathname === '/dashboard/table/border-table' ? 'Border Table' : '' || location.pathname === '/dashboard/table/fancy-table' ? 'Fancy Table' : '' || location.pathname === '/dashboard/table/fixed-table' ? 'Fixed Table' : ''}`}</small>
                    </div>
                    <div className={`offcanvas offcanvas-end shadow-none iq-product-menu-responsive ${show1 === true ? 'show' : '' } `} tabIndex="-1" id="offcanvasBottom" style={{visibility: `${show1 === true ? 'visible' : 'hidden'}`}}>
                        <div className="offcanvas-body">
                        <ul className="iq-nav-menu list-unstyled">
                            <Nav.Item as="li" className="active">
                                <Nav.Link className="menu-arrow justify-content-start"   onClick={() => setOpen(!open)}  aria-controls="homeData"aria-expanded={open} role="button" >
                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor"/>
                                    </svg>
                                    <span className="nav-text ms-2">Home</span>
                                </Nav.Link>
                                <Collapse in={open}>
                                <ul className="iq-header-sub-menu list-unstyled " id="homeData">
                                    <Nav.Item as="li">
                                        <Link legacyBehavior className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-link `} href="/dashboard">Default Dashboard</Link>
                                    </Nav.Item>
                                    {/* <Nav.Item as="li">
                                        <Link legacyBehavior className={`${location.pathname === '/dashboard/alternate-dashboard' ? 'active' : ''} nav-link `} href="/dashboard/alternate-dashboard">Alternate Dashboard</Link>
                                    </Nav.Item> */}
                                    <Nav.Item as="li">
                                        <Nav.Link className="menu-arrow"  onClick={() => setOpen1(!open1)}  aria-expanded={open1}   role="button"  aria-controls="menuStyles" >
                                            Menu Style
                                            <i className="right-icon">
                                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                </svg>
                                            </i>
                                        </Nav.Link>
                                        <Collapse in={open1}>
                                            <ul className="iq-header-sub-menu left list-unstyled " id="menuStyles">
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/horizontal' ? 'active' : ''} nav-link `} href="/horizontal"> Horizontal Dashboard </Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dual-horizontal' ? 'active' : ''} nav-link `} href="/dual-horizontal"> Dual Horizontal Dashboard </Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dual-compact' ? 'active' : ''} nav-link `} href="/dual-compact">Dual Compact</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/boxed' ? 'active' : ''} nav-link `} href="/boxed"> Boxed Horizontal </Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/boxedFancy' ? 'active' : ''} nav-link `} href="/boxedFancy"> Boxed Fancy</Link></Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/e-commerce/admin/admin-dashboard' ? 'active' : '' } nav-link `} href="/e-commerce/admin/admin-dashboard">Ecommerce</Link></Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/social/dashboard' ? 'active' : ''} nav-link`} href="/social/dashboard">Social App</Link></Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/blog/index' ? 'active' : ''} nav-link`} href="/blog/index">Blog</Link></Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/appointment/appointment' ? 'active' : ''} nav-link`} href="/appointment/appointment">Appointment</Link></Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/file-manager/dashboard' ? 'active' : ''} nav-link`} href="/file-manager/dashboard">File Manager</Link></Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/chat/chat' ? 'active' : ''} nav-link`} href="/chat/chat">Chat</Link></Nav.Item>
                                    <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/mail/email' ? 'active' : ''} nav-link`} href="/mail/email">Mail</Link></Nav.Item>
                                </ul>
                                </Collapse>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link className="menu-arrow justify-content-start"    onClick={() => setOpen2(!open2)}  aria-expanded={open2}   role="button"  aria-controls="allPagesData">
                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2" fill="currentColor"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z" fill="currentColor"/>
                                    </svg>
                                    <span className="nav-text ms-2">Pages</span>
                                </Nav.Link>
                                <Collapse in={open2}>
                                <ul className="iq-header-sub-menu list-unstyled " id="allPagesData">
                                    <Nav.Item as="li">
                                        <Nav.Link className="menu-arrow " onClick={() => setOpen3(!open3)}  aria-expanded={open3}   role="button"  aria-controls="specialPages" >
                                            Special Pages
                                            <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                            </i>
                                        </Nav.Link>
                                        <Collapse in={open3}>
                                            <ul  className="iq-header-sub-menu left list-unstyled " id="specialPages">
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/special-pages/billing' ? 'active' : ''} nav-link`} href="/dashboard/special-pages/billing">Billing</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/special-pages/calender' ? 'active' : ''} nav-link`} href="/dashboard/special-pages/calender">Calender</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/special-pages/kanban' ? 'active' : ''} nav-link`} href="/dashboard/special-pages/kanban">Kanban</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/special-pages/pricing' ? 'active' : ''} nav-link`} href="/dashboard/special-pages/pricing">Pricing</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/special-pages/timeline'  ? 'active' : ''} nav-link`} href="/dashboard/special-pages/timeline">Timeline</Link></Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link className="menu-arrow" onClick={() => setOpen4(!open4)}  aria-expanded={open4}   role="button"  aria-controls="authSkins">
                                            Auth skins
                                            <i className="right-icon">
                                                <svg width="20"  className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                </svg>
                                            </i>
                                        </Nav.Link>
                                        <Collapse in={open4}>
                                        <ul className="iq-header-sub-menu left list-unstyled" id="authSkins">
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow"  onClick={() => setOpen5(!open5)}  aria-expanded={open5}   role="button"  aria-controls="defaultAuth">
                                                    Defalut
                                                    <i className="right-icon">
                                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                    </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open5}>
                                                    <ul className="iq-header-sub-menu left list-unstyled" id="defaultAuth">
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/default/auth/sign-in' ? 'active' : ''} nav-link`} href="/default/auth/sign-in">Sign In</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/default/auth/sign-up' ? 'active' : ''} nav-link`} href="/default/auth/sign-up">Sign Up</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/default/auth/confirm-mail' ? 'active' : ''} nav-link`} href="/default/auth/confirm-mail">Email Verified</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/default/auth/recoverpw' ? 'active' : ''} nav-link`} href="/default/auth/recoverpw">Reset Password</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/default/auth/lock-screen' ? 'active' : ''} nav-link`} href="/default/auth/lock-screen">Lock Screen</Link></Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow" onClick={() => setOpen6(!open6)}  aria-expanded={open6}   role="button"  aria-controls="animatedAuth">
                                                    Animated
                                                    <i className="right-icon">
                                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                    </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open6}>
                                                    <ul className="iq-header-sub-menu left list-unstyled collapse" id="animatedAuth">
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/sign-in' ? 'active' : ''} nav-link`} href="/auth/sign-in">Sign In</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/sign-up' ? 'active' : ''} nav-link`} href="/auth/sign-up">Sign Up</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/email'? 'active' : ''} nav-link`} href="/auth/email">Email</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/lock-screen'? 'active' : ''} nav-link`} href="/auth/lock-screen">Lock screen</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/reset-password'? 'active' : ''} nav-link`} href="/auth/reset-password">Reset password</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/two-factor'? 'active' : ''} nav-link`} href="/auth/two-factor">Two factor</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/account-deactivate' ? 'active' : ''} nav-link`} href="/auth/account-deactivate">Account deactivate</Link></Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow" onClick={() => setOpen7(!open7)}  aria-expanded={open7}   role="button"  aria-controls="popupAuth">
                                                    popup
                                                    <i className="right-icon">
                                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                    </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open7}>
                                                    <ul className="iq-header-sub-menu left list-unstyled" id="popupAuth">
                                                        <Nav.Item as="li"><Nav.Link onClick={handleShow}>Sign In</Nav.Link></Nav.Item>
                                                        <Nav.Item as="li"><Nav.Link onClick={handleShow1}>Sign Up</Nav.Link></Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                                <Modalpopup sign="in" show={show3} handleclose={handleClose} />
                                                <Modalpopup sign="up" show={show4} handleclose={handleClose1} />
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow" onClick={() => setOpen8(!open8)}  aria-expanded={open8}   role="button"  aria-controls="simpleAuth">
                                                    simple
                                                    <i className="right-icon">
                                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                    </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open8}>
                                                    <ul className="iq-header-sub-menu left list-unstyled " id="simpleAuth">
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/simple/sign-in' ? 'active' : ''} nav-link`} href="/auth/simple/sign-in">Sign In</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/auth/simple/sign-up' ? 'active' : ''} nav-link`} href="/auth/simple/sign-up">Sign Up</Link></Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                        </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen9(!open9)}  aria-expanded={open9}   role="button"  aria-controls="authSkins">
                                        User
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open9}>
                                        <ul className="iq-header-sub-menu left list-unstyled " id="userApps">
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/app/user-profile' ? 'active' : ''} nav-link`} href="/dashboard/app/user-profile">User Profile</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/app/user-add' ? 'active' : ''} nav-link`} href="/dashboard/app/user-add">User Add</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/app/user-list' ? 'active' : ''} nav-link`} href="/dashboard/app/user-list">User List</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen10(!open10)}  aria-expanded={open10}   role="button"  aria-controls="utilities">
                                        Utilities
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open10}>
                                        <ul className="iq-header-sub-menu left list-unstyled" id="utilities">
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/errors/maintenance' ? 'active' : ''} nav-link`} href="/errors/maintenance">Maintenance</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/errors/error404' ? 'active' : ''} nav-link`} href="/errors/error404">404</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/errors/error500' ? 'active' : ''} nav-link`} href="/errors/error500">505</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link className="menu-arrow" onClick={() => setOpen11(!open11)}  aria-expanded={open11}   role="button"  aria-controls="utilities">
                                            Plugins
                                            <i className="right-icon">
                                                <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                </svg>
                                            </i>
                                        </Nav.Link>
                                        <Collapse in={open11}>
                                            <ul className="iq-header-sub-menu left list-unstyled " id="extraPlugins">
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/button-hover' ? 'active' : ''} nav-link`} href="/plugins/button-hover">Button Hover</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/choise-js' ? 'active' : ''} nav-link`} href="/plugins/choise-js">Choise JS</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/flatpickr' ? 'active' : ''} nav-link`} href="/plugins/flatpickr">Flatpickr</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/fslightbox' ? 'active' : ''} nav-link`} href="/plugins/fslightbox">FSlightbox</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/apexcharts' ? 'active' : ''}nav-link`} href="/plugins/apexcharts">Apexcharts</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/gallery-hover' ? 'active' : ''} nav-link`} href="/plugins/gallery-hover">Gallery Hover</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/image-copper' ? 'active' : ''} nav-link`} href="/plugins/image-copper">Image Copper</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/loader' ? 'active' : ''} nav-link`} href="/plugins/loader">Loader</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/select2' ? 'active' : ''} nav-link`} href="/plugins/select2">Select2</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/sweet-alert' ? 'active' : ''}nav-link`} href="/plugins/sweet-alert">Sweetalert</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/quill-editor' ? 'active' : ''}nav-link`} href="/plugins/quill-editor">Quill</Link></Nav.Item>
                                                <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/plugins/uppy' ? 'active' : ''}nav-link`} href="/plugins/uppy">Uppy</Link></Nav.Item>
                                            </ul>
                                        </Collapse>
                                    </Nav.Item>
                                </ul>
                                </Collapse>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link className="menu-arrow justify-content-start" onClick={() => setOpen12(!open12)}  aria-expanded={open12}   role="button"  aria-controls="elementsData">
                                    <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M11.9912 18.6215L5.49945 21.8641C5.00921 22.1302 4.39768 21.9525 4.12348 21.4643C4.0434 21.3108 4.00106 21.1402 4 20.9668V13.7088C4 14.4284 4.40573 14.8726 5.47299 15.3701L11.9912 18.6215Z" fill="currentColor"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.89526 2H15.0695C17.7773 2 19.9735 3.06605 20 5.79337V20.9668C19.9989 21.1374 19.9565 21.3051 19.8765 21.4554C19.7479 21.7007 19.5259 21.8827 19.2615 21.9598C18.997 22.0368 18.7128 22.0023 18.4741 21.8641L11.9912 18.6215L5.47299 15.3701C4.40573 14.8726 4 14.4284 4 13.7088V5.79337C4 3.06605 6.19625 2 8.89526 2ZM8.22492 9.62227H15.7486C16.1822 9.62227 16.5336 9.26828 16.5336 8.83162C16.5336 8.39495 16.1822 8.04096 15.7486 8.04096H8.22492C7.79137 8.04096 7.43991 8.39495 7.43991 8.83162C7.43991 9.26828 7.79137 9.62227 8.22492 9.62227Z" fill="currentColor"/>
                                    </svg>
                                    <span className="nav-text ms-2">Elements </span>
                                </Nav.Link>
                                <Collapse in={open12}>
                                <ul className="iq-header-sub-menu list-unstyled " id="elementsData">
                                    <Nav.Item as="li">
                                        <Link legacyBehavior className="nav-link" href="/">Components</Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen13(!open13)}  aria-expanded={open13} aria-controls="widgetsPage">
                                        Widgets
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open13}>
                                        <ul className="iq-header-sub-menu left list-unstyled" id="widgetsPage">
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/widget/widgetbasic' ? 'active' : ''} nav-link`} href="/dashboard/widget/widgetbasic">Widget Basic</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/widget/widgetchart' ? 'active' : ''} nav-link`} href="/dashboard/widget/widgetchart">Widget Chart</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/widget/widgetcard' ? 'active' : ''} nav-link`} href="/dashboard/widget/widgetcard">Widget Card</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen14(!open14)}  aria-expanded={open14} aria-controls="mapPages">
                                        Map
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open14}>
                                    <ul className="iq-header-sub-menu left list-unstyled" id="mapPages">
                                        <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/map/google' ? 'active' : ''} nav-link`} href="/dashboard/map/google">Google</Link></Nav.Item>
                                    </ul>
                                    </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen15(!open15)}  aria-expanded={open15} aria-controls="formsPages">
                                        Form
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open15}>
                                        <ul className="iq-header-sub-menu left list-unstyled collapse" id="formsPages">
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/form/form-element' ? 'active' : ''} nav-link`} href="/dashboard/form/form-element">Element</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/form/form-wizard' ? 'active' : ''} nav-link`} href="/dashboard/form/form-wizard">Wizard</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/form/form-validation' ? 'active' : ''} nav-link`} href="/dashboard/form/form-validation">Validation</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen16(!open16)}  aria-expanded={open16} aria-controls="tablesPages">
                                        Table
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open16}>
                                        <ul className="iq-header-sub-menu left list-unstyled " id="tablesPages">
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/table/bootstrap-table' ? 'active' : ''} nav-link`} href="/dashboard/table/bootstrap-table">Bootstrap Table</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/table/table-data' ? 'active' : ''} nav-link`} href="/dashboard/table/table-data">Data Table</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/table/border-table' ? 'active' : ''} nav-link`} href="/dashboard/table/border-table">Border Table</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/table/fancy-table' ? 'active' : ''} nav-link`} href="/dashboard/table/fancy-table">Fancy Table</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/table/fixed-table' ? 'active' : ''} nav-link`} href="/dashboard/table/fixed-table">Fixed Table</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen17(!open17)}  aria-expanded={open17} aria-controls="iconsPages">
                                        Icons
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open17}>
                                        <ul className="iq-header-sub-menu left list-unstyled collapse" id="iconsPages">
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/icon/solid' ? 'active' : ''} nav-link`} href="/dashboard/icon/solid">Solid</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/icon/outline'  ? 'active' : ''} nav-link`} href="/dashboard/icon/outline">Outlined</Link></Nav.Item>
                                            <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/dashboard/icon/dual-tone'  ? 'active' : ''} nav-link`} href="/dashboard/icon/dual-tone">Dual Tone</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                </ul>
                                </Collapse>
                            </Nav.Item>
                        </ul>
                        </div>   
                    </div> 
                    <div className={`offcanvas-backdrop fade  ${show1 === true ? 'show d-block':'d-none' }`} onClick={() =>setShow1(false)}></div>
                </div>          
                <div className="d-flex align-items-center">
                    <Button id="navbar-toggle" bsPrefix="navbar-toggler"  type="button" aria-expanded={show1} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setShow1(!show1)} >
                        <span className="navbar-toggler-icon">
                        <span className="mt-1 navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Button>
                </div>
                <div style={{ float:"right",marginLeft:"428px;" }} className={` navbar-collapse text-right ${show1 === true ? 'collapse show' : 'collapse'}`}   id="navbarSupportedContent">
                
                <Nav.Item as="li">

                                
                <Nav.Link className="menu-arrow justify-content-start"    href='/company-info' role="button"  aria-controls="allPagesData">
                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2" fill="currentColor"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z" fill="currentColor"/>
                                    </svg>
                                    <span className="nav-text ms-2">Company Profile</span>
                                </Nav.Link>
                            </Nav.Item>                    
                            <Nav.Item as="li">

                                
                <Nav.Link className="menu-arrow justify-content-start"    onClick={() => setOpen2(!open2)}  aria-expanded={open2}   role="button"  aria-controls="allPagesData">
                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2" fill="currentColor"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.07999 6.64999V6.65999C7.64899 6.65999 7.29999 7.00999 7.29999 7.43999C7.29999 7.86999 7.64899 8.21999 8.07999 8.21999H11.069C11.5 8.21999 11.85 7.86999 11.85 7.42899C11.85 6.99999 11.5 6.64999 11.069 6.64999H8.07999ZM15.92 12.74H8.07999C7.64899 12.74 7.29999 12.39 7.29999 11.96C7.29999 11.53 7.64899 11.179 8.07999 11.179H15.92C16.35 11.179 16.7 11.53 16.7 11.96C16.7 12.39 16.35 12.74 15.92 12.74ZM15.92 17.31H8.07999C7.77999 17.35 7.48999 17.2 7.32999 16.95C7.16999 16.69 7.16999 16.36 7.32999 16.11C7.48999 15.85 7.77999 15.71 8.07999 15.74H15.92C16.319 15.78 16.62 16.12 16.62 16.53C16.62 16.929 16.319 17.27 15.92 17.31Z" fill="currentColor"/>
                                    </svg>
                                    <span className="nav-text ms-2">Logout</span>
                                </Nav.Link>
                            </Nav.Item>
                </div>
            </Container>
        </Navbar>
    )
})

Headerpro.displayName="Headerpro"
export default Headerpro
