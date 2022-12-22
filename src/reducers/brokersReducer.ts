import { brokerTypes } from "../constants/actionTypes";
import { BrokersActions, BrokersState } from "../interfaces/brokerTypes";
import { RootState } from "./index";

const initialState: BrokersState = {
  pending: false,
  brokers: [],
  error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: BrokersActions) => {
  switch (action.type) {
    case brokerTypes.FETCH_BROKER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case brokerTypes.CREATE_BROKER:
      return {
        ...state,
        pending: true,
      };
    case brokerTypes.UPDATE_BROKER:
      return {
        ...state,
        pending: true,
      };
    case brokerTypes.FETCH_BROKER_SUCCESS:
      return {
        ...state,
        pending: false,
        brokers: action.payload.brokers,
        error: null,
      };
    case brokerTypes.FETCH_BROKER_FAILURE:
      return {
        ...state,
        pending: false,
        brokers: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getBrokerLists = (state: RootState) => state.brokers.brokers;
export const getBrokerFailure = (state: RootState) => state.brokers.error;
