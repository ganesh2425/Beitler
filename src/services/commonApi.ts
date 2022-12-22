import axios from "axios";
import { API_URLS } from "../utilities/api_url_constants";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("token");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const post = (url: string, payload: any, token = "") => {
  return axios({
    headers: headers,
    method: "post",
    url: API_URLS.BASE_URL + `${url}`,
    data: payload,
  })
    .then((response) => {
      return response;
    })
    .catch((e: any) => {
      if (e["message"] === "Network Error") {
        // throw reason["message"];
        window.location.assign("/login");
      } else {
        return e;
      }
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const get = (url: string, payload: any, token = "") => {
  return axios({
    method: "get",
    headers: headers,
    url: API_URLS.BASE_URL + `${url}`,
    params: payload,
  })
    .then((response) => {
      return response;
    })
    .catch((e: any) => {
      if (e["message"] === "Network Error") {
        // throw reason["message"];
        window.location.assign("/login");
      } else {
        return e;
      }
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const put = (url: string, payload: any, token = "") => {
  return axios({
    method: "put",
    headers: headers,
    url: API_URLS.BASE_URL + `${url}`,
    data: payload,
  })
    .then((response) => {
      return response;
    })
    .catch((e: any) => {
      if (e["message"] === "Network Error") {
        // throw reason["message"];
        window.location.assign("/login");
      } else {
        return e;
      }
    });
};

export const API_SERVICE = {
  post: post,
  get: get,
  put: put,
};
