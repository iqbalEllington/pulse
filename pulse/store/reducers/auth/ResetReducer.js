import * as Types from "../../Types";

// Initial state
const initialState = {
  email: "",
  isMailSend: false,
  code:""
};

const ResetReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case Types.UPDATE_RESET_STAUS:
      newState.email=action.payload.email;
      newState.isMailSend=action.payload.isMailSend;
      return newState;
      break;

    case Types.RESET_GET_RESET_STATUS:
      return newState;
    default:
      break;
  }
  return newState;
};

export default ResetReducer;
