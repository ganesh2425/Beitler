import {deliveryTypes} from "../constants/actionTypes";
import {
    FetchOrdersFailurePayload,
    FetchDeliverySuccessPayload,
    FetchDeliverySuccess,
    FetchDeliveryFailure,
    FetchDeliveryRequest,
    UpdateDeliveryFailurePayload,
    UpdateDeliverySuccessPayload,
    UpdateDeliveryRequest,
    UpdateDeliverySuccess,
    UpdateDeliveryFailure,
} from '../interfaces/types';

export const fetchDeliveryRequest = (payload: any): FetchDeliveryRequest => ({
    type: deliveryTypes.FETCH_DELIVERY_REQUEST,
    payload
});

export const fetchDeliverySuccess = (
    payload: FetchDeliverySuccessPayload
): FetchDeliverySuccess => ({
    type: deliveryTypes.FETCH_DELIVERY_SUCCESS,
    payload
});

export const fetchDeliveryFailure = (
    payload: FetchOrdersFailurePayload
): FetchDeliveryFailure => ({
    type: deliveryTypes.FETCH_DELIVERY_FAILURE,
    payload
});

export const updateDeliveryRequest = (payload: any): UpdateDeliveryRequest => ({
    type: deliveryTypes.UPDATE_DELIVERY_REQUEST,
    payload
});

export const updateDeliverySuccess = (
    payload: any
): UpdateDeliverySuccess => ({
    type: deliveryTypes.UPDATE_DELIVERY_SUCCESS,
    payload
});

export const updateDeliveryFailure = (
    payload: any
): UpdateDeliveryFailure => ({
    type: deliveryTypes.UPDATE_DELIVERY_FAILURE,
    payload
});
