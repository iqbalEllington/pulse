import Link from 'next/link';
import { memo, Fragment, useEffect, useState } from 'react'
//React-bootstrap
import { Offcanvas, Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

//Router

const HorizontalNav = memo((props) => {
    const paths=useRouter()
    const minisidebar = (menu) => {
        if(document.getElementsByTagName("ASIDE")[0].classList.contains('sidebar-mini')){
            document.getElementsByTagName("ASIDE")[0].classList.remove("sidebar-mini");
        }  
      };
    
    const [menus, setMenus] = useState(false)
    useEffect(() => {
        getActiveMenu();
    }, []);

    const getActiveMenu = async () => {
        var url=paths.pathname.split("/")
        if(url[1]=="hr"){
            props.SetActive('640221bbe7068f73d5de4a7a')
        }else if(url[1]=="operations"){
            props.SetActive('640221bbe7068f73d5de4a7c')
        }else if(url[1]=="finance"){
            props.SetActive('640221bbe7068f73d5de4a7d')
        }else if(url[1]=="facility"){
            props.SetActive('640221bbe7068f73d5de4a7b')
        }else if(url[1]=="health-and-safety"){
            props.SetActive('640221bbe7068f73d5de4a7e')
        }
    };
    //location
    let location = {
        pathname: paths.pathname
    };
    return (
        <Fragment>
            <Navbar expand="xl" id="navbar_main" className="mobile-offcanvas  hover-nav horizontal-nav mx-md-auto ">
                <Container fluid>
                    <Offcanvas.Header closeButton>
                        <Navbar.Brand>
                            <svg width="30" className="text-primary" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                            </svg>
                            <h4 className="logo-title">Artemis</h4>
                        </Navbar.Brand>
                        <Button className="close float-end"></Button>
                    </Offcanvas.Header>
                    <Nav>
                         {/* {menus?.map((menu) => (
                              <Nav.Item as="li"><Link legacyBehavior className={`${location.pathname === '/horizontal' ? 'active' : ''} nav-link `} href="/horizontal"><a className="nav-link"> {menu.menu_title} </a></Link></Nav.Item>
                        ))}  */}
                        {/* {JSON.stringify(menus?.[0])} */}
                        {/* <Nav.Item as="li"><Link legacyBehavior href="/dashboard"><a className={`${location.pathname === '/dashboard' ? 'active' : ''} nav-link `}> Dashboard</a></Link></Nav.Item> */}
                        <Nav.Item as="li" onClick={()=>{props.SetActive("dashboard"); }}><Link legacyBehavior href="/dashboard"><a className={`${props.active === 'dashboard'? 'active':''} nav-link `}> Dashboard</a></Link></Nav.Item>
                        <Nav.Item as="li" onClick={()=>{props.SetActive("640221bbe7068f73d5de4a7a"); }}><Link legacyBehavior href="/events"><a className={`${props.active === '640221bbe7068f73d5de4a7a'? 'active':''} nav-link `}> Event & Courses</a></Link></Nav.Item>
                        <Nav.Item as="li" onClick={()=>{props.SetActive("640221bbe7068f73d5de4a7c"); }}><Link legacyBehavior href="/registration"><a className={`${props.active === '640221bbe7068f73d5de4a7c'? 'active':''} nav-link `}>  Registration </a></Link></Nav.Item>
                        <Nav.Item as="li" onClick={()=>{props.SetActive("0451214415"); }}><Link legacyBehavior href="/orders"><a className={`${props.active === '0451214415'? 'active':''} nav-link `}>  Orders </a></Link></Nav.Item>
                        {/* <Nav.Item as="li" onClick={()=>{props.SetActive("640221bbe7068f73d5de4a7b"); }}><Link legacyBehavior href="/reports"><a className={`${props.active === '640221bbe7068f73d5de4a7b'? 'active':''} nav-link `} href="/dashboard"> <span className="item-name">Reports</span></a></Link></Nav.Item>
                        <Nav.Item as="li" onClick={()=>{props.SetActive("640221bbe7068f73d5de4a7d"); }}><Link legacyBehavior href="/finance"><a className={`${props.active === '640221bbe7068f73d5de4a7d'? 'active':''} nav-link `} > Finance </a></Link></Nav.Item>
                        <Nav.Item as="li" onClick={()=>{props.SetActive("640221bbe7068f73d5de4a7e"); }}><Link legacyBehavior href="/eventday"><a className={`${props.active === '640221bbe7068f73d5de4a7e'? 'active':''} nav-link `} > Course Day</a></Link></Nav.Item> */}
                    </Nav>
                </Container>
            </Navbar>
        </Fragment>
    )
})

HorizontalNav.displayName = "HorizontalNav"
export default HorizontalNav
