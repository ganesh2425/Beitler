import {
    all,
    AllEffect,
    call,
    ForkEffect,
    put,
    takeLatest,
} from "redux-saga/effects";
import {fetchRatesSuccess, fetchRatesFailure, updateRatesSuccess} from "../actions/rateActions"
import {ratesTypes} from "../constants/actionTypes";
import { API_SERVICE } from "../services/commonApi";
import StorageService from "../services/Storage.service";
import { API_URLS } from "../utilities/api_url_constants";
const token = StorageService.getCookies("token");

const getRates = () => {
    return API_SERVICE.get(API_URLS.GET_RATE_LIST, {}, token);
};
const postRates = (payload: any) => {
    return API_SERVICE.post(API_URLS.CREATE_RATE, payload, token);
};

const putRates = (payload: any) => {
    return API_SERVICE.put(API_URLS.UPDATE_RATE, payload, token);
};

function* fetchRateSaga(): any {
    try {
        const response: any = yield call(getRates);
        yield put(
            fetchRatesSuccess({
                Rates: JSON.parse(JSON.parse(response.data)),
            })
        );
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchRatesFailure({
                error: message,
            })
        );
    }
}


function* createRateSaga(payload: any): any {
    try {
        const response: any = yield call(
            postRates,
            payload.payload.ratesPayload
        );
        yield put(
            updateRatesSuccess({
                rate_success: JSON.parse(JSON.parse(response.data)),
            })
        );
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchRatesFailure({
                error: message,
            })
        );
    }
}

function* updateRateSaga(payload: any): any {
    try {
        if (payload.payload.ratesPayload) {
            const response: any = yield call(
                putRates,
                payload.payload.ratesPayload
            );
            yield put(
                updateRatesSuccess({
                    rate_success: JSON.parse(JSON.parse(response.data)),
                })
            );
        }
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchRatesFailure({
                error: message,
            })
        );
    }
}

function* rateSaga(): Generator<
    AllEffect<ForkEffect<never>>,
    void,
    unknown
    > {
    yield all([
        takeLatest(ratesTypes.FETCH_RATES_REQUEST, fetchRateSaga),
    ]);
    yield all([
        takeLatest(ratesTypes.CREATE_RATES_REQUEST, createRateSaga),
    ]);
    yield all([
        takeLatest(ratesTypes.UPDATE_RATES_REQUEST, updateRateSaga),
    ]);
}

export default rateSaga;
