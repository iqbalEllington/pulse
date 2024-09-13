import Link from "next/link";
import Seotags from "../../../utility/seotags";
import Awards from "../../Sidebar/awards";
import Careerbox from "../../Sidebar/careerBox";
import OfficesSlider from "../../Sidebar/officeSlider";
import Teams from "../../Sidebar/Teams";
import Testimonials from "../../Sidebar/testimonials";
import Services from "./services";

function allsoppandallsopp(props) {
    return (
        <div>
            {props.data.SEO[0]!=null && props.data.SEO[0].attributes.SEO != null ?
                <Seotags pageTitle={props.data.SEO[0].attributes.SEO.pageTitle} metaDescription={props.data.SEO[0].attributes.SEO.metaDescription} image={'/images/banners/about-allsopp-allsopp.jpeg'} />
                :
                <Seotags pageTitle={"Our Services"} metaDescription={"We lead the industry with professional excellence, superior customer service, tight regulatory focus, investment in the best resources and cutting-edge tech. Industry leaders with professional excellence"} image={'/images/banners/about-allsopp-allsopp.jpeg'} />
            }
            <div className="devider pb-0"></div>
            {/* ================================= Careers ================================= */}
            <div className="container">
                <div className="navigation breadcrumbs">
                    <span className="overlay" />
                    <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
                    <Link legacyBehavior href="/dubai/about-us/our-services"><a>Our Services</a></Link>
                </div>
            </div>
            {/* ================================= Landing ================================= */}
            <div className="landing_section" style={{ backgroundImage: 'url("/images/banners/about-allsopp-allsopp.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <div className="container text-center">
                    <h1 className="h2">Our Services</h1> <br />
                    <span className="col-12 text-normal">We lead the industry with professional excellence, superior customer service, tight regulatory focus, investment in the best resources and cutting-edge tech.</span>
                    <h2>Industry leaders with professional excellence.</h2>
                </div>
            </div>
            {/* ================================= Our History ================================= */}
            {props.data.services.length > 0 != null &&
                <section className="services">
                    <Services services={props.data.services} />
                </section>
            }
            {/* ================================= Our offices ================================= */}
            <div className="our_offices">
                <div className="container">
                    <h4>Our Offices</h4>
                    <div className="container uk-slider-container-offset our_offices_slider" >
                        <OfficesSlider />
                        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin slider_nav" />
                    </div>
                </div>
            </div>
            {/* ================================= Current Job Openings ================================= */}
            <div className="current_job">
                <div className="container">
                    <div className="section-title">

                        <h4>Careers at Allsopp &amp; Allsopp</h4>
                        <p>
                            We're looking for serial winners who have an entrepreneurial mindset, ambition and a hunger to make money!
                        </p>
                    </div>
                    <div>
                        <Careerbox />
                    </div>
                </div>
            </div>
            {/* ================================= Team ================================= */}

            <section>
                <div className="team container">
                    <h3>Meet our people</h3>
                    <Teams filter="management" />
                    <div className="col-12 text-center d-flex">
                        <Link legacyBehavior href={'/dubai/about-us/our-team'}><a className="mx-auto"> <button className="primary_btn property_btn align-hd-btn">View All</button> </a></Link>
                    </div>
                </div>
            </section>
            {/* ================================= Latest Awards ================================= */}
            {props.data.awards.length > 0 &&
                <section className="slider-testimonials mb-0">
                    <Awards awards={props.data.awards} />
                </section>
            }
            {/* <section className="slider-testimonials mb-0">
                <Awards />
            </section> */}
            {/* ================================= Customer Reviews ================================= */}
            {/* <section className="slider-testimonials mt-0 mb-0">
                <Testimonials />
            </section> */}
        </div>
    )
}
export default allsoppandallsopp;