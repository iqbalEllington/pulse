import Link from "next/link";

function career(props) {
  return (
    <div>
      {/* ================================= Careers ================================= */}
      <div className="careers">
        <div className="breadcrumb container">
          <a href>Home</a>
          <i className="fa-solid fa-angle-right" />
          <a href>About Us</a>
          <i className="fa-solid fa-angle-right" />
          <a href>Careers</a>
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
          We're looking for serial winners who have an entrepreneurial mindset, ambition and a hunger to make money!
        </p>
        <div className="current_job_cards container mt-4">
          {props.jobs.data.length > 0 && (
            <>
              {props.jobs.data.map((value, index) => (
                <>   <div className="current_job_card">
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
                  <Link legacyBehavior href={"/dubai/about-us/careers-at-allsopp-and-allsopp/" + value.id + "-" + value.attributes.jobTitle.split(' ').join('-').replace(".", "-")}>
                    <a>
                      <button className="secondary_btn">View Job Details</button>
                    </a>
                  </Link>

                </div></>
              ))}
            </>
          )}
        </div>
      </div>
      {/* ================================= Frequently Asked Questions ================================= */}
      {/* <div className="frequently_questions container pt-5 pb-5">
        <h4>Frequently Asked Questions</h4>
        {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit
          metus condimentum diam porta, non eleifend enim tempor. Donec sed
          dapibus lorem lipsum.
        </p> */}
        <div className="container frequently_questions_content">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_1">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_1"
                  aria-expanded="true"
                  aria-controls="collapse_1"
                >
                  How do I apply for a position at Allsopp & Allsopp?
                </button>
              </h2>
              <div
                id="collapse_1"
                className="accordion-collapse collapse show"
                aria-labelledby="heading_1"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  All vacancies are updated on the Allsopp & Allsopp website, you can view positions available that are of interest. When sending your CV, include a covering letter, your CV, preferably with digital headshot attached.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_2"
                  aria-expanded="false"
                  aria-controls="collapse_2"
                >
                  Are you recruiting now?
                </button>
              </h2>
              <div
                id="collapse_2"
                className="accordion-collapse collapse"
                aria-labelledby="heading_2"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Yes. We are a company which does not rest on our laurels and we have a clear ambition of being a market leader, so we are always on the lookout for talented sales people to join our sales and lettings teams.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_3"
                  aria-expanded="false"
                  aria-controls="collapse_3"
                >
                  How much will I earn?
                </button>
              </h2>
              <div
                id="collapse_3"
                className="accordion-collapse collapse"
                aria-labelledby="heading_3"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  That depends entirely on you. We provide each candidate with the opportunity to earn limitless amounts of tax-free money for ambitious individuals that thrive in a high-pressure incentive driven environment.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_4">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_4"
                  aria-expanded="false"
                  aria-controls="collapse_4"
                >
                  Do I need previous real estate experience to work at Allsopp
                  &amp; Allsopp?
                </button>
              </h2>
              <div
                id="collapse_4"
                className="accordion-collapse collapse"
                aria-labelledby="heading_4"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  You do not need real estate experience. If you have it, that's great but what we look for more than anything is a friendly, approachable personality and a go-getter attitude - we can teach you the rest!
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_5">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_5"
                  aria-expanded="false"
                  aria-controls="collapse_5"
                >
                  What do you look for in a job applicant?
                </button>
              </h2>
              <div
                id="collapse_5"
                className="accordion-collapse collapse"
                aria-labelledby="heading_4"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  A day at Allsopp & Allsopp is one hundred miles an hour, so working here is not for the faint at heart! We are looking for individuals with personality, drive and ambition.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_6">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_6"
                  aria-expanded="false"
                  aria-controls="collapse_6"
                >
                  I want to move to Dubai, will I need to bring much money?
                </button>
              </h2>
              <div
                id="collapse_6"
                className="accordion-collapse collapse"
                aria-labelledby="heading_6"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Given you are intending to start a new life in a new country, you should be financially independent to make a move overseas so that you not putting yourself under any unnecessary pressure the minute you arrive.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_8">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_8"
                  aria-expanded="false"
                  aria-controls="collapse_8"
                >
                  Do I need to know Dubai inside out?
                </button>
              </h2>
              <div
                id="collapse_8"
                className="accordion-collapse collapse"
                aria-labelledby="heading_8"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  No. Although it is an advantage, it is not essential. You will be placed in a dedicated sales team, which focus on a key geographical area of Dubai for you to focus on, there will be experienced consultants within the team who you can learn from.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_9">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_9"
                  aria-expanded="false"
                  aria-controls="collapse_9"
                >
                  Is there room for growth within the company?
                </button>
              </h2>
              <div
                id="collapse_9"
                className="accordion-collapse collapse"
                aria-labelledby="heading_9"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Allsopp & Allsopp constant expansion programme provides the opportunity for progression in a variety of areas across the company.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_8">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_10"
                  aria-expanded="false"
                  aria-controls="collapse_10"
                >
                  How else am I rewarded for outstanding results?
                </button>
              </h2>
              <div
                id="collapse_10"
                className="accordion-collapse collapse"
                aria-labelledby="heading_10"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  In addition to the lucrative commission structure, Allsopp & Allsopp offer weekly, monthly, quarterly and yearly competitions celebrating consultant's successes, the prizes can vary from an afternoon spa session to having a Lamborghini for the weekend.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_11">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_11"
                  aria-expanded="false"
                  aria-controls="collapse_11"
                >
                  What if I don't want to be a real estate agent?
                </button>
              </h2>
              <div
                id="collapse_11"
                className="accordion-collapse collapse"
                aria-labelledby="heading_11"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  The diversity of our jobs may surprise you. Jobs on offer include: property management jobs, customer service jobs, administrative jobs, marketing jobs, photography jobs, finance jobs and many more.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_12">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_12"
                  aria-expanded="false"
                  aria-controls="collapse_12"
                >
                  What is the typical interview process?
                </button>
              </h2>
              <div
                id="collapse_12"
                className="accordion-collapse collapse"
                aria-labelledby="heading_12"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                Your CV will be short-listed by our recruitment team based upon the criteria we set out for ideal candidates. <br/>

                  <b>Initial Interview</b> - Generally an informal phone call which can last anywhere from 10-45 minutes, which is really a 'get-to know' phone call. Candidate Screening - Subject to the first interview, your application is assessed for review prior to arranging the 2nd Interview. If you are not successful you will receive an email from HR confirming this.
<br/>
                  <b>2nd Interview</b> - Generally with a divisional head who will be your direct line manager, a more formal phone-call which will focus on your experience and skills you have developed in previous roles.
<br/>
                  <b>3rd Interview</b> - On the final phone call, feedback is given on first two interviews and a decision is made on the application, followed up by an email.
<br/>
                  <b>Meeting The Team</b> – We will arrange for you to meet your new team to break the ice before your start date hopefully making the experience less painful.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_13">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_13"
                  aria-expanded="false"
                  aria-controls="collapse_13"
                >
                  Will I need a visa?
                </button>
              </h2>
              <div
                id="collapse_13"
                className="accordion-collapse collapse"
                aria-labelledby="heading_13"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Absolutely, by law a company must sponsor you to order to get a residency visa to be legal to work in Dubai. HR will arrange all of this prior to you joining.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_14">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_14"
                  aria-expanded="false"
                  aria-controls="collapse_14"
                >
                  What documents are required for a visa?
                </button>
              </h2>
              <div
                id="collapse_14"
                className="accordion-collapse collapse"
                aria-labelledby="heading_14"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                 <p> Applicants who come on a visit visa to Dubai need to submit the following documents at the time of joining in order to process their residency visa:
                 </p> <ul>
                    <li>
                      Copy of the passport along with the visit visa stamped page (the passport has to be valid for 12 months)
                    </li>
                    <li>
                      Copy of the UAE Driving License or International Driving License (only those international licenses which can be easily converted to a UAE license are acceptable e.g. UK driving licenses)
                    </li>
                    <li>
                      20 passport-sized head-shot photographs on a white background
                    </li>
                    <li>
                      A reference letter from the previous employer
                    </li>
                    <li>
                      Copy of the accepted resignation letter from the previous company
                    </li>
                  </ul>
                  <p> Applicants who are on their father's or husband's sponsorship need to submit the following documents:</p>
                  <ul>
                    <li>
                    Copy of the passport along with the visa page (the passport has to be valid for 12 months)
                    </li>
                    <li>
                    Copy of the UAE Driving License or International Driving License (only those international licenses which can be easily converted to a UAE license are acceptable e.g. UK driving licenses)
                    </li>
                    <li>
                    20 passport-sized head-shot photographs on a white background

                    </li>
                    <li>
                    A reference letter from the previous employer
                    </li>
                    <li>
                    Copy of the accepted resignation letter from the previous company
                    </li>
                    <li>
                    Copy of the previous medical card
                    </li>
                    <li>
                    Copy of the passport and the visa page of the sponsor
                    </li>
                   
                  </ul>


                  <p> Those applicants who are on previous company sponsorship need to submit the following documents:</p>
                  <ul>
                    <li>
                    Copy of the passport along with the visa page (the passport has to be valid for 12 months)
                    </li>
                    <li>
                    Copy of the UAE Driving License or International Driving License (only those international licenses which can be easily converted to a UAE license are acceptable e.g. UK driving licenses)
                    </li>
                    <li>
                    20 passport-sized head-shot photographs on a white background

                    </li>
                    <li>
                    Reference letter from the previous employers
                    </li>
                    <li>
                    Copy of the accepted resignation letter from the previous company
                    </li>
                    <li>
                    Copy of the previous medical card
                    </li>
                    <li>
                    "No Objection Certificate" (NOC) letter from the previous sponsor in Arabic
                    </li>

                    <li>
                    Copy of the labour card
                    </li>
                    <li>
                    Copy of the immigration card
                    </li>
                    <li>
                    Copy of the trade license of the previous sponsor
                    </li>                   
                  </ul>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_15">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_15"
                  aria-expanded="false"
                  aria-controls="collapse_15"
                >
Is there a probation period, and what is the term?
                </button>
              </h2>
              <div
                id="collapse_15"
                className="accordion-collapse collapse"
                aria-labelledby="heading_15"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                Probation on each employee is for 3-months, with Allsopp & Allsopp reserving the right to extend the probation period by a further 3 months subject to performance.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="heading_8">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse_16"
                  aria-expanded="false"
                  aria-controls="collapse_16"
                >
Will training be provided when I first join?                </button>
              </h2>
              <div
                id="collapse_16"
                className="accordion-collapse collapse"
                aria-labelledby="heading_16"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                Leaving your AC on whilst away in the hotter months will help control humidity and reduce the risk of mold/ damp build up. However, having an AC unit continuously running without being monitored could potentially cause some serious issues, such as overflowing drains, electrical issues and leakages. Our advice would be to service your AC before leaving, or make sure that somebody can frequently check in on your property to check for any issues.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default career;
