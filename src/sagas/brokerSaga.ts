import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchBrokersSuccess,
  fetchBrokersFailure,
} from "../actions/brokerActions";
import { brokerTypes } from "../constants/actionTypes";
import { getBrokerDetails } from "../services/broker.service";

function* fetchBrokerSaga(payload: any): any {
  try {
    const response: any = yield call(getBrokerDetails, payload);
    console.log(JSON.parse(JSON.parse(response.data)));
    yield put(
      fetchBrokersSuccess({
        brokers: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchBrokersFailure({
        error: message,
      })
    );
  }
}

function* brokerSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(brokerTypes.FETCH_BROKER_REQUEST, fetchBrokerSaga)]);
}
export default brokerSaga;
