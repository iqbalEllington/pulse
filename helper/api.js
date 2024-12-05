import axios from "axios";
import Cookies from "js-cookie";


const defaulHeader = {
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json",
  },
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  timeout: 300000,
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    'Authorization': `Bearer ${Cookies.get("token")}`
  },
});

const instance2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 300000,
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    'Authorization': `Bearer ${Cookies.get("token")}`
  },
});

const requestWithoutAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 6000,
  defaulHeader,
});
requestWithoutAuth.defaults.headers.common = {
  ...requestWithoutAuth.defaults.headers.common,
}
instance.defaults.headers.common = {
  ...instance.defaults.headers.common,
};
instance2.defaults.headers.common = {
  ...instance2.defaults.headers.common,
};

export const postRequestNoAuth = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD, CONFIG }) => {
  return new Promise((resolve, reject) => {
    requestWithoutAuth
      .post(
        API,
        DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
        ...CONFIG
      }
      )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const updateAuthToken = (token = "") => {
  instance.defaults.headers = {
    ...instance.defaults.headers,
    ...{ Authorization: `bearer ${token}` },
  };
};
export const updateAuthToken2 = (token = "") => {
  instance2.defaults.headers = {
    ...instance.defaults.headers,
    ...{ Authorization: `bearer ${token}` },
  };
};
export const postRequest_cms = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response); // Change to reject(error.response) if you need proper error handling
      });
  });
};export const putRequest_cms = ({ API = "", ID, DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance
      .put(`${apiWithAuth(API)}/${ID}`, DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response); // Change to reject(error.response) if you need proper error handling
      });
  });
};
export const postRequest = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const postRequestAPI = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance2
      .post(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const putRequestAPI = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance2
      .put(apiWithAuth(API), DATA, {
        ...(PAYLOAD ? PAYLOAD : { ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const deleteRequestAPI = ({ API = "", DATA = {}, HEADER = {}, PAYLOAD }) => {
  return new Promise((resolve, reject) => {
    instance2
      .delete(apiWithAuth(API), DATA, {
        ...DATA,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const getRequest = ({ API = "", headers = {}, params = {}, data = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    instance
      .get(apiWithAuth(API), {
        ...defaulHeader.headers,
        ...(params),
        ...(headers),
        responseType: responseType,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};
export const getRequestAPI = ({ API = "", headers = {}, params = {}, data = {}, responseType = "json" }) => {
  return new Promise((resolve, reject) => {
    instance2
      .get(apiWithAuth(API), {
        ...defaulHeader.headers,
        ...(params),
        ...(headers),
        responseType: responseType,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const putRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .put(apiWithAuth(API), DATA, {
        ...DATA,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const deleteRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(apiWithAuth(API), {
        headers: {
          ...defaulHeader.headers,
          ...HEADER,
        },
        data: DATA,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const patchRequest = ({ API = "", DATA = {}, PAYLOAD, HEADER = {} }) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(apiWithAuth(API), DATA, {
        ...({ ...defaulHeader.headers, ...HEADER }),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
};

export const apiWithAuth = (api) => {
  return api;
};

export default instance;
