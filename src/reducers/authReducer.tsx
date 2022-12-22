import { LoginActions, LoginState} from "../interfaces/types";
import {loginTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: LoginState = {
    pending: false,
    error: null,
    token: ''
};

export default (state = initialState, action: LoginActions): {pending: boolean, error: string | null, token: string} => {
    switch (action.type) {
        case loginTypes.FETCH_LOGIN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case loginTypes.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case loginTypes.FETCH_LOGIN_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLoginDetails = (state: RootState) => state.auth;