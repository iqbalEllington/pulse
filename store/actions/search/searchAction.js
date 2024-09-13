import * as Types from "../../Types";
import axios from "axios";
import { API_GET_SEARCH } from "../../ApiEndpoint";
import search from "../../../components/layouts/page/search/search";
// import { getURL } from "next/dist/next-server/lib/utils";

export const getSugessions = (searchParams, search) => {
  return async (dispatch) => {
    function onSuccess(SuccessData) {
      // dispatch({ type: CREATE_USER, payload: success });
      dispatch(actionGetSearchSugessions(SuccessData));
      return;
    }
    function onError(error) {
      console.log(error);
    }
    try {
      var status = "";
      if (
        searchParams.propertyStatus[0] == "sales" ||
        searchParams.propertyStatus[0] == "Buy"
      ) {
        status = "sales";
      } else {
        status = "lettings";
      }
      const req = await axios.get(
        `${API_GET_SEARCH}search/dubai/properties/areas/${searchParams.businessType}/${status}/${search}`
      ).then(res => {
        var payloadData = {
          data: res.data.data,
          total: res.data.total,
        };
        return onSuccess(payloadData);
      });
      return
      // req instanceof Promise; // true
      // const res = await req;
      // var payloadData = {};
      // await req.then(res => {
      //   payloadData = {
      //     data: res.data.data,
      //     total: res.data.total,
      //   };
      // });
      
    } catch (error) {
      return onError(error);
    }
  };
};

const actionGetSearchSugessions = (searchParams) => ({
  type: Types.GET_SUGGESTION,
  payload: searchParams,
});

export const setResult = (searchParams) => {
  return async (dispatch) => {
    function onSuccess(SuccessData) {
      dispatch(actionSetSearchData(SuccessData));
      return;
    }
    function onError(error) {
      console.log(error);
    }
    try {
      const payloadData = {
        data: searchParams.data,
        total: searchParams.total,
        filter: searchParams.filter,
        params: searchParams.params,
      };
      return onSuccess(payloadData);
    } catch (error) {
      return onError(error);
    }
  };
};
export const setSlideStaus = (slide) => {
  return async (dispatch) => {
    try {
      dispatch(actionSetSlideStatus(slide));
      return;
    } catch (exception) {
      console.log("exception on set pagination");
    }
  };
};
const actionSetSlideStatus = (slide) => ({
  type: Types.SET_SLIDES,
  payload: slide,
});
export const setSearchResults = (url) => {
  return async (dispatch) => {
    function onSuccess(SuccessData) {
      // dispatch({ type: CREATE_USER, payload: success });
      dispatch(actionSetSearchData(SuccessData));
      return;
    }
    function onError(error) {
      console.log(error);
    }
    try {
      const success = await axios.get(`${API_GET_SEARCH}${url}`);
      const payloadData = {
        data: success.data.data,
        total: success.data.total,
        filter: success.data.filter,
        params: "loaded",
      };
      return onSuccess(payloadData);
    } catch (error) {
      return onError(error);
    }
  };
};


export const setInfinitySearch = (url) => {
  return async (dispatch) => {
    function onSuccess(SuccessData) {
      // dispatch({ type: CREATE_USER, payload: success });
      dispatch(actionSetInfinitySearchData(SuccessData));
      return;
    }
    function onError(error) {
      console.log(error);
    }
    try {
      const success = await axios.get(`${API_GET_SEARCH}${url}`);
      const payloadData = {
        data: success.data.data,
        params: "loaded",
      };
      return onSuccess(payloadData);
    } catch (error) {
      return onError(error);
    }
  };
};
const actionSetInfinitySearchData = (searchData) => ({
  type: Types.SET_INFINITY_SEARCH,
  payload: searchData,
});

const actionSetSearchData = (searchData) => ({
  type: Types.SET_SEARCH,
  payload: searchData,
});

export const putSearchParam = (ParamData, ParamValue) => {
  try {
    return async (dispatch) => {
      var filterData = {
        key: ParamData,
        value: ParamValue,
      };
      dispatch(actionPutSearchParam(filterData));
      return;
    };
  } catch (error) {
    console.log("error action putSearchParam", error);
    return;
  }
};
const actionPutSearchParam = (filterData) => ({
  type: Types.PUSH_FILTER,
  payload: filterData,
});

export const setpaginationStatus = (paginationStatus) => {
  return async (dispatch) => {
    try {
      dispatch(actionSetpaginationStatus(paginationStatus));
      return;
    } catch (exception) {
      console.log("exception on set pagination");
    }
  };
};
const actionSetpaginationStatus = (paginationStatus) => ({
  type: Types.ACTION_FILTER_STATUS,
  payload: paginationStatus,
});

export const deleteSearchParam = (ParamKey, ParamValue) => {
  try {
    return async (dispatch) => {
      var filterData = {
        key: ParamKey,
        value: ParamValue,
      };
      dispatch(actionDeleteSearchParam(filterData));
      return;
    };
  } catch (error) {
    console.log("error action putSearchParam", error);
    return;
  }
};
const actionDeleteSearchParam = (filterData) => ({
  type: Types.REMOVE_FILTER,
  payload: filterData,
});
