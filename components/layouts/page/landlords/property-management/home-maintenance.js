import { useCallback,useEffect, useState } from "react";
// import Testimonials from "../../../Sidebar/testimonials";
import BookValuationForm from "./bookValuation";
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from "react-markdown";
import { RiCheckFill } from "react-icons/ri";
import GeneralForm from "../../../forms/enquiry/general";
import Newsbox from "../../../Sidebar/newsbox";
import Link from "next/link";
import Seotags from "../../../../utility/seotags";
function HomeMaintenance(props) {
  const [readmore, setReadmore] = useState(false)
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
      {/* ================================= Careers ================================= */}
      <div className="container">
        <div className="navigation breadcrumbs">
          <span className="overlay" />
          <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
          <Link legacyBehavior href="/dubai/landlords/home-maintenance-services-dubai"><a>Home Maintenance</a></Link>
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
      <div className="transparent_pricing" id="packages">
        <div className="container py-5">
          
          <h4>Do You Want the Peace of Mind of an Annual Maintenance Contract?</h4>
          <p>
            Take your pick from any of our 3 maintenance packages and we’ll do the rest.
          </p>
          <div className="pricing_cards">
            <div className="price_card">
              <span>Essentials</span>
              <div className="col-12 color-blue">Package Starts From</div>
              <h5>AED 1,350 <label>/ month</label></h5>
              <ul className="pt-4">
                <li><RiCheckFill />2 x AC services per year</li>
                <li>
                  <RiCheckFill />2 x Electrical check ups per year
                </li>
                <li><RiCheckFill />2 x Electrical check ups per year</li>
                <li><RiCheckFill />Discounted manpower & parts</li>
                <li>
                  <RiCheckFill />Free basic consumables
                </li>
                <li><RiCheckFill />Unlimited call outs</li>
              </ul>
              <button className="secondary_btn" onClick={() => formopener('Home maintenance essentials package')}>Get Your Quote</button>
            </div>
            <div className="price_card">
              <span>Maintainer</span>
              <div className="col-12 color-blue">Package Starts From</div>
              <h5>AED 1,755 <label>/ month</label></h5>
              <ul className="pt-4">
                <li><RiCheckFill />2 x AC services per year</li>
                <li>
                  <RiCheckFill />2 x Electrical check ups per year
                </li>
                <li><RiCheckFill />2 x Electrical check ups per year</li>
                <li><RiCheckFill />Discounted manpower & parts</li>
                <li>
                  <RiCheckFill />Free basic consumables
                </li>
                <li><RiCheckFill />Carpentry & aluminium repairs</li>
                <li><RiCheckFill />Civil & masonry repairs</li>
              </ul>
              <button className="secondary_btn" onClick={() => formopener('Home maintenance maintainer package')}>Get Your Quote</button>
            </div>
            <div className="price_card">
              <span>Ultimate</span>
              <div className="col-12 color-blue">Package Starts From</div>
              <h5>AED 2,281 <label>/ month</label></h5>
              <ul className="pt-4">
                <li>
                  <RiCheckFill />2 x Electrical check ups per year
                </li>
                <li><RiCheckFill />2 x Electrical check ups per year</li>
                <li><RiCheckFill />Discounted manpower & parts</li>
                <li>
                  <RiCheckFill />Free basic consumables
                </li>
                <li><RiCheckFill />Carpentry & aluminium repairs</li>
                <li><RiCheckFill />Civil & masonry repairs</li>
                <li><RiCheckFill />Free minor spare parts</li>
                <li><RiCheckFill />Hot water heater servicing, solar heater panel cleaning</li>
                <li><RiCheckFill />Mold or fungus treatments</li>
                <li><RiCheckFill />External light cleaning</li>
                <li><RiCheckFill />Booster pump servicing</li>
              </ul>
              <button className="secondary_btn" onClick={() => formopener('Home maintenance ultimate package')}>Get Your Quote</button>
            </div>
          </div>
        </div>
      </div>
      {/* faq */}
      <div className="transperentacord row">
        <section>
          <div className="container">
            <div className="main_details col-12 col-md-10 mx-auto">
              <div className="price">
                <h2 className="col-12 text-center">Frequently Asked Questions</h2>
                <div className="accordion pt-5" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                        Why should I take an annual maintenance contract?
                      </button>
                    </h2>
                    <div id="collapse_1" className="accordion-collapse collapse show" aria-labelledby="heading_1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Your property is your greatest asset, this asset needs to be looked after. Theres no better way to ensure longevity and increased asset lifespan than frequent planned preventative maintenance.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                        How can an annual maintenance contract save me money?
                      </button>
                    </h2>
                    <div id="collapse_2" className="accordion-collapse collapse" aria-labelledby="heading_2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        All mechanical, electrical and plumbing assets have a lifespan-to achieve that lifespan they must be carefully maintained.
                        Without looking after these assets they will require replacing well before the end of their lifespan. Frequent maintenance can save a fortune in replacement costs.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_3">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                        How can an annual maintenance contract benefit my tennant?
                      </button>
                    </h2>
                    <div id="collapse_3" className="accordion-collapse collapse" aria-labelledby="heading_3" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        An annual maintenance contract not only ensures the property is looked after, it provides your tenant with a trusted point of contact in the event of a maintenance related emergency.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_4">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                        My property is new, does it need maintaining?
                      </button>
                    </h2>
                    <div id="collapse_4" className="accordion-collapse collapse" aria-labelledby="heading_4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Absolutely. Ensuring the asset is in the best condition it can be from day one will pay dividends in the future.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_5">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                        How often should I service my AC?
                      </button>
                    </h2>
                    <div id="collapse_5" className="accordion-collapse collapse" aria-labelledby="heading_4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        At least once every 3 to 6 months. Dusty conditions in Dubai can accelerate the build up of dust in your AC unit so it's important to take care of the unit before blockages occur.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_6">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                        I dont have maintenance issues in my home, why should I maintain it?
                      </button>
                    </h2>
                    <div id="collapse_6" className="accordion-collapse collapse" aria-labelledby="heading_6" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Unfortunately, if it's left at some point your property will have issues. Our advice is that prevention is better than, and cheaper than, the cure.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_7">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_7" aria-expanded="false" aria-controls="collapse_7">
                        How do I know how many AC units I have in my property?
                      </button>
                    </h2>
                    <div id="collapse_7" className="accordion-collapse collapse" aria-labelledby="heading_7" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        You can tell how many units you have by counting the number of thermostats in the property.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_8">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                        Should I leave my AC on while I go on holiday?
                      </button>
                    </h2>
                    <div id="collapse_8" className="accordion-collapse collapse" aria-labelledby="heading_8" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      Leaving your AC on whilst away in the hotter months will help control humidity and reduce the risk of mold/ damp build up. However, having an AC unit continuously running without being monitored could potentially cause some serious issues, such as overflowing drains, electrical issues and leakages. Our advice would be to service your AC before leaving, or make sure that somebody can frequently check in on your property to check for any issues.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_9">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_9" aria-expanded="false" aria-controls="collapse_9">
                        I have AC units we infrequently use, should they still be serviced regularly?
                      </button>
                    </h2>
                    <div id="collapse_9" className="accordion-collapse collapse" aria-labelledby="heading_9" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Yes. We strongly suggest all AC units in the property are serviced at the same time. Dust will still get into unused AC units regardless of their usage, this can cause blockages and electrical faults.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading_10">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_10" aria-expanded="false" aria-controls="collapse_10">
                        How can I ensure the mechanical, electrical and plumbing systems in my property last as long as possible?
                      </button>
                    </h2>
                    <div id="collapse_10" className="accordion-collapse collapse" aria-labelledby="heading_10" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                      The simple answer is planned preventative maintenance via an annual maintenance contract. The best way to ensure the optimum lifespans of your assets are met is through regularly conducted maintenance conducted by professionals.
                      </div>
                    </div>
                  </div>
                </div>
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
                  <GeneralForm purpose={formActive} />
                </div>
              </div>
            )}
          </>
        }
      </div>


      </div>

      <BookValuationForm title={"Get Your Quote"} purpose={"Home maintenance page Get Your Quote"} video={"https://www.youtube.com/watch?v=a9-8eEbW6gc"} img={"homemaintanance.jpg"}/>

      <section className='p-0-md mb-0-md'>
             <div className='container'>
               <Newsbox filter="property-management" preloaded={false} />
             </div>
           </section>





      {/* ================================= Our Offices ================================= */}
      {/* <section className="slider-testimonials mb-0">
        <Testimonials />
      </section> */}

    </>

  )
}

export default HomeMaintenance;