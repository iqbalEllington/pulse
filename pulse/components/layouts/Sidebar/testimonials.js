import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Testimonials() {
    const sliderRef = useRef();
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 3,
        // autoplay: true,
        slidesToScroll: 3,
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
        <div className="customer_reviews">
            <div className="container">
                <h4>Customer Reviews</h4>
                <div className="container uk-slider-container-offset latestAwards_slider" uk-slider>

                    <div className="uk-position-relative uk-visible-toggle uk-light customer_reviews_slider" tabIndex={-1}>
                        <div className="uk-slider-items uk-child-width-1-3@s uk-grid">
                            <Slider {...settings} ref={sliderRef}>
                                <div className="latestAwards_item customer_review">
                                    <div className="uk-card uk-card-default">
                                        <div className="stars">
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                        </div>
                                        <div className="customer_review">
                                            I would like to share how happy I am with my recent
                                            interaction with the agent William Munro. He is extremely
                                            professional and impressively knowledgeable of the area in
                                            which I was looking for an apartment to rent. He went above
                                            and beyond in finding a unit with the... more
                                        </div>
                                        <div className="customer_info">
                                            <img src="/images/html5/customer_info_img.png" alt="" />
                                            <div>
                                                <a className="customer_name">Polina Hristova</a>
                                                <span>4 days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="latestAwards_item customer_review">
                                    <div className="uk-card uk-card-default">
                                        <div className="stars">
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                        </div>
                                        <div className="customer_review">
                                            We purchased a spacious studio a few months back from
                                            Matthew Kaye. After our initial phone conversation we felt
                                            confident that he knew exactly what we were looking for.
                                        </div>
                                        <div className="customer_info">
                                            <img src="/images/html5/customer_info_img1.png" alt="" />
                                            <div>
                                                <a className="customer_name">Ain View Studio Dubai</a>
                                                <span>a month ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="latestAwards_item customer_review">
                                    <div className="uk-card uk-card-default">
                                        <div className="stars">
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                        </div>
                                        <div className="customer_review">
                                            We purchased a spacious studio a few months back from
                                            Matthew Kaye. After our initial phone conversation we felt
                                            confident that he knew exactly what we were looking for.
                                        </div>
                                        <div className="customer_info">
                                            <img src="/images/html5/customer_info_img1.png" alt="" />
                                            <div>
                                                <a className="customer_name">Ain View Studio Dubai</a>
                                                <span>a month ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="latestAwards_item customer_review">
                                    <div className="uk-card uk-card-default">
                                        <div className="stars">
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                        </div>
                                        <div className="customer_review">
                                            We purchased a spacious studio a few months back from
                                            Matthew Kaye. After our initial phone conversation we felt
                                            confident that he knew exactly what we were looking for.
                                        </div>
                                        <div className="customer_info">
                                            <img src="/images/html5/customer_info_img1.png" alt="" />
                                            <div>
                                                <a className="customer_name">Ain View Studio Dubai</a>
                                                <span>a month ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="latestAwards_item customer_review">
                                    <div className="uk-card uk-card-default">
                                        <div className="stars">
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                            <img src="/icons/star.svg" uk-svg alt="" />
                                        </div>
                                        <div className="customer_review">
                                            Jo is amazing. He is very sincere and helpful. I have
                                            nothing to worry about when I leave it to him. I’m very
                                            lucky to know him. He is very professional and at them same
                                            time be very friendly, eager to help and always stay beside
                                            me thankfully!
                                        </div>
                                        <div className="customer_info">
                                            <img src="/images/html5/customer_info_img2.png" alt="" />
                                            <div>
                                                <a className="customer_name">Surayuth Piriyawong</a>
                                                <span>2 months ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin slider_nav" />
                </div>
                <div className="google_play_total_reviews">
                    <img src="/images/html5/google_reviews.png" alt="" />
                    <div>Rated <span>4.4</span> from 536 Customer Reviews</div>
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

export default Testimonials;