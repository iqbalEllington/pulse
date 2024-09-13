import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai"
import { RiShareLine, RiPrinterLine } from "react-icons/ri";
import { BsClock } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import Videobox from "../../Sidebar/videobox";
import { getYoutubeURL } from "../../../../services/utilsService";
import Sharebuttons from "../../Sidebar/sharebuttons";
function videosDetails(props) {
    const [share, setShare] = useState(false)

    const [video, setvideo] = useState(false)
    const playvideo = () => {
        setvideo(true)
    }
    const date = moment(props.video.data.attributes.publishedAt).format('DD-MM-YYYY');
    return (
        <>
            <div className="devider"></div>
            <div className="video_detail">
                <div className="first_content container">
                    <div className="navigation">
                        <span className="overlay" />
                        <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                        <Link legacyBehavior href="/dubai/about-us/our-services"><a>About</a></Link><i className="fa-solid fa-angle-right" />
                        <Link legacyBehavior href="/dubai/about-us/videos"><a>Videos</a></Link><i className="fa-solid fa-angle-right" />
                        <a href>
                            {props.video.data.attributes.tags.map((key, index) => {
                                return (
                                    <>
                                        <Link legacyBehavior href={"/dubai/about-us/videos/" + key.tag.toLowerCase()}><a>{key.tag}

                                        </a></Link>
                                        {
                                            index < props.video.data.attributes.tags.length - 1 &&
                                            <> - </>
                                        }

                                    </>
                                )
                            })}
                        </a><i className="fa-solid fa-angle-right" />
                        <a href>{props.video.data.attributes.title}</a>
                    </div>
                    <div className="title">
                        <h3>
                            {props.video.data.attributes.title}
                        </h3>
                    </div>
                    <div className="video_details">
                        <div>
                            <BsClock />
                            {props.video.data.attributes.duration > 0 &&
                                <>
                                    {props.video.data.attributes.duration.toString().replace(".", ":")} mins
                                </>
                            }
                        </div>
                        <div>
                            <AiOutlineCalendar />

                            <span className="small_screen_date">{moment(props.video.data.attributes.publishedAt).format('ddd DD MMMM')}</span>
                            <span className="large_screen_date">
                                {moment(props.video.data.attributes.publishedAt).format('dddd DD MMMM YYYY')}</span>
                        </div>
                        <div className="absolute-share">
                            <span onClick={() => setShare(!share)}>
                                <RiShareLine />
                                Share Video
                            </span>

                            <Sharebuttons showShare={share} />
                        </div>
                    </div>
                </div>
                <div className="last_content container">
                    <div onClick={() => playvideo()} className={video == true ? 'media active' : 'media'}>
                        <img src={props.video.data.attributes.featuredImage.data.attributes.url} type scrolling="no" />
                        <i className="fa-solid fa-play play_BTN button" />
                        <iframe
                            src={getYoutubeURL(
                                props.video.data.attributes.videoUrl, '?ecver=2&autoplay=1&mute=1&listType=playlist&rel=0'
                            )}
                        ></iframe>
                    </div>
                    <div className="desc">
                        <>
                            {props.video.data.attributes.description
                                .split("\r\n\r\n")
                                .map((item, key) => {
                                    return (
                                        // <p>{ReactHtmlParser(item)}</p>
                                        <p key={key}>
                                            {item
                                                .split("\r\n")
                                                .map((items, keys) => {
                                                    return (
                                                        <>
                                                            <ReactMarkdown children={items} />
                                                            {/* {items} */}
                                                            <br />
                                                        </>
                                                    );
                                                })}
                                        </p>
                                    );
                                })}

                        </>
                    </div>
                </div>
                <div className="alert container">
                <div>
                  <span className="alert_title">Subscribe to Newsletter</span>
                  <p className="alert_desc">
                  Receive a round-up of all the important news in one go!
                  </p>
                </div>
                <Link legacyBehavior href={"/dubai/subscribe"} >
                  <a>
                    <button className="subscribe">
                    Subscribe
                    </button>
                  </a>
                </Link>
              </div>
                <section className="mb-0">
                    <div className="video_detail_slider_container pt-5 pb-5">
                        <div className="container">
                            <Videobox filter="" />
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}

export default videosDetails;
