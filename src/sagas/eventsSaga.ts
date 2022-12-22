import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchEventsFailure,
  fetchEventsSuccess,
  updateEventsSuccess,
} from "../actions/eventsActions";
import { eventsTypes } from "../constants/actionTypes";
import {
  createEvents,
  deleteEvents,
  eventsDetails,
  updateEvents,
} from "../services/events.service";

/**
 *
 * @param payload
 */
function* fetchEventsSaga(payload: any): any {
  try {
    const response: any = yield call(eventsDetails, payload);
    yield put(
      fetchEventsSuccess({
        Events: JSON.parse(response.data),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEventsFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* createEventsSaga(payload: any): any {
  try {
    const response: any = yield call(createEvents, payload);

    yield put(
      updateEventsSuccess({
        events_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEventsFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* updateEventsSaga(payload: any): any {
  try {
    const response: any = yield call(updateEvents, payload);
    yield put(
      updateEventsSuccess({
        events_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEventsFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* deleteEventsSaga(payload: any): any {
  try {
    const response: any = yield call(deleteEvents, payload);

    yield put(
      updateEventsSuccess({
        events_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEventsFailure({
        error: message,
      })
    );
  }
}

/**
 *
 */
function* eventsSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(eventsTypes.FETCH_EVENTS_REQUEST, fetchEventsSaga)]);
  yield all([takeLatest(eventsTypes.CREATE_EVENTS_REQUEST, createEventsSaga)]);
  yield all([takeLatest(eventsTypes.UPDATE_EVENTS_REQUEST, updateEventsSaga)]);
  yield all([takeLatest(eventsTypes.DELETE_EVENTS_REQUEST, deleteEventsSaga)]);
}

export default eventsSaga;
