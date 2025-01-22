import * as Types from "../../Types";
// import * as JwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode";

// import { generateToken } from "../../services/token/TokenService";
import axios from "axios";
import { showToast } from "../../../components/master/Helper/ToastHelper";
import Cookies from "js-cookie";
// import { getUserDataActio  n } from "../../../components/getUserData/Action/UserDataAction";
// import { API_POST_LOGIN } from "../../ApiEndpoint";

export const handleLoginInput = (name, value) => (dispatch) => {
  const formData = {
    name: name,
    value: value,
  };
  dispatch({ type: Types.CHANGE_LOGIN_INPUT_FIELD, payload: formData });
};

//Login
export const loginAction = (loginData, callback) => (dispatch) => {
  let response = {
    userData: {},
    tokenData: {},
    isLoggedIn: false,
    isLogging: false,
    loginMessage: "",
    isLoading: true,
  };
  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}api/auth/verify-otp`;
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    };
    fetch(`${URL}`, options)
      .then(response => response.json())
      .then(response => {
        const data = response;
    
        if (data?.error?.status) {
          dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
          callback(data?.error?.message, false)
          return 
        } else {
          if (data == undefined) {
            dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
            callback(false, false)
            return
          } else {
            response.userData = data.user;
            response.tokenData = data.token;
            response.isLoading = false;
            response.isLoggedIn = true;
            response.loginMessage = "Success";
            response.isLogging = true;
            Cookies.set("userDetail", JSON.stringify(data.user))
            Cookies.set("token", data.token, { secure: true, sameSite: 'Strict', expires: 14 });
            dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: response });
            if (callback) {
              callback(data.message, data.user);
              return
            } else {
              callback(false, false)
              return
            }
          }
        }

      })
      .catch(error => {
        const responseLog = error;
        response.isLoading = false;
        if (typeof responseLog !== undefined) {
          if (responseLog?.status == 400) {
            showToast("error", "Email or Password is not matching");
          } else {
            showToast("error", "something Went Wrong Please try again later");
          }
          dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: response });
          callback(false, false)
          return
        } else {
          showToast("error", "something Went Wrong Please try again later");
          dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
          callback(false, false)
          return
        }
      });
  } catch (error) {
    response.isLoading = false;
    showToast("error", "Network Error, Please Fix this !");
    dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
    callback(false, false)
    return
  }
  return
};

export const emptyDispatch = () => (dispatch) => {
  const isLogging = false;
  dispatch({ type: Types.EMPTY_DISPATCH, payload: isLogging });
};

export const getAuthData = () => async (dispatch) => {
  let data = await getLoginData();
  if (data !== null && data !== undefined && data !== "undefined" && data !== "") {
    if ((await checkTokenExpired()) == true) {
      data.userData = "";
      data.isLoggedIn = false;
      data.tokenData = "";
    } else {
      data.isLoggedIn = true;
      data.userData = data.loginData;
      data.tokenData = data.token;
    }
  } else {
    data = {};
    data.userData = "";
    data.isLoggedIn = false;
    data.tokenData = "";
  }
  dispatch({ type: Types.AUTH_GET_LOGIN_DATA, payload: data });
};

export const logoutUserData = () => (dispatch) => {
  Cookies.remove("token");
  Cookies.remove("userDetail");
  // Cookies.setItem("access_token", null);
  dispatch({ type: Types.AUTH_POST_LOGOUT, payload: true });
};

/**
 * checkTokenExpired
 *
 * Check if Jwt token is expred or not; true=>expired, false=>valid
 */
function checkTokenExpired() {
  var current_time = new Date().getTime() / 1000;
  let loginData = Cookies.get("userDetail");
  let jwt = "";
  if (loginData !== null && loginData !== "undefined" && loginData !== undefined) {
    const token = Cookies.get("token");
    jwt = jwt_decode(token);
  }
  if (current_time > jwt.exp) {
    return true;
  } else {
    return false;
  }
}

/**
 * getJwtToken
 *
 * Get jwt access token
 */
async function getJwtToken() {

  // let loginData = Cookies.get("token");
  let loginData = Cookies.get("userDetail");;
  if (await !checkTokenExpired()) {
    return Cookies.get("token");;
  } else {
    return null;
  }
}

function getLoginData() {

  let loginData = Cookies.get("userDetail");
  let token = Cookies.get("token");
  if (
    loginData !== null &&
    loginData !== undefined &&
    loginData != "" &&
    loginData != "undefined"
  ) {
    loginData = JSON.parse(loginData);
    return {
      loginData: loginData,
      token: token,
    };
  } else {
    return loginData;
  }
}
