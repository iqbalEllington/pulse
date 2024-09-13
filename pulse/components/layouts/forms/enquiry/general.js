import Link from 'next/link';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import CMSService from '../../../../services/CMSService';

const CMSServices = new CMSService();
function GeneralForm(props) {
    const [inputField, setInputField] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Location: props.location != undefined ? props.location:"",
        date: false,
        time: false,
        mobileCountry: "",
        Message: "",
        mobileCountryName: "",
        FormPurpose: false,
    })
    useEffect(() => {
        setInputField((prevState) => ({
            ...prevState,
            ['FormPurpose']: props.purpose,
        }));
    }, [props.purpose]);
    const [eroorField, setInputError] = useState({
        Name: false,
        Email: false,
        Mobile: false,
        Location: false,
        date: false,
        time: false,
        Message: false,
        mobileCountry: false,
        mobileCountryName: false,
        serverError: false,
    })
    const [formSubmitting, setformSubmitting] = useState(false);

    const [formStatus, setFormStatus] = useState(false);
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
                setInputError((prevState) => ({
                    ...prevState,
                    ['serverError']: false,
                }));
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
                            var result = await CMSServices.submitForms(inputField, "general", token)
                            if (result.status == 200) {
                                setformSubmitting(false);
                                setFormStatus(true)
                                setInputField((prevState) => ({
                                    ...prevState,
                                    ['Name']: '',
                                    ['Email']: '',
                                    ['Mobile']: '',
                                    ['mobileCountry']: "",
                                    ['Message']: "",
                                    ['mobileCountryName']: ""
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

                    {formSubmitting == true &&
                        <div className='spin-white-overlay'>
                            <img src='/icons/ellipsis-icon.gif' />
                        </div>
                    }
                    <div>
                        <label> Full Name*</label>
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
                            preferredCountries={['ae', 'gb', 'us']}
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

                    {/* ds{JSON.stringify(props.purpose.includes("Home maintenance"))}as */}
                    {props.LocationField !== undefined &&
                        <div>

                            <label> Location </label>
                            <input className="white_input" name="Location" onChange={inputsHandler} value={inputField.Location} type="text" required placeholder="Property Location" />
                        </div>
                    }
                    <div className='textarea'>
                        <label> Message </label>
                        <textarea name="Message" onChange={inputsHandler} value={inputField.Message} type="textarea" placeholder="Message" />
                    </div>
                    <div className={eroorField.serverError == true ? "formError error pt-3 text-center col-12" : "formError"}>
                        Oops! We have a problem! <br /> Contact <a href="tel:+97144294444">+971 4 429 4444</a>
                    </div>
                    <input type="hidden" name="recaptcha" id="recaptcha" />
                    <button className="primary_btn hover-pbg">Submit Details</button>
                    <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                </form>
                :
                <>
                    <div className="form_csuccess_ontainer mt-4">
                        {props.purpose == "subscribe" &&
                            <div className="form_content">
                                <h5>Thank you for subscribing to our newsletter!</h5>
                                <p>
                                    Dubai property market insights are on there way to you!
                                </p>
                                <button onClick={() => handleClose()} className="primary_btn">Back</button>
                            </div>
                        }
                        {props.purpose.includes("Property Management")==true  &&
                            <div className="form_content">
                                <h5> Thank you for your interes!</h5>
                                <p>
                                    A member of the Property Management team will be in contact with you shortly to discuss your bespoke package and a quote.
                                </p>
                                <button onClick={() => handleClose()} className="primary_btn">Back</button>
                            </div>
                        }
                        {(props.purpose == "Off-Plan listing page register your interest" || props.purpose == "Off-Plan details page register your interest") &&
                            <div className="form_content">
                                <h5> Thank you for registering your interest{props.offplan !=false && " in "+ props.offplan}!</h5>
                                <p>
                                    An expert agent will be in contact with you shortly to answer all your questions and discuss the options available.
                                </p>
                                <button onClick={() => handleClose()} className="primary_btn">Back</button>
                            </div>
                        }
                         {props.purpose.includes("Home maintenance")==true &&
                            <div className="form_content">
                                <h5> Thank you for your interest!</h5>
                                <p>
                                A member of the Home Maintenance team will be in contact with you shortly to discuss your bespoke package and a quote.
                                </p>
                                <button onClick={() => handleClose()} className="primary_btn">Back</button>
                            </div>
                        }
                        {props.purpose=="contact form call back enquiry" &&
                            <div className="form_content text-center">
                                <h5> We have received your request for a call back</h5>
                                <p>
                                    An expert will be reaching out to you shortly to discuss your queries. We look forward to speaking with you.
                                </p>
                                <button onClick={() => handleClose()} className="primary_btn">Back</button>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default GeneralForm;