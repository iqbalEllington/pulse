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

const attendance = (props) => {
    const [totalAttendance, setTotalAttendance] = useState(0)
    const [attendance, setAttendance] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function loadAttendance() {
        try {
            const response = await getRequest({
                API: API_URLS.ATTENDANCE + "?filters[registrations]=" + props.registrationId + "&pagination[limit]=1000"
            });
            if (response?.status === 200) {
                const resultObject = {};

                const responseData = response?.data?.data;
                var totalminutes = 0
                if (responseData) {
                    responseData.forEach((entry) => {
                        const date = moment(entry.attributes.createdAt).format('YYYY-MM-DD');

                        // Initialize the date group if it doesn't exist
                        if (!resultObject[date]) {
                            resultObject[date] = {
                                entries: [],
                                minutesSpend: 0,
                            };
                        }

                        // Find the corresponding date group
                        const dateGroup = resultObject[date];

                        // Check if the entry is a check-in
                        if (entry.attributes.action === 'checkIn') {
                            // Add a new entry with check-in time
                            dateGroup.entries.push({
                                checkintime: moment(entry.attributes.time).format('HH:mm'),
                                checkouttime: null,
                                totalMinutes: null
                            });
                        } else if (entry.attributes.action === 'checkOut') {
                            // Find the latest check-in entry in the date group
                            const latestCheckIn = dateGroup.entries[dateGroup.entries.length - 1];

                            if (latestCheckIn) {
                                // Update the checkout time for the latest check-in entry
                                latestCheckIn.checkouttime = moment(entry.attributes.time).format('HH:mm');
                                // Calculate the minutes spent and update the totalminutes variable
                                const checkInMoment = moment(latestCheckIn.checkintime, 'HH:mm');
                                const checkOutMoment = moment(latestCheckIn.checkouttime, 'HH:mm');
                                const minutesSpend = checkOutMoment.diff(checkInMoment, 'minutes', true);
                                latestCheckIn.minutesSpend = minutesSpend;
                                totalminutes += minutesSpend;
                                dateGroup.minutesSpend += minutesSpend;
                            }
                        }
                    });
                    setAttendance(resultObject)
                    setTotalAttendance(totalminutes)
                } else {
                    // Handle the case where responseData is not an array
                }
            }
        } catch (error) {
            console.error("Error loading payments:", error);
        }
    }

    useEffect(() => {
        if (props.registrationId != undefined) {
            loadAttendance()
        }
    }, [props.registrationId])
    return (
        <>
            <div className="attendance p-4">
                <div className="attendancetitle">
                    <h4>Attendance</h4>
                    <div className="totalHours">
                        <div className="cirle-total">
                            <span className="hours-holder">
                                <span className="hoursText">Total Hours Spend</span>
                                <span className="hours"> {(totalAttendance / 60).toFixed(2)}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <ul>
                    {attendance != false && <>
                        {Object.keys(attendance)?.map((value, key) => {
                            return <li>
                                <h5>{value}</h5>
                                <table>
                                    {attendance[value].entries?.map((val) => {
                                        return <tr>
                                            <td><span className="checkin">Check In</span></td>
                                            <td>{moment(val.checkintime, "HH:mm").format("h:mm a")}</td>
                                            <td><span className="checkout">Check Out</span></td>
                                            <td>{val.checkouttime != null ? moment(val.checkouttime, "HH:mm").format("h:mm a") : "Not Found"}</td>
                                            <td>{val.minutesSpend > 60 ? (val.minutesSpend / 60).toFixed(2) + " Hours" : (val.minutesSpend != undefined ? val.minutesSpend.toFixed(2) + " Minutes" : "")} </td>
                                        </tr>
                                    })}

                                </table>
                            </li>
                        })}

                    </>
                    }
                </ul>

            </div>
        </>
    )

}
export default attendance;
