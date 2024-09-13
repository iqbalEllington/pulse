import * as Types from "../../Types";
// import { getURL } from "next/dist/next-server/lib/utils";



export const setMenu = (menu) => {
  return async (dispatch) => { 
    try {
      return dispatch(actionSetMenu(menu));
    } catch (error) {
      return console.log(error)
    }
  };
};
export const setIsMini = (menu) => {
  return async (dispatch) => { 
    try {
      return dispatch(actionSetIsMini(menu));
    } catch (error) {
      return console.log(error)
    }
  };
};
const actionSetMenu = (menu) => ({
  type: Types.SET_MENU,
  payload: menu,
});
const actionSetIsMini = (menu) => ({
  type: Types.IS_MINI,
  payload: menu,
});
