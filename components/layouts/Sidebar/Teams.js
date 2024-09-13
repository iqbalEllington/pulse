import React, { Component, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import searchService from "../../../services/searchService";
import axios from "axios";

export function Teams(props) {
    let baseURL = process.env.NEXT_PUBLIC_API_URL;

    const getUrlType = ((type) => {
        let searchClass = new searchService();
        return searchClass.getURLPropertyType(type)
    })
    const [team, setTeam] = useState(0);
    // useEffect(async () => {
    //     try {
    //         var url = "dubai/about-us/our-team"
    //         if (props.filter) {
    //             url += '/' + props.filter
    //         }
    //         const result = await axios(baseURL + url);
    //         if (result.status == 200) {
    //             setTeam(result.data)
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);
    const profileRender = (data) => {
        return (
            // <LazyLoad height={200} offset={100} once scroll>
            <div className="card">
                <div className="media">
                    {data.attributes.photo.data != null &&
                        <img className="centered-axis-xy" src={data.attributes.photo.data.attributes.url} />
                    }
                    {data.attributes.profileVideo != null &&
                        <i onClick={(e) => popupSwitch(e, data.attributes.profileVideo)} className="fa-solid fa-play" />
                    }
                </div>

                <div className="card_body">
                    <a className="card_title">{data.attributes.firstName} {data.attributes.LastName} </a>
                    <div className="card_desc">{data.attributes.jobTitle}</div>
                </div>
            </div>
            // </LazyLoad>
        );
    }
    return (
        //  ================================= Search Result New Listings ================================
        <div className="cards">
            {team !== 0 && (
                <>
                    {team.data.data.map((filteredPerson) => (
                        <>{profileRender(filteredPerson)}</>
                    ))}
                </>
            )}
        </div>
    );
}


export default Teams;
