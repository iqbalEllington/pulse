import React, { Component, useState, useEffect, useRef, useCallback } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";


function Services(props) {
    return (
        <div className="bg-white">
            <div className="container">
                <div className="section-title">
                    <h4>Our Services</h4>
                </div>
                <div className="container uk-slider-container-offset latestAwards_slider services" uk-slider>


                    {/* {JSON.stringify(props.services)} */}
                    <div className="uk-position-relative uk-visible-toggle uk-light customer_reviews_slider" tabIndex={-1}>
                        <div className="uk-slider-items uk-child-width-1-3@s uk-grid ">

                            {props.services.map((service, index) => {
                                return <>
                                    <div className="latestAwards_item">
                                        <Link legacyBehavior href={service.attributes.storyURL != null ? service.attributes.storyURL : "#"}  className="uk-card-title">
                                           <a style={{textDecoration:"none"}}><div className="uk-card uk-card-default">
                                                <div className="uk-card-media-top">
                                                    <img src={service.attributes.featuredImage.data.attributes.formats.small.url}
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null; // prevents looping
                                                            currentTarget.src = "/images/imagesComingSoon.png";
                                                        }} alt="" />
                                                </div>
                                                <div className="uk-card-body">

                                                    <a className="uk-card-title">
                                                        {service.attributes.serviceTtitle}
                                                    </a>


                                                </div>
                                            </div>
                                            </a> 
                                        </Link>
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Services;