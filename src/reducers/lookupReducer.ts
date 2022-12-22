import { commonTypes } from "../constants/actionTypes";
import { LookupsActions, LookupState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: LookupState = {
  pending: false,
  lookups: [],
  error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: LookupsActions) => {
  switch (action.type) {
    case commonTypes.LOOKUPS:
      return {
        ...state,
        pending: true,
      };
    case commonTypes.LOOKUP_SUCCESS:
      return {
        ...state,
        pending: false,
        lookups: action.payload,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLookupDetails = (state: RootState) => state.lookups.lookups;

export const getLookupFailure = (state: RootState) => state.lookups.error;
