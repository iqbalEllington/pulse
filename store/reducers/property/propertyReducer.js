import * as Types from "../../Types";
const initialState = {
  bookingForm: {
    Name: "",
    Email: "",
    Property: "",
    Message: "",
    MobileCountry: "",
    MobileCountryName: "ae",
    Mobile: "",
    Date: false,
    Hour: "",
    Token:""
  },
};
const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PUT_BOOKING_FORM_DATA:
      var formData = { ...state.bookingForm };
      formData[action.payload.key] = action.payload.value;
      return {
        ...state,
        bookingForm: formData,
      };
    case Types.RESET_FORM:
      var formData = { ...state };
      return {
        ...state,
        bookingForm: initialState.bookingForm,
      };
    default:
      return {
        ...state,
      };
      break;
  }
};
export default propertyReducer;
