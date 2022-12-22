import { deliveryTypes } from "../constants/actionTypes";
import { DeliveryActions, DeliveryState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: DeliveryState = {
  pending: false,
  delivery: [],
  delivery_success: {},
  error: null,
  update_delivery_pending: false,
  update_delivery: [],
  update_delivery_success: [],
  update_delivery_error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: DeliveryActions) => {
  switch (action.type) {
    case deliveryTypes.FETCH_DELIVERY_REQUEST:
      return {
        ...state,
        update_delivery: [],
        pending: true,
      };
    case deliveryTypes.FETCH_DELIVERY_SUCCESS:
      return {
        ...state,
        pending: false,
        update_delivery: [],
        delivery: action.payload.Delivery,
        error: null,
      };
    case deliveryTypes.FETCH_DELIVERY_FAILURE:
      return {
        ...state,
        pending: false,
        orders: [],
        error: action.payload.error,
      };
    case deliveryTypes.UPDATE_DELIVERY_REQUEST:
      return {
        ...state,
        update_delivery: [],
        update_delivery_pending: true,
      };
    case deliveryTypes.UPDATE_DELIVERY_SUCCESS:
      return {
        ...state,
        update_delivery_pending: false,
        update_delivery: action.payload.Delivery,
        error: null,
      };
    case deliveryTypes.UPDATE_DELIVERY_FAILURE:
      return {
        ...state,
        update_delivery_pending: false,
        update_delivery: action.payload.error,
        update_delivery_error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getDeliveryList = (state: RootState) => state.delivery.delivery;
export const getDeliverySuccess = (state: RootState) =>
  state.delivery.delivery_success;
export const getDeliveryFailure = (state: RootState) => state.delivery.error;
export const updateDeliveryList = (state: RootState) =>
  state.delivery.update_delivery;
