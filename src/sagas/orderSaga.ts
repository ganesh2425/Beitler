import {
    all,
    AllEffect,
    call,
    ForkEffect,
    put,
    takeLatest,
} from "redux-saga/effects";
import { fetchOrdersSuccess, fetchOrdersFailure} from "../actions/orderActions";
import { ordersTypes } from "../constants/actionTypes";
import { API_SERVICE } from "../services/commonApi";
import StorageService from "../services/Storage.service";
import { API_URLS } from "../utilities/api_url_constants";
const token = StorageService.getCookies("token");

const getOrders = (payload: any) => {
    return API_SERVICE.get(API_URLS.ORDER_LIST, payload?.payload, token);
};

function* fetchOrderSaga(payload: any): any {
    try {
        const response: any = yield call(getOrders, payload);
        yield put(
            fetchOrdersSuccess({
                Orders: JSON.parse(response.data),
            })
        );
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchOrdersFailure({
                error: message,
            })
        );
    }
}

function* orderSaga(): Generator<
    AllEffect<ForkEffect<never>>,
    void,
    unknown
    > {
    yield all([
        takeLatest(ordersTypes.FETCH_ORDERS_REQUEST, fetchOrderSaga),
    ]);
}

export default orderSaga;
