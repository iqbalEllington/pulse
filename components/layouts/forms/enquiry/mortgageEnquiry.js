import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import CMSService from '../../../../services/CMSService';
const CMSServices = new CMSService();

function MortgageEnquiry(props) {
    const [inputField, setInputField] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Property:props.property,
        mobileCountry: "",
        Message: "",
        mobileCountryName: "",
        AreaInterest: "",
        propertyPrice: props.calculator.principal,
        downPayment: props.calculator.down + "% (" + (props.calculator.basePrincipple * props.calculator.down / 100).toString().split(/(?=(?:\d{3})+$)/).join(",") + ") ",
        duration: props.calculator.term,
        interestRate: props.calculator.rate
    })
    const [eroorField, setInputError] = useState({
        Name: false,
        Email: false,
        Mobile: false,
        Message: false,
        mobileCountry: false,
        mobileCountryName: false,
        serverError: false,
    })
    const [formStatus, setFormStatus] = useState(false);
    const [formSubmitting, setformSubmitting] = useState(false);
    const inputsHandler = (e) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        try {
            
            e.preventDefault();
            if (formSubmitting == false) {
                setformSubmitting(true);
                if (inputField.Mobile.length < 7) {
                    setformSubmitting(false);
                    setInputError((prevState) => ({
                        ...prevState,
                        ['Mobile']: true,
                    }));
                } else {
                    setInputError((prevState) => ({
                        ...prevState,
                        ['Mobile']: false,
                    }));
                    await grecaptcha.ready(async function () {
                        await grecaptcha.execute('6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65', { action: 'login' }).then(async function (token) {
                            var result = await CMSServices.submitForms(inputField, "mortgages", token)
                            if (result.status == 200) {
                                setformSubmitting(false);
                                setFormStatus(true)
                                setInputError((prevState) => ({
                                    ...prevState,
                                    ['serverError']: false,
                                }));
                                setInputField((prevState) => ({
                                    ...prevState,
                                    ['Name']: '',
                                    ['Email']: '',
                                    ['Mobile']: '',
                                    ['mobileCountry']: "",
                                    ['Message']: "",
                                    ['mobileCountryName']: "",
                                    ['AreaInterest']: "",
                                }));
                            } else {
                                setformSubmitting(false);
                                setInputError((prevState) => ({
                                    ...prevState,
                                    ['serverError']: true,
                                }));
                            }
                        })
                    })

                }
            }

        } catch (Exception) {
            setformSubmitting(false);
            setInputError((prevState) => ({
                ...prevState,
                ['serverError']: true,
            }));
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
            <Head>
                <script
                    src="https://www.google.com/recaptcha/api.js?onload=ReCaptchaCallbackV3&render=6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65"></script>
            </Head>
            {/* //   ================================= Book a Valuation Section ================================= */}
            {formStatus == false ?
                <form onSubmit={(e) => handleSubmit(e)} className="position-relative">
                    {formSubmitting==true &&
                    <div className='spin-white-overlay'>
                        <img src='/icons/ellipsis-icon.gif'/>
                    </div>
                    }
                    <div>
                        <label> Full Name* </label>
                        <input className="white_input" name="Name" onChange={inputsHandler} value={inputField.name} type="text" required placeholder="Full Name*" />
                    </div>
                    <div>
                        <label> Email* </label>
                        <input className="white_input" name="Email" onChange={inputsHandler} value={inputField.email} type="email" required inputMode="email" placeholder="Email Address*" />
                    </div>
                    <div className={eroorField.Mobile == true ? "eroorField" : ""} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
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
                            preferredCountries={['ae', 'gb', 'us']}
                            defaultCountry={"ae"}
                            containerclassName="intl-tel-input"
                            inputclassName="form-control"
                        />
                    </div>
                    <div className={eroorField.Mobile == true ? "formError error" : "formError"}>
                        Please enter a valid mobile number
                    </div>
                    <div>
                        <label> Interested Communities </label>
                        <input className="white_input" name="AreaInterest" onChange={inputsHandler} value={inputField.location} type="text" placeholder="Interested Communities" />
                    </div>
                    <div>
                        <label> Message </label>
                        <textarea name="Message" onChange={inputsHandler} value={inputField.Message} type="textarea" placeholder="Message" />
                    </div>
                    <div className={eroorField.serverError == true ? "formError error pt-3 text-center col-12" : "formError"}>
                        Oops! We have a problem! <br /> Contact <a href="tel:+97144294444">+971 4 429 4444</a>
                    </div>
                    <input type="hidden" name="recaptcha" id="recaptcha" />
                    <div className='col-12 text-center mt-3'>
                        <button className="primary_btn hover-pbg submit-btn mb-3">Submit Details</button>
                        <p className='terms-privacy col-12 text-center'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                    </div>
                </form>
                :
                <>
                    <div className="form_csuccess_ontainer centered-noshadow">
                        <div className="form_content text-center">
                            <h5>Your mortgage inquiry has been received.</h5>
                            <p>
                                One of our Mortgage Consultants will be in touch with you shortly.
                            </p>
                            <button onClick={() => handleClose()} className="primary_btn">Close</button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default MortgageEnquiry;