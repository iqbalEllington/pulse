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
// Updated loginAction for better callback handling
export const loginAction = (loginData, callback) => async (dispatch) => {
  let response = {
    userData: {},
    tokenData: "",
    isLoggedIn: false,
    isLoading: true,
  };

  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}api/auth/verify-otp`;

  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    };

    const res = await fetch(URL, options);
    const data = await res.json();

    if (data?.error?.status) {
      dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
      callback(data?.error?.message, false);
    } else if (!data) {
      dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
      callback(false, false);
    } else {
      // Successful login
      response.userData = data.user;
      response.tokenData = data.token;
      response.isLoggedIn = true;
      response.isLoading = false;

      Cookies.set("userDetail", JSON.stringify(data.user));
      Cookies.set("token", data.token, { secure: true, sameSite: "Strict", expires: 14 });

      dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: response });

      if (callback) {
        callback(data.message, data.user);
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    showToast("error", "Network Error, Please try again later.");
    dispatch({ type: Types.AUTH_LOGIN_CHECK, payload: false });
    callback(false, false);
  }
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
