import Link from 'next/link';
import React from 'react';
import { DATE_DSC } from '../../../services/constant';
import { connect } from "react-redux";

import PropertySlider from './propertySlider';
function ComingSoon(props) {
  return (
    <>
      {props.slidesData.indexOf("comingToMarket") === -1 &&
        <div className="coming_soon">
          <div className="title">
            <div className="title_content container">
              <div className='align-padding'>
                <h2>Coming to Market</h2>
                <p>
                  Get ahead of the market - register interest against
                  properties currently being valued.
                </p>
              </div>
            </div>
          </div>
          <div className='col-12 pt-4'>
            <PropertySlider slider="comingToMarket" sort={DATE_DSC} type={props.searchType} filter={{
              key: ["status"],
              value: ["coming-to-market"]
            }} />
          </div>
        </div>
      }
    </>
  );
}
function mapStateToProps(state) {
  return {
    slidesData: state.searchReducer.slidesData,
  };
}
export default connect(mapStateToProps)(ComingSoon);