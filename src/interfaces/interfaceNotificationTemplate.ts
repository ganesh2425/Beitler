import { NotificationTemplateTypes } from "../constants/actionTypes";
import { INotificationTemplate } from "../models/NotificationTemplate";

/**
 * Notification Template Initial State
 */
export interface NotificationTemplateState {
  pending: boolean;
  templateData: INotificationTemplate[];
  template_success: any;
  error: string | null;
}

/**
 * Get Notification Template Payload
 */
export interface FetchNotificationTemplatePayload {
  templateData: INotificationTemplate[];
}

/**
 * Notification Template Success Payload
 */
export interface UpdateNotificationTemplateSuccessPayload {
  template_success: string;
}

/**
 * Notification Template Failure Payload
 */
export interface FetchNotificationTemplateFailurePayload {
  error: string;
}

/**
 * Notification Template Request Type and Payload
 */
export interface FetchNotificationTemplateRequest {
  type: typeof NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_REQUEST;
  payload: any;
}

/**
 * Add Notification Template Request Type and Payload
 */
export interface AddNotificationTemplate {
  type: typeof NotificationTemplateTypes.CREATE_NOTIFICATION_TEMPLATE;
  payload: any;
}

/**
 * Update Notification Template Request Type and Payload
 */
export interface UpdateNotificationTemplate {
  type: typeof NotificationTemplateTypes.UPDATE_NOTIFICATION;
  payload: any;
}

/**
 *
 */
export interface UpdateNotificationSuccessTemplate {
  type: typeof NotificationTemplateTypes.UPDATE_NOTIFICATION_TEMPLATE;
  payload: any;
}

/**
 * Delete Notification Template Request Type and Payload
 */
export interface DeleteNotificationTemplate {
  type: typeof NotificationTemplateTypes.DELETE_NOTIFICATION_TEMPLATE;
  payload: any;
}

/**
 * Notification Template Sucess Request Type and Payload
 */
export interface FetchNotificationTemplateSuccess {
  type: typeof NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_SUCCESS;
  payload: FetchNotificationTemplatePayload;
}

/**
 * Notification Template Failure Request Type and Payload
 */
export interface FetchNotificationTemplateFailure {
  type: typeof NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_FAILURE;
  payload: FetchNotificationTemplateFailurePayload;
}
