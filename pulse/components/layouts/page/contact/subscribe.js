import React, { Component } from "react";
import Seotags from "../../../utility/seotags";
import GeneralForm from "../../forms/enquiry/general";
// import BookValuationForm from "../../forms/bookvaluation/bookaaluationForm";
class Subscribe extends Component {
  render() {
    return (
      <>
      <Seotags pageTitle={"Subscribe | Allsopp & Allsopp"} metaDescription={"Be in the know of everything real estate today"} image={false} />
         <div className="form_container">
            <div className="form_content full-form fullwidthforms">
                <h3>Subscribe</h3>
                {/* <p>
                    <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit.
                </p> */}

        <GeneralForm purpose ="subscribe"/>
        </div>

        </div>
      </>
    )
  }
}



export default Subscribe;
