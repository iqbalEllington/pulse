import axios from "axios";
import { API_GET_SEARCH } from "../store/ApiEndpoint";
import * as types from "./constant"
let newURL = {
  buy: "sales",
  rent: "lettings",
};

export const registration = async (props, event) => {
  try {
    // props.Token=token;
    var options = {
      method: "POST",
      url:API_GET_SEARCH +
        "registrations/"+event+"/register",
      headers: { "Content-Type": "application/json" },
      data: props
    };
    var result = await axios.request(options);
    if (result.status == 200) {
      return {
        status: result.status,
      };
    } else {
      return {
        status: result.status,
      };
    }
  } catch (error) {
    console.log("its error", error);
    return false;
  }
};