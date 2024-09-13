import { getRequest, postRequestAPI } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { template } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { HiPlus } from "react-icons/hi2";
import AsyncSelect from 'react-select/async';
import { toast } from "react-toastify";
import { covertToCurrency } from "/services/utilsService";

const registraionPayment = (props) => {
    const [currentevent, setCurrentevent] = useState(false)
    const temp = {
        mode: "",
        reference: "",
        paidOn: "",
        amountPaid: "",
        registration: props.registrationid,
        invoiceNumber: "",
        emailSend: "",
        isReturned: "",
        feeReturned: ""
    }
    const customStyles = {
        control: (provided) => ({
            ...provided,
            height: 43,
            border: '0px solid black !important',
            '&:hover': {
                border: '0px solid black !important',
                // boxShadow: '0px 0px 6px black',
            },
            '&:focus': {
                border: '0px solid black',
                // boxShadow: '0px 0px 6px black',
            },
        }),
        indicatorSeparator: () => ({
            display: 'none', // Hide the indicator separator
          }),
    };
    const [totalpaid, setTotalpaid] = useState(0)
    const [formData, setFormData] = useState([{
        paymentId: "",
        mode: "",
        reference: "",
        paidOn: "",
        amountPaid: "",
        registration: props.registrationid,
        invoiceNumber: "",
        emailSend: "",
        isReturned: "",
        feeReturned: ""
    }])
    const addrow = async (e) => {
        e.preventDefault()
        var formdatas = formData
        await formdatas.push(temp)
        console.log(temp, formdatas)
        setFormData([...formdatas])
    }
    const paymentModes = [
        { value: 'cash', label: 'Cash' },
        { value: 'bank', label: 'Bank' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'online', label: 'Online' }
    ]
    const [isLoading, setIsLoading] = useState(false)
    const addPayment = (async (e, key) => {
        e.preventDefault()
        try {
            if (formData[key].amountPaid == "" || typeof parseFloat(formData[key].amountPaid) !== 'number') {
                toast("Please fill payment amount")
                return false
            }
            if (formData[key].paidOn == "" || formData[key].paidOn == null) {
                toast("Payment Date is Required")
                return false;
            }
            if (isLoading == false) {
                var registrationService = await postRequestAPI({ API: '/payments/pay', DATA: formData[key] });
                if (registrationService.status == 200 && registrationService?.data?.status == 200) {
                    toast("Payment Added Successfully");
                    loadPayments()
                } else {
                    toast("Payment Registration Failed Please try again later");
                }
            }
        } catch (err) {
            toast(err);
            console.log(err)
        }
    })
    async function loadworkshops() {
        const response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS_ITEMS + "?filters[registrationLink]=" + props.registrationid + "&populate[]=event" });
        if (response?.status === 200) {
            setCurrentevent(response?.data?.data);
        }
    }
    async function loadPayments() {
        try {
            const response = await getRequest({
                API: API_URLS.GET_EVENTS_PAYMENTS + "?filters[registration]=" + props.registrationid
            });

            if (response?.status === 200) {
                let totalPaid = 0;
                const promises = response.data.data.map(async (value) => {
                    totalPaid = totalPaid + parseFloat(value["attributes"]["amountPaid"]);

                    return {
                        paymentId: value["id"],
                        mode: value["attributes"]["mode"],
                        reference: value["attributes"]["reference"],
                        paidOn: (value["attributes"]["paidOn"] != null) ? moment(value["attributes"]["paidOn"]).format('YYYY-MM-DD') : null,
                        amountPaid: value["attributes"]["amountPaid"],
                        registration: props.registrationid,
                        invoiceNumber: value["attributes"]["invoiceNumber"],
                        emailSend: value["attributes"]["emailSend"],
                        isReturned: value["attributes"]["isReturned"],
                        feeReturned: value["attributes"]["feeReturned"],
                    };
                });

                const currentdata = await Promise.all(promises);

                if (response.data.data.length >= 1) {
                    await setFormData([...currentdata]);
                    setTotalpaid(totalPaid)
                }
            }
        } catch (error) {
            console.error("Error loading payments:", error);
        }
    }
    const onChangeInput = async (name, value, key) => {
        var oldata = formData;
        var currentData = oldata[key]
        currentData[name] = value.value
        oldata[key] = currentData
        setFormData([...oldata]);
    }
    const handlespecialfielddate = ((name, value, key) => {
        var oldata = formData;
        var currentData = oldata[key]
        currentData[name] = moment(value).format('YYYY-MM-DD')
        oldata[key] = currentData
        setFormData([...oldata]);
    })
    useEffect(() => {
        if (props.event) {
            loadworkshops()
            loadPayments()
        }
    }, [props.event])
    useEffect(() => {
        var data = {
            "workshop": currentevent[0]?.attributes?.event?.data?.attributes?.title,
            "totalAmount": currentevent[0]?.attributes?.feeAfterPromotion,
            "totalAmountPaid": totalpaid,
            "balance": currentevent[0]?.attributes?.feeAfterPromotion - totalpaid,
        }
        // if (props.keys != "base" && (currentevent[0]?.attributes?.feeAfterPromotion - totalpaid) > 0) {
        //     props.setBalanceAmount(true)
        // }else{
        //     props.setBalanceAmount(false)
        // }
        props.setPaymentData((prevState) => ({
            ...prevState,
            [props.keys]: data
        }));
    }, [totalpaid, currentevent])
    return (
        <>
            <section className="paymentstatus row">
                <div className="tableCaption d-flex justify-content-between">
                    <h3>Payment Status <span>
                        {currentevent[0]?.attributes?.event?.data?.attributes?.title}
                    </span></h3>
                    <span>Course Fee : {covertToCurrency("AED","AED",currentevent[0]?.attributes?.feeAfterPromotion)}</span>
                </div>
                <table className="col-12">
                    <thead>
                        <th>Date</th>
                        {/* <th>Registration</th> */}
                        <th>Mode</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {formData.map((val, key) => {
                            return <tr>
                                <td> <DatePicker
                                    className="datepicker col-12"
                                    inputmode='none'
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(value) => handlespecialfielddate('paidOn', value, key)}
                                    value={val.paidOn}
                                    placeholderText={'Paid Date'}
                                // selected={state.selectedDate}
                                >
                                </DatePicker></td>
                                <td>
                                    <AsyncSelect
                                    styles={customStyles}
                                        cacheOptions
                                        className="no-padding-input"
                                        value={paymentModes.filter(function (types) {
                                            return types.value == val.mode;
                                        })}
                                        placeholder="Mode"
                                        loadOptions={paymentModes}
                                        onChange={(value) => { onChangeInput('mode', value, key) }}
                                        defaultOptions={paymentModes}
                                    />
                                </td>
                                <td>
                                    <textarea placeholder="Payment Description" value={val.reference} onChange={(e) => onChangeInput("reference", e.target, key)} />
                                </td>
                                <td>
                                    <input placeholder="Amount" value={val.amountPaid} onChange={(e) => onChangeInput("amountPaid", e.target, key)} type="text" />
                                </td>
                                <td>
                                    <button className="save" onClick={(event) => addPayment(event, key)}>Save</button>
                                </td>
                            </tr>
                        })}
                        <tr>
                            <td colSpan="5">
                                <div className="col-md-12 p-2">
                                    <button onClick={(e) => addrow(e)} className="special-action bg-currency">
                                        {/* <HiPlus />  */}
                                        Add a Payment
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="summery-paid">
                            <td colSpan="4">
                                Total Paid
                            </td>
                            <td colSpan="4">
                            {covertToCurrency("AED","AED",totalpaid)}
                            </td>
                        </tr>
                        <tr className="summery-balance">
                            <td colSpan="4">
                                Balance
                            </td>
                            <td colSpan="4">
                            {covertToCurrency("AED","AED",currentevent[0]?.attributes?.feeAfterPromotion - totalpaid)}
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

            </section>
        </>
    )

}
export default registraionPayment;
