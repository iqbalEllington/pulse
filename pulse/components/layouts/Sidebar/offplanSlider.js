import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
export function offplanSlider(searchData) {
    const [popup, setPopup] = useState(false);
    const [video, setVideo] = useState(false);
    const [popupType, setPopupType] = useState(false);
    const popupSwitch = async (e, selected) => {
        e.preventDefault()
        setVideo(selected);
        setPopup(!popup)
    }
    const popupSwitchForm = async (e) => {
        e.preventDefault()
        setPopupType('form');
        setVideo(false);
        setPopup(true)
    }
    const ClosepopupSwitch = async (selected) => {
        setPopup(false)
    }
    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            setPopup(false)
          //Do whatever when esc is pressed
        }
      }, []);
    
      
    let baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [offplan, setOffplan] = useState(null);
    const sliderRef = useRef();
    const handleOnClick = index => {
        sliderRef.current.slickGoTo(index);
    };

    const [properties, setProperties] = useState(0);
    // useEffect(async () => {
    //     try {
    //         var url = "dubai/buyers/off-plan";
    //         const result = await axios(baseURL + url);
    //         setOffplan(result)
    //         document.addEventListener("keydown", escFunction, false);
    //         return () => {
    //             document.removeEventListener("keydown", escFunction, false);
    //           };
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 3,
        // autoplay: true,
        slidesToScroll: 3,
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
        //  ================================= Search Result New Listings =================================
        <div className="new_dev_for_sale_cards slider-more">
            {offplan !== null &&
                <>
                    {offplan.data.data.data.length > 0 && (
                        <div className="similar_developments_content slider-similier-development new_similier_listings_slider">
                            <Slider {...settings} ref={sliderRef}>
                                {offplan.data.data.data.map((offplan, searchIndex) => (
                                    <>
                                    <Link legacyBehavior key={searchIndex} href={offplan.attributes.name}>
                                            <a className='new_dev_card'>
                                                <div>
                                                    <div className="card_media">
                                                        <img src={offplan.attributes.featuredImage.data.attributes.url} frameBorder={0} scrolling="no" />
                                                        {offplan.attributes.youtubeMedia != "" &&
                                                            <i onClick={(e) => popupSwitch(e, offplan.attributes.youtubeMedia)} className="play_BTN play_BTN_NCBtn fa-solid fa-play" />
                                                        }
                                                    </div>
                                                    <div className="card_detail">
                                                        <div className="detail">
                                                            <a>{offplan.attributes.name}</a>
                                                            <span>{offplan.attributes.area}</span>
                                                            <p>{offplan.attributes.introLine}</p>
                                                            <>
                                                                <ReactMarkdown children={offplan.attributes.shortDescription} />
                                                            </>
                                                        </div>
                                                        {offplan.attributes.property_developers.data.length > 0 &&
                                                            <>
                                                                <img src={offplan.attributes.property_developers.data[0].attributes.logoSmall.data[0].attributes.url} alt="" />
                                                            </>
                                                        }
                                                    </div>
                                                    <div className="card_agent_detail">
                                                        <div className="agent_name_img">
                                                            <img src={
                                                                (offplan.attributes.agents.data != null && offplan.attributes.agents.data.length > 0)==true &&
                                                                process.env.NEXT_PUBLIC_S3 +
                                                                "public/teamProfile/" + offplan.attributes.agents.data[0].attributes.salesforceUserId + ".jpg"
                                                            } alt=""
                                                                onError={({ currentTarget }) => {
                                                                    currentTarget.onerror = null; // prevents looping
                                                                    currentTarget.src = "/images/imagesComingSoon.png";
                                                                }} />
                                                            <h6>
                                                                {(offplan.attributes.agents.data != null && offplan.attributes.agents.data.length > 0)==true &&
                                                                    <>
                                                                        {offplan.attributes.agents.data[0].attributes.firstName} {" "}{offplan.attributes.agents.data[0].attributes.lastName}
                                                                    </>
                                                                }</h6>
                                                        </div>
                                                        <div className="mail_agent">
                                                            <img src="/images/html5/icons/mail.svg" uk-svg alt="" />
                                                            <h5 mailto={(offplan.attributes.agents.data != null && offplan.attributes.agents.length > 0)==true && offplan.attributes.agents.data[0].attributes.email}>Register your interest</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </>
                                ))
                                }
                            </Slider>
                            <div
                className={popup ? "popup active" : "popup notActive"}
            >
                <span
                    className="close-button"
                    onClick={() => ClosepopupSwitch()}
                >
                    x
                </span>
                {video != false && (
                    <div className="col-12 row p-0 m-0">
                        <div className="popup-video col-12 p-0 m-0">

                            <iframe
                                src={getYoutubeURL(
                                    video,
                                    "?ecver=2?autoplay=1"
                                )}
                            ></iframe>
                        </div>
                    </div>
                )}
                {popupType == 'form' &&
                    <div className="form_container bg-transparent">
                        <div className="form_content full-form fullwidthforms">
                            <h3>Register Your Interest</h3>
                            <p>
                                {/* <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. */}
                            </p>

                            <GeneralForm purpose="Community Interest" />
                        </div>

                    </div>

                }
            </div>
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


export default offplanSlider;
