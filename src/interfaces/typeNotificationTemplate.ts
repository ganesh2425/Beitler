import {
  AddNotificationTemplate,
  DeleteNotificationTemplate,
  FetchNotificationTemplateFailure,
  FetchNotificationTemplateRequest,
  FetchNotificationTemplateSuccess,
  UpdateNotificationTemplate,
  UpdateNotificationSuccessTemplate,
} from "./interfaceNotificationTemplate";

/**
 *
 */
export type NotificationTemplateActions =
  | FetchNotificationTemplateRequest
  | AddNotificationTemplate
  | UpdateNotificationTemplate
  | DeleteNotificationTemplate
  | UpdateNotificationSuccessTemplate
  | FetchNotificationTemplateSuccess
  | FetchNotificationTemplateFailure;
