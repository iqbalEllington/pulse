const { useState, useEffect, useRef } = require("react");
import { getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { IoFilterSharp, IoSearch } from "react-icons/io5"
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import { FaList } from "react-icons/fa";

const projectSearch = (props) => {
    let filterSearch = (value) => {
        getProperties(value);
        SetKeyowrd(value);
    }
    const wrapperRef = useRef(null);
    const [keyword, SetKeyowrd] = useState(null)
    const [isfocus, Setisfocus] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [property, setproperty] = useState(false);
    async function getProperties(value) {
        var response;
        response = await getRequest({ API: API_URLS.GET_PROJECTS + '?filters[name][$containsi]=' + value });
        var data = []
        if (await response?.status === 200) {
            setIsLoading(false)
            setproperty(response.data)
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }
    const [from, setFrom] = useState(false)
    useEffect(() => {
        getProperties("")
        if (props.from != undefined) {
            setFrom(props.from)
        }
    }, [])
    useEffect(() => {
       SetKeyowrd(props.keyword)
    }, [props.keyword])
    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            // If the click is outside the wrapper, hide the property list
            Setisfocus(false);
        }
    };
    useEffect(() => {
        // Add event listener to detect clicks outside the container
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (<div className="searchbar-form" ref={wrapperRef}>
        <div className="search-input">
            <div className="searchbox">
                <input onFocus={() => {Setisfocus(true), SetKeyowrd(" ")}} onChange={(e) => filterSearch(e.target.value)} value={keyword==null ? "" : keyword} placeholder="Search" type="text" />
            </div>

        </div>
        {(keyword && isfocus) &&
            <div className={"search-result"}>
                <div className="searchlist">

                    {/* <span className="close" onClick={() => Setisfocus(false)}>
                        <MdClose />
                    </span> */}
                    {property?.data?.length > 0 ?
                        <>
                            {property?.data?.map((property) => {
                                return <div className="property-list">
                                    <div className="search-l-body" onClick={() => { props.activateProeprty(property.id), SetKeyowrd(property.attributes.name), Setisfocus(false) }}>
                                        <div className="titles">
                                            <div>
                                                <h3>{property.attributes.name.toLowerCase()}</h3>
                                                <p>{(property?.attributes?.area)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </>
                        :
                        <div>
                            <div className="property-list">
                                    <div className="search-l-body" onClick={() => {props.popupSwitch("project",keyword),Setisfocus(false), SetKeyowrd("")}}>
                                        <div className="titles new-project">
                                            <div>
                                                <h3>Create Project <span>"{keyword}"</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/* <div onClick={() => props.popupSwitch("project")}>
                                Create Project "{keyword}"
                            </div> */}
                        </div>
                    }
                </div>
            </div>
        }

    </div>)
}
export default projectSearch