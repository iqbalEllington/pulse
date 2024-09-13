import React, { Component } from "react";
import Link from "next/link";
import Pagination from "./pagination";
import { BsClock, BsCalendar4 } from "react-icons/bs";
import moment from "moment";
import { getYoutubeURL } from "../../../../services/utilsService";
import Seotags from "../../../utility/seotags";
class videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredCat: "",
      homeUp: false,
      video: false
    };
  }
  handleoption = (option) => {
    this.setState({ filter: option })
  }
  playvideo = (e, selected) => {
    e.preventDefault();
    this.setState({ video: true })
  }
  render() {
    return (
      <>
        {this.props.pageData != "" && this.props.pageData[0].attributes.SEO != null ?
          <Seotags pageTitle={this.props.pageData[0].attributes.SEO.pageTitle} metaDescription={this.props.pageData[0].attributes.SEO.metaDescription}
            index={{
              isIndex: this.props.pageData[0].attributes.SEO.isIndex,
              isFollow: this.props.pageData[0].attributes.SEO.isFollow
            }
            }
            image={false} />
          :
          <Seotags pageTitle={"News and Videos"} metaDescription="News and Videos" image={false} index={{
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
            <Link legacyBehavior href="/dubai/about-us/news-videos"><a>News & Videos</a></Link>
          </div>
        </div>
        <div className="devider mb-3"></div>
        <div className="videos container">
          <div className="first_content">
            <div className="title">
              <span>News &amp; Videos</span>
              <h3>
                Keeping you up to date with everything that is happening in the
                Dubai property market.
              </h3>
            </div>
            <div className={this.state.homeUp == true ? "dropdown home-d opened" : "home-d dropdown"}>
              <button className="secondary_btn  active d-block d-md-none" onClick={() =>
                this.setState({ homeUp: !this.state.homeUp })
              }>
                {this.props.filtered[0].toLowerCase() == "" &&
                  <>All Videos</>
                }
                {this.props.filtered[0].toLowerCase() == "sales" &&
                  <>Sales</>
                }
                {this.props.filtered[0].toLowerCase() == "leasing" &&
                  <>Leasing</>
                }
                {this.props.filtered[0].toLowerCase() == "holiday-homes" &&
                  <>Short Term</>
                }
                {this.props.filtered[0].toLowerCase() == "mortgages" &&
                  <>Mortgages</>
                }

                <i className="fa-solid fa-angle-down" />
              </button>
              <Link legacyBehavior passHref href="/dubai/about-us/news-videos">
                <a>
                  <button className={this.props.filtered[0] == "" ? "secondary_btn actives" : "secondary_btn"}>
                    All <i className="fa-solid fa-angle-down" />
                  </button>
                </a>
              </Link>
              <Link legacyBehavior passHref href="/dubai/about-us/news-videos/sales">
                <a>
                  <button className={this.props.filtered[0] == "sales" ? "secondary_btn actives" : "secondary_btn"}>
                    Sales <i className="fa-solid fa-angle-down" />
                  </button>
                </a>
              </Link>
              <Link legacyBehavior passHref href="/dubai/about-us/news-videos/leasing">
                <a>
                  <button className={this.props.filtered[0] == "leasing" ? "secondary_btn actives" : "secondary_btn"}>
                    Leasing <i className="fa-solid fa-angle-down" />
                  </button>
                </a>
              </Link>
              <Link legacyBehavior passHref href="/dubai/about-us/news-videos/holiday-homes">
                <a>
                  <button className={this.props.filtered[0] == "holiday-homes" ? "secondary_btn actives" : "secondary_btn"}>
                    Short Term <i className="fa-solid fa-angle-down" />
                  </button>
                </a>
              </Link>
              <Link legacyBehavior passHref href="/dubai/about-us/news-videos/mortgages">
                <a>
                  <button className={this.props.filtered[0] == "mortgages" ? "secondary_btn actives" : "secondary_btn"}>
                    Mortgages <i className="fa-solid fa-angle-down" />
                  </button>
                </a>
              </Link>
            </div>
          </div>
          {this.props.news.data.length > 0 &&
            <section className="mt-4">
              <div className="last_content">
                <ul className="first_videos_content">
                  {this.props.news.data.slice(0, 5).map((value, index) => (
                    <>

                      <li key={index} className={index == 0 && "active"}>
                        <Link legacyBehavior href={"/dubai/about-us/news-videos/" + value.id + "-" + encodeURIComponent(value.attributes.title.split(' ').join('-').replace(".", "-"))}>
                          <a>
                            <div className="video_card">
                              {(value.attributes.videoUrl != null && value.attributes.videoUrl.trim()!= '')==true ?
                                <>
                                  {index == 0 ?
                                    <div onClick={(e) => this.playvideo(e, value.attributes.videoUrl)} className={this.state.video == true ? "video_src active" : "video_src"}>
                                      <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                      <i className="play_BTN fa-solid fa-play" />
                                      <iframe
                                        src={getYoutubeURL(
                                          value.attributes.videoUrl, '?ecver=2&autoplay=1&mute=1&listType=playlist&rel=0'
                                        )}
                                      ></iframe>
                                    </div>
                                    :
                                    <div className="video_src">
                                      <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                      <i className="play_BTN fa-solid fa-play" />
                                    </div>}</>
                                :
                                <div className="video_src">
                                  {value.attributes.featuredImage.data != null &&
                                    <img src={value.attributes.featuredImage.data.attributes.url} scrolling="no" />
                                  }
                                  {/* <i className="play_BTN fa-solid fa-play" /> */}
                                </div>
                              }
                              <div className="video_desc">
                                <a>{value.attributes.title}</a>
                                {value.attributes.readingTime_minutes > 0 &&
                                  <>
                                    <p className="mb-0">
                                      <BsClock />
                                      {value.attributes.readingTime_minutes.toString().replace(".", ":")} mins
                                    </p>
                                  </>
                                }
                                {value.attributes.publishedDateWebsite != null &&
                                  <>
                                    <p style={{ lineHeight: "20px" }}>
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
                    </>
                  )
                  )
                  }
                </ul>
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
              <div className="videos_cards">
                {this.props.news.data.slice(5, 100).map((value, index) => (
                  <>
                    <div className="card">
                      <Link legacyBehavior href={"/dubai/about-us/news-videos/" + value.id + "-" + encodeURIComponent(value.attributes.title.split(' ').join('-').replace(".", "-"))}>
                        <a>
                          <div className="media">
                            {value.attributes.featuredImage.data != null &&
                              <img src={value.attributes.featuredImage.data.attributes.url} type scrolling="no" />
                            }
                            {(value.attributes.videoUrl != null && value.attributes.videoUrl.trim()!= '')==true &&
                              <i className="play_BTN fa-solid fa-play" />
                            }
                          </div>
                          <div className="card_body">
                            <a>{value.attributes.title}</a>
                            <p>
                              {value.attributes.readingTime_minutes > 0 &&
                                <>
                                  <BsClock />
                                  {value.attributes.readingTime_minutes.toString().replace(".", ":")} mins
                                </>
                              }
                            </p>
                            {value.attributes.publishedDateWebsite != null &&
                              <>
                                <p style={{ lineHeight: "20px" }}>
                                  <BsCalendar4 />
                                  {moment(value.attributes.publishedDateWebsite).format('DD-MM-YYYY')}
                                </p>
                              </>
                            }
                          </div>
                        </a>
                      </Link>
                    </div>
                  </>
                ))}
                <Pagination resultCount={this.props.news.meta.pagination.total} pageCount={this.props.news.meta.pagination.pageSize} currentPage={this.props.news.meta.pagination.page} />
              </div>
            </section>
          }
        </div>
      </>
    );
  }
}

export default videos;
