import moment from "moment";
import { FaLongArrowAltDown,FaLongArrowAltUp } from "react-icons/fa";
import { covertToCurrency, covertToMIllion } from "/services/utilsService";


const compareTableRow = (props) => {
    function formatAmount(value) {
        if (value > 1000000000) {
          return covertToMIllion(value / 1000000000) + "B";
        } else if (value > 1000000) {
          return covertToMIllion(value / 1000000) + "M";
        } else if (value > 1000) {
          return covertToMIllion(value / 1000) + "K";
        } else {
          return value?.toFixed(2)
        }
      }
    function isToday(dateString) {
        const givenDate = new Date(dateString);
        const today = new Date();
    
        // Check if year, month, and day match
        return (
          givenDate.getFullYear() === today.getFullYear() &&
          givenDate.getMonth() === today.getMonth() &&
          givenDate.getDate() === today.getDate()
        );
      }
      function calculatePercentageDifference(today,yesterday ) {
        if (yesterday === 0) {
          return {
            status: today > 0 ? "up" : today < 0 ? "down" : "no change",
            percentage: today > 0 ? "100" : today < 0 ? "-100" : "0"
          };
        }
    
        const difference = today - yesterday;
        const percentageChange = (difference / yesterday) * 100;
        const status = difference > 0 ? "up" : difference < 0 ? "down" : "no change";
    
        return {
          status: status,
          percentage: percentageChange.toFixed(0)
        };
      }
    const allOccuaranceData=props.allOccuaranceData
    return (
        <tr>
            <td>
                <span className="day-box">
                    {props.base}
                </span>
            </td>
            <td>
                <span className="baseValue">
                    {formatAmount(allOccuaranceData?.[props.base]?.attributes?.recieptCollection)}
                </span>
                {props.isCompare &&
                <span className="Comparealue">
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.recieptCollection, allOccuaranceData?.[props.toCompare]?.attributes?.recieptCollection).status == "up" &&
                        <><b className="up">
                            <FaLongArrowAltUp />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.recieptCollection, allOccuaranceData?.[props.toCompare]?.attributes?.recieptCollection).percentage} %</b> Higher than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.recieptCollection, allOccuaranceData?.[props.toCompare]?.attributes?.recieptCollection).status == "down" &&
                        <><b className="down">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.recieptCollection, allOccuaranceData?.[props.toCompare]?.attributes?.recieptCollection).percentage} %</b> Lower than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.recieptCollection, allOccuaranceData?.[props.toCompare]?.attributes?.recieptCollection).status == "no change" &&
                        <><b className="no-change">
                        </b> Same as {props.toCompare}
                        </>
                    }
                </span>
}
            </td>
            <td>
                <span className="baseValue">
                    {formatAmount(allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount)}
                </span>
                {props.isCompare &&
                <span className="Comparealue">
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount, allOccuaranceData?.[props.toCompare]?.attributes?.soldUnitAMount).status == "up" &&
                        <><b className="up">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount, allOccuaranceData?.[props.toCompare]?.attributes?.soldUnitAMount).percentage} %</b> Higher than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount, allOccuaranceData?.[props.toCompare]?.attributes?.soldUnitAMount).status == "down" &&
                        <><b className="down">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount, allOccuaranceData?.[props.toCompare]?.attributes?.soldUnitAMount).percentage} %</b> Lower than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount, allOccuaranceData?.[props.toCompare]?.attributes?.soldUnitAMount).status == "no change" &&
                        <><b className="no-change">
                        </b> Same as {props.toCompare}
                        </>
                    }
                </span>
}
            </td>
            <td>
                <span className="baseValue">
                    {allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount > 0 ?
                    <>
                {covertToCurrency((allOccuaranceData?.[props.base]?.attributes?.soldUnitAMount / allOccuaranceData?.[props.base]?.attributes?.soldunitsArea), false)}/sq.ft
                </>:
                "0.00"
}
                {/* {(allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold == null ? "0.00" : allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold)} */}
                </span>
                {props.isCompare &&
                <span className="Comparealue">
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).status == "up" &&
                        <><b className="up">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).percentage} %</b> Higher than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).status == "down" &&
                        <><b className="down">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).percentage} %</b> Lower than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.priceprsqftSold, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).status == "no change" &&
                        <><b className="no-change">
                        </b> Same as {props.toCompare}
                        </>
                    }
                </span>
}
            </td>
            <td>
                <span className="baseValue">
                    {(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated == null ? "0" : allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated)}
                </span>
                {props.isCompare &&
                <span className="Comparealue">
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionGenerated == "up" &&
                        <><b className="up">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionGenerated} %</b> Higher than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionGenerated == "down" &&
                        <><b className="down">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionGenerated} %</b> Lower than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionGenerated, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionGenerated == "no change" &&
                        <><b className="no-change">
                        </b> Same as {props.toCompare}
                        </>
                    }
                </span>
}
            </td>
            <td>
                <span className="baseValue">
                    {(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted == null ? "0" : allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted)}
                </span>
                {props.isCompare &&
                <span className="Comparealue">
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionExecuted == "up" &&
                        <><b className="up">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionExecuted} %</b> Higher than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionExecuted == "down" &&
                        <><b className="down">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionExecuted} %</b> Lower than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.SalesProgressionExecuted, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).SalesProgressionExecuted == "no change" &&
                        <><b className="no-change">
                        </b> Same as {props.toCompare}
                        </>
                    }
                </span>
}
            </td>
            <td>
                <span className="baseValue">
                    {(allOccuaranceData?.[props.base]?.attributes?.soldUnits == null ? "0" : allOccuaranceData?.[props.base]?.attributes?.soldUnits)}
                </span>
                {props.isCompare &&
                <span className="Comparealue">
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnits, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).soldUnits == "up" &&
                        <><b className="up">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnits, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).soldUnits} %</b> Higher than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnits, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).soldUnits == "down" &&
                        <><b className="down">
                            <FaLongArrowAltDown />
                            {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnits, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).soldUnits} %</b> Lower than {props.toCompare}
                        </>
                    }
                    {calculatePercentageDifference(allOccuaranceData?.[props.base]?.attributes?.soldUnits, allOccuaranceData?.[props.toCompare]?.attributes?.priceprsqftSold).soldUnits == "no change" &&
                        <><b className="no-change">
                        </b> Same as {props.toCompare}
                        </>
                    }
                </span>
}
            </td>
        </tr>
    )
}

export default compareTableRow;