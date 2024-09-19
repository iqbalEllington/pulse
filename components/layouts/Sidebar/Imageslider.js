import React, { Component, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Imageslider(props) {

    var settings = {
        dots: false,
        infinite: false,
        speed: 300,
        lazyLoad: false,
        slidesToShow: 1,
        // autoplay: true,
        slidesToScroll: 1,
        accessibility: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        //  ================================= Search Result New Listings =================================
        <div className="images-slider-db">
            {props.images?.data?.length > 0 ? (
                <Slider {...settings} >
                    {props.images.data.map((image, searchIndex) => (
                        <div className="col-12 image-content">
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + image["attributes"]['url']}
                                alt=""
                            />
                        </div>
                    ))}
                </Slider>
            ) :
            <Slider {...settings} >
                <div className="col-12 image-content">
                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/uploads/iamgenotfound_804b50e730.jpg'}
                        alt=""
                    />
                </div>
        </Slider>
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



export default Imageslider;
