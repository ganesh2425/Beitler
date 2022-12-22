import { NotificationTemplateTypes } from "../constants/actionTypes";
import {
  AddNotificationTemplate,
  DeleteNotificationTemplate,
  FetchNotificationTemplateFailure,
  FetchNotificationTemplateFailurePayload,
  FetchNotificationTemplatePayload,
  FetchNotificationTemplateRequest,
  FetchNotificationTemplateSuccess,
  UpdateNotificationTemplateSuccessPayload,
  UpdateNotificationTemplate,
  UpdateNotificationSuccessTemplate,
} from "../interfaces/interfaceNotificationTemplate";

/**
 *
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchNotificationTemplateRequest = (
  payload: any
): FetchNotificationTemplateRequest => ({
  type: NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const addNotificationTemplateRequest = (
  payload: any
): AddNotificationTemplate => ({
  type: NotificationTemplateTypes.CREATE_NOTIFICATION_TEMPLATE,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateNotificationTemplateRequest = (
  payload: any
): UpdateNotificationTemplate => ({
  type: NotificationTemplateTypes.UPDATE_NOTIFICATION,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const deleteNotificationTemplateRequest = (
  payload: any
): DeleteNotificationTemplate => ({
  type: NotificationTemplateTypes.DELETE_NOTIFICATION_TEMPLATE,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchNotificationTemplateSuccess = (
  payload: FetchNotificationTemplatePayload
): FetchNotificationTemplateSuccess => ({
  type: NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateNotificationTemplateSuccess = (
  payload: UpdateNotificationTemplateSuccessPayload
): UpdateNotificationSuccessTemplate => ({
  type: NotificationTemplateTypes.UPDATE_NOTIFICATION_TEMPLATE,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchNotificationTemplateFailure = (
  payload: FetchNotificationTemplateFailurePayload
): FetchNotificationTemplateFailure => ({
  type: NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_FAILURE,
  payload,
});
