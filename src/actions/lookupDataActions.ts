import {commonTypes} from "../constants/actionTypes";
import {FetchLookupsRequest, FetchLookupsSuccess} from "../interfaces/types";

export const fetchLookupRequest = (payload: any): FetchLookupsRequest => ({
    type: commonTypes.LOOKUPS,
    payload
});

export const fetchLookupSuccess = (
    payload: any
): FetchLookupsSuccess => ({
    type: commonTypes.LOOKUP_SUCCESS,
    payload
});