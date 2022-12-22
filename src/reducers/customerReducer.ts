import { customerTypes } from "../constants/actionTypes";
import { CustomersActions, CustomersState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: CustomersState = {
  pending: false,
  customers: [],
  consingee: [],
  pickup: [],
  customer_success: {},
  pickup_success: {},
  consignee_success: {},
  error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: CustomersActions) => {
  switch (action.type) {
    case customerTypes.FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case customerTypes.CREATE_CUSTOMER:
      return {
        ...state,
        pending: true,
      };
    case customerTypes.CREATE_CARRIER:
      return {
        ...state,
        pending: true,
      };
    case customerTypes.CREATE_BROKER:
      return {
        ...state,
        pending: true,
      };
    case customerTypes.CREATE_POOL:
      return {
        ...state,
        pending: true,
      };
    case customerTypes.CREATE_STORE:
      return {
        ...state,
        pending: true,
      };
      case customerTypes.CREATE_VENDOR:
      return {
        ...state,
        pending: true,
      };
    case customerTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        customer_success: action.payload.customer_success,
        pending: false,
      };
    case customerTypes.UPDATE_CARRIER:
      return {
        ...state,
        customer_success: action.payload.customer_success,
        pending: false,
      };
    case customerTypes.UPDATE_BROKER:
      return {
        ...state,
        customer_success: action.payload.customer_success,
        pending: false,
      };
    case customerTypes.UPDATE_POOL:
      return {
        ...state,
        customer_success: action.payload.customer_success,
        pending: false,
      };
    case customerTypes.UPDATE_STORE:
      return {
        ...state,
        customer_success: action.payload.customer_success,
        pending: false,
      };
    case customerTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        pending: false,
        customers: action.payload.customers,
        error: null,
      };
    case customerTypes.FETCH_CUSTOMER_FAILURE:
      return {
        ...state,
        pending: false,
        customers: [],
        error: action.payload.error,
      };

     
    default:
      return {
        ...state,
      };
  }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCustomerDetails = (state: RootState) =>
  state.customers.customers;
export const getCustomerSuccess = (state: RootState) =>
  state.customers.customer_success;
export const getCustomerFailure = (state: RootState) => state.customers.error;
