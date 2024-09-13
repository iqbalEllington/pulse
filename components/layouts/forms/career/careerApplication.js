import Link from 'next/link';
import React, { useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

import CMSService from '../../../../services/CMSService';
const CMSServices = new CMSService();
function CareerApplication(props) {
    const [inputField, setInputField] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Location: '',
        date: false,
        resume: '',
        time: false,
        mobileCountry: "",
        mobileCountryName: "",
        Message: '',
        Linkedin: '',
        Job: props.jobId,
    })
    const [eroorField, setInputError] = useState({
        Name: false,
        Email: false,
        Mobile: false,
        Location: false,
        resume: false,
        date: false,
        time: false,
        mobileCountry: false,
        mobileCountryName: false,
        Message: false,
    })
    const [formStatus, setFormStatus] = useState(false);
    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const inputsHandlerFile = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: e.target.files[0],
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputField.Mobile.length < 7) {
            setInputError((prevState) => ({
                ...prevState,
                ['Mobile']: true,
            }));
        } else {
            setInputError((prevState) => ({
                ...prevState,
                ['Mobile']: false,
            }));
            var result = await CMSServices.submitFormsWithFIle(inputField, "career", props.jobId)
            if (result.status == 200) {
                setFormStatus(true)
            }
        }

    }
    const handleClose = () => {
        try {
            setFormStatus(false)
            window.location.reload();
        } catch (err) {
            console.log(err)

        }
    }
    const handleMobileNumber = ((key, value) => {
        setInputField((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    })

    return (
        <>
            {/* //   ================================= Book a Valuation Section ================================= */}
            {formStatus == false ?
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label> Full Name*</label>
                        <input className="white_input" name="Name" onChange={inputsHandler} value={inputField.name} type="text" required placeholder="Full Name*" />
                    </div>
                    <div>
                        <label> Email* </label>
                        <input className="white_input" name="Email" onChange={inputsHandler} value={inputField.email} type="email" required inputMode="email" placeholder="Email Address*" />
                    </div>
                    <div className={eroorField.Mobile == true ? "formfields error" : "eroorField"} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                        <label> Mobile* </label>
                        <IntlTelInput
                            autoHideDialCode="false"
                            onPhoneNumberChange={(b, n, c, number) => {
                                handleMobileNumber("mobileCountry", c.dialCode);
                                handleMobileNumber("mobileCountryName", c.iso2);
                                handleMobileNumber("Mobile", n);
                            }}
                            value={inputField.Mobile}
                            onSelectFlag={(number, n) => {
                                handleMobileNumber("mobileCountry", n.dialCode);
                                handleMobileNumber("mobileCountryName", n.iso2);
                            }}
                            defaultCountry={"ae"}
                            containerclassName="intl-tel-input"
                            inputclassName="form-control"
                        />
                    </div>
                    <div className={eroorField.Mobile == true ? "formError error" : "formError"}>
                        Please enter a valid mobile number
                    </div>
                    <div>
                        <label> Linkedin </label>
                        <input className="white_input" name="Linkedin" onChange={inputsHandler} value={inputField.Linkedin} type="text" required placeholder="Linkedin" />
                    </div>
                    <div>

                        <label> Resume </label>
                        <input className="white_input" name="resume" onChange={inputsHandlerFile} type="file" placeholder="Property Location" />
                    </div>
                    <div>
                        <label> Cover Letter </label>
                        <textarea name="Message" onChange={inputsHandler} value={inputField.Message} type="textarea" placeholder="Message" />
                    </div>

                    <button className="primary_btn hover-pbg">Submit Details</button>
                    <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                </form>
                :
                <>
                    <div className="form_csuccess_ontainer">
                        <div className="form_content">
                            <h5>Thank you for applying for {props.title}.</h5>
                            <p>
                                A member of the recruitment team will be reaching out to you shortly. We look forward to getting to know you!
                            </p>
                            <button onClick={() => handleClose()} className="primary_btn">Close</button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default CareerApplication;