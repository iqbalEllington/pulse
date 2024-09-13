import React, { Component, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Link from "next/link";
import { BsClock, BsCalendar4 } from "react-icons/bs";
import { getYoutubeURL } from "../../../services/utilsService";
import moment from "moment";
export function newsbox(searchData) {
    const [popup, setPopup] = useState(false);
    const [homeUp, setHomeUp] = useState(false)
    let baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [filter, setFilter] = useState(searchData.filter);
    const sliderRef = useRef();
    const handleOnClick = index => {
        sliderRef.current.slickGoTo(index);
    };
    const handleoption = async (option) => {
        setFilter(option)
    }
    const [popvideo, setPopvideo] = useState(false)

    const [video, setvideo] = useState(false)
    const playvideo = (e, selected) => {
        if (window.innerWidth < 620) {
            e.preventDefault()
            setPopvideo(selected);
            setPopup(!popup)
        } else {
            e.preventDefault();
            setvideo(true)
        }
    }
    const playvideoRespo = (e) => {
        if (window.innerWidth < 600) {
            e.preventDefault();
            setvideo(true)
        }
    }
    const popupSwitch = async (e, selected) => {
        if (window.innerWidth < 620) {
            e.preventDefault()
            setPopvideo(selected);
            setPopup(!popup)
        }

    }
    const ClosepopupSwitch = async (selected) => {
        setPopup(false)
    }
    const [news, setNews] = useState(0);
    useEffect(() => {
        async function fetchData() {
            try {
                var url = "dubai/about-us/news-videos/" + filter;
                const result = await axios(baseURL + url);
                setNews(result)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [filter]);
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 3,
        // autoplay: true,
        slidesToScroll: 1,
        accessibility: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: "unslick"
            },
            {
                breakpoint: 2000,
                settings: "unslick"
            },
            {
                breakpoint: 1600,
                settings: "unslick"
            },
            {
                breakpoint: 1024,
                settings: "unslick"
            },
            {
                breakpoint: 601,
                settings: "unslick"
            },
            {
                breakpoint: 600,
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
        <div className="latest_videos">
            <div className="first_content">
                {!searchData.preloaded &&
                    <h2>Latest News & Videos</h2>
                }
                {searchData.filtertab == true &&
                    <div className={homeUp == true ? "dropdown home-d opened" : "home-d dropdown"}>
                        <button className="secondary_btn  active d-block d-md-none" onClick={() =>
                            setHomeUp(!homeUp)
                        }>
                            {filter.toLowerCase() == "" &&
                                <>All Videos</>
                            }
                            {filter.toLowerCase() == "sales" &&
                                <>Sales</>
                            }
                            {filter.toLowerCase() == "leasing" &&
                                <>Leasing</>
                            }
                            {filter.toLowerCase() == "holiday-homes" &&
                                <>Short Term</>
                            }
                            {filter.toLowerCase() == "mortgages" &&
                                <>Mortgages</>
                            }

                            <i className="fa-solid fa-angle-down" />
                        </button>
                        {searchData.preloaded ?
                            <>
                                <Link legacyBehavior passHref href="/dubai/about-us/news-videos">
                                    <a>
                                        <button className={filter == "" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("")}>
                                            All Videos <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </a>
                                </Link>
                                <Link legacyBehavior passHref href="/dubai/about-us/news-videos/sales">
                                    <a>
                                        <button className={filter == "sales" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("sales")}>
                                            Sales <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </a>
                                </Link>
                                <Link legacyBehavior passHref href="/dubai/about-us/news-videos/leasing">
                                    <a>
                                        <button className={filter == "leasing" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("leasing")}>
                                            Leasing <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </a>
                                </Link>
                                <Link legacyBehavior passHref href="/dubai/about-us/news-videos/holiday-homes">
                                    <a>
                                        <button className={filter == "holiday-homes" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("holiday-homes")}>
                                            Short Term <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </a>
                                </Link>
                                <Link legacyBehavior passHref href="/dubai/about-us/news-videos/mortgages">
                                    <a>
                                        <button className={filter == "mortgages" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("mortgages")}>
                                            Mortgages <i className="fa-solid fa-angle-down" />
                                        </button>
                                    </a>
                                </Link>
                            </> :
                            <>
                                <button className={filter == "" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("")}>
                                    All Videos <i className="fa-solid fa-angle-down" />
                                </button>
                                <button className={filter == "sales" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("sales")}>
                                    Sales <i className="fa-solid fa-angle-down" />
                                </button>
                                <button className={filter == "leasing" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("leasing")}>
                                    Leasing <i className="fa-solid fa-angle-down" />
                                </button>
                                <button className={filter == "holiday-homes" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("holiday-homes")}>
                                    Short Term <i className="fa-solid fa-angle-down" />
                                </button>
                                <button className={filter == "mortgages" ? "secondary_btn actives" : "secondary_btn"} onClick={() => handleoption("mortgages")}>
                                    Mortgages <i className="fa-solid fa-angle-down" />
                                </button>      </>}

                    </div>
                }
            </div>
            <section className="uk-slider-container-offset new_listings_slider videos" >

                {news != 0 &&
                    <>
                        <div className="last_content">
                            <ul className="first_videos_content">
                                {!searchData.preloaded ?
                                    <Slider {...settings} ref={sliderRef} className="col-12">
                                        {news.data.status == 200 &&
                                            <>
                                                {news.data.data.data.slice(0, 5).map((value, index) => (

                                                    <li key={index} className={index == 0 && "active"}>
                                                        <Link legacyBehavior passHref href={"/dubai/about-us/news-videos/" + value.id + "-" + value.attributes.title.split(' ').join('-').replace(".", "-")}>
                                                            <a>
                                                                {/* {JSON.stringify(value.attributes)} */}
                                                                <div className="video_card">
                                                                    {index == 0 ?
                                                                        <>
                                                                            {(value.attributes.videoUrl !== null && value.attributes.videoUrl.trim() != '') == true ?
                                                                                <div onClick={(e) => playvideo(e, value.attributes.videoUrl)} className={video == true ? "video_src active" : "video_src"}>
                                                                                    <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                                                                    <i className="play_BTN fa-solid fa-play" />
                                                                                    <iframe
                                                                                        src={getYoutubeURL(
                                                                                            value.attributes.videoUrl, '?ecver=2&autoplay=1&mute=1&listType=playlist&rel=0'
                                                                                        )}
                                                                                    ></iframe>
                                                                                </div>
                                                                                : <>
                                                                                    <div className="video_src">
                                                                                        <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {(value.attributes.videoUrl !== null && value.attributes.videoUrl.trim() != '') == true ?
                                                                                <><div onClick={(e) => popupSwitch(e, value.attributes.videoUrl)} className="video_src">
                                                                                    <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                                                                    <i className="play_BTN fa-solid fa-play" />
                                                                                </div></>
                                                                                :
                                                                                <>
                                                                                    <div className="video_src">
                                                                                        <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                                                                    </div>
                                                                                </>
                                                                            }

                                                                        </>
                                                                    }
                                                                    <div className="video_desc">
                                                                        <h4>{value.attributes.title}</h4>

                                                                        {value.attributes.readingTime_minutes > 0 &&
                                                                            <>
                                                                                <p>
                                                                                    <BsClock />
                                                                                    {value.attributes.readingTime_minutes.toString().replace(".", ":")} mins
                                                                                </p>
                                                                            </>
                                                                        }
                                                                        {value.attributes.publishedDateWebsite != null &&
                                                                            <>
                                                                                <p style={{ lineHeight: "30px" }}>
                                                                                    <BsCalendar4 />
                                                                                    {moment(value.attributes.publishedDateWebsite).format('DD-MM-YYYY')}

                                                                                </p>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                                )
                                                }
                                            </>
                                        }
                                    </Slider> :
                                    <>
                                        {news.data.data.data.slice(0, 5).map((value, index) => (
                                            <li key={index} className={index == 0 && "active"}>
                                                <Link legacyBehavior passHref href={"/dubai/about-us/news-videos/" + value.id + "-" + value.attributes.title.split(' ').join('-').replace(".", "-")}>
                                                    <a>
                                                        {/* {JSON.stringify(value.attributes)} */}
                                                        <div className="video_card">
                                                            {index == 0 ?
                                                                <div onClick={(e) => playvideo(e, value.attributes.videoUrl)} className={video == true ? "video_src active" : "video_src"}>
                                                                    <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                                                </div>
                                                                :
                                                                <div onClick={(e) => popupSwitch(e, value.attributes.videoUrl)} className="video_src">
                                                                    <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                                                </div>}
                                                            <div className="video_desc">
                                                                <h4>{value.attributes.title}</h4>
                                                                {value.attributes.readingTime_minutes > 0 &&
                                                                    <>
                                                                        <p>
                                                                            <BsClock />
                                                                            {value.attributes.readingTime_minutes.toString().replace(".", ":")} mins
                                                                        </p>
                                                                    </>
                                                                }
                                                                {value.attributes.publishedDateWebsite != null &&
                                                                    <>
                                                                        <p style={{ lineHeight: "30px" }}>
                                                                            <BsCalendar4 />
                                                                            {moment(value.attributes.publishedDateWebsite).format('DD-MM-YYYY')}
                                                                        </p>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </li>
                                        )
                                        )
                                        }
                                    </>
                                }
                                {!searchData.preloaded &&
                                    <div className="col-12 text-center d-flex">
                                        <Link legacyBehavior href={'/dubai/about-us/news-videos'}><a className="mx-auto"> <button className="primary_btn property_btn align-hd-btn">View all news & videos</button> </a></Link>
                                    </div>
                                }
                            </ul>
                        </div>

                        <div
                            className={popup == true ? "popup active" : "popup notActive"}
                        >
                            <span
                                className="close-button"
                                onClick={() => ClosepopupSwitch()}
                            >
                                x
                            </span>
                            {popvideo != false && (
                                <div className="col-12 row m-0">
                                    <div className="popup-video col-12">

                                        <iframe
                                            src={getYoutubeURL(
                                                popvideo,
                                                "?ecver=2&autoplay=1&mute=1&listType=playlist&rel=0"
                                            )}
                                        ></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                }
            </section>
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


export default newsbox;