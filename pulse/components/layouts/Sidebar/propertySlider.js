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
import { setSlideStaus } from "../../../store/actions/search/searchAction";


export function propertySlider(searchData) {
    let baseURL = process.env.NEXT_PUBLIC_API_URL;
    const searchClass = new searchService();
    const sliderRef = useRef();
    const handleOnClick = index => {
        sliderRef.current.slickGoTo(index);
    };
    const getUrlType = ((type) => {
        let searchClass = new searchService();
        return searchClass.getURLPropertyType(type)
    })
    const [properties, setProperties] = useState(0);
    useEffect(() => {
        async function fetchData() {
            try {
                let searchparam = { ...searchData.searchParams };
                if (searchData.sort) {
                    searchparam.sort = [searchData.sort]
                }
                if (searchData.type) {
                    searchparam.propertyStatus = [searchData.type]
                }
                if (searchData.filter) {
                    searchparam[searchData.filter.key[0]] = [searchData.filter.value[0]]
                }
                searchparam.page = [1]
                var url = searchClass.popupSearch(searchparam);
                const result = await axios(baseURL + url);
                var hits = [];
                result.data.data.hits.forEach((element) => {
                    if (element.fields.pba__main_website_image__c !== null && element.fields.pba__main_website_image__c[0] !== 'NUll') {
                        hits.push(element)
                    }
                });
                if (hits.length >= 4) {
                    var slideStatus = {
                        slide: searchData.slider,
                        status: true
                    }
                    setProperties(hits);
                    searchData.setSlideStaus(slideStatus)
                    handleOnClick(1)
                } else {
                    if (searchData.noLimit !== undefined && searchData.noLimit == true) {
                        setProperties(hits);
                    }
                    var slideStatus = {
                        slide: searchData.slider,
                        status: false
                    }
                    searchData.setSlideStaus(slideStatus)
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [searchData.searchParams, searchData.type]);
    var settings = {
        dots: false,
        infinite: false,
        speed: 300,
        lazyLoad: false,
        slidesToShow: 4,
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 860,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                    arrows: false,
                },
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
        <div className="uk-slider-container-offset new_listings_slider uk-slider uk-slider-container">

            {properties.length > 0 && (
                <Slider {...settings} ref={sliderRef}>
                    {properties.map((property, searchIndex) => (
                        <div data-index={searchIndex} key={searchIndex} className="allsopp-slider-items">
                            <div>
                                <Link legacyBehavior href={
                                    API_GET_PROPERTY +
                                    getUrlType(property["fields"]['pba__listingtype__c'][0]) +
                                    "/dubai-" +
                                    property["fields"]["pba__broker_s_listing_id__c"]
                                }>
                                    <a>
                                        <div className="uk-card uk-card-default">
                                            <div className="uk-card-media-top">
                                                <img
                                                    src={IMAGEURL_TEMP + property["fields"]['pba__property__c'] + "_s_" + property["fields"]["pba__main_website_image__c"]}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null; // prevents looping
                                                        currentTarget.src = "/images/imagesComingSoon.png";
                                                    }}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="uk-card-body">

                                                <h3 className="uk-card-title">{property["fields"]["name"]}</h3>

                                                <p>
                                                    {searchData.slider == 'comingToMarket' ?
                                                        <>
                                                            Coming to market
                                                        </> :
                                                        <>
                                                            {searchData.slider == 'sold' ?
                                                                <>
                                                                    {property["fields"].pba__listingtype__c[0].toLowerCase() == "sale" ?
                                                                        "Sold"
                                                                        :
                                                                        "Tenancy Agreed"
                                                                    }

                                                                </> :
                                                                <>
                                                                    {property["fields"]["pba__broker_s_listing_id__c"] == "L-173394" ?
                                                                        <>Price on Request</>
                                                                        :
                                                                        <>
                                                                            {covertToCurrency(
                                                                                "AED",
                                                                                "AED",
                                                                                property["fields"]["pba__listingprice_pb__c"]
                                                                            )
                                                                            } {property["fields"]['pba__listingtype__c'] == "Rent" && <span>Per Annum</span>}
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </p>

                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))
                    }
                </Slider>
            )}
        </div >
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

function mapStateToProps(state) {
    return {
        searchParams: state.searchReducer.searchParams,
        searchParamsInitial: state.searchReducer.searchParamsInitial
    };
}
function mapDispachToProps(dispatch) {
    return {
        setSlideStaus: (data) => dispatch(setSlideStaus(data)),
    };
}

export default connect(mapStateToProps, mapDispachToProps)(propertySlider);
