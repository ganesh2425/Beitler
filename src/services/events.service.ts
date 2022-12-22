import { IEventsEntryFormPayload } from "../interfaces/types";
import { API_URLS } from "../utilities/api_url_constants";
import RestDataSource from "../utilities/restDataSource";

/**
 * This Api is for creation of the Notification Template
 * It accepts the payload it should be updated to type INotificationTemplateEntryFormPayload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createEvents = (payload: any) => {
  const UpdatePayload: IEventsEntryFormPayload = {
    Id: payload.payload.id,
    // Type: payload.payload.NotinTempType,
    //Event: payload.payload.NotinTempEvent,
    Name: payload.payload.NotinEventName,
    Description: payload.payload.NotinEventDescription,
    IsActive: payload.payload.isActive,
    IsDeleted: false,
  };
  // API URL call from Constant
  const url = API_URLS.BASE_URL + API_URLS.postEvents;
  let responseData = [];
  //New Promise call to send response
  return new Promise((resolve, reject) => {
    // Call to RestDataSource and calling Post method
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Store(UpdatePayload, (res: any) => {
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
export const updateEvents = (payload: any) => {
  const UpdatePayload: IEventsEntryFormPayload = {
    Id: payload.payload.id,
    Name: payload.payload.NotinEventName,
    Description: payload.payload.NotinEventDescription,
    IsActive: payload.payload.isActive,
    IsDeleted: false,
  };
  // API URL call from Constant
  const url = API_URLS.BASE_URL + API_URLS.putEvents;
  let responseData = [];
  // Promise Call
  return new Promise((resolve, reject) => {
    // RestDatasource Call and calling Put Method
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(UpdatePayload, (res: any) => {
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
export const deleteEvents = (payload: any) => {
  const UpdatePayload: IEventsEntryFormPayload = {
    Id: payload.payload.id,
    Name: payload.payload.name,
    Description: payload.payload.description,
    IsActive: payload.payload.isActive,
    IsDeleted: true,
  };
  // API Url call from constant
  const url = API_URLS.BASE_URL + API_URLS.putEvents;
  let responseData = [];
  // New Promise Call
  return new Promise((resolve, reject) => {
    // RestDataSource Call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .Update(UpdatePayload, (res: any) => {
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
export const eventsDetails = (payload: any) => {
  //API URL Call from Constant
  const url = API_URLS.BASE_URL + API_URLS.getEvents;
  let responseData = [];
  //New Promise Call
  return new Promise((resolve, reject) => {
    //Rest Datasource call
    new RestDataSource(url, (err: any) => {
      return err;
    })
      .GetData((res: any) => {
        responseData = res;
        resolve(responseData);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
