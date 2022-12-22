import { rulesTypes } from "../constants/actionTypes";
import { RulesState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: RulesState = {
  pending: false,
  rules: [],
  rules_success: {},
  error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: any) => {
  // action: EventsActions
  switch (action.type) {
    case rulesTypes.FETCH_RULES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case rulesTypes.CREATE_RULES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case rulesTypes.UPDATE_RULES_REQUEST:
      return {
        ...state,
        rules_success: action.payload.rules_success,
        pending: true,
      };
    case rulesTypes.RULES_SUCCESS_MESSAGE:
      return {
        ...state,
        pending: false,
        rules_success: action.payload.rules_success,
        error: null,
      };
    case rulesTypes.FETCH_RULES_SUCCESS:
      return {
        ...state,
        pending: false,
        rules: action.payload.Rules,
        error: null,
      };
    case rulesTypes.FETCH_RULES_FAILURE:
      return {
        ...state,
        pending: false,
        rules: [],
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

export const getRulesDetails = (state: RootState) => state.rules.rules;
export const getRulesSuccess = (state: RootState) =>
  state.rules.rules_success;
export const getRulesFailure = (state: RootState) => state.rules.error;
