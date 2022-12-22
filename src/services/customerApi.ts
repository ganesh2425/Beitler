import axios from "axios";
import { API_URLS } from "../utilities/api_url_constants";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("token");

const mappedCreateAPI: any = {
  customer: API_URLS.CREATE_CUSTOMER,
  carrier: API_URLS.CREATE_CARRIER,
  broker: API_URLS.CREATE_BROKER,
  pool: API_URLS.CREATE_POOL,
  store: API_URLS.CREATE_STORE,
  vendor: API_URLS.CREATE_VENDOR,
};

const mappedUpdateAPI: any = {
  customer: API_URLS.UPDATE_CUSTOMER,
  carrier: API_URLS.UPDATE_CARRIER,
  broker: API_URLS.UPDATE_BROKER,
  pool: API_URLS.UPDATE_POOL,
  store: API_URLS.UPDATE_STORE,
  vendor: API_URLS.UPDATE_VENDOR,
};

const checkEntityTypes: any = {
  1: API_URLS.GET_CUSTOMER,
  2: API_URLS.GET_CARRIER,
  3: API_URLS.GET_BROKER,
  4: API_URLS.GET_POOLPROVIDER,
  5: API_URLS.GET_STORES,
  50: API_URLS.GET_CORPORATEBLS,
  91: API_URLS.GET_VENDOR,
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRecord = (data: any, type: string) => {
  return axios({
    method: "post",
    headers: headers,
    url: API_URLS.BASE_URL + mappedCreateAPI[type],
    // "/Shared/Customer/Create",
    data: data.payload,
  })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateRecord = (data: any, type: string) => {
  return axios({
    method: "put",
    headers: headers,
    url: API_URLS.BASE_URL + mappedUpdateAPI[type],
    // "/Shared/Customer/Create",
    data: data.payload,
  })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const customerDetails = (data: any) => {
  const getURL = checkEntityTypes[data.payload.entity_type]
    ? checkEntityTypes[data.payload.entity_type]
    : API_URLS.GET_CUSTOMER;
  return axios({
    method: "get",
    headers: headers,
    url: API_URLS.BASE_URL + getURL,
    //url: BASE_URL + "/Shared/Customer",
    data: data.payload,
  })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};
