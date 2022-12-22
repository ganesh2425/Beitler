import * as types from '../constants/actionTypes';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const commonAction = (payload: any) => ({
    type: types.COMMON_CONFIG,
    payload
});