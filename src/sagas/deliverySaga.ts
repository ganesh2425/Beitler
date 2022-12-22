import {
    all,
    AllEffect,
    call,
    ForkEffect,
    put,
    takeLatest,
} from "redux-saga/effects";
import { fetchDeliveryFailure, fetchDeliverySuccess, updateDeliverySuccess, updateDeliveryFailure  } from "../actions/deliveryAction";
import { deliveryTypes } from "../constants/actionTypes";
import { API_SERVICE } from "../services/commonApi";
import StorageService from "../services/Storage.service";
import { API_URLS } from "../utilities/api_url_constants";
const token = StorageService.getCookies("token");

const getDelivery = (payload: any) => {
    return API_SERVICE.get(API_URLS.DELIVERY_LIST, payload?.payload, token);
};

function* fetchDeliverySaga(payload: any): any {
    try {
        const response: any = yield call(getDelivery, payload);
        yield put(
            fetchDeliverySuccess({
                Delivery: JSON.parse(response.data),
            })
        );
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchDeliveryFailure({
                error: message,
            })
        );
    }
}

const updateDelivery = (payload:any) =>{
    return API_SERVICE.put(API_URLS.DELIVERY_LIST_UPDATE, payload?.payload, token);
}

function* updateDeliverySaga(payload: any): any {
    console.log('updateDeliverySaga ',payload);
    try {
        const response: any = yield call(updateDelivery, payload);
        yield put(
            updateDeliverySuccess({
                Delivery: JSON.parse(response.data),
            })
        );
    } catch (e: any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            updateDeliveryFailure({
                error: message,
            })
        );
    }
}

function* deliverySaga(): Generator<AllEffect<ForkEffect<never>>,void,unknown> {
    yield all([takeLatest(deliveryTypes.FETCH_DELIVERY_REQUEST, fetchDeliverySaga)]);
    yield all([takeLatest(deliveryTypes.UPDATE_DELIVERY_REQUEST, updateDeliverySaga)]);
}

export default deliverySaga;
