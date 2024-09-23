const { useState, useEffect } = require("react");
import { getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { IoFilterSharp, IoSearch } from "react-icons/io5"
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

const SearchProperty = (props) => {
    let filterSearch = (value) => {
        getProperties(value);
        SetKeyowrd(value);
    }
    const [keyword, SetKeyowrd] = useState(null)
    const [isfocus, Setisfocus] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [property, setproperty] = useState(false);
    async function getProperties(value) {
        var response;
        if (value != false) {
            response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&filters[name][$containsi]=' + value + '&sort=id:desc' });
        } else {
            response = await getRequest({ API: API_URLS.GET_PROPERTIES + '?populate[]=featuredImage&sort=id:desc' });
        }
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
    useEffect(() => {
        getProperties("")
    }, [])
    return (<div className="searchbar">
        <div className="search-input">
            <input onFocus={() => Setisfocus(true)} onChange={(e) => filterSearch(e.target.value)} placeholder="Search" type="text" />
            <span>Properties {property?.data?.length}</span>
            <IoSearch />
        </div>
        {(keyword || isfocus) &&
            <div className={"search-result"}>
                <div className="searchlist">
                    <span className="close" onClick={() => Setisfocus(false)}>
                        <MdClose />
                    </span>
                    {property?.data?.map((property) => {
                        return <div className="property-list">
                            <div className="search-l-body" onClick={()=>{props.activateProeprty(property.id),props.setloop(false),Setisfocus(false),SetKeyowrd("")}}>
                                <div className="imageholder"><img src={process.env.NEXT_PUBLIC_IMAGE_URL + (property.attributes?.featuredImage?.data?.attributes?.url ? property.attributes?.featuredImage?.data?.attributes?.url: "/uploads/imagenotfound_2b380da6d1.jpg")}></img></div>
                                <div className="titles">
                                    <div>
                                        <h3>{property.attributes.name.toLowerCase()}</h3>
                                        <p>{(property?.attributes?.emirates != null ? property?.attributes?.emirates : "UAE") + " " + (property?.attributes?.city != null ? property?.attributes?.city : "")}</p>
                                    </div>
                                    <div className="kpi">
                                        <span> Total Units: {property.attributes.totalUnits}</span>
                                        <span className={(property.attributes.totalUnits>0 && property.attributes.availableUnits == 0) &&"bg-dgreen"}> Units Available : {property.attributes.availableUnits}</span>
                                    </div>
                                </div>
                                <div className="summery">
                                    <span>{property.attributes.AgeingTotal_default}</span>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        }
    </div>)
}
export default SearchProperty