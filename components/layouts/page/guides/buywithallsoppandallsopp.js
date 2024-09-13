import { useEffect, useState } from "react";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import Newsbox from "../../Sidebar/newsbox";
import Infobarbuy from "./infobarbuy";
import Link from "next/link";
import Seotags from "../../../utility/seotags";

function buywithallsoppandallsopp(props) {
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
          <Link legacyBehavior href="/dubai/guides/buy-with-allsopp-and-allsopp"><a>Buy With Allsopp and Allsopp</a></Link>
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
      <Infobarbuy />




      {/* faq */}
      <div className="transperentacord row">
        <section className="mt-0">
          <div className="container">
            <div className="main_details col-12 col-md-10 mx-auto">
              <div className="price">
                <h2 className="col-12 text-center">Guide to buying a property in Dubai</h2>
                <p className="text-center">
                  Buy a property in Dubai with the expertise and knowledge of Dubai Land Department’s Most Active Agency; Allsopp & Allsopp of 2020 on your side.
                  It is so important to work with a brokerage you can trust and who will support you and guide you through the entire process. Allsopp & Allsopp will become your house buying ally.
                  Here is a simple step by step guide to buying an apartment or a villa in Dubai.
                </p>

                <div className="accordion pt-4" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                        Step 1 – Get your finances in place</button>
                    </h2>
                    <div id="collapse_1" className="accordion-collapse show" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          So many of us are guilty of starting the buying process by browsing through properties advertised online only to end up disheartened when your dream home is way out of budget. Keep in mind that the deposit is not the only fee that you need to think about; there are transfer fees, agency fees, sales progression fees, mortgage arrangement fees and mortgage insurance fees.
                        </p>
                        <p>

                          We advise you to speak to a mortgage advisor to get all the information you need – they are experts in their field and can talk you through all costs involved in <a href="/dubai/properties/residential/sales" target="_blank">buying your first property in Dubai</a>. Allsopp & Allsopp have an in-house <a href="/dubai/properties/mortgages" target="_blank">mortgages</a> team ready and waiting to take your call.

                        </p>                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                        Step 2 – Choose a list of essential property features
                      </button>
                    </h2>
                    <div id="collapse_2" className="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Now you have a budget in mind you can start to make a list of must-have property features such as the number of bedrooms required, the driving distance to a school or a workplace or whether you prefer a villa or an apartment. Be prepared to compromise! It is very rare that a property will tick every box so put this list in order of importance.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                        Step 3 – Understand the buying process in Dubai
                      </button>
                    </h2>
                    <div id="collapse_3" className="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>

                          It is imperative that you get your broker to talk you through the entire sale process in Dubai from start to finish; From how to make an offer, the negotiation process, the paperwork required, the NOC, transfer appointments and the handover. You are about to take a very large leap and spend possibly the most money you have ever spent so it is time to do as much due diligence as possible and ask every single question that pops into your head.
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
                        <p>During the viewing process, keep an open mind and don’t rule out a property because of one factor – your broker may be able to come up with a solution. It is often difficult to see past a décor that is not your style, but it is important that you don’t focus too much on things that can easily be changed. Buying a property is a huge step so be sure to ask as your broker as many questions as you need to – they will be happy to oblige.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_6">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                        Step 5 – Make an Offer</button>
                    </h2>
                    <div id="collapse_6" className="accordion-collapse collapse" aria-labelledby="heading_6" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Once you have found a property to buy, make a decision on what you would like to offer. Put the offer to your broker and they will start the negotiating process with the seller. This is the most nerve-racking time, but your Allsopp & Allsopp broker has it under control and will keep you updated imminently with every advance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                        Step 6 – Sign the Agreement of Sale
                      </button>
                    </h2>
                    <div id="collapse_8" className="accordion-collapse collapse" aria-labelledby="heading_8" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>The Agreement of Sale  is the first stage in the formation of a formal contract. It is a binding agreement between the buyer and seller outlining the terms and details of an understanding, including each parties' requirements and responsibilities. Your broker will run through this with you to ensure you are happy to go ahead before moving onto the transfer stage of the sale.  The agent will create a Unified Form F which is generated from the DLD REST App by the broker. This is a form of contract that is registered with the DLD. </p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_9">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_9" aria-expanded="false" aria-controls="collapse_9">
                        Step 7 – Sale Progression
                      </button>
                    </h2>
                    <div id="collapse_9" className="accordion-collapse collapse" aria-labelledby="heading_9" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>The Allsopp & Allsopp in-house sales progression team will be with you every step of the way to ease you through the sale process and make it as seamless as possible from the No Objections Certificate (NOC) from the developer through to the transfer. They coordinate between you as a buyer, the seller, the developer and the banks involved and with all the experience they have gathered over the years they are extremely proactive and know the process inside out. Your sales progressor will make sure all of your documents are in order before beginning the process in order to avoid delays.</p>
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
          <Newsbox filter="sales" preloaded={false} />
        </div>
      </section>
      {/* ================================= Our Offices ================================= */}
      {/* <section className="slider-testimonials mb-0 mt-0">
        <Testimonials />
      </section> */}
    </>

  )
}

export default buywithallsoppandallsopp;