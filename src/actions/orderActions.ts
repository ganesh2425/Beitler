import {ordersTypes} from "../constants/actionTypes";

import {
    FetchOrdersRequest,
    FetchOrderSuccess,
    FetchOrderFailure,
    FetchOrderSuccessPayload,
    FetchOrdersFailurePayload
} from '../interfaces/types';

export const fetchOrdersRequest = (payload: any): FetchOrdersRequest => ({
    type: ordersTypes.FETCH_ORDERS_REQUEST,
    payload
});

export const fetchOrdersSuccess = (
    payload: FetchOrderSuccessPayload
): FetchOrderSuccess => ({
    type: ordersTypes.FETCH_ORDERS_SUCCESS,
    payload
});

export const fetchOrdersFailure = (
    payload: FetchOrdersFailurePayload
): FetchOrderFailure => ({
    type: ordersTypes.FETCH_ORDERS_FAILURE,
    payload
});