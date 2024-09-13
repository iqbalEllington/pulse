import { param } from "jquery";
import { API_SERVER_SHORT_URL, API_GET_SEARCH } from "../store/ApiEndpoint";
import axios from "axios";
function listener() {
  let token = select(store.getState());
  axios.defaults.headers.common["Authorization"] = token;
}

class searchService {
  baseURL = process.env.NEXT_PUBLIC_REGION+"/properties/";
  currentURL = "";
  newURL = this.baseURL;
  searchParams = {
    buy: "sales",
    rent: "lettings",
  };

  __Construct($searchParams) { }
  setSearch(searchParams) {
    // searchParams==
    var status = "";
    if (searchParams.propertyStatus[0] == "sales") {
      status = this.searchParams.buy;
    } else {
      status = this.searchParams.rent;
    }
    let newURL = this.baseURL + searchParams.businessType + "/" + status;
    if (searchParams.propertyTypes.length > 0) {
      newURL += "/propertytype-" + searchParams.propertyTypes.join("--");
    }
    if (searchParams.bedroom.length && searchParams.businessType[0].toLowerCase()=='residential' ) {
      var str = searchParams.bedroom.join("-OR-");
      newURL += "/" + str.replace("+", "") + "-bedrooms-or-more";
    }
    if (searchParams.inAreas.keywordwithArea_Codes_aa__c.length) {
      newURL += "/in-areas-";
      newURL += searchParams.inAreas.keywordwithArea_Codes_aa__c.join("--");
    }
    if (searchParams.inKeywords.length) {
      newURL += "/in-keywords-";
      newURL += searchParams.inKeywords.join(`--`);
    }
    if (searchParams.minArea.length > 0 || searchParams.maxArea.length > 0) {
      if (searchParams.maxArea.length > 0 && searchParams.minArea.length > 0) {
        newURL +=
          "/between-" +
          searchParams.minArea +
          "-and-" +
          searchParams.maxArea+"-squarefeet";
      } else if (searchParams.maxArea.length > 0) {
        newURL +=
          "/" + searchParams.maxArea + "-squarefeet-or-less"
      } else if (searchParams.minArea.length > 0) {
        newURL += "/" + searchParams.minArea + "-squarefeet-or-more";
      }
    } 
    if (searchParams.amenities.length>0) {
      newURL += "/with-";
      newURL += searchParams.amenities.join(`+`)
    }
    if (searchParams.isFurnished.length>0) {
      newURL += "/and-furnished";
    }
    if (searchParams.inPriceMax.length > 0 || searchParams.inPriceMin.length > 0) {
      if (searchParams.inPriceMax.length > 0 && searchParams.inPriceMin.length > 0) {
        newURL +=
          "/between-" +
          searchParams.inPriceMin +
          "-and-" +
          searchParams.inPriceMax;
      } else if (searchParams.inPriceMax.length > 0) {
        newURL +=
          "/" + searchParams.inPriceMax + "-aed-or-less"
      } else if (searchParams.inPriceMin.length > 0) {
        newURL += "/" + searchParams.inPriceMin + "-aed-or-more";
      }
    }
    if(searchParams.sort.length>0){
      newURL += "/sort-" + searchParams.sort
    }
    if (searchParams.page > 1) {
      newURL += "/page-" + searchParams.page
    }
    this.newURL = newURL.toLowerCase();
    // window.history.replaceState(
    //   null,
    //   "New Page Title",
    //   API_SERVER_SHORT_URL + this.newURL
    // );
    return this.newURL;
  }

  popupSearch(searchParams) {
    // searchParams==
    var status = "";
    if (searchParams.propertyStatus[0] == "sales") {
      status = this.searchParams.buy;
    } else {
      status = this.searchParams.rent;
    }
    let newURL = this.baseURL + searchParams.businessType + "/" + status;
    //www.allsoppandallsopp.com/dubai/properties/sales/3-bedrooms-or-more/in-areas-dub-dubai/in-keywords-dub/between-2.8m-aed-and-45m-aed/status-all/apartments/with-water-view+golf-course-view+rented
    if (searchParams.propertyTypes.length > 0) {
      newURL += "/propertytype-" + searchParams.propertyTypes.join("--");
    }

    if (searchParams.bedroom.length) {
      var str = searchParams.bedroom.join("-OR-");
      newURL += "/" + str.replace("+", "") + "-bedrooms-or-more";
    }
    if (searchParams.inAreas.keywordwithArea_Codes_aa__c.length) {
      newURL += "/in-areas-";
      newURL += searchParams.inAreas.keywordwithArea_Codes_aa__c.join("--");
    }
    if (searchParams.status.length) {
      if(searchParams.status[0].toLowerCase()!="for sale - live" && searchParams.status[0].toLowerCase()!="to let - live"){
        newURL += "/status-";
        newURL += searchParams.status.join("-");
      }
    }
    if (searchParams.inKeywords.length) {
      newURL += "/in-keywords-";
      newURL += searchParams.inKeywords.join(`--`);
    }
    if (searchParams.inPriceMax.length > 0 || searchParams.inPriceMin.length > 0) {
      if (searchParams.inPriceMax.length > 0 && searchParams.inPriceMin.length > 0) {
        newURL +=
          "/between-" +
          searchParams.inPriceMin +
          "-and-" +
          searchParams.inPriceMax;
      } else if (searchParams.inPriceMax.length > 0) {
        newURL +=
          "/" + searchParams.inPriceMax + "-aed-or-less"
      } else if (searchParams.inPriceMin.length > 0) {
        newURL += "/" + searchParams.inPriceMin + "-aed-or-more";
      }
    }
    if (searchParams.amenities.length>0) {
      newURL += "/with-";
      newURL += searchParams.amenities.join(`+`)
    }
    if (searchParams.page > 1) {
      newURL += "/page-" + searchParams.page
    }
    this.newURL = newURL.toLowerCase();
    // window.history.replaceState(
    //   null,
    //   "New Page Title",
    //   API_SERVER_SHORT_URL + this.newURL
    // );
    return this.newURL;
  }

  // Access token to be added
  async isArea(search) {
    try {
      const success = await axios.get(
        `${API_GET_SEARCH}search/dubai/properties/areas/${search}`
      );
      if (success.data.total > 0) {
        return {
          status: 200,
          data: {
            area_codes_aa__c: success.data.data[0].fields.area_codes_aa__c[0],
            name: success.data.data[0].fields.name[0],
          },
        };
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.log("its error", error);
      return (error);
    }
  }
  async mapMarkers() {
    try {
      let result = window.location.pathname.split('/').slice(3).join('/');
      const success = await axios.get(
        `${API_GET_SEARCH}dubai/properties/mapview/${result}`
      );
      if (success.data.total > 0) {
        return {
          status: 200,
          data: success.data
        };
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.log("its error", error);
      return (error);
    }
  }

  spliturl() {
    let searchParams = {};
    let newURL =
      this.baseURL +
      searchParams.businessType +
      "/" +
      searchParams.propertyStatus;

    return "newURL";
  }
  pagination(resultCount, pageCount) {
    let totalPages = resultCount / pageCount
    if (totalPages > 0) {

    }
  }
  getURLPropertyType(type){
    if (type == "Sale") {
      return this.searchParams.buy;
    } else {
      return this.searchParams.rent;
    }
  }

  getURL() { }
}
export default searchService;
