import * as Types from "../../Types";
import * as JwtDecode from "jwt-decode";
// import { generateToken } from "../../services/token/TokenService";
import axios from "axios";
import { showToast } from "../../../components/master/Helper/ToastHelper";
// import { API_POST_LOGIN } from "../../ApiEndpoint";


//Login 
export const resetAction = (resetData) => (dispatch) => {
  let response = {
    email: resetData.email,
    isMailSend: false,
    code:""
  }
  // dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}user/forgot-password/`;
  try {
    axios.post(URL, resetData)
      .then((res) => {
        if (res.status) {
          showToast('success', "Please Check you Email for reset link");
          const { data } = res;
          response.isMailSend = true;
          dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
        } else {
          response.isMailSend = false;
          dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
        }
      })
      .catch((error) => {
        response.isMailSend = false;
        dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
        const responseLog = error.response;
        response.isLoading = false;
        showToast('error', "Something wrong, Can't send reset email");

      })
  } catch (error) {
    response.isLoading = false;
    showToast('error', 'Network Error, Please Fix this !');
  }
}

export const newPasswordAction = (resetData) => (dispatch) => {
  let response = {
    email: resetData.email,
    isMailSend: false,
    code:""
  }
  // dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}auth/reset-password/`;
  try {
    axios.post(URL, resetData)
      .then((res) => {
        if (res.status==200) {
          showToast('success', "Password Reset Successfull");
          const { data } = res;
          response.isMailSend = true;
          dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
        } else {
          response.isMailSend = false;
          dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
        }
      })
      .catch((error) => {
        response.isMailSend = false;
        dispatch({ type: Types.UPDATE_RESET_STAUS, payload: response })
        const responseLog = error.response;
        response.isLoading = false;
        showToast('error', "Something wrong, Can't send reset email");

      })
  } catch (error) {
    response.isLoading = false;
    showToast('error', 'Network Error, Please Fix this !');
  }
}
