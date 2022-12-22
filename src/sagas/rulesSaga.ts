import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchRulesFailure,
  fetchRulesSuccess,
  updateRulesSuccess,
} from "../actions/rulesActions";
import { rulesTypes } from "../constants/actionTypes";
import {
  createRules,
  deleteRules,
  rulesDetails,
  updateRules,
} from "../services/rules.service";

/**
 *
 * @param payload
 */
function* fetchRulesSaga(payload: any): any {
  try {
    const response: any = yield call(rulesDetails, payload);
    yield put(
      fetchRulesSuccess({
        Rules: JSON.parse(response.data),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchRulesFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* createRulesSaga(payload: any): any {
  try {
    const response: any = yield call(createRules, payload);

    yield put(
      updateRulesSuccess({
        rules_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchRulesFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* updateRulesSaga(payload: any): any {
  try {
    const response: any = yield call(updateRules, payload);
    yield put(
      updateRulesSuccess({
        rules_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchRulesFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* deleteRulesSaga(payload: any): any {
  try {
    const response: any = yield call(deleteRules, payload);

    yield put(
      updateRulesSuccess({
        rules_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchRulesFailure({
        error: message,
      })
    );
  }
}

/**
 *
 */
function* rulesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(rulesTypes.FETCH_RULES_REQUEST, fetchRulesSaga)]);
  yield all([takeLatest(rulesTypes.CREATE_RULES_REQUEST, createRulesSaga)]);
  yield all([takeLatest(rulesTypes.UPDATE_RULES_REQUEST, updateRulesSaga)]);
  yield all([takeLatest(rulesTypes.DELETE_RULES_REQUEST, deleteRulesSaga)]);
}

export default rulesSaga;
