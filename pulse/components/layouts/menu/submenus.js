import BackButton from "components/general/backButton";
import { getRequestAPI } from "helper/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { connect } from "react-redux";

function Submenus(props) {
    const [menus, setMenus] = useState({})
    const [tilemenu, setTilemenu]=useState(true)

    useEffect( () => {
        // if (props.activated == false) {
        const saved = localStorage.getItem("menu");
        if (saved !== null && saved !== 'null' && saved !== "") {
            const initialValue = JSON.parse(saved);
            var filteredMenu = initialValue?.filter((item) => item?.category_id.includes(props.activated))[0]
            setMenus(filteredMenu || {});
        } else {
            const load= (async ()=>{
                let response = await getRequestAPI({
                    API: `api/nav/full-list`,
                });
                if (response?.data?.success) {
                    if (response?.data?.response) {
                        var filteredMenu = response?.data?.response?.filter((item) => item?.category_id.includes(props.activated))[0]
    
                        setMenus(filteredMenu || {});
                        localStorage.setItem("menu", JSON.stringify(response?.data?.response))
                    }
                } else {
                    toast(response?.data?.message ?? "Something went wrong!");
                }
            })
           load()
        }
    }, [props.activated])
    return (
        <div className="container-fluid content-inner openCheckList">
            <div className="row">
                <div className="col-6">
                    <BackButton />

                </div>
                <div className="col-6" style={{ textAlign: 'right' }}>
                    <button onClick={() => setTilemenu(!tilemenu)} className="btn btn-primary">
                        Switch Menu Layout
                    </button>
                </div>
            </div>
            <div className="col-10" style={{ margin: "auto" }}>
            <div className={tilemenu==true?"page-content tilemenu":"page-content"}>
                    {Object.keys(menus).length > 0 &&
                        <>
                            <ul className="boxmenu">
                                {menus.menus.filter((item) => item?.url.includes(props.page))[0]?.submenu?.map((key) => {
                                    return (
                                        <li>
                                            <Link legacyBehavior href={key.url}>
                                                <a>
                                                    <span>
                                                        <i className={key.icon}></i>
                                                    </span>
                                                    {key.menu_title}
                                                    <BsArrowRight className="arrow"/>
                                                </a>
                                            </Link>
                                        </li>

                                    )
                                })}
                            </ul>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        activated: state.NavReducer.active,
        ismini: state.NavReducer.ismini,
        userData: state.authReducer.userData,
        isLogedIn: state.authReducer.isLoggedIn
    };
};
const mapDispachToProps = (dispatch) => {
    return {

    };
};
export default connect(mapStateToProps, mapDispachToProps)(Submenus);

// export default withRouter(horizontalLayout);
