import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai"
import { RiShareLine, RiPrinterLine } from "react-icons/ri";
import { BsClock } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import Newsbox from "../../Sidebar/newsbox";
import Sharebuttons from "../../Sidebar/sharebuttons";
import Subscribebar from "../../Sidebar/subsribebar";
import { getYoutubeURL } from "../../../../services/utilsService";
import Seotags from "../../../utility/seotags";

function newsDetails(props) {
    const [share, setShare] = useState(false)
    const [video, setvideo] = useState(false)
    function getYoutubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }
    const playvideo = () => {
        setvideo(true)
    }
    return (
        <>
            {props.news.data.attributes.SEO != null ?
                <Seotags pageTitle={props.news.data.attributes.SEO.pageTitle} metaDescription={props.news.data.attributes.SEO.metaDescription} image={props.news.data.attributes.featuredImage.data != null ? props.news.data.attributes.featuredImage.data.attributes.url : false} />
                :
                <Seotags pageTitle={props.news.data.attributes.title} metaDescription={props.news.data.attributes.title} image={props.news.data.attributes.featuredImage.data != null ? props.news.data.attributes.featuredImage.data.attributes.url : false} />
            }
            <div className="devider pb-0"></div>
            <div className="container">
                <div className="navigation breadcrumbs">
                    <span className="overlay" />
                    <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                    <Link legacyBehavior href="/dubai/about-us/our-services"><a>About</a></Link><i className="fa-solid fa-angle-right" />
                    <Link legacyBehavior href="/dubai/about-us/news-videos"><a>News & Videos</a></Link><i className="fa-solid fa-angle-right" />
                    <a href>
                        {props.news.data.attributes.tag.map((key, index) => {
                            return (
                                <>
                                    <Link legacyBehavior href={"/dubai/about-us/news-videos/" + key.tag}><a>{key.tag}
                                    </a></Link>
                                    {
                                        index < props.news.data.attributes.tag.length - 1 &&
                                        <> - </>
                                    }
                                </>
                            )
                        })}
                    </a><i className="fa-solid fa-angle-right" />
                    <Link legacyBehavior href="#"><a>{props.news.data.attributes.title}</a></Link>
                </div>
            </div>
            <div className="devider pb-0"></div>
            <div className="video_detail">
                <div className="first_content container mb-0">


                    <div className="title">
                        <h3>
                            {props.news.data.attributes.title}
                        </h3>
                    </div>
                    <div className="video_details">
                        <div>
                            {props.news.data.attributes.readingTIme_minutes > 0 &&
                                <>
                                    <BsClock />
                                    {props.news.data.attributes.readingTIme_minutes.toString().replace(".", ":")} mins
                                </>
                            }
                        </div>
                        <div>
                            <AiOutlineCalendar />
                            <span className="large_screen_date">
                                {moment(props.news.data.attributes.publishedAt).format('dddd DD MMMM YYYY')}</span>
                            <span className="small_screen_date">Wed 16 Feb</span>
                        </div>
                        <div className="absolute-share">
                            <span onClick={() => setShare(!share)}>
                                <RiShareLine />
                                Share
                            </span>

                            <Sharebuttons showShare={share} />
                        </div>
                    </div>
                </div>
                <section className="last_content container mt-4">

                    {(props.news.data.attributes.videoUrl != null && props.news.data.attributes.videoUrl.trim()!= '')==true ?
                        <>
                            {props.news.data.attributes.featuredImage.data != null &&
                                <div onClick={() => playvideo()} className={video == true ? 'media active' : 'media'}>

                                    <img src={props.news.data.attributes.featuredImage.data.attributes.url} type scrolling="no" />
                                    <i className="fa-solid fa-play play_BTN button" />
                                    <iframe
                                        src={getYoutubeURL(
                                            props.news.data.attributes.videoUrl, '?ecver=2&autoplay=1&mute=1&listType=playlist&rel=0'
                                        )}
                                    ></iframe>
                                </div>
                            }
                        </>
                        : <>
                            {props.news.data.attributes.featuredImage.data != null &&
                                <div className={video == true ? 'media active' : 'mediaNews'}>
                                    {props.news.data.attributes.featuredImage.data != null &&
                                        <img src={props.news.data.attributes.featuredImage.data.attributes.url} type scrolling="no" />
                                    }
                                </div>
                            }
                        </>}
                    <div className="desc">
                        <>
                            <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={props.news.data.attributes.content}
                                escapeHtml={false}
                            />

                        </>
                    </div>
                    <Subscribebar />
                </section>
                <div className="video_detail_slider_container pt-5">
                    <div className="container">
                        <Newsbox filter="" preloaded={false}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default newsDetails;
