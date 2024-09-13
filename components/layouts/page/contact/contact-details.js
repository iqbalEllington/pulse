import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Seotags from '../../../utility/seotags';
import BookValuation from '../../forms/bookvaluation/bookaluation';
import GeneralForm from '../../forms/enquiry/general';

function Office(props) {
    const [form, setForm] = useState("callback")
    return (
        <>
            {props.data.offices[0].attributes.SEO != null ?
                <Seotags pageTitle={props.data.offices[0].attributes.SEO.pageTitle} metaDescription={props.data.offices[0].attributes.SEO.metaDescription} image={props.data.offices[0].attributes.profilePhoto.data != null ? props.data.offices[0].attributes.profilePhoto.data[0].attributes.url : false} />
                :
                <Seotags pageTitle={props.data.offices[0].attributes.officeName} metaDescription={props.data.offices[0].attributes.address} image={props.data.offices[0].attributes.profilePhoto.data != null ? props.data.offices[0].attributes.profilePhoto.data[0].attributes.url : false} />
            }
            <div className="office_detail">
                <div className='devider pb-0'></div>
                <div className='container'>
                    <div className="navigation breadcrumbs">
                        <span className="overlay" />
                        <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                        <Link legacyBehavior href="/dubai/contact"><a>Contact</a></Link><i className="fa-solid fa-angle-right" />
                        <Link legacyBehavior href={"#"}><a>{props.data.offices[0].attributes.officeName}</a></Link>
                    </div>
                </div>
                <div className="office_content">
                    <div className="frame container">
                        <div className="main_details">
                            <h4>{props.data.offices[0].attributes.officeName}</h4>
                            <div>
                                <h5>Address:</h5>
                                <p>
                                    <ReactMarkdown children={props.data.offices[0].attributes.address} />
                                    {props.data.offices[0].attributes.longitude != "" && props.data.offices[0].attributes.longitude != null && props.data.offices[0].attributes.latitude != "" && props.data.offices[0].attributes.latitude != null && props.data.offices[0].attributes.googleKeyWord != "" && props.data.offices[0].attributes.googleKeyWord != null &&
                                        <a className='black-anc' href={'https://www.google.com/maps/dir//' + props.data.offices[0].attributes.googleKeyWord + "/@" + props.data.offices[0].attributes.latitude + "," + props.data.offices[0].attributes.longitude} target="_blank">
                                            View on map
                                        </a>
                                    }
                                </p>
                            </div>
                            <div>
                                <h5>Telephone:</h5>
                                <p>T: <a href={"tel:" + props.data.offices[0].attributes.phone}>{props.data.offices[0].attributes.phone}</a></p>
                            </div>
                            {/* <div>
                            <h5>Areas Covered:</h5>
                            <p>
                                {props.data.offices[0].attributes.AreasCovered != null &&
                                    <>
                                        {props.data.offices[0].attributes.AreasCovered.map((value, key) => {
                                            return <a href={"https://www.google.com/maps/@" + value.latlng} target={"_blank"}>{value.Areas}, {" "}</a>
                                        })
                                        }
                                    </>
                                }
                            </p>
                        </div> */}
                            <div>
                                <h5>Find a Property:</h5>
                                <p>
                                    <a href="/dubai/properties/residential/sales">Property for Sale</a> or  <a href="/dubai/properties/residential/lettings">Property for Rent</a>
                                </p>
                            </div>
                        </div>
                        <div className="frame_content fullwidthforms">
                            <div className="filter">
                                <button className={form == "callback" ? "secondary_btn active" : "secondary_btn"} onClick={() => setForm("callback")}>Request a call back</button>
                                {/* <button className={form == "email" ? "secondary_btn active" : "secondary_btn"} onClick={() => setForm("email")}>Email us</button> */}
                                <button className={form == "valuation" ? "secondary_btn active" : "secondary_btn"} onClick={() => setForm("valuation")}>Book a valuation</button>
                            </div>
                            {form == "callback" &&
                                <GeneralForm  purpose="contact form call back enquiry" />
                            }
                            {form == "email" &&
                                <GeneralForm purpose="contact form email us form" />
                            }
                            {form == "valuation" &&
                                <div className='book_valuation-contact'>
                                    <BookValuation />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Office