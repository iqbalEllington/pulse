import React, { Component, useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";

export function careerbox(searchData) {
    let baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [jobs, setJobs] = useState(null);
    const sliderRef = useRef();

    useEffect(async () => {
        try {
            var url = "dubai/about-us/careers-at-allsopp-and-allsopp";
            const result = await axios(baseURL + url);
            setJobs(result.data.data)
        } catch (e) {
            console.log(e);
        }
    }, []);
    return (
        //  ================================= Search Result New Listings =================================
        <div className="current_job_cards container">
          {jobs != null && (
            <>
              {jobs.data.slice(0,5).map((value, index) => (
                <>   <div className="current_job_card">
                <h5>{value.attributes.jobTitle}</h5>
                <div>
                  <img src="./assets/icons/money.svg" uk-svg alt="" />
                  {value.attributes.salaryText}
                </div>
                <div>
                  <img src="./assets/icons/clockIcon.svg" uk-svg alt="" />
                  {value.attributes.type}
                </div>
                <div>
                  <img src="./assets/icons/location.svg" uk-svg alt="" />
                  {value.attributes.location}
                </div>
                <Link legacyBehavior href={"/dubai/about-us/careers-at-allsopp-and-allsopp/"+value.id + "-" + value.attributes.jobTitle.split(' ').join('-').replace(".", "-")}>
                <a>
                <button className="secondary_btn">View Job Details</button>
                </a>
                </Link>
               
              </div></>
              ))}
            </>
          )}
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", opacity: 1 }}
            onClick={onClick}
            href="#"
        >
            <img src="/icons/left-right-arrow.svg" />
        </div>
    );
}


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
            href="#"
        >
            <img src="/icons/left-right-arrow.svg" className="arrow-rotate" />
        </div>
    );
};


export default careerbox;
