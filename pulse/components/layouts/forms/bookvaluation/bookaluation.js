import Link from 'next/link';
import React, { useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Select from 'react-select';
import CMSService from '../../../../services/CMSService';
const CMSServices = new CMSService();
import Head from 'next/head';

function BookValuation(props) {
    const [inputField, setInputField] = useState({
        Name: '',
        Email: '',
        Mobile: '',
        Location: '',
        date: false,
        time: false,
        propertyType: false,
        mobileCountry: "",
        mobileCountryName: "",
        token: "",
    })
    const [serverError, setServerError]=useState(false)
    const [sbmitting, setSbmitting] = useState(false);
    const options = [
        { value: 'Sell', label: 'Sell' },
        { value: 'Rent Out', label: 'Rent' },
        { value: 'Holiday Homes', label: 'Holiday Homes' }
    ]
    const [eroorField, setInputError] = useState({
        Name: false,
        Email: false,
        Mobile: false,
        Location: false,
        date: false,
        time: false,
        propertyType: false,
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
        if (sbmitting == false) {
            try {
                setSbmitting(true);
                await grecaptcha.ready(async function () {
                    await grecaptcha.execute('6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65', { action: 'login' }).then(async function (token) {
                        if (inputField.Mobile.length < 7) {

                            setSbmitting(false);
                            setInputError((prevState) => ({
                                ...prevState,
                                ['Mobile']: true,
                            }));
                        } else {
                            setInputError((prevState) => ({
                                ...prevState,
                                ['Mobile']: false,
                            }));
                            if (inputField.propertyType == false) {
                                setSbmitting(false);
                                setInputError((prevState) => ({
                                    ...prevState,
                                    ['propertyType']: true,
                                }));
                            } else {
                                setInputError((prevState) => ({
                                    ...prevState,
                                    ['propertyType']: false,
                                }));
                                var result = await CMSServices.submitForms(inputField, "valuation",token)
                                if (result.status == 200) {
                                    setSbmitting(false);
                                    setFormStatus(true)
                                    setServerError(false);
                                } else {
                                    setServerError(true);
                                    setSbmitting(false);
                                }
                            }

                        }
                    })

                })
            } catch (err) {
                setServerError(true);
                setSbmitting(false);
            }
        } else {
            return
        }
    }
    const handleClose = () => {
        setFormStatus(false)
        setInputField((prevState) => ({
            ...prevState,
            ['Mobile']: '',
        }));
    }
    const handlespecialfield = ((key, value) => {
        setInputField((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    })
    const handlespecialfieldSelect = ((value) => {
        setInputField((prevState) => ({
            ...prevState,
            ['propertyType']: value.value,
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
                <form onSubmit={(e) => handleSubmit(e)} className="fullwidthforms position-relative">
                    {sbmitting==true &&
                    <div className='spin-gray-overlay'>
                        <img src='/icons/ellipsis-icon.gif'/>
                    </div>
                    }
                    <div>
                        <label> Full Name* </label>
                        <input className="white_input" name="Name" onChange={inputsHandler} value={inputField.Name} type="text" required placeholder="Full Name*" />
                    </div>
                    <div>
                        <label> Email* </label>
                        <input className="white_input" name="Email" onChange={inputsHandler} value={inputField.Email} type="email" required inputMode="email" placeholder="Email Address*" />
                    </div>
                    <div className={eroorField.Mobile == true ? "eroorField" : ""} data-tip={eroorField.Mobile == true ? "Please enter a valid mobile number" : ""} type="error">
                        <label> Mobile* </label>
                        <IntlTelInput
                            autoHideDialCode="false"
                            onPhoneNumberChange={(b, n, c, number) => {
                                handlespecialfield("mobileCountry", c.dialCode);
                                handlespecialfield("mobileCountryName", c.iso2);
                                handlespecialfield("Mobile", n);
                            }}
                            value={inputField.Mobile}
                            onSelectFlag={(number, n) => {
                                handlespecialfield("mobileCountry", n.dialCode);
                                handlespecialfield("mobileCountryName", n.iso2);
                            }}
                            defaultCountry={"ae"}
                            preferredCountries={['ae','gb','us']}
                            containerclassName="intl-tel-input"
                            inputclassName="form-control"
                        />
                    </div>


                    <div className={eroorField.Mobile == true ? "formError error" : "formError"}>
                        Please enter a valid mobile number
                    </div>
                    <div>
                        <label> Listing Type* </label>
                        <Select  placeholder={<div className="select-placeholder-text">Listing Type*</div>} onChange={handlespecialfieldSelect} theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                text: '#3e4861',
                                primary25: '#fff',
                                primary: '#e3ecee',
                                placeholder: "f00"
                            },
                        })} name='propertyType' className='select2 col-12' options={options} />
                    </div>
                    <div className={eroorField.propertyType == true ? "formError error" : "formError"}>
                        Please Select Your Listing Type
                    </div>
                    <div>
                        <label> Property Address* </label>
                        <input className="white_input" name="Location" onChange={inputsHandler} value={inputField.Location} type="text" required placeholder="Property Address*" />
                    </div>
                    <div className={serverError == true ? "formError error pt-3 text-center" : "formError"}>
                        Oops! We have a problem! <br/> Contact <a href="tel:+97144294444">+971 4 429 4444</a>
                    </div>
                    <input type="hidden" name="recaptcha" id="recaptcha" />
                    <button className="primary_btn hover-pbg">Submit Details</button>
                    <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp;  <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                </form>
                :
                <>
                    <div className="form_csuccess_ontainer">
                        <div className="form_content text-center">
                            <h5>Your valuation request for {inputField.Location} has been received!</h5>
                            <p>
                            An agent will be in touch to confirm the appointment
                            </p>
                            <button onClick={() => handleClose()} className="primary_btn">Close</button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default BookValuation;