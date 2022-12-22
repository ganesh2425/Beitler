import {ratesTypes} from "../constants/actionTypes";

import {
    FetchRatesRequest,
    FetchRatesSuccess,
    FetchRatesFailure,
    FetchRatesSuccessPayload,
    FetchRatesFailurePayload,
    CreateRatesRequest,
    UpdateRatesRequest,
    UpdateRatesSuccessPayload
} from '../interfaces/types';

export const fetchRatesRequest = (payload: any): FetchRatesRequest => ({
    type: ratesTypes.FETCH_RATES_REQUEST,
    payload
});

export const fetchRatesSuccess = (
    payload: FetchRatesSuccessPayload
): FetchRatesSuccess => ({
    type: ratesTypes.FETCH_RATES_SUCCESS,
    payload
});

export const fetchRatesFailure = (
    payload: FetchRatesFailurePayload
): FetchRatesFailure => ({
    type: ratesTypes.FETCH_RATES_FAILURE,
    payload
});

export const createRatesRequest = (payload: any): CreateRatesRequest => ({
    type: ratesTypes.CREATE_RATES_REQUEST,
    payload
});

export const updateRatesRequest = (payload: any): UpdateRatesRequest => ({
    type: ratesTypes.UPDATE_RATES_REQUEST,
    payload
});

export const updateRatesSuccess = (
    payload: UpdateRatesSuccessPayload
): UpdateRatesRequest => ({
    type: ratesTypes.UPDATE_RATES_REQUEST,
    payload
});