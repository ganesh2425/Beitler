import {ratesTypes} from "../constants/actionTypes";
import { RatesActions, RatesState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: RatesState = {
    pending: false,
    rates: [],
    rate_success: {},
    error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: RatesActions) => {
    switch (action.type) {
        case ratesTypes.FETCH_RATES_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case ratesTypes.FETCH_RATES_SUCCESS:
            return {
                ...state,
                pending: false,
                rates: action.payload.Rates,
                error: null,
            };
        case ratesTypes.FETCH_RATES_FAILURE:
            return {
                ...state,
                pending: false,
                rates: [],
                error: action.payload.error,
            };
        case ratesTypes.CREATE_RATES_REQUEST:
            return {
                ...state,
                rate_success: action.payload.rate_success,
                pending: true,
            };
        case ratesTypes.UPDATE_RATES_REQUEST:
            return {
                ...state,
                rate_success: action.payload.rate_success,
                pending: true,
            };
        default:
            return {
                ...state,
            };
    }
};

export const getRateList = (state: RootState) =>
    state.rates.rates;
export const getRateSuccess = (state: RootState) =>
    state.rates.rate_success;
export const getRateFailure = (state: RootState) =>
    state.rates.error;
