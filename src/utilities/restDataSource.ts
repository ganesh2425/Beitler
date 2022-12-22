import axios from "axios";
import StorageService from "../services/Storage.service";
/**
 * This Document is one place call for API
 */
//@typescript-eslint/explicit-module-boundary-types --off
export default class RestDataSource {
  BASE_URL: string;
  handleError: any;
  service: any;
  token: string;
  constructor(base_url: any, errorCallback: any) {
    const token = StorageService.getCookies("token");
    const service = axios.create({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //"Access-Control-Allow-Origin": "*",
      },
    });
    //service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
    this.BASE_URL = base_url;
    this.handleError = errorCallback;
    this.token = token;
  }

  /**
   *
   * @param callback is of type any bcoz it is dynamic
   * Get API request for list of expenses
   */
  async GetData(callback: any) {
    return await this.SendRequest("get", this.BASE_URL, callback);
  }

  /**
   *
   * @param id  is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * Common method for parameterised data using "?"  id
   */
  async GetOneByParam(id: any, callback: any) {
    return await this.SendRequest("get", `${this.BASE_URL}?${id}`, callback);
  }

  /**
   *
   * @param id  is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * @param data is of type any bcoz it is dynamic
   * Common method for parameterised data using "?"  id
   */
  async GetOneByParamBody(id: any, callback: any, data: any) {
    this.SendRequest("post", `${this.BASE_URL}?${id}`, callback, data);
  }

  /**
   *
   * @param id is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * Common method for parameterised data using "/" id
   */
  async GetOne(id: any, callback: any) {
    this.SendRequest("get", `${this.BASE_URL}/${id}`, callback);
  }

  /**
   *
   * @param data is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * Common Post method
   */
  async Store(data: any, callback: any) {
    //, callback: any

    this.SendRequest("post", this.BASE_URL, callback, data); //callback,
  }

  /**
   *
   * @param data is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * Common update method
   */
  async Update(data: any, callback: any) {
    this.SendRequest("put", this.BASE_URL, callback, data);
  }

  /**
   *
   * @param data is of type any bcoz it isdynamic
   * @param callback is of type any bcoz it is dynamic
   * Common delete method
   */
  async Delete(data: any, callback: any) {
    this.SendRequest("delete", this.BASE_URL, callback, data);
  }

  /**
   *
   * @param data is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * method for Delete by Id
   */
  async DeleteOneByParam(id: any, callback: any) {
    this.SendRequest("delete", `${this.BASE_URL}?${id}`, callback);
  }

  /**
   *
   * @param method is of type any bcoz it is dynamic
   * @param url is of type any bcoz it is dynamic
   * @param callback is of type any bcoz it is dynamic
   * @param data is of type any bcoz it is dynamic
   * common API Call
   */
  async SendRequest(method: any, url: any, callback: any, data?: any) {
    try {
      const response = await this.service.request({
        method: method,
        url: url,
        data: data,
      });
      callback(response);
    } catch (err: any) {
      console.log(err);
      if (err["message"] === "Network Error") {
        throw err["message"];
        //window.location.assign("/login");
      } else {
        this.handleError(err);
      }
    }
  }
}
