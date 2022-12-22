import { INotificationTemplateEntryFormPayload } from "../interfaces/types";
import { API_URLS } from "../utilities/api_url_constants";
import RestDataSource from "../utilities/restDataSource";

/**
 * This Api is for creation of the Notification Template
 * It accepts the payload it should be updated to type INotificationTemplateEntryFormPayload
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createNotificationTemplate = (payload: any) => {
  const UpdatePayload: INotificationTemplateEntryFormPayload = {
    Id: payload.payload.id,
    Type: payload.payload.NotinTempType,
    EventId: payload.payload.NotinTempEvent,
    Subject: payload.payload.NotinTempSubject,
    BodyText: payload.payload.NotinTempBody,
    IsActive: payload.payload.isActive,
    IsDeleted: false,
  };

  // API URL call from Constant
  const url = API_URLS.BASE_URL + API_URLS.CREATE_NOTIFICATION_TEMPLATE;
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
export const updateNotificationTemplate = (payload: any) => {
  const UpdatePayload: INotificationTemplateEntryFormPayload = {
    Id: payload.payload.id,
    Type: payload.payload.NotinTempType,
    EventId: payload.payload.NotinTempEvent,
    Subject: payload.payload.NotinTempSubject,
    BodyText: payload.payload.NotinTempBody,
    IsActive: payload.payload.isActive,
    IsDeleted: false,
  };
  // API URL call from Constant
  const url = API_URLS.BASE_URL + API_URLS.UPDATE_NOTIFICATION_TEMPLATE;
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
export const deleteNotificationTemplate = (payload: any) => {
  const UpdatePayload: INotificationTemplateEntryFormPayload = {
    Id: payload.payload.id,
    Type: payload.payload.type,
    EventId: payload.payload.event,
    Subject: payload.payload.subject,
    BodyText: payload.payload.bodyText,
    IsActive: payload.payload.isActive,
    IsDeleted: true,
  };
  // API Url call from constant
  const url = API_URLS.BASE_URL + API_URLS.UPDATE_NOTIFICATION_TEMPLATE;
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
export const notificationTemplateDetails = (payload: any) => {
  //API URL Call from Constant
  const filter = payload.payload.filter ? "/?"+payload.payload.filter : ''
  const url = API_URLS.BASE_URL + API_URLS.GET_NOTIFICATION_TEMPLATE + filter;
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
