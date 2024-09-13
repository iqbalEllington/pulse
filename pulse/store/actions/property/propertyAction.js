import * as Types from "../../Types";

export const putBookingFormData = (inputKey, inputValue) => {
    try {
      return async (dispatch) => {
        var inputData = {
          key: inputKey,
          value: inputValue,
        };
        dispatch(actionPutBookingFormData(inputData));
        return;
      };
    } catch (error) {
      console.log("error action putSearchParam", error);
      return;
    }
  };
  const actionPutBookingFormData = (formData) => ({
    type: Types.PUT_BOOKING_FORM_DATA,
    payload: formData,
  });
  

  export const resetPropertyForm = () => {
    try {
      return async (dispatch) => {
        dispatch(actionResetPropertyForm("Reset Form"));
        return;
      };
    } catch (error) {
      console.log("error action putSearchParam", error);
      return;
    }
  };
  const actionResetPropertyForm = (tag) => ({
    type: Types.RESET_FORM,
    payload: tag,
  });