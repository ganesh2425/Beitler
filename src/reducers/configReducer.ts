import * as types from '../constants/actionTypes';
import StorageService from "../services/Storage.service";
import {RootState} from "./index";

const initialState = {
    locale: 'en',
    token: StorageService.getCookies('token'),
    entity_admin: false,
    entity_user: false,
    entityText: 'customers'
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (state = initialState, action: any) {
    switch (action.type) {
        case types.COMMON_CONFIG:
            return {
                ...state,
                entity_admin: action.payload.entity_admin,
                entity_user: action.payload.entity_user,
                entityText: action.payload.entityText
            };

        default:
            return state;
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConfigDetails = (state: RootState) => state.config;