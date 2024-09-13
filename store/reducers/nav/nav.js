import * as Types from "../../Types";

const initialState = {
  active: "640221bbe7068f73d5de4a7a",
  ismini:true
};

const NavReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case Types.SET_MENU:
      return {
        ...state,
        active: action.payload,
      };
    
    case Types.IS_MINI:
        return {
          ...state,
          ismini: action.payload,
        };
      
    default:

      return {
        ...state,
      };
      break;
  }
};
export default NavReducer;
