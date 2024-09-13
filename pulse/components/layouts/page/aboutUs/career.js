import Link from "next/link";
import Seotags from "../../../utility/seotags";
function career(props) {
  return (
    <>
      {props.pageData != "" && props.pageData[0].attributes.SEO != null ?
        <Seotags pageTitle={props.pageData[0].attributes.SEO.pageTitle} metaDescription={props.pageData[0].attributes.SEO.metaDescription}
          index={{
            isIndex: props.pageData[0].attributes.SEO.isIndex,
            isFollow: props.pageData[0].attributes.SEO.isFollow
          }
          }
          image={false} />
        :
        <Seotags pageTitle={"Allsopp and Allsopp Careers"} metaDescription="Allsopp and Allsopp Careers" image={false} index={{
          isIndex: true,
          isFollow: true
        }
        } />
      }
      <div>
        {/* ================================= Careers ================================= */}
        <div className="devider pb-0"></div>
        <div className="container">
          <div className="navigation breadcrumbs">
            <span className="overlay" />
            <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
            <Link legacyBehavior href="/dubai/about-us/careers-at-allsopp-and-allsopp"><a>Careers at Allsopp & Allsopp</a></Link>
          </div>
        </div>
        {/* ================================= Landing ================================= */}
        <div
          className="landing_section"
          style={{
            backgroundImage: 'url("/images/banners/career.jpg")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          <span>Join us</span>
          <h2>Careers at Allsopp &amp; Allsopp</h2>
        </div>
        {/* ================================= Current Job Openings ================================= */}
        <div className="current_job">
          <h4>Current Job Openings</h4>
          <p>
            We're looking for ambitious individuals that thrive in a high-pressure, incentive driven environment and we provide such candidates with the opportunity to earn almost limitless amounts of tax-free money.
          </p>
          <div className="current_job_cards container mt-4">
            {props.jobs.data.length > 0 && (
              <>
                {props.jobs.data.map((value, index) => (
                  <>
                    <Link legacyBehavior href={"/dubai/about-us/careers-at-allsopp-and-allsopp/" + value.id + "-" + encodeURIComponent(value.attributes.jobTitle.split(' ').join('-').replace(".", "-"))}>
                      <a className="no-anger-style">
                        <div className="current_job_card">
                          <h5>{value.attributes.jobTitle}</h5>
                          <div>
                            <img src="/images/icons/money.svg" uk-svg alt="" />
                            {value.attributes.salaryText}
                          </div>
                          <div>
                            <img src="/images/icons/clockIcon.svg" uk-svg alt="" />
                            {value.attributes.type}
                          </div>
                          <div>
                            <img src="/images/icons/location.svg" uk-svg alt="" />
                            {value.attributes.location}
                          </div>
                          <button className="secondary_btn">View Job Details</button>
                        </div>
                      </a>
                    </Link></>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="devider pb-0 mb-0"> </div>
      </div>
    </>
  );
}
export default career;
