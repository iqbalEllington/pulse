import { useEffect, useState } from "react";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import Newsbox from "../../Sidebar/newsbox";
import Infobarrent from "./inforbarrent";
import Link from "next/link";
// import Head from "next/head";
import Seotags from "../../../utility/seotags";

function rentwithallsoppandallsopp(props) {
  const [readmore, setReadmore] = useState(false)
  return (

    <>
      {props.pageData.staticPage[0].attributes.SEO != null ?
        <Seotags pageTitle={props.pageData.staticPage[0].attributes.SEO.pageTitle} metaDescription={props.pageData.staticPage[0].attributes.SEO.metaDescription} image={props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url} />
        :
        <Seotags pageTitle={props.pageData.staticPage[0].attributes.MainTitile} metaDescription={props.pageData.staticPage[0].attributes.description} image={props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url} />
      }
      <div className="devider pb-0"></div>
      <div className="container">
        <div className="navigation breadcrumbs">
          <span className="overlay" />
          <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
          <Link legacyBehavior href="/dubai/guides/rent-with-allsopp-and-allsopp"><a>Rent With Allsopp and Allsopp</a></Link>
        </div>
      </div>
      {/* ================================= Modules Banner ================================= */}
      <div className="modules_banner" style={{ background: 'url("' + props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url + '")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="container">
          <span>{props.pageData.staticPage[0].attributes.description}</span>
          <h1>{props.pageData.staticPage[0].attributes.MainTitile}</h1>

        </div>
      </div>
      <section className="last_content_daynamic">
        <div className="container">
          <div className="desc col-12 col-md-9 mx-auto">
            <>
              <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={props.pageData.staticPage[0].attributes.contentVisible}
                escapeHtml={false}
              />

            </>
            <div className={readmore == true ? "read_more-show readmore-content" : "readmore-content"}>
              {props.pageData.staticPage[0].attributes.contentMore != null &&
                <>
                  <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={props.pageData.staticPage[0].attributes.contentMore}
                    escapeHtml={false}
                  />

                </>
              }
            </div>
            <button className="read_more_btn" onClick={() => setReadmore(!readmore)} id="read_tower_desc">
              {readmore == true ?
                <>Read Less</>
                : <>Read More</>
              }
            </button>

          </div>
        </div>
      </section>
      <Infobarrent />




      {/* faq */}
      <div className="transperentacord row">
        <section>
          <div className="container">
            <div className="main_details col-12 col-md-10 mx-auto">
              <div className="price">
                <h2 className="col-12 text-center">Guide to Renting Property </h2>
                <p className="text-center">
                  Rent property in Dubai with the help and guidance of a team that has moved tens of thousands of families into homes since 2008!
                  Read on for our step by step guide to renting an apartment or villa in Dubai for the first time.
                </p>

                <div className="accordion pt-4" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                        Step 1 – Think about a budget</button>
                    </h2>
                    <div id="collapse_1" className="accordion-collapse show" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          Calculating a budget is the first and most important step in the rental process in Dubai. You can use this budget as a base in which you can begin your search. </p>
                        <p>

                          When calculating a rental budget, please keep in mind the fees that go along with the rental process in Dubai - 5% of the total rental value will be needed for a deposit and 5% will be needed for agency fees subject to a minimum fee of AED 5000.

                        </p>                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                        Step 2 – What do you require
                      </button>
                    </h2>
                    <div id="collapse_2" className="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          Think about the essentials you require from your rental home. Are you looking for an apartment or a villa in Dubai? Which area would you prefer? How many bedrooms do you need? Think of the driving distance to the nearest schools or your workplace.
                        </p>
                        <p>
                          Be prepared to compromise! It is very rare that a property will tick every box so put this list in order of importance and narrow down your search to within your criteria guidelines.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                        Step 3 – Find a reliable broker
                      </button>
                    </h2>
                    <div id="collapse_3" className="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>

                          It is paramount for you to find a real estate broker in Dubai who you can trust and build, not only a professional but friendly relationship with. It is so important that you feel you can have an open and honest conversation with your broker.

                        </p>
                        <p>
                          Our brokers are trained to offer impeccable service to our clients and genuinely enjoy getting to know you all. At Allsopp & Allsopp, our speciality is listening to your needs and wants and matching you appropriately to the right community and perfect property.

                        </p>
                        <p>
                          As we are involved in thousands of leases each year, we have perfected our moving process into a well-oiled machine which is organised and thought out for you.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_5">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                        Step 4 – Viewings</button>
                    </h2>
                    <div id="collapse_5" className="accordion-collapse collapse" aria-labelledby="heading_4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>The viewing process can often be rather overwhelming, and it is easy to get excited about a property and forget to ask the questions you had in your head before you walked through the front door. Allsopp & Allsopp advise you to write down a potential list of questions to ask your broker about the property you are viewing.
                        </p>
                        <p>
                          Alternatively, you may dislike a property because of one or two factors but don’t rule it out completely. Voice your concerns to your broker, they may be able to come up with a solution as I am sure they have experienced something very similar in the past.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_6">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                        Step 5 – Make an offer </button>
                    </h2>
                    <div id="collapse_6" className="accordion-collapse collapse" aria-labelledby="heading_6" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          Once you have found a property to rent in Dubai, make a decision on what you would like to offer. Put the offer to your broker and they will start the negotiating process with the landlord. This is the most nerve-racking time, but your Allsopp & Allsopp broker has it under control and will keep you updated imminently with every advance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                        Step 6 – Administration
                      </button>
                    </h2>
                    <div id="collapse_8" className="accordion-collapse collapse" aria-labelledby="heading_8" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>To seal the deal your agent will talk you through the documents needed. Make sure you have an Emirates ID, passport and visa. Take your time to check the contract thoroughly before signing, if you have any questions or queries our brokers can clarify.</p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_9">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_9" aria-expanded="false" aria-controls="collapse_9">
                        Step 7 – Ejari Registration

                      </button>
                    </h2>
                    <div id="collapse_9" className="accordion-collapse collapse" aria-labelledby="heading_9" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>It is now time to register your rental agreement in Dubai through EJARI which means ‘your rent’ in Arabic. Your broker will talk you through this process and assist you with the documents. Allsopp & Allsopp also have a home move service who will be in touch after the contract signing and will make you aware of which permits are needed in order to move forward.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_10">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_10" aria-expanded="false" aria-controls="collapse_10">
                        Step 8 – Get Connected

                      </button>
                    </h2>
                    <div id="collapse_10" className="accordion-collapse collapse" aria-labelledby="heading_10" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Dubai Electricity and Water Authority (Dewa) will need to be registered under your name and it is a good idea to connect your internet before you move in. Our home move team can arrange this for you for a small fee.

                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_11">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_11" aria-expanded="false" aria-controls="collapse_11">
                        Step 9 – Move in day!
                      </button>
                    </h2>
                    <div id="collapse_11" className="accordion-collapse collapse" aria-labelledby="heading_11" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Congratulations, you have successfully rented a property in Dubai! Be aware of the move in policies put in place by the community or building security. Once in, put your feet up and enjoy your new home!!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="devider"></div>
      <section className='p-0-md mb-0 mt-4'>
        <div className='container'>
          <Newsbox filter="leasing" preloaded={false} />
        </div>
      </section>
      {/* ================================= Our Offices ================================= */}
      {/* <section className="slider-testimonials mb-0 mt-0">
        <Testimonials />
      </section> */}
    </>

  )
}

export default rentwithallsoppandallsopp;