import { useEffect, useState } from "react";
import Testimonials from "../../../Sidebar/testimonials";
import BookValuationForm from "../../home/bookValuation";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import Newsbox from "../../../Sidebar/newsbox";
function sellYourProperty(props) {
  const [readmore, setReadmore] = useState(false)
  return (

    <>
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
      <BookValuationForm />




      {/* faq */}
      <div className="transperentacord row">
        <section>
          <div className="container">
            <div className="main_details col-12 col-md-10 mx-auto">
              <div className="price">
                <h2 className="col-12 text-center">Guide to sell your property in Dubai</h2>
                <p className="text-center">We have created a simple step by step guide to  <a href="/dubai/book-valuation" target="_blank"> selling an apartment or villa in Dubai </a> for the first time to ease the process and put your mind at rest.</p>
                <div className="accordion pt-4" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                        Step 1 – Find a reliable broker  </button>
                    </h2>
                    <div id="collapse_1" className="accordion-collapse show" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          It is paramount for you to find an agent who you can trust and build, not only a professional but friendly relationship with. It is so important that you feel you can have an open and honest conversation with your agent.

                        </p>
                        <p>

                          They will share advice and insight into the Dubai property market and the area you are selling in. They will provide you with market appraisals and show you the prices of properties which have recently sold.

                        </p>                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                        Step 2 – Do your own due diligence</button>
                    </h2>
                    <div id="collapse_2" className="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        In your mind, you already have a price you are willing to sell at but is this achievable and realistic in the Dubai property market? Jump on property portals and have a real good look around to compare your property to those that have sold in your area. Perhaps it would be helpful to look at similar properties in other areas and see what buyers can get for the sale price you have in mind for your own property. Market price indexes will be sent to you on a monthly basis, so you are aware of what is selling in your area and for what price.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                        Step 3 – Consider going exclusive
                      </button>
                    </h2>
                    <div id="collapse_3" className="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          Exclusivity with one Dubai real estate broker ensures your property is marketed with one message and in one specific way. This will avoid the potential of a multitude of differing adverts of your property, some of which can even display a different asking price than you had agreed with your broker.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_5">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                        Step 4 – Marketing</button>
                    </h2>
                    <div id="collapse_5" className="accordion-collapse collapse" aria-labelledby="heading_4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>
                          It is so important to declutter your home before the selling process begins. Your property will be professionally photographed, and you want this to be as clean and attractive as possible. If there are any snagging jobs to be done, we will advise that you complete these before the marketing of your property is commenced.
                        </p>
                        <p>
                          Allsopp & Allsopp put a lot of time and money into the marketing of your property. We can take professional pictures, do 3D tours and selected property video tours which will be boosted on our social media channels. We will conduct dedicated team call out sessions, email and SMS communication with our buyers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_6">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                      Step 5 – Viewings</button>
                    </h2>
                    <div id="collapse_6" className="accordion-collapse collapse" aria-labelledby="heading_6" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Again, make sure your property is in the best condition before a potential buyer comes to view. We advise you to share property highlights with your broker. Tell them what it is that you love about the home! Perhaps it’s the sunset view from the balcony or the sunrise over your garden whilst you’re drinking your morning coffee. Our brokers can relay this message to potential buyers and point out aspects that are not obvious to the naked eye but could be a swaying point for a buyer.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                        Step 6 – Negotiation and contract signing
                      </button>
                    </h2>
                    <div id="collapse_8" className="accordion-collapse collapse" aria-labelledby="heading_8" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>An MOU is the first stage in the formation of a formal contract. It is a nonbinding agreement between the seller and buyer in Dubai outlining the terms and details of an understanding, including each parties' requirements and responsibilities. Your broker will run through this with you to ensure you are happy to go ahead before moving onto the transfer stage of the sale and make you aware of your requirements and responsibilities.</p>
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
                        <p>The Allsopp & Allsopp in-house sales progression team will be with you every step of the way to ease you through the sale process and make it as seamless as possible from the No Objections Certificate (NOC) from the developer right through to the transfer.  They coordinate between you as a seller, the buyer, the developer and the banks involved and with all the experience they have gathered over the years they are extremely proactive and know the process inside out.  Your sales progressor will make sure all of your documents are in order before beginning the process in order to avoid delays.</p>
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

export default sellYourProperty;