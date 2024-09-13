import React, { Component } from "react";
import GeneralForm from "../../forms/enquiry/general";
// import BookValuationForm from "../../forms/bookvaluation/bookaaluationForm";
class GeneralForms extends Component {
  render() {
    return (
      <>
         <div className="form_container">
            <div className="form_content full-form">
                <h3>Contact Us</h3>
                <p>
                    <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit.
                </p>

        <GeneralForm purpose="gcontact Us Form"/>
        </div>

        </div>
      </>
    )
  }
}



export default GeneralForms;
