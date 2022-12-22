import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchLoginFailure,
    fetchLoginSuccess
} from "../actions/authActions";
import {loginTypes} from '../constants/actionTypes';
import {getAuthDetails} from "../services/loginApi";

function* fetchLoginSaga({payload}: any): any {
    try {
        const response = yield call(getAuthDetails, payload);
        if (response.data.token) {                 
            yield put(
                fetchLoginSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchLoginFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* loginSaga() {
    yield all([takeLatest(loginTypes.FETCH_LOGIN_REQUEST, fetchLoginSaga)]);
}

export default loginSaga;