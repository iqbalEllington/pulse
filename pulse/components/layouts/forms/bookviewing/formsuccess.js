import React, { Component } from "react";
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

function formsuccess() {
        return (
            <>
               
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
export default connect(mapStateToProps, mapDispachToProps)(formsuccess);