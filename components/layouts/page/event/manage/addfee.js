import moment from "moment";
import { useEffect, useState } from "react"
import { Dropdown } from "react-bootstrap"
import { API_URLS } from "helper/apiConstant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getRequest } from "helper/api";
function addfee(props) {
    const [open, setOpen] = useState([])
    const opened = (event, e) => {
        event.preventDefault()
        var newOpens = open;
        if (newOpens.indexOf(e) == -1) {
            newOpens.push(e)
        } else {
            newOpens.splice(newOpens.indexOf(e), 1);
        }
        setOpen([...newOpens])
        var newOpens = fees;
        newOpens[e]["enableStructures"] = {
            earlyBird: [{
                id: "",
                name: "",
                date: "",
                fee: "",
            }]
        }
        setFees([...newOpens])
    }
    const addmore = (e) => {
        e.preventDefault();
        var newOpens = fees;
        newOpens.push({
            id: "",
            delegateType: "",
            Fee: "",
            currency: "",
            Seats: "",
            enableStructures: false,
        })
        setFees([...newOpens])
    }
    const addmorestr = (e, key) => {
        e.preventDefault();
        var newOpens = fees;
        if (newOpens[key]["enableStructures"] != false) {
            newOpens[key]["enableStructures"]["earlyBird"].push({
                id: "",
                name: "",
                date: "",
                fee: "",
            })
        }else{
            newOpens[key]["enableStructures"]={
                "earlyBird":[{
                    id: "",
                    name: "",
                    date: "",
                    fee: "",
                }]
            }
        }

        setFees([...newOpens])
    }
    const deleterow = (e, key) => {
        e.preventDefault();
        var newOpens = fees;
        newOpens.splice(key);
        setFees([...newOpens])
    }
    const cahngeInput = (key, value) => {
        var newOpens = fees;
        newOpens[key][value.name] = value.value
        setFees([...newOpens])
    }
    const setEarlyBird = (key, event, index, key1) => {
        if (key == "earlyBirdDate") {
            var date = moment(event).format('YYYY-MM-DD');
            var newOpens = fees;
            newOpens[index]["enableStructures"]["earlyBird"][key1]["date"] = date;
            setFees([...newOpens])
        } else if (key == "earlyBirdName") {
            var newOpens = fees;
            newOpens[index]["enableStructures"]["earlyBird"][key1]["name"] = event.target.value;
            setFees([...newOpens])
        }
        else {
            var date = moment(event).format('YYYY-MM-DD');
            var newOpens = fees;
            newOpens[index]["enableStructures"]["earlyBird"][key1]["fee"] = event.target.value;
            setFees([...newOpens])
        }

    }
    const [fees, setFees] = useState([
        {
            delegateType: "",
            Fee: "",
            currency: "",
            Seats: "",
            enableStructures: false,
        },
        {
            delegateType: "",
            Fee: "",
            currency: "",
            Seats: "",
            enableStructures: false,
        }
    ])
    async function loadFee() {
        const response = await getRequest({ API: API_URLS.GET_COURSE_FEE + "?filters[events][id][$in]=" + props.eventid + "&populate[]=course_fees&filters[isEarlyBird][$eq]=false" });
        if (response?.status === 200) {
            var data = response.data;
            var newOpens = [];
            var open = [];
            await data.data.map(async (value, key) => {
                open.push(key);
                var enableStructures = false;
                if (value?.attributes?.course_fees?.data.length > 0) {
                    enableStructures = {
                        earlyBird: []
                    };
                    await value.attributes.course_fees?.data?.map((value2, key2) => {
                        enableStructures["earlyBird"].push({
                            id: value2.id,
                            name: value2.attributes.category,
                            date: moment(value2.attributes.expiryDate).format('YYYY-MM-DD'),
                            fee: value2.attributes.fee
                        })
                    })
                }
                newOpens.push({
                    id: value.id,
                    delegateType: value.attributes.category,
                    Fee: value.attributes.fee,
                    currency: value.attributes.currency,
                    Seats: value.attributes.seats,
                    enableStructures: enableStructures,
                })
            })
            setOpen([...open])
            setFees(newOpens)
        } else {
            console.log(response, "data data data")
        }
    }
    useEffect(() => {
        if (props.eventid != false) {
            loadFee()
        }
    }, [])
    useEffect(() => {
        props.setformFee(fees)
    }, [fees])
    return (<>
        {fees.map((value, key) => {
            return <li className="flex-wrap">
                <div className="form-group">
                    <input name="delegateType" onChange={(e) => cahngeInput(key, e.target)} type="text" value={value.delegateType} placeholder="Delegate type" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Fee" name="Fee" onChange={(e) => cahngeInput(key, e.target)} value={value.Fee} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Seats" name="Seats" onChange={(e) => cahngeInput(key, e.target)} value={value.Seats} />
                </div>
                <div className="form-group centered-flex no-border">

                    <Dropdown>
                        <Dropdown.Toggle className="theme-button-trans" id="dropdown-basic">
                            ... Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <button onClick={(e) => opened(e, key)}>{open.includes(key) ? "Disable Fee Structure" : "Enable Fee Structure"}</button>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                {key !== 0 &&
                                    <button className="delete" onClick={(e) => deleterow(e, key)}>Delete</button>
                                } </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={open.includes(key) ? "col-12 feestructure active" : "col-12 feestructure"}>
                    <h5>
                        Early  Bird Fee Structure
                    </h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {value.enableStructures.earlyBird &&
                                <>
                                    {value.enableStructures.earlyBird?.map((value1, key1) => {
                                        return <tr>
                                            <td>
                                                <input type="text" name="earlyBirdName" value={value.enableStructures.earlyBird[key1].name} onChange={(e) => setEarlyBird("earlyBirdName", e, key, key1)} />
                                            </td>
                                            <td>
                                                <DatePicker
                                                    className="white_input col-12"
                                                    inputmode='none'
                                                    // minDate={state.startDate}
                                                    dateFormat="yyyy-MM-dd"
                                                    onChange={(e) =>
                                                        setEarlyBird(
                                                            "earlyBirdDate", e, key, key1
                                                        )
                                                    }
                                                    value={value.enableStructures.earlyBird[key1].date}
                                                    placeholderText={'Please Select Prefered Date*'}
                                                // selected={state.selectedDate}
                                                >
                                                </DatePicker>
                                            </td>
                                            <td><input type="text" name="earlyBirdFee" value={value.enableStructures.earlyBird[key1].fee} onChange={(e) => setEarlyBird("earlyBirdFee", e, key, key1)} /></td>
                                        </tr>
                                    })}
                                </>
                            }
                            <tr>

                                <button className="addmore" onClick={(e) => addmorestr(e, key)}>
                                    Add More
                                </button>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        })
        }
        <button className="addmore" onClick={(e) => addmore(e)}>
            Add More
        </button>
    </>
    )
}
export default addfee