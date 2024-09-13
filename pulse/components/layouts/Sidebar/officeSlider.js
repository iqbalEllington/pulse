import React, { Component, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import searchService from "../../../services/searchService";
import axios from "axios";
import { IMAGEURL_MID, IMAGEURL_TEMP } from "../../../services/constant";
import { covertToCurrency } from "../../../services/utilsService";
import { connect } from "react-redux";
import { API_GET_PROPERTY } from "../../../store/ApiEndpoint";
import Link from "next/link";
import { VscArrowLeft } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";

export function officesSlider(searchData) {
    let baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [offices, setOffices] = useState(null);
    const sliderRef = useRef();
    const handleOnClick = index => {
        sliderRef.current.slickGoTo(index);
    };
    const createURLString = (string) => {
        var string = string.replace(new RegExp(" ", "g"), "-");
        string = string + "-real-estate-brokers"
        return string;
    }
    const [properties, setProperties] = useState(0);
    // useEffect(async () => {
    //     try {
    //         var url = "dubai/contact";
    //         const result = await axios(baseURL + url);
    //         setOffices(result.data.data)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 6,
        // autoplay: true,
        slidesToScroll: 1,
        accessibility: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };
    return (
        //  ================================= Search Result New Listings =================================
        <div className="uk-slider-container-offset new_listings_slider uk-slider uk-slider-container">
            {offices !== null &&
                <>
                    {offices.offices.length > 0 && (
                        <div className="new_dev_for_sale_cards similar_developments_content office-slide no-anger-style">

                            <Slider {...settings} ref={sliderRef}>
                                {offices.offices.map((office, searchIndex) => (
                                    <>
                                        <div>
                                            <Link legacyBehavior href={"/dubai/contact/" + createURLString(office.attributes.officeName)}>
                                                <a>
                                                    <div className="uk-card uk-card-default">
                                                        <div className="uk-card-media-top">
                                                            {office.attributes.profilePhoto.data != null &&
                                                                <img className="centered-axis-xy" src={office.attributes.profilePhoto.data[0].attributes.url} width={1800} height={1200} alt="" />
                                                            }
                                                        </div>
                                                        <div className="uk-card-body">
                                                            <a className="uk-card-title">{office.attributes.officeName}</a>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                        </div>
                                    </>
                                ))
                                }
                            </Slider >
                        </div>
                    )}
                </>
            }
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


export default officesSlider;
