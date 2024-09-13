import Link from 'next/link';
import React from 'react';
import PropertySlider from './propertySlider';
import { DATE_DSC } from '../../../services/constant';
function Furtherafar(props) {
  return (

    <div className="coming_soon">
      <div className="title">
        <div className="title_content container">
          <div className='align-padding'>
            {props.searchType == "sales" ?
              <>
                <h2>Just Sold</h2>
                <p>
                  Get a grasp of the market with these recently sold properties.
                </p>
              </> :
              <>
                <h2>Just rented</h2>
                <p>
                  Get a grasp of the market with these recently rented properties.
                </p></>
            }
          </div>
        </div>
      </div>
      <div className='col-12 pt-4'>
        <PropertySlider slider="sold" sort={DATE_DSC} type={props.searchType} filter={{
          key: ["status"],
          value: ["transferred"]
        }} />
      </div>
    </div>
  );
}

export default Furtherafar;