import { useState, useEffect, useRef } from "react";
import { getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import Link from "next/link";

const ResponisbleSearch = (props) => {
    const [keyword, SetKeyowrd] = useState(null);
    const [isfocus, Setisfocus] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState(false);
    const [from, setFrom] = useState(false);
    const wrapperRef = useRef(null); // Ref for the container

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

    const filterSearch = (value) => {
        getEmployees(value);
        SetKeyowrd(value);
    };

    async function getEmployees(value) {
        var response;
        response = await getRequest({
            API: API_URLS.GET_EMPLOYEES + '?filters[Name][$containsi]=' + value,
        });
        if (await response?.status === 200) {
            setIsLoading(false);
            setEmployees(response.data);
        } else if (response?.status === 401) {
            toast("Unauthorize access please re-login.");
        } else {
            toast(response?.data?.error || "Some thing went wrong.");
        }
    }

    useEffect(() => {
        getEmployees("");
        if (props.from !== undefined) {
            setFrom(props.from);
        }
    }, []);

    return (
        <div className="searchbar-form" ref={wrapperRef}>
            <div className="search-input">
                <div className="searchbox">
                    <input
                        onFocus={() => Setisfocus(true)}
                        onChange={(e) => filterSearch(e.target.value)}
                        placeholder="Search"
                        type="text"
                        value={keyword}
                    />
                </div>
            </div>
            {(keyword && isfocus) && (
                <div className="search-result">
                    <div className="searchlist">
                        {/* <span className="close" onClick={() => Setisfocus(false)}>
                            <MdClose />
                        </span> */}
                        {employees?.data?.length > 0 ? (
                            employees?.data?.map((employee) => (
                                <div className="property-list">
                                    <div className="search-l-body" onClick={() => { props.activateEmployee(employee.id), SetKeyowrd(employee.attributes.Name), Setisfocus(false) }}>
                                        <div className="titles">
                                            <div>
                                                <h3>{employee.attributes.Name.toLowerCase()}</h3>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <div className="property-list">
                                    <div className="search-l-body" onClick={() => { props.popupSwitch("responisble", keyword), Setisfocus(false), SetKeyowrd("") }}>
                                        <div className="titles new-project">
                                            <div>
                                                <h3>Create Employee <span>"{keyword}"</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResponisbleSearch;
