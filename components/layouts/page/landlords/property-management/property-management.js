import { useCallback, useEffect, useState } from "react";
import BookValuationForm from "./bookValuation";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import { RiCheckFill } from "react-icons/ri";
import Newsbox from "../../../Sidebar/newsbox";
import GeneralForm from "../../../forms/enquiry/general";
import Link from "next/link";
import Seotags from "../../../../utility/seotags";
function propertyManagement(props) {
  const [readmore, setReadmore] = useState(false);
  const [formActive, setFormActive] = useState('false');
  const [popup, setPopup] = useState(false);
  const formopener = (form) => {
    setFormActive(form);
    setPopup(true);

  }
  const ClosepopupSwitch = async (selected) => {
    setPopup(false)
  }
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setPopup(false)
      //Do whatever when esc is pressed
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
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
          <Link legacyBehavior href="/dubai/landlords/property-management-services-dubai"><a>Property Management Services Dubai</a></Link>
        </div>
      </div>
      {/* ================================= Modules Banner ================================= */}
      <div className="modules_banner" style={{ background: 'url("' + props.pageData.staticPage[0].attributes.featuredImage.data.attributes.url + '")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="container">
          <span>{props.pageData.staticPage[0].attributes.description}</span>
          <h1>{props.pageData.staticPage[0].attributes.MainTitile}</h1>
          <div class="col-12 text-center d-flex mt-4"><a class="mx-auto" href="#packages"> <button class="default_btn min-width-btn backgroundSky align-hd-btn">View Packages</button> </a></div>
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

      {/* ================================= Simple, transparent pricing. ================================= */}
      <section id="packages" className="transparent_pricing pt-5 pb-5">
        <div className="container">
          <h4>Simple, transparent packages</h4>
          <p>

            Our professional property management experts would like to take care of your investment and your tenant.
          </p>
          <div className="pricing_cards">
            <div className="price_card">
              {/* <span>Starter</span> */}
              <h5>Standard<label></label></h5>
              <ul className="pt-4">
                <li><RiCheckFill />Tenant key handover/move-in & move-out</li>
                <li>
                  <RiCheckFill />Rent collection
                </li>
                <li><RiCheckFill />Renewal of tenancy contract</li>
                <li><RiCheckFill />Move-in preparation & inventory</li>
                <li>
                  <RiCheckFill />Registering Ejari
                </li>
                <li><RiCheckFill />Tenant maintenance management<sup>*</sup></li>
              </ul>
              <button className="secondary_btn" onClick={() => formopener('Property Management Standard Plan')}>Get Your Quote</button>
              <p onClick={() => formopener('Property Management Standard Plan')}>*speak to one of our team for more details</p>
            </div>
            <div className="price_card unique_card">
              {/* <span>PREMIUM</span> */}
              <h5>Premium <label></label></h5>
              <ul className="pt-4">
                <li><RiCheckFill />Tenant key handover/move-in & move-out</li>
                <li>
                  <RiCheckFill />Rent collection
                </li>
                <li><RiCheckFill />Renewal of tenancy contract</li>
                <li><RiCheckFill />Move-in preparation & inventory</li>
                <li>
                  <RiCheckFill />Registering Ejari
                </li>
                <li><RiCheckFill />Financial accounting<sup>*</sup></li>
                <li><RiCheckFill />Dispute mediatory resolution & <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; handling of bounced cheques</li>
                <li><RiCheckFill />Power of attorney service<sup>*</sup></li>
              </ul>
              <button className="primary_btn" onClick={() => formopener('Property Management Premium Plan')}>Get Your Quote</button>
              <p onClick={() => formopener('Property Management Premium Plan')}>*speak to one of our team for more details</p>
            </div>
          </div>
        </div>
      </section>
      <div
        className={popup ? "popup active" : "popup notActive"}
      >
        <span
          className="close-button"
          onClick={() => ClosepopupSwitch()}
        >
          x
        </span>
        {formActive == 'video' ? (
          <div className="col-12 row p-0 m-0">
            <div className="popup-video col-12 p-0 m-0">

              <iframe
                src={getYoutubeURL(
                  video,
                  "?ecver=2?autoplay=1"
                )}
              ></iframe>
            </div>
          </div>
        ) :
          <>
            {formActive != 'false' && (
              <div className="form_container bg-transparent">
                <div className="form_content full-form fullwidthforms">
                  <h3>Get your Quote</h3>
                  <p>
                    {/* <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. */}
                  </p>
                  <GeneralForm purpose={formActive} LocationField="true" />
                </div>
              </div>
            )}
          </>
        }
      </div>

      <BookValuationForm title={"Get a quote"} purpose={"Property Management page Get a Quote"} video={false} img={"property-management.jpg"} />
      {/* ================================= Our Offices ================================= */}
      {/* <section className="slider-testimonials mb-0 mt-0">
        <Testimonials />
      </section> */}
      <section className='p-0-md mb-0-md'>
        <div className='container'>
          <Newsbox filter="property-management" preloaded={false} filtertab={false} />
        </div>
      </section>
    </>

  )
}

export default propertyManagement;