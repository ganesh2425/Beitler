import {
    all,
    AllEffect,
    call,
    ForkEffect,
    put,
    takeLatest,
} from "redux-saga/effects";
import {ediQueueTypes} from "../constants/actionTypes";
import { API_SERVICE } from "../services/commonApi";
import StorageService from "../services/Storage.service";
import { API_URLS } from "../utilities/api_url_constants";
import {fetchEdiQueueFailure, fetchEdiQueueSuccess} from "../actions/ediQueueActions";
const token = StorageService.getCookies("token");

const getEdiQueue = () => {
    return API_SERVICE.get(API_URLS.GET_EDI_QUEUE_LIST, {}, token);
};
// const postEdiQueue = (payload: any) => {
//     return API_SERVICE.post(API_URLS.CREATE_RATE, payload, token);
// };

function* fetchEdiQueueSaga(): any {
    try {
        const response: any = yield call(getEdiQueue);
        yield put(
            fetchEdiQueueSuccess({
                EDIQueue: JSON.parse(JSON.parse(response.data)),
            })
        );
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchEdiQueueFailure({
                error: message,
            })
        );
    }
}


// function* createEdiQueueSaga(payload: any): any {
//     try {
//         const response: any = yield call(
//             postEdiQueue,
//             payload.payload.ratesPayload
//         );
//         yield put(
//             updateRatesSuccess({
//                 rate_success: JSON.parse(JSON.parse(response.data)),
//             })
//         );
//     } catch (e: any) {
//         let message = "";
//         e === "Network Error" ? (message = e) : (message = e.message);
//         yield put(
//             fetchEdiQueueFailure({
//                 error: message,
//             })
//         );
//     }
// }

function* ediQueueSaga(): Generator<
    AllEffect<ForkEffect<never>>,
    void,
    unknown
    > {
    yield all([
        takeLatest(ediQueueTypes.FETCH_EDI_QUEUE_REQUEST, fetchEdiQueueSaga),
    ]);
    // yield all([
    //     takeLatest(ediQueueTypes.CREATE_EDI_QUEUE_REQUEST, createEdiQueueSaga),
    // ]);
}

export default ediQueueSaga;
