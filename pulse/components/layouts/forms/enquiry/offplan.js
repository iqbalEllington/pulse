import React, { useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Link from 'next/link';

import CMSService from '../../../../services/CMSService';
const CMSServices = new CMSService();
function Offplan(props) {
    const [inputField, setInputField] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        mobileCountry: "",
        Message: "",
        mobileCountryName: "",
        FormPurpose:'Community Interest',
        reference:props.reference
    })
    const [eroorField, setInputError] = useState({
        Name: false,
        Email: false,
        Mobile: false,
        Message: false,
        mobileCountry: false,
        mobileCountryName: false,
    })
    const [formStatus, setFormStatus] = useState(false);
    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
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
            var result = await CMSServices.submitForms(inputField, "general")
            if (result.status == 200) {
                setFormStatus(true)
            }
        }

    }
    const handleClose = () => {
        setFormStatus(false)
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
                    <label> Full Name </label>
                        <input className="white_input" name="Name" onChange={inputsHandler} value={inputField.name} type="text" required placeholder="Full Name" />
                    </div>
                    <div>
                    <label> Email* </label>
                        <input className="white_input" name="Email*" onChange={inputsHandler} value={inputField.email} type="email" required inputMode="email" placeholder="Email Address" />
                    </div>
                    <div className={eroorField.Mobile == true ? "eroorField" : ""} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                    <label> Mobile </label>
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
                 
                    <button className="primary_btn hover-pbg">Register Interest</button>
                    <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                </form>
                :
                <>
                    <div className="form_csuccess_ontainer register-success">
                        <div className="form_content">
                            <h5>Thank you {inputField.Name}, <br/>Your interest is recived.</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit and is
                                confirmed for adsaasd
                            </p>
                            <button onClick={() => handleClose()} className="primary_btn">Close</button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Offplan;