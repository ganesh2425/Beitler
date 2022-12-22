import { brokerTypes } from "../constants/actionTypes";
import {
    AddBrokers,
    FetchBrokersFailure,
    FetchBrokersFailurePayload,
    FetchBrokersRequest, FetchBrokersSuccess, FetchBrokersSuccessPayload,
    UpdateBrokers
} from "../interfaces/brokerTypes";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchBrokersRequest = (payload: any): FetchBrokersRequest => ({
    type: brokerTypes.FETCH_BROKER_REQUEST,
    payload
});

export const addBrokersRequest = (payload: any): AddBrokers => ({
    type: brokerTypes.CREATE_BROKER,
    payload
});

export const updateBrokersRequest = (payload: any): UpdateBrokers => ({
    type: brokerTypes.UPDATE_BROKER,
    payload
});

export const fetchBrokersSuccess = (
    payload: FetchBrokersSuccessPayload
): FetchBrokersSuccess => ({
    type: brokerTypes.FETCH_BROKER_SUCCESS,
    payload
});

export const fetchBrokersFailure = (
    payload: FetchBrokersFailurePayload
): FetchBrokersFailure => ({
    type: brokerTypes.FETCH_BROKER_FAILURE,
    payload
});
