import {
    FetchEdiQueueFailure,
    FetchEdiQueueFailurePayload,
    FetchEdiQueueRequest,
    FetchEdiQueueSuccess,
    FetchEdiQueueSuccessPayload,
} from "../interfaces/types";
import {ediQueueTypes} from "../constants/actionTypes";

export const fetchEdiQueueRequest = (payload: any): FetchEdiQueueRequest => ({
    type: ediQueueTypes.FETCH_EDI_QUEUE_REQUEST,
    payload
});

export const fetchEdiQueueSuccess = (
    payload: FetchEdiQueueSuccessPayload
): FetchEdiQueueSuccess => ({
    type: ediQueueTypes.FETCH_EDI_QUEUE_SUCCESS,
    payload
});

export const fetchEdiQueueFailure = (
    payload: FetchEdiQueueFailurePayload
): FetchEdiQueueFailure => ({
    type: ediQueueTypes.FETCH_EDI_QUEUE_FAILURE,
    payload
});