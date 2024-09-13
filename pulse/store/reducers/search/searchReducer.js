import * as Types from "../../Types";

const initialState = {
  searchData: {
    data: {},
    total: 0,
  },
  filterData: {
  },
  filterDataBase: {
    r_lettings: {
      "minPrice": {
        "value": 28000
      },
      "property_Types": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Apartment",
            "doc_count": 262
          },
          {
            "key": "Villa",
            "doc_count": 46
          },
          {
            "key": "Townhouse",
            "doc_count": 12
          },
          {
            "key": "Penthouse",
            "doc_count": 4
          },
          {
            "key": "Duplex",
            "doc_count": 1
          }
        ]
      },
      "maxPrice": {
        "value": 2500000
      },
      "beds": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": 0,
            "doc_count": 31
          },
          {
            "key": 1,
            "doc_count": 107
          },
          {
            "key": 2,
            "doc_count": 96
          },
          {
            "key": 3,
            "doc_count": 55
          },
          {
            "key": 4,
            "doc_count": 16
          },
          {
            "key": 5,
            "doc_count": 15
          },
          {
            "key": 6,
            "doc_count": 2
          },
          {
            "key": 7,
            "doc_count": 2
          },
          {
            "key": 8,
            "doc_count": 1
          }
        ]
      }
    },
    r_sales: {
      "minPrice": {
        "value": 275000
      },
      "property_Types": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Apartment",
            "doc_count": 1213
          },
          {
            "key": "Villa",
            "doc_count": 399
          },
          {
            "key": "Townhouse",
            "doc_count": 67
          },
          {
            "key": "Penthouse",
            "doc_count": 32
          },
          {
            "key": "Duplex",
            "doc_count": 7
          },
          {
            "key": "Plot",
            "doc_count": 2
          },
          {
            "key": "Land",
            "doc_count": 1
          }
        ]
      },
      "maxPrice": {
        "value": 130000000
      },
      "beds": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": 2,
            "doc_count": 509
          },
          {
            "key": 1,
            "doc_count": 419
          },
          {
            "key": 3,
            "doc_count": 365
          },
          {
            "key": 4,
            "doc_count": 166
          },
          {
            "key": 5,
            "doc_count": 132
          },
          {
            "key": 0,
            "doc_count": 86
          },
          {
            "key": 6,
            "doc_count": 35
          },
          {
            "key": 7,
            "doc_count": 6
          },
          {
            "key": 8,
            "doc_count": 2
          },
          {
            "key": 9,
            "doc_count": 1
          }
        ]
      }
    },
    c_sales: {
      "minPrice": {
        "value": 520000
      },
      "property_Types": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Office Space",
            "doc_count": 124
          },
          {
            "key": "Retail",
            "doc_count": 4
          },
          {
            "key": "Whole Building",
            "doc_count": 4
          },
          {
            "key": "Full Floor",
            "doc_count": 2
          },
          {
            "key": "Plot",
            "doc_count": 2
          },
          {
            "key": "Factory",
            "doc_count": 1
          },
          {
            "key": "Half Floor",
            "doc_count": 1
          },
          {
            "key": "Labor Camp",
            "doc_count": 1
          },
          {
            "key": "Staff Accommodation",
            "doc_count": 1
          },
          {
            "key": "Warehouse",
            "doc_count": 1
          }
        ]
      },
      "maxPrice": {
        "value": 400000000
      },
      "beds": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": 1,
            "doc_count": 120
          },
          {
            "key": 0,
            "doc_count": 20
          },
          {
            "key": 123,
            "doc_count": 1
          }
        ]
      }
    },
    c_lettings: {
      "minPrice": {
        "value": 61000
      },
      "property_Types": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [
          {
            "key": "Office Space",
            "doc_count": 80
          },
          {
            "key": "Retail",
            "doc_count": 5
          },
          {
            "key": "Full Floor",
            "doc_count": 3
          },
          {
            "key": "Land",
            "doc_count": 1
          },
          {
            "key": "Show Room",
            "doc_count": 1
          },
          {
            "key": "Whole Building",
            "doc_count": 1
          }
        ]
      },
      "maxPrice": {
        "value": 5520000
      }
    }
  },
  suggestions: {
    data: {},
    total: 0,
  },
  slidesData: [],
  loading: false,
  error: null,
  isSearched: false,
  isSuggested: true,
  isPaginated: false,
  searchParams: {
    keyword: [],
    inAreas: {
      keyword: [],
      keywordwithArea_Codes_aa__c: [],
      Area_Codes_aa__c: ['a0F4S000000LjydUAC'],
      id: [],
      city: [],
    },
    minArea: [],
    maxArea: [],
    amenities: [],
    bedroom: [],
    inKeywords: [],
    inPriceMax: [],
    inPriceMin: [],
    status: [],
    propertyTypes: [],
    isFurnished: [],
    businessType: ["residential"],
    propertyStatus: ["sales"],
    page: [1],
    ShowCount: 21,
    sort: []
  },
  searchParamsInitial: {
    keyword: [],
    inAreas: {
      keyword: [],
      keywordwithArea_Codes_aa__c: [],
      Area_Codes_aa__c: [],
      id: [],
      city: [],
    },
    minArea: [],
    maxArea: [],
    amenities: [],
    bedroom: [],
    inKeywords: [],
    inPriceMax: [],
    inPriceMin: [],
    status: [],
    propertyTypes: [],
    isFurnished: [],
    businessType: ["residential"],
    propertyStatus: ["sales"],
    page: [1],
    ShowCount: 21,
    sort: []
  },
};

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SUGGESTION:
      return {
        ...state,
        suggestions: action.payload,
        isSuggested: true,
      };
    case Types.SET_SEARCH:
      if (action.payload.params != "loaded") {
        return {
          ...state,
          searchData: {
            data: action.payload.data,
            total: action.payload.total,
          },
          filterData: action.payload.filter,
          searchParams: action.payload.params,
          isSearched: true,
          slidesData:[],
          isPaginated: false,
          isSuggested: false
        };
      } else {
        return {
          ...state,
          searchData: {
            data: action.payload.data,
            total: action.payload.total,
          },
          slidesData:[],
          filterData: action.payload.filter,
          isSearched: true,
          isPaginated: false,
          isSuggested: false
        };
      }
    case Types.SET_INFINITY_SEARCH:
      if (action.payload.params == "loaded") {
        state.searchData.data.hits.push(...action.payload.data.hits)
        return {
          ...state,
          searchData: {
            data: state.searchData.data,
            total: state.searchData.total,
            slidesData:[],
          }
        }
      }
    case Types.PUSH_FILTER:
      var isSearched = true;
      var isSuggested = true;
      var searchParams = { ...state.searchParams };
      searchParams.page = [1]
      if (action.payload.value == "showall") {
        searchParams[action.payload.key] = [];
        isSearched = false;
        isSuggested = false;
      } else {
        if (action.payload.key == "clearAll") {
          var businessType = searchParams.businessType
          var propertyStatus = searchParams.propertyStatus
          searchParams = initialState.searchParams;
          searchParams.businessType = businessType
          searchParams.propertyStatus = propertyStatus
          searchParams.keyword = []
          searchParams.inKeywords = []
          isSearched = false;
          isSuggested = false;
          searchParams.inAreas.keywordwithArea_Codes_aa__c = [];
        }
        else if (
          action.payload.key == "inPriceMax" ||
          action.payload.key == "inPriceMin" ||
          action.payload.key == "propertyStatus" ||
          action.payload.key == "page" ||
          action.payload.key == "propertyTypes" ||
          action.payload.key == "sort" ||
          action.payload.key == "minArea" ||
          action.payload.key == "maxArea"
        ) {
          searchParams[action.payload.key] = [action.payload.value];
          isSearched = false;
          isSuggested = false;
        } else if (action.payload.key == "inAreas") {
          if (
            searchParams["inAreas"].keywordwithArea_Codes_aa__c.indexOf(
              action.payload.value.toLowerCase()
            ) === -1
          ) {
            searchParams["inAreas"].keywordwithArea_Codes_aa__c.push(
              action.payload.value.toLowerCase()
            );
            isSearched = false;
            isSuggested = false;
          }
        } else if (action.payload.key == "businessType") {
          var businessType = searchParams.businessType
          var propertyStatus = searchParams.propertyStatus
          // searchParams = initialState.searchParams;
          searchParams.propertyStatus = propertyStatus
          searchParams[action.payload.key] = [action.payload.value];
          searchParams.keyword = []
          searchParams.inKeywords = []
          isSearched = false;
          isSuggested = false;
          searchParams.inAreas.keywordwithArea_Codes_aa__c = [];
          isSearched = false;
          isSuggested = false;
        } else if (action.payload.value == "showall") {
          searchParams[action.payload.key] = [];
          isSearched = false;
          isSuggested = false;
        } else {
          if (
            searchParams[action.payload.key].indexOf(action.payload.value.toLowerCase()) === -1
          ) {
            searchParams[action.payload.key].push(action.payload.value.toLowerCase());
            isSearched = false;
            isSuggested = false;
          } else {
            var index = searchParams[action.payload.key].indexOf(action.payload.value.toLowerCase());
            searchParams[action.payload.key].splice(index, 1);
            isSearched = false;
            isSuggested = false;
          }
        }
      }
      return {
        ...state,
        searchParams: searchParams,
        isSearched: isSearched,
        isSuggested: isSuggested,
      };
    case Types.REMOVE_FILTER:
      var searchParams = { ...state.searchParams };
      // var find=searchParams[action.payload.key].indexOf(action.payload.value)
      if (action.payload.key == "inAreas") {
        searchParams.inAreas.keywordwithArea_Codes_aa__c.splice(action.payload.value, 1)
      } else {
        searchParams[action.payload.key].splice(action.payload.value, 1)
      }
      var isSearched = false;
      var isSuggested = false;
      return {
        ...state,
        searchParams: searchParams,
        isSearched: isSearched,
        isSuggested: isSuggested,
      };
    case Types.ACTION_FILTER_STATUS:
      return {
        ...state,
        isPaginated: action.payload
      }
    case Types.FILTERDATABASE:
      return {
        filterData: state.filterData
      }
    case Types.SET_SLIDES:
      var slideData = state.slidesData;
      if (action.payload.status == false) {
        if (slideData.indexOf(action.payload.slide) === -1) {
          slideData.push(action.payload.slide)
        }
      } else {
        var index = slideData.indexOf(action.payload.slide);
        if(index!==-1){
          slideData = slideData.splice(index, 1);
        }
      }
      return {
        ...state,
        slidesData: [...slideData]
      };
    default:
      return {
        ...state,
      };
      break;
  }
};
export default SearchReducer;
