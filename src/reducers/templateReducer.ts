import { RootState } from ".";
import { NotificationTemplateTypes } from "../constants/actionTypes";
import { NotificationTemplateState } from "../interfaces/interfaceNotificationTemplate";
import { NotificationTemplateActions } from "../interfaces/typeNotificationTemplate";

/**
 * Initial State for Notification Template
 * Reducer Call
 */
const initialState: NotificationTemplateState = {
  pending: false,
  templateData: [],
  error: null,
  template_success: {},
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: NotificationTemplateActions) => {
  switch (action.type) {
    case NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case NotificationTemplateTypes.CREATE_NOTIFICATION_TEMPLATE:
      return {
        ...state,
        pending: true,
      };
    case NotificationTemplateTypes.UPDATE_NOTIFICATION:
      return {
        ...state,
        template_success: action.payload.template_success,
        pending: false,
      };
    case NotificationTemplateTypes.UPDATE_NOTIFICATION_TEMPLATE:
      return {
        ...state,
        template_success: action.payload.template_success,
        pending: false,
      };
    case NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_SUCCESS:
      return {
        ...state,
        pending: false,
        templateData: action.payload.templateData,
        error: null,
      };
    case NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_FAILURE:
      return {
        ...state,
        pending: false,
        templateData: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getNotificationTemplateDetails = (state: RootState) =>
  state.template.templateData;
export const getNotificationTemplateSuccess = (state: RootState) =>
  state.template.template_success;
export const getNotificationTemplateFailure = (state: RootState) =>
  state.template.error;
