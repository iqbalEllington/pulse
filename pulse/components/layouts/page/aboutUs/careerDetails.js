import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai"
import { RiShareLine, RiPrinterLine } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import CareerApplication from "../../forms/career/careerApplication";
import React, { useCallback, useEffect, useState } from 'react';
import Sharebuttons from "../../Sidebar/sharebuttons";
import Link from "next/link";
import rehypeRaw from "rehype-raw";
import Seotags from "../../../utility/seotags";
function careeDetails(props) {
  const ClosepopupSwitch = async (e) => {

    if (e.target.getAttribute("data-closepop") == 'true') {
      setPopup(false);
    }
  };
  const [share, setShare] = useState(true)
  const popupSwitch = async (type) => {
    setPopup(type);
  };
  const [popup, setPopup] = useState(false);
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setPopup(false)
    }
  }, []);
  const nextline = (content)=>{
    var newContent = content.replace(/\n/g, "<br/>");
    return newContent
  }
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div>
       {props.job.data.attributes.SEO != null ?
        <Seotags pageTitle={props.job.data.attributes.SEO.pageTitle} metaDescription={props.job.data.attributes.SEO.metaDescription} image={false} />
        :
        <Seotags pageTitle={props.job.data.attributes.jobTitle} metaDescription={props.job.data.attributes.jobTitle} image={false} />
      }
      <div className="careers">
        <div className="container">
          <div className="navigation breadcrumbs">
            <span className="overlay" />
            <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
            <Link legacyBehavior href="/dubai/about-us/careers-at-allsopp-and-allsopp"><a>Career</a></Link><i className="fa-solid fa-angle-right" />
            <Link legacyBehavior href={"#"}><a>{props.job.data.attributes.jobTitle}</a></Link>
          </div>
        </div>
      </div>
      {/* ================================= Sales Progression Officer ================================= */}
      <div className="sales_progression container">
        <h3>{props.job.data.attributes.jobTitle}</h3>
        <div>
          <div>
            <AiOutlineCalendar /> {moment(props.job.data.attributes.activate).format('dddd DD MMMM YYYY')}
          </div>
          <div onClick={() => setShare(!share)}><RiShareLine />Share Job</div>
          {/* <Sharebuttons showShare={share}/> */}
        </div>
      </div>
      <div className="sales_progression_container container mt-4">
        <div className="sales_progression_detail">
          <>
            {props.job.data.attributes.description.split("\n")
              .map((item, key) => {
                return (
                  <ReactMarkdown className="rounded-frame" rehypePlugins={[rehypeRaw]} children={item}
                    escapeHtml={true} />
                )
              })
            }
          </>
        </div>
        <div className="sales_progression_details_agent_content">
          <div className="btns">
            <div className="btns_container">
              <button className="primary_btn" onClick={() =>
                popupSwitch("CareerApplication")
              }>Apply for this Job</button>
              {/* <button onClick={() =>
                popupSwitch("CareerApplication")
              } className="secondary_btn">Send us your CV</button> */}
            </div>
            <Sharebuttons showShare={true} />

            <div className="share">
              <button><RiShareLine />Share</button>
            </div>
          </div>

          {/* {props.job.data.attributes.team_profiles.data.length > 0 &&
            <>
              <div className="agent_name_avatar">
                <div className="agent_name">
                  <h5>{props.job.data.attributes.team_profiles.data[0].attributes.firstName + " " + props.job.data.attributes.team_profiles.data[0].attributes.LastName}</h5>
                  <span>{props.job.data.attributes.team_profiles.data[0].attributes.role}</span>
                  <div className="agent_contact">
                    <a href={"https://wa.me/" +props.job.data.attributes.team_profiles.data[0].attributes.whatsapp}>
                      <img style={{ width: "20px", "marginRight": '10px' }} src="/icons/whatsApp.svg" uk-svg alt="" />
                      <span className="agent_name">WhatsApp</span>
                    </a>
                    <span className="line" />
                    <a href={"tel:" + props.job.data.attributes.team_profiles.data[0].attributes.phone}>
                      <img style={{ width: "20px", "marginRight": '10px' }} src="/icons/phone.svg" uk-svg alt="" />
                      <span className="agent_name">Call Us</span>
                    </a>
                  </div>
                </div>
                <img src={
                  process.env.NEXT_PUBLIC_S3 +
                  "public/teamProfile/" + props.job.data.attributes.team_profiles.data[0].attributes.salesforceUserId + ".jpg"
                } alt="" />
              </div>
            </>
          } */}

        </div>
      </div>
      <div className={popup != false ? "popup active" : "popup notActive"}>
        <span className="close-button" data-closepop={true} onClick={(e) => ClosepopupSwitch(e)}>
          x
        </span>
        {popup == "CareerApplication" &&
          <>
            <div className="col-12 row">
              <div className="col-12 BookValuation-popup">
                <div className="form_container" data-closepop={true} onClick={(e) => ClosepopupSwitch(e)}>
                  <div className="form_content full-form fullwidthforms">
                    <h3>Apply for this Job</h3>
                    <p>
                      {/* <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. */}
                    </p>
                    <CareerApplication jobId={props.job.data.id} title={props.job.data.attributes.jobTitle} />
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        {popup == "resume" &&
          <>
            <CareerApplication jobId={props.job.data.id} />
          </>
        }
      </div>
    </div>
  )
}
export default careeDetails;
