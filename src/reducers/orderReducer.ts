import { ordersTypes } from "../constants/actionTypes";
import { OrderActions, OrderState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: OrderState = {
    pending: false,
    orders: [],
    order_success: {},
    error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: OrderActions) => {
    switch (action.type) {
        case ordersTypes.FETCH_ORDERS_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case ordersTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                pending: false,
                orders: action.payload.Orders,
                error: null,
            };
        case ordersTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                pending: false,
                orders: [],
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};

export const getOrderList = (state: RootState) =>
    state.orders.orders;
export const getOrderSuccess = (state: RootState) =>
    state.orders.order_success;
export const getOrderFailure = (state: RootState) =>
    state.orders.error;
