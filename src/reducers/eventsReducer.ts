import { eventsTypes } from "../constants/actionTypes";
import { EventsState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: EventsState = {
  pending: false,
  events: [],
  events_success: {},
  error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: any) => {
  // action: EventsActions
  switch (action.type) {
    case eventsTypes.FETCH_EVENTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case eventsTypes.CREATE_EVENTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case eventsTypes.UPDATE_EVENTS_REQUEST:
      return {
        ...state,
        events_success: action.payload.events_success,
        pending: true,
      };
    case eventsTypes.EVENTS_SUCCESS_MESSAGE:
      return {
        ...state,
        pending: false,
        events_success: action.payload.events_success,
        error: null,
      };
    case eventsTypes.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        events: action.payload.Events,
        error: null,
      };
    case eventsTypes.FETCH_EVENTS_FAILURE:
      return {
        ...state,
        pending: false,
        events: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
        pending: true,
      };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const getEventData = (state: RootState) => state.events;

export const getEventDetails = (state: RootState) => state.events.events;
export const getEventSuccess = (state: RootState) =>
  state.events.events_success;
export const getEventFailure = (state: RootState) => state.events.error;
