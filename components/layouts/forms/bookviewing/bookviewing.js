import React, { Component, useEffect, useState } from "react";
import {
    getAvailablityofBooking,
    bookPropertyViews,
} from "../../../../services/propertyService";
// import { getDateFromToday } from "../../../../services/utilsService";
import { putBookingFormData, resetPropertyForm } from "../../../../store/actions/property/propertyAction";
import moment from "moment";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Select from 'react-select';
import Link from "next/link";
import Head from "next/head";
import { formsuccess } from "./formsuccess";
function bookPropertyView(props) {
    var today = new Date();
    const [state, setState] = useState({
        startDate: today.setDate(today.getDate() + 1),
        name: "",
        daysToList: 16,
        formStatus: false,
        sbmitting: false,
        serverError: false,
        mobileError: false,
        dateError: false,
        timeError: false,
        selectedDate: false,
        loadingAailability: false
    });
    const [availabilityArray, setavailabilityArray] = useState({})
    const [options, setOptions] = useState([{
        value: "Date Select", label: "Please Select Prefered Date", isDisabled: true, color: '#ffffff'
    }])
    const handleClose = async () => {
        try {
            window.location.reload();
        } catch (err) {
            console.log(err)

        }
    }
    const handlesubmit = async (e) => {
        try {
            e.preventDefault();
            if (state.sbmitting == false) {
                setState((prevState) => ({
                    ...prevState,
                    ['sbmitting']: true,
                }));
                if (props.bookingForm.Property == "") {
                    var setProperty = await setProperty();
                }
                if (props.bookingForm.Mobile.length < 7) {
                    setState((prevState) => ({
                        ...prevState,
                        ['mobileError']: true,
                        ['sbmitting']: false,
                    }));
                } else if (props.bookingForm.Date == false) {
                    setState((prevState) => ({
                        ...prevState,
                        ['mobileError']: false,
                        ['dateError']: true,
                        ['sbmitting']: false,
                    }));
                } else if (props.bookingForm.Hour == "" || props.bookingForm.Hour == false) {
                    setState((prevState) => ({
                        ...prevState,
                        ['mobileError']: false,
                        ['dateError']: false,
                        ['timeError']: true,
                        ['sbmitting']: false,
                    }));
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        ['mobileError']: false,
                        ['dateError']: false,
                        ['timeError']: false
                    }));
                    var data = props.bookingForm;
                    setState((prevState) => ({
                        ...prevState,
                        ['name']: props.bookingForm.Name,
                    }));
                    var result = await grecaptcha.ready(async function () {
                        var cap = await grecaptcha.execute('6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65', { action: 'login' }).then(async function (token) {
                            var bookPropertyViewing = await bookPropertyViews(data, token);
                            if (bookPropertyViewing.status == 200) {
                                setState((prevState) => ({
                                    ...prevState,
                                    ['formStatus']: true,
                                    ['sbmitting']: false
                                }));
                                props.resetPropertyForm()
                            }else{
                                setState((prevState) => ({
                                    ...prevState,
                                    ['formStatus']: false,
                                    ['sbmitting']: false,
                                    ['serverError']:true
                                }));
                            }

                        })
                        return cap
                    })
                }
            }
        } catch (err) {
            console.log(err)
            setState((prevState) => ({
                ...prevState,
                ['serverError']: true,
                ['sbmitting']: false
            }));
        }
    }


    useEffect(() => {
        if (props.bookingForm.Date !== false && props.bookingForm.Date != state.selectedDate) {
            var dataavailable = getavailability(props.bookingForm.Date);
        }
        // 
        props.putBookingFormData(
            "Property",
            props.bookingFormData.propertyId
        );
    }, [])
    const getavailability = async (date) => {
        try {
            setState((prevState) => ({
                ...prevState,
                ['selectedDate']: date,
                ['loadingAailability']: true
            }));
            date = moment(date).format('YYYY-MM-DD')
            var dataavailable = await getAvailablityofBooking(
                props.bookingFormData,
                date
            );
            if (dataavailable.status == 200) {
                availabilityArray[dataavailable.data.availability.date] =
                    dataavailable.data.availability.data;
                var options = [];
                await Object.keys(dataavailable.data.availability.data).forEach(function (key, index) {
                    if (key, dataavailable.data.availability.data[key] == "available") {
                        if (key >= 12) {
                            if (key == 12) {
                                options.push(
                                    {
                                        value: key, label: (key) + ":00 PM"
                                    }
                                )
                            } else {
                                if (key < 21) {
                                    options.push(
                                        {
                                            value: key, label: "0" + (key - 12) + ":00 PM"
                                        }
                                    )
                                } else {
                                    options.push(
                                        {
                                            value: key, label: (key - 12) + ":00 PM"
                                        }
                                    )
                                }
                            }
                        } else {
                            if (key <= 9) {
                                options.push(
                                    {
                                        value: key, label: "0" + key + ":00 AM"
                                    }
                                )
                            } else {
                                options.push(
                                    {
                                        value: key, label: key + ":00 AM"
                                    }
                                )
                            }

                        }

                    } else {
                        if (key >= 12) {
                            if (key == 12) {
                                options.push(
                                    {
                                        value: key, label: (key) + ":00 PM (Already Booked)", isDisabled: true, color: '#0052CC'
                                    }
                                )
                            } else {
                                if (key < 9) {
                                    options.push(
                                        {
                                            value: key, label: "0" + (key - 12) + ":00 PM (Already Booked)", isDisabled: true, color: '#0052CC'
                                        }
                                    )
                                } else {
                                    options.push(
                                        {
                                            value: key, label: (key - 12) + ":00 PM (Already Booked)", isDisabled: true, color: '#0052CC'
                                        }
                                    )
                                }

                            }

                        } else {
                            if (key <= 9) {
                                options.push(
                                    {
                                        value: key, label: "0" + key + ":00 AM (Already Booked)", isDisabled: true
                                    }
                                )
                            } else {
                                options.push(
                                    {
                                        value: key, label: key + ":00 AM (Already Booked)", isDisabled: true
                                    }
                                )
                            }
                        }
                    }
                });
                setOptions(options)
                setavailabilityArray(availabilityArray);
                props.putBookingFormData(
                    "Date",
                    dataavailable.data.availability.date
                );
                props.putBookingFormData("Hour", false);
                setState((prevState) => ({
                    ...prevState,
                    ['loadingAailability']: false,
                }));
            } else {
                setState((prevState) => ({
                    ...prevState,
                    ['loadingAailability']: false,
                }));
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    return (
        <>
            <Head>
                <script
                    src="https://www.google.com/recaptcha/api.js?onload=ReCaptchaCallbackV3&render=6LdUfochAAAAAMu4bM4w1a-U0PoGS5WazhaqEn65"></script>

            </Head>
            {state.formStatus == false ?
                <div className="justify-content-center mx-auto mt-4">

                    <div className="form_container with-label">
                        <div className="form_content">
                            <h3>Book a viewing</h3>
                            <p>
                                {/* <span>Lorem ipsum dolor sit amet ectetur.</span> Lorem ipsum dolor sit
                                amet, consectetur adipiscing elit. */}
                            </p>
                            <form onSubmit={(e) => handlesubmit(e)} className="fullwidthforms position-relative">
                                {state.sbmitting == true &&
                                    <div className="spin-white-overlay">
                                        <img src='/icons/ellipsis-icon.gif' />
                                    </div>
                                }
                                <div>
                                    <label> Full Name*</label>
                                    <input
                                        className="white_input"
                                        value={props.bookingForm.Name}
                                        onChange={(e) =>
                                            props.putBookingFormData(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        required
                                        name="Name"
                                        type="text"
                                        placeholder="Full Name*" />
                                </div>
                                <div>
                                    <label> Email Address* </label>
                                    <input className="white_input" value={props.bookingForm.Email}
                                        onChange={(e) =>
                                            props.putBookingFormData(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                        required
                                        type="text"
                                        placeholder="Email Address*"
                                        name="Email" inputMode="email" />
                                </div>
                                <div>
                                    <label> Telephone Number* </label>
                                    <IntlTelInput
                                        autoHideDialCode="false"
                                        onPhoneNumberChange={(b, n, c, number) => {
                                            props.putBookingFormData(
                                                "MobileCountry",
                                                c.dialCode
                                            );
                                            props.putBookingFormData(
                                                "MobileCountryName",
                                                c.iso2
                                            );
                                            props.putBookingFormData("Mobile", n);
                                        }}
                                        value={props.bookingForm.Mobile}
                                        onSelectFlag={(number, n) => {
                                            props.putBookingFormData(
                                                "MobileCountry",
                                                n.dialCode
                                            );
                                            props.putBookingFormData(
                                                "MobileCountryName",
                                                n.iso2
                                            );
                                        }}
                                        defaultCountry={"ae"}
                                        // defaultCountry={props.bookingForm.mobileCountryName}
                                        containerclassName="intl-tel-input"
                                        preferredCountries={['ae', 'gb', 'us']}
                                        inputclassName="form-control"
                                    />
                                    <div className={state.mobileError == true ? "formError error pt-4" : "formError"}>
                                        Please enter a valid mobile number
                                    </div>
                                </div>
                                <div>
                                    <label> Prefered Date* </label>
                                    <DatePicker
                                        className="white_input"
                                        inputmode='none'
                                        // minDate={state.startDate}
                                        dateFormat="yyyy-MM-dd"
                                        onChange={(e) =>
                                            getavailability(
                                                e
                                            )
                                        }
                                        value={props.bookingForm.Date}
                                        placeholderText={'Please Select Prefered Date*'}
                                        selected={state.selectedDate}
                                    >
                                    </DatePicker>
                                    {state.loadingAailability == true &&
                                        <div className="loader-availability">
                                            <img src='/icons/ellipsis-icon.gif' />
                                        </div>
                                    }
                                    <div className={state.dateError == true ? "formError error pt-4" : "formError"}>
                                        Please select your prefered date
                                    </div>
                                </div>
                                <div>
                                    <label>Prefered Time*</label>
                                    <Select
                                        inputProps={{ readOnly: true }}
                                        isSearchable={false}
                                        placeholder={<div className="select-placeholder-text">Prefered Time*</div>} theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 0,
                                            colors: {
                                                ...theme.colors,
                                                text: '#fff',
                                                primary25: '#efefef',
                                                primary: '#e3ecee !important',
                                                placeholder: "f00"
                                            },
                                        })}
                                        onChange={(e) => props.putBookingFormData("Hour", e.value)}
                                        name='Hour' className='select3 col-12' options={options} />
                                    <div className={state.timeError == true ? "formError error pt-4" : "formError"}>
                                        Please select your prefered time
                                    </div>
                                </div>
                                <div className={state.serverError == true ? "formError error pt-3 text-center" : "formError"}>
                                    Oops! We have a problem! <br/> Contact <a href="tel:+97144294444">+971 4 429 4444</a>
                                </div>
                                <input type="hidden" name="recaptcha" id="recaptcha" />
                                <button className="primary_btn">Submit Details</button>
                                <p className='terms-privacy'>By clicking Submit, you agree to our <Link legacyBehavior href={'/terms-and-conditions'}><a>Terms</a></Link> &amp; <Link legacyBehavior href={'/privacy-and-cookies-policy'}><a>Privacy Policy.</a></Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <>
                    <div className="form_csuccess_ontainer mt-5">
                        <div className="form_content text-center">
                            <h5>Your viewing  request for {props.bookingFormData.title} has been received!</h5>
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
const mapStateToProps = (state) => {
    return {
        bookingForm: state.propertyReducer.bookingForm,
    };
};
const mapDispachToProps = (dispatch) => {
    return {
        putBookingFormData: (paramKey, paramValue) =>
            dispatch(putBookingFormData(paramKey, paramValue)),
        resetPropertyForm: () => dispatch(resetPropertyForm()),
    };
};
export default connect(mapStateToProps, mapDispachToProps)(bookPropertyView);