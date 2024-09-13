import * as Types from "../../Types";
import * as JwtDecode from "jwt-decode";
// import { generateToken } from "../../services/token/TokenService";

import axios from "axios";
import { showToast } from "../../../components/master/Helper/ToastHelper";
import { toast } from "react-toastify";

//handle change register input field
export const ChangeRegisterInputField = (name, value) => (dispatch) => {
  const registerData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_REGISTER_INPUT_FIELD, payload: registerData });
};

// handle register first step
export const RegisterFirstStep = (registerInput, callback) => (dispatch) => {
  let response = {
    message: null,
    status: false,
    isLoading: true,
  };
  dispatch({ type: Types.REGISTER_FIRST_STEP, payload: response });
  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}user/create-user`;
  try {
    axios
      .post(URL, {
        email: registerInput.email,
        password: registerInput.password,
        personal_details: {
          first_name: registerInput.first_name,
          last_name: registerInput.last_name,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          response.message = res.data.message;
          response.isLoading = false;
          toast("Account Created Successfully", {
            type: "success",
          });
          dispatch({ type: Types.REGISTER_FIRST_STEP, payload: response });
          callback(res);
          // setStepNo(2)
        } else {
          toast("error", "Something Went wrong please try again later");
        }
      })
      .catch(function (error) {
        // setStepNo(1)
        const responseLog = error.response;
        // console.log("adasdsa", responseLog);
        response.isLoading = false;
        if (typeof responseLog?.status !== "undefined") {
          const { request, ...errorObject } = responseLog.data;
          dispatch({ type: Types.REGISTER_FIRST_STEP, payload: responseLog });

          if (responseLog.data.error) {
            if (responseLog.status == 400) {
              toast("Email ALready Exista", {
                type: "error",
              });
            } else {
              toast(responseLog.msg, {
                type: "error",
              });
              // const errorMessage = responseLog.statusText;
            }
          } else {
            toast(responseLog.data.msg, {
              type: "error",
            });
            return;
          }
        } else {
          response.isLoading = false;
          toast("Something went wrong !", {
            type: "error",
          });
        }
      });
  } catch (error) {
    response.isLoading = false;
    toast("error", "Network Error, Please Fix this !");
  }
  dispatch({ type: Types.REGISTER_FIRST_STEP, payload: response });
};

// customer register step two / final
export const customerRegister = (registerInput) => async (dispatch) => {
  if (registerInput.otp.length === 0) {
    showToast("error", "OTP can't be blank!");
    return false;
  }
  if (registerInput.password.length === 0) {
    showToast("error", "Password can't be blank!");
    return false;
  }
  if (registerInput.password_confirmation.length === 0) {
    showToast("error", "Confirm password can't be blank!");
    return false;
  }
  let response = {
    message: null,
    status: false,
    data: null,
    isLoading: true,
  };
  dispatch({ type: Types.AUTH_REGISTER, payload: response });
  axios
    .post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}auth/register-next`,
      registerInput
    )
    .then((res) => {
      if (res.data.status) {
        response.message = res.data.message;
        response.data = null;
        response.isLoading = false;
        showToast("success", response.message);
        dispatch({ type: Types.AUTH_REGISTER, payload: response });
      }
    })
    .catch((err) => {
      const { response } = err;
      const { request, ...errorObject } = response;
      response.isLoading = false;
      dispatch({ type: Types.AUTH_REGISTER, payload: response });
      showToast("error", response.data.message);
    });
  dispatch({ type: Types.AUTH_REGISTER, payload: response });
};
