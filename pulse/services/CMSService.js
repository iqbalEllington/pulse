import { param } from "jquery";
import { API_SERVER_SHORT_URL, API_GET_SEARCH } from "../store/ApiEndpoint";
import axios from "axios";
function listener() {
  let token = select(store.getState());
  axios.defaults.headers.common["Authorization"] = token;
}

class CMSService {

  async submitForms(data, type,token) {
    var url = "";
    if (type == "valuation") {
      url = API_GET_SEARCH +
        "forms/book-valuation"
    }
    if (type == "mortgages") {
      url = API_GET_SEARCH +
        "forms/mortgages"
    }
    if (type == "general") {
      url = API_GET_SEARCH +
        "forms/general"
    }
    data.token=token
    try {
      var options = {
        method: "POST",
        url: url,
        headers: { "Content-Type": "application/json" },
        data: data,
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
  }

  async submitFormsWithFIle(data, type, reference) {
    try {
      var url = "";
      if (type == "career") {
        url = API_GET_SEARCH +
          "forms/career/" + reference
      }
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      var options = {
        method: "POST",
        async: true,
        url: url,
        headers: {
          "Content-Type": 'multipart/form-data'
        },
        data: formData,
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
  }
  // Access token to be added
  async teamSearch(search) {
    try {
      const resp = await fetch(
        API_GET_SEARCH +
        "dubai/about-us/our-team/?search=" +
        search +
        "&start=0&count=1000"
      );
      if (resp.ok) {
        const data = await resp.json();
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  async TeamFilters() {
    try {
      const resp = await fetch(
        API_GET_SEARCH + "about-us/our-team/team-filter"
      );
      if (resp.ok) {
        const data = await resp.json();
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  async getProfile(id) {
    try {
      const resp = await fetch(
        API_GET_SEARCH + "dubai/about-us/our-team/profile/" + id
      );
      if (resp.ok) {
        const data = await resp.json();
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  async teamSearchFilters() {
    try {
      const resp = await fetch(
        API_GET_SEARCH + "dubai/about-us/our-team/team-filter"
      );
      if (resp.ok) {
        const data = await resp.json();
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  async getWizardForm(wizardForm) {
    try {
      const resp = await fetch(API_GET_SEARCH + "forms/formwizard/" + wizardForm);
      if (resp.ok) {
        const data = await resp.json();
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }

  async MapService(lat, lng) {
    try {
      const resp = await fetch("https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/tilequery/" + lat + "," + lng + ".json?radius=30&limit=10&dedupe&access_token=pk.eyJ1IjoiaXFiYWx1a2thZGFuIiwiYSI6ImNrZGlobTNnZjA0b3Ayc3JvaW1zaDFyZTkifQ.meoolvrCzFL7l-EvflACew");
      if (resp.ok) {
        const data = await resp.json();
        // Pass data to the page via props
        return {
          props: {
            status: 200,
            data: data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err, "error");
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  async getWizardFormQ(q) {
    try {
      const resp = await fetch(API_GET_SEARCH + "forms/formwizard/q/" + q);
      if (resp.ok) {
        const data = await resp.json();
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  wizardFormSave(question, Answer) {

  }

  async getDatass(q) {
    try {
      const resp = await fetch("http://localhost:3000/dubai/tenants/move-in-instructions/areas");
      console.log(resp, "responces")
      if (resp.ok) {
        const data = await resp.json();
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
  async saveForms(q) {
    try {
      const resp = await fetch(API_GET_SEARCH);
      console.log(resp, "responces")
      if (resp.ok) {
        const data = await resp.json();
        return {
          props: {
            status: 200,
            data: data.data,
          },
        };
      } else {
        return {
          props: {
            status: 410,
            reason: "Server Down",
          },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        props: {
          status: 410,
          reason: "Server Down",
        },
      };
    }
  }
}
export default CMSService;
