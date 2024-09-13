import Link from "next/link";
import React, { Component, useEffect, useState, useCallback } from "react";
import { getYoutubeURL } from "../../../../services/utilsService";
import Seotags from "../../../utility/seotags";
function team(props) {
  const [popup, setPopup] = useState(false);
  const [video, setVideo] = useState(false);
  const [popupType, setPopupType] = useState(false);
  const popupSwitch = async (e, selected) => {
    e.preventDefault()
    setVideo(selected);
    setPopup(!popup)
  }
  const popupSwitchForm = async (e) => {
    e.preventDefault()
    setPopupType('form');
    setVideo(false);
    setPopup(true)
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
  const profileRender = (data) => {
    return (
      // <LazyLoad height={200} offset={100} once scroll>
      <div className="card">
        <div className="media">
          {data.attributes.photo.data != null &&
            <img className="centered-axis-xy" src={data.attributes.photo.data.attributes.url} />
          }
          {data.attributes.profileVideo != null &&
            <i onClick={(e) => popupSwitch(e, data.attributes.profileVideo)} className="fa-solid fa-play" />
          }
        </div>

        <div className="card_body">
          <a className="card_title">{data.attributes.firstName} {data.attributes.LastName} </a>
          <div className="card_desc">{data.attributes.jobTitle}</div>
        </div>
      </div>
      // </LazyLoad>
    );
  }
  return (
    <>
      {props.pageData[0].attributes.SEO != null ?
        <Seotags pageTitle={props.pageData[0].attributes.SEO.pageTitle} metaDescription={props.pageData[0].attributes.SEO.metaDescription}
          index={{
            isIndex: props.pageData[0].attributes.SEO.isIndex,
            isFollow: props.pageData[0].attributes.SEO.isFollow
          }
          }
          image={false} />
        :
        <Seotags pageTitle={"New Developments for sale in Dubai"} metaDescription={props.pageData.staticPage[0].attributes.description} image={false} index={{
          isIndex: true,
          isFollow: true
        }
        } />
      }
      <div className="devider pb-0"></div>
      <div className="container">
        <div className="navigation breadcrumbs">
          <span className="overlay" />
          <Link legacyBehavior href={"/"}><a>Home</a></Link><i className="fa-solid fa-angle-right" />
          <Link legacyBehavior href="/dubai/about-us/our-team"><a>Our Team</a></Link>
        </div>
      </div>
      <div className="devider"></div>
      {/* ================================= Team ================================= */}
      <section className="team mt-4">
        <div className="container">
          <div className="title">
            {/* <span>Our Leadership</span> */}
            <h3>
              Our Leadership
            </h3>
          </div>
          <div className="cards">
            {props.teamData.data.length && (
              <>
                {props.teamData.data
                  .map((filteredPerson) => (
                    <>{profileRender(filteredPerson)}</>
                  ))}
              </>
            )}
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
        {video != false && (
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
        )}
        {popupType == 'form' &&
          <div className="form_container bg-transparent">
            <div className="form_content full-form fullwidthforms">
              <h3>Register Your Interest</h3>
              <p>
                {/* <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. */}
              </p>

              <GeneralForm purpose="Community Interest" />
            </div>

          </div>

        }
      </div>
    </>
  );
}

export default team;
