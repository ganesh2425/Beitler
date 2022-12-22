import {ediQueueTypes} from "../constants/actionTypes";
import {EdiQueueActions, EdiQueueState} from "../interfaces/types";
import { RootState } from "./index";

const initialState: EdiQueueState = {
    pending: false,
    ediQueue: [],
    ediQueue_success: {},
    error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: EdiQueueActions) => {
    switch (action.type) {
        case ediQueueTypes.FETCH_EDI_QUEUE_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case ediQueueTypes.FETCH_EDI_QUEUE_SUCCESS:
            return {
                ...state,
                pending: false,
                ediQueue: action.payload.EDIQueue,
                error: null,
            };
        case ediQueueTypes.FETCH_EDI_QUEUE_FAILURE:
            return {
                ...state,
                pending: false,
                ediQueue: [],
                error: action.payload.error,
            };
        case ediQueueTypes.CREATE_EDI_QUEUE_REQUEST:
            return {
                ...state,
                ediQueue_success: action.payload.ediQueue_success,
                pending: true,
            };
        default:
            return {
                ...state,
            };
    }
};

export const getEdiQueueList = (state: RootState) =>
    state.ediQueue.ediQueue;
export const getEdiQueueSuccess = (state: RootState) =>
    state.ediQueue.ediQueue_success;
export const getEdiQueueFailure = (state: RootState) =>
    state.ediQueue.error;
