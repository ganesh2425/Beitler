import { API_URLS } from "../utilities/api_url_constants";
import RestDataSource from "../utilities/restDataSource";
import {API_SERVICE} from "./commonApi";

/**
 * This Api is for creation of the Notification Template
 * It accepts the payload it should be updated to type INotificationTemplateEntryFormPayload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRules = (payload: any) => {
  // API URL call from Constant
  const url = API_URLS.BASE_URL + API_URLS.POST_RULES;
  let responseData = [];
  //New Promise call to send response
  return new Promise((resolve, reject) => {
    // Call to RestDataSource and calling Post method
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Store(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 * This Api is for updation of the Notification Template
 * It accepts the payload it should be updated to type INotificationTemplateEntryFormPayload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateRules = (payload: any) => {
  // API URL call from Constant
  const url = API_URLS.BASE_URL + API_URLS.UPDATE_RULES;
  let responseData = [];
  // Promise Call
  return new Promise((resolve, reject) => {
    // RestDatasource Call and calling Put Method
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 * This Api is for deletion of the Notification Template
 * It accepts the payload it should be updated to type INotificationTemplateEntryFormPayload
 * @param payload
 * @returns
 */
export const deleteRules = (payload: any) => {
  // API Url call from constant
  const url = API_URLS.BASE_URL + API_URLS.POST_RULES;
  let responseData = [];
  // New Promise Call
  return new Promise((resolve, reject) => {
    // RestDataSource Call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(payload.payload, (res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

/**
 * This Api is for GET of the Notification Template
 * It accepts the payload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const rulesDetails = (payload: any) => {
  return API_SERVICE.get(API_URLS.GET_RULES, payload?.payload, '');
};

