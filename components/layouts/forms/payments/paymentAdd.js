import Link from 'next/link';
import React, { useState } from 'react';
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import Select from 'react-select';
import CMSService from '../../../../services/CMSService';
const CMSServices = new CMSService();
import DatePicker from "react-datepicker";
import Head from 'next/head';
import moment from 'moment';
import { postRequestAPI } from 'helper/api';
import { toast } from 'react-toastify';

function paymentAdd(props) {
    const [inputField, setInputField] = useState({
        paymentDate: "",
        paymentMode: "",
        paymentAmountPaid: "",
        paymentInvoiceNumber: "",
        paymentReference: "",
        MailSend: false,
        registration: props.registration
    })
    const paymentModes = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Bank', label: 'Bank' },
        { value: 'Cheque', label: 'Cheque' },
        { value: 'Online', label: 'Online' }
    ]
    const [serverError, setServerError] = useState(false)
    const [sbmitting, setSbmitting] = useState(false);
    const options = [
        { value: 'Sell', label: 'Sell' },
        { value: 'Rent Out', label: 'Rent' },
        { value: 'Holiday Homes', label: 'Holiday Homes' }
    ]

    const [isLoading, setIsLoading] = useState(true);
    const handlesubmitter = (async (e) => {
        try {
            e.preventDefault();

            setIsLoading(false)
            if (isLoading == false) {
                setIsLoading(true)
                var registrationService = await postRequestAPI({ API: '/payments/pay/' + props.registration, DATA: inputField });
                if (registrationService.status == 200) {
                    toast("Registration Successfull");
                    setInputField({
                        paymentDate: "",
                        paymentMode: "",
                        paymentAmountPaid: "",
                        paymentInvoiceNumber: "",
                        paymentReference: "",
                        MailSend: false,
                        registration: props.registration
                    })
                } else {
                    console.log(registrationService)
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
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
    const handlespecialfieldSelect = ((key, value) => {
        setInputField((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    })
    const handlespecialfieldDate = ((key, value) => {
        setInputField((prevState) => ({
            ...prevState,
            [key]: moment(value).format("DD-MM-YYYY"),
        }));
    })
    return (
        <>
            <div className="row col-12 p-5 centered">
                <h3
                    className="form-label"
                    for="exampleFormControlSelect1"
                >
                    Add Payment
                </h3>
                <form className='row'>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                            >
                                Date
                            </label>
                            <DatePicker
                                className="white_input"
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                adjustDateOnChange
                                inputmode='none'
                                dateFormat="yyyy-MM-dd"
                                onChange={(value) => handlespecialfieldDate('paymentDate', value)}
                                value={inputField.paymentDate}
                                placeholderText={'Payment Date'}
                            >
                            </DatePicker>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                            >
                                Mode
                            </label>
                            <Select
                                className="no-padding-input"
                                value={paymentModes.filter(function (types) {
                                    return types.value == inputField.paymentMode;
                                })}
                                name="paymentMode"
                                onChange={(value) => handlespecialfieldSelect('paymentMode', value.value)}
                                options={paymentModes}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                            >
                                Amount Paid(AED)
                            </label>
                            <input
                                type="text"
                                name="paymentAmountPaid"
                                onChange={(e) => inputsHandler(e)}
                                value={inputField.paymentAmountPaid}
                            />

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                            >
                                Invoice Number
                            </label>
                            <input
                                type="text"
                                value={inputField.paymentInvoiceNumber}
                                name="paymentInvoiceNumber"
                                onChange={(e) => inputsHandler(e)}
                            />

                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label
                                className="form-label"
                                for="exampleFormControlSelect1"
                            >
                                reference
                            </label>
                            <textarea
                                onChange={(e) => inputsHandler(e)}
                                Value={inputField.paymentReference}
                                name="paymentReference"

                            />

                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="form-group">
                            <label
                                className="form-label col-12"
                                for="exampleFormControlSelect1"
                            >
                                Mail Send
                            </label>
                            <div style={{ width: '70px' }}>
                                <input onChange={(value) => handlespecialfieldSelect('MailSend', value.target.checked)} checked={inputField.MailSend} type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group"><label
                            className="form-label"
                            for="exampleFormControlSelect1"
                        >
                            &nbsp;
                        </label>
                            <button onClick={(e) => handlesubmitter(e)} className="btn btn-success">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}

export default paymentAdd;