import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchLoginFailure } from "../actions/authActions";
import { commonTypes } from "../constants/actionTypes";
import { API_SERVICE } from "../services/commonApi";
import { API_URLS } from "../utilities/api_url_constants";
import { fetchLookupSuccess } from "../actions/lookupDataActions";
import StorageService from "../services/Storage.service";

const token = StorageService.getCookies("token");
const getLookups = () => {
  return API_SERVICE.get(API_URLS.lookup, {}, token);
};

function* fetchLookupsSaga({}: any): any {
  try {
    const response = yield call(getLookups);
    yield put(fetchLookupSuccess(JSON.parse(response.data)));
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchLoginFailure({
        error: message,
      })
    );
  }
}

function* lookupSaga() {
  yield all([takeLatest(commonTypes.LOOKUPS, fetchLookupsSaga)]);
}

export default lookupSaga;
