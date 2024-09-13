import axios from "axios";
import { API_GET_SEARCH } from "../store/ApiEndpoint";
import * as types from "../services/constant"
let newURL = {
  buy: "sales",
  rent: "lettings",
};

export const getAvailablityofBooking = async (props, date = false) => {
  try {
    if (date == false) {
      date = "tomorrow";
    }
    const success = await axios.get(
      `${API_GET_SEARCH}dubai/property/book-a-view/sales/`+props.propertyId+`?date=` +
        date
    );
    console.log(`${API_GET_SEARCH}+dubai/property/book-a-view/sales/`+props.propertyId+`?date=` +date)
    if (success.status == 200) {
      return {
        status: 200,
        data: {
          availability: success.data.data.data,
        },
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    console.log("its error", error);
    return error;
  }
};

export const bookPropertyViews = async (props,token) => {
  try {
    props.Token=token;
    var options = {
      method: "POST",
      url:
        API_GET_SEARCH +
        "dubai/property/book-a-view/sales/dubai-" +
        props.Property,
      params: { date: props.Date },
      headers: { "Content-Type": "application/json" },
      data: props,
    };
    var result = await axios.request(options);
    if (result.data.status == 200) {
      return {
        status: result.data.status,
      };
    } else {
      return {
        status: result.data.status,
      };
    }
  } catch (error) {
    console.log("its error", error);
    return false;
  }
};

export const getPropertyURL = async (props) => {
  try {
    var options = {
      method: "GET",
      url:
        API_GET_SEARCH +
        "dubai/property/" +
        props.propertyId,
      headers: { "Content-Type": "application/json" },
    };
    var result = await axios.request(options);
    if (result.data.status == 202) {
      let url="";
      if(result.data.data.property.fields['pba__listingtype__c']==types.SERVER_SALES)
      {
        url= process.env.NEXT_PUBLIC_REGION+"/property/"+types.WEBSITE_SALES+"/"+process.env.NEXT_PUBLIC_REGION+"-"+props.propertyId
      }else{
        url= process.env.NEXT_PUBLIC_REGION+"/property/"+types.WEBSITE_LETTINGS+"/"+process.env.NEXT_PUBLIC_REGION+"-"+props.propertyId
      }
      return {
        status: result.data.status,
        data:url
      };
    } else {
      return {
        status: result.data.status,
      };
    }
  } catch (error) {
    console.log("its error", error);
    return false;
  }
};
