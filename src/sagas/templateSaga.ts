import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";

import {
  fetchNotificationTemplateFailure,
  fetchNotificationTemplateSuccess,
  updateNotificationTemplateSuccess,
} from "../actions/templateActions";
import { NotificationTemplateTypes } from "../constants/actionTypes";
import {
  createNotificationTemplate,
  deleteNotificationTemplate,
  notificationTemplateDetails,
  updateNotificationTemplate,
} from "../services/notificationTemplate.service";

/**
 *
 * @param payload
 */
function* fetchNotificationTemplateSaga(payload: any): any {
  try {
    const response: any = yield call(notificationTemplateDetails, payload);
    yield put(
      fetchNotificationTemplateSuccess({
        templateData: JSON.parse(response.data),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchNotificationTemplateFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* createNotificationTemplateSaga(payload: any): any {
  try {
    const response: any = yield call(createNotificationTemplate, payload);
    yield put(
      updateNotificationTemplateSuccess({
        template_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchNotificationTemplateFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* updateNotificationTemplateSaga(payload: any): any {
  try {
    const response: any = yield call(updateNotificationTemplate, payload);

    yield put(
      updateNotificationTemplateSuccess({
        template_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchNotificationTemplateFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* deleteNotificationTemplateSaga(payload: any): any {
  try {
    const response: any = yield call(deleteNotificationTemplate, payload);

    yield put(
      updateNotificationTemplateSuccess({
        template_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchNotificationTemplateFailure({
        error: message,
      })
    );
  }
}

/**
 *
 */
function* templateSaga(): Generator<
  AllEffect<ForkEffect<never>>,
  void,
  unknown
> {
  yield all([
    takeLatest(
      NotificationTemplateTypes.FETCH_NOTIFICATION_TEMPLATE_REQUEST,
      fetchNotificationTemplateSaga
    ),
  ]);
  yield all([
    takeLatest(
      NotificationTemplateTypes.CREATE_NOTIFICATION_TEMPLATE,
      createNotificationTemplateSaga
    ),
  ]);
  yield all([
    takeLatest(
      NotificationTemplateTypes.UPDATE_NOTIFICATION,
      updateNotificationTemplateSaga
    ),
  ]);
  yield all([
    takeLatest(
      NotificationTemplateTypes.DELETE_NOTIFICATION_TEMPLATE,
      deleteNotificationTemplateSaga
    ),
  ]);
}

export default templateSaga;
