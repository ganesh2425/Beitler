import { loginTypes } from "../constants/actionTypes";
import {
    FetchLoginFailure,
    FetchPostsFailurePayload,
    FetchLoginRequest,
    FetchLoginSuccess,
    Login, AuthResponse
} from "../interfaces/types";

export const fetchLoginRequest = (payload: Login): FetchLoginRequest => ({
    type: loginTypes.FETCH_LOGIN_REQUEST,
    payload
});

export const fetchLoginSuccess = (
    payload: AuthResponse
): FetchLoginSuccess => ({
    type: loginTypes.FETCH_LOGIN_SUCCESS,
    payload
});

export const fetchLoginFailure = (
    payload: FetchPostsFailurePayload
): FetchLoginFailure => ({
    type: loginTypes.FETCH_LOGIN_FAILURE,
    payload
});

export const setLoggedAction = (payload: any, history: any) => ({
    type: loginTypes.LOGGED_INFO,
    payload,
    history
});
