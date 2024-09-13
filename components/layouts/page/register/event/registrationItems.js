import { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import { HiPlus } from "react-icons/hi2";
import { deleteRequestAPI, getRequest } from "helper/api";
import { API_URLS } from "helper/apiConstant";
import { toast } from "react-toastify";
import ConfirmationModal from "components/modal/ConfirmationModal";

const registraionItems = (props) => {
    const [isDelete, setIsDelete] = useState(false);
    const [deleteHolder, setDeleteHolder] = useState(false)
    const status = [
        { value: 'Registered', label: 'Registered' },
        { value: 'Conformed', label: 'Conformed' },
        { value: 'Cancelled', label: 'Cancelled' },
        { value: 'Hold', label: 'Hold' }
    ]
    const [isLoaded, setIsloaded] = useState(false)
    const [registrationType, setRegistrationType] = useState([])
    const [feeAmount, setFeeAmount] = useState(false)
    const [formData, setFormData] = useState({
        RegisteredFeeOptionId: "",
        RegisteredFeeOption: "",
        RegisteredFeeOptionSub: "",
        courseFeeName: "",
        discountApplied: "",
        RegisteredTotalFee: "",
        registrationStatus: "Registered",
        workShops: []
    })
    const [formdaterror, setFormdataerror] = useState({})
    function validateRegistrationItems() {
        var registrationItemError = {
            RegisteredFeeOption: "",
            workShops: [...formData.workShops]
        };
        if (formData.RegisteredFeeOption == "" || formData.RegisteredFeeOption == null) {
            registrationItemError.RegisteredFeeOption = "Error"
        }
        registrationItemError.workShops.map((val, key) => {
            if (val.RegisteredFeeOption == "" || val.RegisteredFeeOption == null) {
                registrationItemError.workShops[key].RegisteredFeeOption = "Error";
            }
        })
        setFormdataerror(registrationItemError)
        props.setUpdateTriggered(false);
    };
    const template = {
        Workshop: "",
        RegisteredFeeOptionId: "",
        RegisteredFeeOption: "",
        RegisteredFeeOptionSub: "",
        courseFeeName: "",
        discountApplied: "",
        fromDB: false,
        RegisteredTotalFee: "",
        registrationStatus: "Registered",
        feeData: {}
    }
    async function addMore(e) {
        e.preventDefault();
        var oldRegistrations = formData.workShops;
        await oldRegistrations.push(template);
        setFormData((prev) => ({ ...prev, workShops: [...oldRegistrations] }));
    }
    const [feeStructure, setFeeStructure] = useState([])
    const customStyles = {
        control: (provided) => ({
            ...provided,
            height: 43,
            border: '1px solid black !important',
            '&:hover': {
                border: '1px solid black !important',
                // boxShadow: '0px 0px 6px black',
            },
            '&:focus': {
                border: '1px solid black',
                // boxShadow: '0px 0px 6px black',
            },
        }),
    };
    const getWorkShops = async (keyword) => {
        const response = await getRequest({ API: API_URLS.GET_EVENTS + '?filters[type][$eq]=hands-on-workshop' });

        if (response?.status === 200) {
            var data = []
            await response?.data?.data.map((key, val) => {
                data.push({ value: key.id, label: key.attributes.title })
            })
            return data
        } else {
            var data = []
            data.push(
                { value: 'default', label: 'default' },
            )
            return data
        }
    }
    async function loadfeedata(event, isWorkshop = "no") {
        const responseFee = await getRequest({ API: API_URLS.GET_COURSE_FEE + "?filters[events][id][$in]=" + event + "&populate[]=events&populate[]=course_fees&filters[isEarlyBird][$eq]=false" });
        var feecat = []
        var feeAmounts = {}
        var feestructues = {}
        if (responseFee?.status == 200) {
            var data = responseFee.data;
            await data.data.map(async (value, key) => {
                feecat.push({ value: value["id"], label: value["attributes"]["category"] });
                feeAmounts[value["id"]] = {
                    fee: value["attributes"]["fee"],
                    sub: {}
                };
                feestructues[value["id"]] = [];
                await value["attributes"]?.["course_fees"]?.['data'].map((value2, key2) => {
                    feeAmounts[value["id"]]['sub'][value2["id"]] = value2["attributes"]["fee"];
                    feestructues[value["id"]].push({ value: value2["id"], label: value2["attributes"]["category"] });
                })
            })
            if (isWorkshop == "no") {
                await setRegistrationType(feecat)
                await setFeeStructure(feestructues)
                await setFeeAmount(feeAmounts)
                return true
            } else {
                return {
                    registrationType: feecat,
                    feeStructure: feestructues,
                    feeAmount: feeAmounts
                }
            }
        } else {
            return false
        }
    }

    async function loadworkshops() {
        const response2 = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS_ITEMS + '?filters[workshopLink][id]=' + props.id + '&populate[]=event&populate[]=course_fees&populate[]=registrationLink&populate[]=course_fees_sub' });
        var workshops = response2.data.data;
        var workShopData = []
        var RegisteredFeeOptionSub = false;
        const promises = workshops.map(async (val, key) => {
            console.log(val['attributes']['status'], "val['attributes']['status']val['attributes']['status']")
            var feedata = await loadfeedata(val['attributes']['event']['data']['id'], key)
            await workShopData.push({
                Workshop: val['attributes']['event']['data']['id'],
                WorkshopName: val['attributes']['event']['data']['attributes']['title'],
                RegisteredFeeOptionId: val['id'],
                RegisteredFeeOption: val['attributes']?.['course_fees']?.['data']?.[0]?.id,
                RegisteredFeeOptionSub: val['attributes']?.['course_fees_sub']['data'][0]?.id,
                courseFeeName: RegisteredFeeOptionSub ? val['attributes']?.['course_fees_sub']?.['data']?.[0]?.['attributes']['category'] : val['attributes']?.['course_fees']?.['data']?.[0]?.['attributes']['category'],
                discountApplied: val['attributes']['discountApplied'],
                fromDB: true,
                registrationLink: val['attributes']['registrationLink']['data'][0]['id'],
                RegisteredTotalFee: val['attributes']['feeAfterPromotion'],
                registrationStatus: (val['attributes']['status']!="" && val['attributes']['status']!=null) ? val['attributes']['status']: "Registered",
                feeData: await feedata
            })
        })
        await Promise.all(promises);
        setFormData((prev) => ({ ...prev, workShops: [...workShopData] }));
    }
    async function loadEditData(event, isWorkshop = "no") {
        const response = await getRequest({ API: API_URLS.GET_EVENTS_REGISTRATIONS_ITEMS + '?filters[registrationLink][id]=' + props.id + '&populate[]=event&populate[]=course_fees&populate[]=course_fees_sub' });
        var mainRegistration = response.data?.data?.[0];
        if (mainRegistration) {
            var RegisteredFeeOption = mainRegistration['attributes']?.['course_fees']?.['data']?.[0]?.['id'];
            var RegisteredFeeOptionSub = mainRegistration['attributes']?.['course_fees_sub']?.['data']?.[0]?.['id'];
            var realValue = RegisteredFeeOptionSub ? feeAmount[RegisteredFeeOption]?.sub[RegisteredFeeOptionSub] : feeAmount[RegisteredFeeOption]?.fee
            await setFormData({
                RegisteredFeeOptionId: mainRegistration['id'],
                RegisteredFeeOption: RegisteredFeeOption,
                RegisteredFeeOptionSub: RegisteredFeeOptionSub,
                courseFeeName: RegisteredFeeOptionSub ? mainRegistration['attributes']?.['course_fees_sub']?.['data']?.[0]?.['attributes']['category'] : mainRegistration['attributes']?.['course_fees']?.['data']?.[0]?.['attributes']['category'],
                discountApplied: mainRegistration['attributes']['discountApplied'],
                RegisteredTotalFee: parseFloat(mainRegistration['attributes']['discountApplied']) > 0 ? realValue - (realValue * mainRegistration['attributes']['discountApplied'].replace("%", "") / 100) : realValue,
                registrationStatus: (mainRegistration['attributes']['status']!="" && mainRegistration['attributes']['status']!=undefined)? mainRegistration['attributes']['status']:"Registered",
                workShops: []
            })
            loadworkshops()
        }
    }
    function deleteme(e, id, key) {
        e.preventDefault()
        setIsDelete(true);
        setDeleteHolder({
            id: id
        })
    }
    async function handelDelete() {
        var registrationService = await deleteRequestAPI({ API: '/registration/regsitrationItem/' + props.event + '/' + deleteHolder.id });
        if (registrationService.status == 200) {
            setIsDelete(false)
            toast("Workshop Deleted successfully");
            loadEditData();
        } else {
            toast("Something went wrong, please try again later");
        }
    }
    useEffect(() => {
        loadfeedata(props.event)
    }, [])
    useEffect(() => {
        if (isLoaded == false && feeAmount != false) {
            loadEditData();
            setIsloaded(true)
        }
    }, [feeAmount])
    useEffect(() => {
        if (props.fromDb == true) {
            loadEditData();
            props.setFromdb(false)
        }
    }, [props.fromDb])

    useEffect(() => {
        props.setRegistrationData(formData);
    }, [formData])
    useEffect(() => {
        if (props.updateTriggered == true) {
            validateRegistrationItems()
        }
    }, [props.updateTriggered])

    const onChangeInput = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value.value }));
        if (name == "RegisteredFeeOption") {
            var realValue = formData["RegisteredFeeOptionSub"] != "" ? feeAmount[value.value].sub[formData["RegisteredFeeOptionSub"]] : feeAmount[value.value].fee
            setFormData((prev) => ({
                ...prev,
                ["RegisteredFeeOptionSub"]: "",
                ["RegisteredFeeOption"]: value.value,
                ["RegisteredTotalFee"]: formData.discountApplied != "" ? realValue - (realValue * formData.discountApplied.replace("%", "") / 100) : realValue
            })
            );

        }
        if (name == "RegisteredFeeOptionSub") {
            setFormData((prev) => ({
                ...prev,
                ["RegisteredFeeOptionSub"]: value.value,
                ["RegisteredTotalFee"]: formData.discountApplied != "" ? feeAmount[formData.RegisteredFeeOption].sub[value.value] - (feeAmount[formData.RegisteredFeeOption].sub[value.value] * formData.discountApplied.replace("%", "") / 100) : feeAmount[formData.RegisteredFeeOption].sub[value.value]
            })
            );
        }
        if (name == "discountApplied") {
            var value = value.value;
            var realValue = formData["RegisteredFeeOptionSub"] != "" ? feeAmount[formData.RegisteredFeeOption].sub[formData["RegisteredFeeOptionSub"]] : feeAmount[formData["RegisteredFeeOption"]].fee
            setFormData((prev) => ({
                ...prev,
                ["RegisteredTotalFee"]: value != "" ? realValue - (realValue * value.replace("%", "") / 100) : realValue
            })
            );
        }

    };
    const onChangeInputWorkshopFee = async (name, value, key) => {
        var oldData = formData['workShops']
        var currentData = oldData[key]
        currentData[name] = value.value;
        if (name == "RegisteredFeeOption") {
            currentData["RegisteredFeeOptionSub"] = "";
            currentData["RegisteredTotalFee"] = currentData['feeData']['feeAmount']?.[value.value]?.fee;
        }
        if (name == "RegisteredFeeOptionSub") {
            currentData["RegisteredTotalFee"] = currentData['feeData']['feeAmount']?.[currentData.RegisteredFeeOption]?.['sub']?.[value.value];
        }
        oldData[key] = currentData
        setFormData((prev) => ({ ...prev, ["workShops"]: [...oldData] }));
    };
    const onChangeInputWorkshop = async (name, value, key) => {
        if (name == "discountApplied") {
            if (parseFloat(value.value) <= 100) {
                var value = value.value;
                var oldData = formData['workShops']
                var currentData = oldData[key]
                currentData[name] = value
                var realValue = currentData["RegisteredFeeOptionSub"] != "" ? currentData["feeData"]['feeAmount'][currentData["RegisteredFeeOption"]].sub[currentData["RegisteredFeeOptionSub"]] : currentData["feeData"]['feeAmount'][currentData["RegisteredFeeOption"]].fee
                currentData["RegisteredTotalFee"] = value != "" ? realValue - (realValue * value.replace("%", "") / 100) : realValue
                oldData[key] = currentData
                setFormData((prev) => ({ ...prev, ["workShops"]: [...oldData] }));
            }
        } else if (name == "workShops") {
            var feedata = await loadfeedata(value.value, key)
            var oldData = formData['workShops']
            var currentData = oldData[key]
            currentData[name] = value.value
            currentData["WorkshopName"] = value.label
            currentData["RegisteredFeeOption"] = ""
            currentData["RegisteredFeeOptionSub"] = ""
            currentData["feeData"] = feedata;
            currentData["courseFeeName"] = "";
            currentData["discountApplied"] = "";
            currentData["RegisteredTotalFee"] = "";
            currentData["registrationStatus"] = "Registered";
            currentData["feeData"] = feedata;
            oldData[key] = currentData
            setFormData((prev) => ({ ...prev, ["workShops"]: [...oldData] }));
        }
        else if (name == "registrationStatus") {
            var oldData = formData['workShops']
            var currentData = oldData[key]
            currentData[name] = value.value
            oldData[key] = currentData
            setFormData((prev) => ({ ...prev, ["workShops"]: [...oldData] }));
        }
         else {
            var feedata = await loadfeedata(value.value, key)
            var oldData = formData['workShops']
            var currentData = oldData[key]
            currentData[name] = value.value
            currentData["feeData"] = feedata;
            oldData[key] = currentData
            setFormData((prev) => ({ ...prev, ["workShops"]: [...oldData] }));
        }
        return
    };


    return (
        <>
            <section className="registraion_items row m-0 p-0">
                <ul className="registration row m-0 p-0">
                    <li>
                        <div className="col-md-3 pe-0">
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    for="exampleFormControlSelect1"
                                >
                                    Registered Category
                                </label>
                                <Select
                                    styles={customStyles}
                                    className="no-padding-input"
                                    value={registrationType.filter(function (types) {
                                        return types.value == formData.RegisteredFeeOption;
                                    })}
                                    onChange={(value) => { onChangeInput('RegisteredFeeOption', value) }}
                                    options={registrationType}
                                />
                            </div>
                            {formdaterror.RegisteredFeeOption == "Error" &&
                                <div className="col-12">
                                    Please select Registration Details
                                </div>
                            }
                        </div>
                        <div className="col-md-3 pe-0">
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    for="exampleFormControlSelect1"
                                >
                                    Registered as
                                </label>
                                <Select
                                    styles={customStyles}
                                    className="no-padding-input"
                                    value={feeStructure[formData.RegisteredFeeOption]?.filter(function (types) {
                                        return types.value == formData.RegisteredFeeOptionSub;
                                    })}
                                    onChange={(value) => { onChangeInput('RegisteredFeeOptionSub', value) }}
                                    options={feeStructure[formData['RegisteredFeeOption']]}
                                />

                            </div>
                        </div>
                        <div className="col-md-2 pe-0">
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    for="exampleFormControlSelect1"
                                >
                                    Discount (%)
                                </label>
                                <input
                                    type="text"
                                    defaultValue={formData.discountApplied}
                                    onChange={(value) => onChangeInput('discountApplied', value.target)}
                                />

                            </div>
                        </div>
                        <div className="col-md-2 pe-0">
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    for="exampleFormControlSelect1"
                                >
                                    Fee
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    defaultValue={formData.RegisteredTotalFee}
                                    value={formData.RegisteredTotalFee}
                                    onChange={(value) => onChangeInput('RegisteredTotalFee', value.target)}
                                />

                            </div>
                        </div>
                        <div className="pe-0">
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    for="exampleFormControlSelect1"
                                >
                                    Status
                                </label>
                                <Select
                                    styles={customStyles}
                                    className="no-padding-input"
                                    value={status.filter(function (types) {
                                        return types.value == formData.registrationStatus;
                                    })}
                                    onChange={(value) => onChangeInput('registrationStatus', value)}
                                    options={status}
                                />
                            </div>
                        </div>

                    </li>

                    {formData.workShops.map((val, key) => {
                        return <li style={{ paddingTop: "20px", borderTop: "1px solid #ccc" }}>
                            <button className="close" onClick={(e) => deleteme(e, val.RegisteredFeeOptionId, key)}>Delete</button>
                            <div className="col-md-12 pe-0">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        for="exampleFormControlSelect1"
                                    >
                                        Work shop
                                        
                                    </label>
                                    {
                                        val["fromDB"] ?
                                            <>
                                                <input type="text" disabled value={val['WorkshopName']} />
                                            </> :
                                            <>
                                                <AsyncSelect
                                                    cacheOptions
                                                    styles={customStyles}
                                                    className="no-padding-input"
                                                    onChange={(value) => { onChangeInputWorkshop('Workshop', value, key) }}
                                                    loadOptions={getWorkShops}
                                                    defaultValue={[
                                                        { value: val.workShops, label: val.WorkshopName }
                                                    ]}
                                                />
                                            </>
                                    }


                                </div>
                            </div>
                            <div className="col-md-3 pe-0">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        for="exampleFormControlSelect1"
                                    >
                                        Registered Category
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        className="no-padding-input"
                                        value={val['feeData'].registrationType?.filter(function (types) {
                                            return types.value == val['RegisteredFeeOption'];
                                        })}
                                        onChange={(value) => onChangeInputWorkshopFee('RegisteredFeeOption', value, key)}
                                        options={val['feeData'].registrationType}
                                    />
                                    {formdaterror?.workShops?.[key]?.RegisteredFeeOption == "Error" &&
                                        <div className="col-12">
                                            Please select Registration Details
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 pe-0">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        for="exampleFormControlSelect1"
                                    >
                                        Registered as
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        className="no-padding-input"
                                        value={val['feeData']?.feeStructure?.[val['RegisteredFeeOption']]?.filter(function (types) {
                                            return types.value == val.RegisteredFeeOptionSub;
                                        })}
                                        onChange={(value) => { onChangeInputWorkshopFee('RegisteredFeeOptionSub', value, key) }}
                                        options={val['feeData']?.feeStructure?.[val['RegisteredFeeOption']]}
                                    />

                                </div>
                            </div>
                            <div className="col-md-2 pe-0">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        for="exampleFormControlSelect1"
                                    >
                                        Discount (%)
                                    </label>

                                    <input
                                        type="text"
                                        value={val.discountApplied}
                                        onChange={(value) => onChangeInputWorkshop('discountApplied', value.target, key)}
                                    />

                                </div>
                            </div>
                            <div className="col-md-2 pe-0">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        for="exampleFormControlSelect1"
                                    >
                                        Fee
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        value={val.RegisteredTotalFee}
                                    />

                                </div>
                            </div>
                            <div className="pe-0">
                                <div className="form-group">
                                    <label
                                        className="form-label"
                                        for="exampleFormControlSelect1"
                                    >
                                        Status
                                    </label>
                                    <Select
                                        styles={customStyles}
                                        value={status.filter(function (types) {
                                            return types.value == val.registrationStatus;
                                        })}
                                        className="no-padding-input"
                                        onChange={(value) => onChangeInputWorkshop('registrationStatus', value,key)}
                                        options={status}
                                        
                                    />
                                </div>
                            </div>
                        </li>
                    })}

                </ul>

                <div className="col-md-12 mt-4">
                    <button onClick={(e) => addMore(e)} className="special-action">
                        <HiPlus /> Add workshop
                    </button>
                </div>
            </section>
            <ConfirmationModal
                show={isDelete}
                onCloseModal={() => { setIsDelete(false), setDeleteHolder(false) }}
                heading="Delete Workshop"
                body="Are you sure to delete this workshop registration?"
                handelDelete={() => handelDelete()}
            />
        </>
    )
}
export default registraionItems;
