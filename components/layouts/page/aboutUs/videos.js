import React, { Component } from "react";
import Link from "next/link";
import { BsClock,BsCalendar4 } from "react-icons/bs";
import Videobox from "../../Sidebar/videobox";
import Pagination from "./pagination";
import moment from "moment";

class videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredCat: "",
    };
  }
  render() {
    return (
      <>
        <div className="devider"></div>
        <div className="videos container mb-5">

          <section className="first_content pb-0 mb-0 mt-3">
            <div className="title">
              <span>Videos &amp; Insight</span>
              <h3>
                Keeping you up to date with everything that is happening in the
                Dubai property market.
              </h3>
            </div>
            <div className='container p-0-md mt-0'>
              <Videobox filter={this.props.filtered[0] == "" ? "" : this.props.filtered[0]} preloaded={true} />
            </div>
          </section>
          {this.props.videos.data.length > 0 &&
            <>

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
                {this.props.videos.data.slice(5, 100).map((value, index) => (
                  <>
                    <div className="card">
                      <Link legacyBehavior href={value.id + "-" + value.attributes.title.split(' ').join('-').replace(".", "-")}>
                        <a>
                          <div className="media">
                            <img src={value.attributes.featuredImage.data.attributes.url} type scrolling="no" />
                            <i className="play_BTN fa-solid fa-play" />
                          </div>
                          <div className="card_body">
                            <a>{value.attributes.title}</a>

                            {value.attributes.duration > 0 &&
                              <>
                                <p>
                                  <BsClock />
                                  {value.attributes.duration.toString().replace(".", ":")} mins
                                </p>
                              </>
                            }
                            {value.attributes.publishedDateWebsite != null &&
                              <>
                                <p style={{ lineHeight: "20px" }}>
                                  <BsCalendar4 />
                                  {moment(value.attributes.publishedDateWebsite).format('MM-DD-YYYY')}
                                </p>
                              </>
                            }
                          </div>
                        </a>
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </>
          }
          <Pagination resultCount={this.props.videos.meta.pagination.total} pageCount={this.props.videos.meta.pagination.pageSize} currentPage={this.props.videos.meta.pagination.page} />
        </div>
      </>
    );
  }
}

export default videos;
