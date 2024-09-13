import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Seotags from '../../../utility/seotags';

function Contact(props) {
    const createURLString = (string) => {
        var string = string.replace(new RegExp(" ", "g"), "-");
        string = string + "-real-estate-brokers"
        return string;
    }
    return (
        // {/* ================================= Our Offices ================================= */ }
        <div>
            {props.pageData!="" && props.pageData[0].attributes.SEO != null ?
                <Seotags pageTitle={props.pageData[0].attributes.SEO.pageTitle} metaDescription={props.pageData[0].attributes.SEO.metaDescription}
                    index={{
                        isIndex: props.pageData[0].attributes.SEO.isIndex,
                        isFollow: props.pageData[0].attributes.SEO.isFollow
                    }
                    }
                    image={false} />
                :
                <Seotags pageTitle={"Contact Us"} metaDescription={"Contact Allsopp and Allsopp"} image={false} index={{
                    isIndex: true,
                    isFollow: true
                }
                } />
            }
            <div className="devider pb-0"></div>
            {/* ================================= Careers ================================= */}
            <div className="container">
                <div className="navigation breadcrumbs">
                    <span className="overlay" />
                    <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                    <Link legacyBehavior href="/dubai/contact"><a>Contact</a></Link>
                </div>
            </div>
            <div className="devider pb-0"></div>
            <section>
                <div className='container offices'>
                    <div className="title">
                        <span>Our Offices</span>
                        <h3>
                            We'd love to hear from you!
                        </h3>
                    </div>
                </div>
            </section>
            <section>
                <div className='container offices'>
                    <div className="offices_content">
                        {props.offices.offices.map((office) => (
                            <>
                                <div className="office_item">
                                    <div className="office_name">
                                        {office.attributes.profilePhoto.data != null &&
                                            <img src={office.attributes.profilePhoto.data[0].attributes.url} width={1800} height={1200} alt="" />
                                        }
                                        <div>
                                            <Link legacyBehavior href={"/dubai/contact/" + createURLString(office.attributes.officeName)}><a>{office.attributes.officeName}</a></Link>
                                            <span>Office</span>
                                        </div>
                                    </div>
                                    <div className="office_adress">
                                        <h4>Address:</h4>
                                        <p>
                                            <ReactMarkdown children={office.attributes.address} />
                                        </p>
                                        {office.attributes.longitude != "" && office.attributes.longitude != null && office.attributes.latitude != "" && office.attributes.latitude != null && office.attributes.googleKeyWord != "" && office.attributes.googleKeyWord != null &&
                                            <a className='black-anc' href={'https://www.google.com/maps/dir//' + office.attributes.googleKeyWord + "/@" + office.attributes.latitude + "," + office.attributes.longitude} target="_blank">
                                                View on map
                                            </a>
                                        }
                                    </div>
                                    <div className="office_phone">
                                        <h4>Phone:</h4>
                                        <p>{office.attributes.phone}</p>
                                    </div>
                                    <Link legacyBehavior href={"/dubai/contact/" + createURLString(office.attributes.officeName)}><a><button className="secondary_btn view_office btn-view">View Office Details</button></a></Link>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}


export default Contact