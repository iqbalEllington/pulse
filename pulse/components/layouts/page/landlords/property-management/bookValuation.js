import React, { useState } from 'react';
import { getYoutubeURL } from '../../../../../services/utilsService';
import GeneralForm from '../../../forms/enquiry/general';
function BookValuationForm(props) {
  const [playVideo, setPlayVideo] = useState(false);
  return (

    //   {/* ================================= Book a Valuation Section ================================= */}
    <section>
      <div className='container'>

        <div className='book_valuation'>
          <div className='col-12'>
            <div className='text-center home-book-valuation section-title pb-4'>
              <h2 className='pb-4'>{props.title}</h2>
              <p className='col-md-7 col-11 mx-auto'>
                {/* <span>We have a waitlist of clients ready to view properties, extensive comparable community data and a trusted reputation. </span>Just three of the reasons why people choose us. */}
              </p>
            </div>
          </div>
          <div className='home-book-val'>
            <div className='formValuation home-book-valuation'>
              <GeneralForm LocationField="true" purpose={props.purpose} />
            </div>
            <div className='book_valuation-video'>
              <img onClick={() => setPlayVideo(true)} src={"/images/banners/"+props.img} className='centered-axis-xy col-12' scrolling="no" frameBorder={0} />
              {props.video != false &&
                <>
                  <i onClick={() => setPlayVideo(true)} className="play_BTN fa-solid fa-play" />
                  {playVideo == true &&
                    <iframe
                      src={getYoutubeURL(
                        props.video, '?ecver=2&autoplay=1&mute=1&listType=playlist&rel=0&modestbranding=0'
                      )}
                    ></iframe>
                  }
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookValuationForm;