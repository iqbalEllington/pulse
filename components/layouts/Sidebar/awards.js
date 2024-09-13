import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Link from "next/link";


function Awards(props) {
    const sliderRef = useRef();
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 4,
        // autoplay: true,
        slidesToScroll: 4,
        accessibility: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 850,
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
        <div className="customer_reviews latestAwards bg-white pb-0">
            <div className="container">
                <h4>Latest Awards</h4>
                <div className="container uk-slider-container-offset latestAwards_slider" uk-slider>

                    <div className="uk-position-relative uk-visible-toggle uk-light customer_reviews_slider" tabIndex={-1}>
                        <div className="uk-slider-items uk-child-width-1-3@s uk-grid">
                            <Slider {...settings} ref={sliderRef}>
                                {props.awards.map((awards, searchIndex) => (
                                    <div className="latestAwards_item">
                                        <div className="uk-card uk-card-default">
                                            <div className="uk-card-media-top">
                                                <img src={awards.attributes.featuredImage.data.attributes.formats.small.url}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src = "/images/imagesComingSoon.png";
                                                    }} alt={awards.attributes.awardTitle} />
                                            </div>
                                            <div className="uk-card-body">
                                                <Link legacyBehavior href={awards.attributes.storyURL != null ? awards.attributes.storyURL : "#"} className="uk-card-title">
                                                    <a className="uk-card-title">
                                                        {awards.attributes.awardTitle}
                                                    </a>
                                                </Link>
                                                <p> {moment(awards.attributes.date).format('YYYY')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
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

export default Awards;