import { useEffect, useState } from "react";
import Testimonials from "../../../Sidebar/testimonials";
import BookValuationForm from "../../home/bookValuation";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import { RiCheckFill } from "react-icons/ri";
import Newsbox from "../../../Sidebar/newsbox";
import Link from "next/link";
import Seotags from "../../../../utility/seotags";

function letYourProperty(props) {
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
          <Link legacyBehavior href="/dubai/landlords/let-your-properties-in-dubai"><a>Let Your Properties in Dubai</a></Link>
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
      <BookValuationForm video={false} />



      {/* faq */}
      <div className="transperentacord row">
        <section>
          <div className="container">
            <div className="main_details col-12 col-md-10 mx-auto">
              <div className="price">
                <h2 className="col-12 text-center">Guide to letting your property in Dubai</h2>
                <p className="text-center">Since we opened our doors in 2008, we have moved tens of thousands of families into homes and are involved in thousands of leases each year.
                  We want to share our knowledge and expertise with you to help you find a tenant to take care of your investment and make the process simple for all landlords in Dubai</p>
                <div className="accordion pt-5" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                        Step 1 – Find a reliable broker  </button>
                    </h2>
                    <div id="collapse_1" className="accordion-collapse show" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        It is paramount for you to find an agent who you can trust and build, not only a professional but friendly relationship with. It is so important that you feel you can have an open and honest conversation with your broker.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                        Step 2 - Administration</button>
                    </h2>
                    <div id="collapse_2" className="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Once you have found a broker you would like to work with, it’s important to be aware of the documents needed to lease out your property and to get it listed online as soon as possible. You will need to have the property Title Deed, your passport or Emirates ID and a signed Form A which your broker will give to you and explain what is needed.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                        Step 3 – Do your own due diligence
                      </button>
                    </h2>
                    <div id="collapse_3" className="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p> You have a price you would like to achieve in mind, but is this achievable and realistic in the Dubai property market? Jump on property portals and have a real good look around to compare not only the properties in your area but areas further afield which offer similar properties to your own.
                        </p>
                        <p>
                          Your broker will also share advice and insight into the property market and the area you are looking to rent out your property in Dubai. They will provide you with market appraisals and show you the prices of properties which have recently been let in your area.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_5">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                      Step 4 – Consider going exclusive</button>
                    </h2>
                    <div id="collapse_5" className="accordion-collapse collapse" aria-labelledby="heading_4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Exclusivity with one agent ensures your property is marketed with one message and in one specific way. This will avoid the potential of a multitude of differing adverts of your investment appearing on Dubai property portals, some of which can even display a different asking price than you had agreed with your broker.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_6">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                      Step 5 – Marketing 
                      </button>
                    </h2>
                    <div id="collapse_6" className="accordion-collapse collapse" aria-labelledby="heading_6" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>It is so important to declutter your home before the selling process begins. Your property will be professionally photographed, and you want this to be as clean and attractive as possible. If there are any snagging jobs to be done, we will advise that you complete these before the marketing of your property is commenced.</p>
                     <p>Allsopp & Allsopp put a lot of time and money into the marketing of your property. We can take professional pictures, do 3D tours, selected property video tours which will be boosted on our social media channels. We will conduct dedicated team call out sessions, email and SMS communication with our tenants.</p>
                      </div>
                    </div>
                  </div>


                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_7">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_7" aria-expanded="false" aria-controls="collapse_7">
                      Step 6 – Viewings  </button>
                    </h2>
                    <div id="collapse_7" className="accordion-collapse collapse" aria-labelledby="heading_7" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Again, make sure your property is in the best condition before a potential tenant comes to view. It is a good idea to tell your broker what you love about the property, so they can relay this message to potential tenants and highlight the property’s key features that are perhaps invisible to the naked eye.
                        </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                      Step 7 – Consider Property Management
                      </button>
                    </h2>
                    <div id="collapse_8" className="accordion-collapse collapse" aria-labelledby="heading_8" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>This may be your only investment property in Dubai or you may have a healthy portfolio, either way it would be our pleasure to offer you a helping hand to manage this investment. The Allsopp & Allsopp property management team can take away the stress and strain which may occur when renting out your property and can give you peace of mind that your property will be looked after. Head over to our  <a href="/dubai/landlords/property-management-services-dubai" target="_blank">property management page</a> to find out more.</p>
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_9">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_9" aria-expanded="false" aria-controls="collapse_9">
                      Step 8 – Be Flexible  
</button>
                    </h2>
                    <div id="collapse_9" className="accordion-collapse collapse" aria-labelledby="heading_9" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>When an offer of multiple cheques is brought to the table, please be willing to compromise. Gone are the days where companies will pay rent in one cheque. More often than not, rent is paid by the tenant themselves and you are more likely to get a higher price if you are willing to accept multiple cheques. The majority of properties leased in Allsopp & Allsopp are paid for in multiple cheques.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_10">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_10" aria-expanded="false" aria-controls="collapse_10">
                      Step 9 – Sign on the dotted line 
</button>
                    </h2>
                    <div id="collapse_10" className="accordion-collapse collapse" aria-labelledby="heading_10" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>You have received an offer that you’re ready to accept. It is now time to check everything over and sign! Be sure to ask your broker if there is a certain part of the contract which you need to get clarification on.</p>
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
      <section className='p-0-md mb-0-md mt-4'>
        <div className='container'>
          <Newsbox filter="leasing" preloaded={false} />
        </div>
      </section>
      {/* ================================= Our Offices ================================= */}
      {/* <section className="slider-testimonials mb-0">
        <Testimonials />
      </section> */}
    </>

  )
}

export default letYourProperty;