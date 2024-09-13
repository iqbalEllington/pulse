import BackButton from "components/general/backButton";
import { getRequestAPI } from "helper/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function Quickmenu(props) {
    const [menus, setMenus] = useState({})
    const [tilemenu, setTilemenu]=useState(true)
    useEffect( () => {
        // if (props.activated == false) {
        const saved = localStorage.getItem("menu");
        if (saved !== null && saved !== 'null' && saved !== "" && saved !== "undefined" &&  saved !== undefined) {
            const initialValue = JSON.parse(saved);
            var filteredMenu = initialValue?.filter((item) => item?.category_id.includes(props.activated))[0]
            setMenus(filteredMenu || {});
        } else {
            const load=(async ()=>{
                let response = await getRequestAPI({
                    API: `api/nav/full-list`,
                });
                if (response?.data?.nav) {
                    if (response?.data.nav) {
                        var filteredMenu = response?.data?.nav?.filter((item) => item?.category_id.includes(props.activated))[0]
    
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
        <>
            <div className="container-fluid content-inner">
                <div className="row">
                    <div className="col-6">
                <BackButton />
                </div>
                    <div className="col-6" style={{textAlign:'right'}}>
                        <button  onClick={()=>setTilemenu(!tilemenu)} className="btn btn-primary">
                            Switch Menu Layout
                        </button>
                    </div>
                </div>
                <div className="col-10" style={{margin: "auto"}}>
                <div className={tilemenu==true?"page-content tilemenu":"page-content"}>
                    {Object.keys(menus).length > 0 &&
                        <>
                            <ul className="boxmenu2">
                                {menus.quick_links.map((key) => {
                                    return (
                                        <li>
                                            <Link legacyBehavior href={key.url}>
                                                <a>
                                                    <span>
                                                    <i className={key.icon}></i>
                                                    </span>
                                                    <span className="title">{key.menu_title}</span>
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
        </>
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
export default connect(mapStateToProps, mapDispachToProps)(Quickmenu);

// export default withRouter(horizontalLayout);
