import { customerTypes } from "../constants/actionTypes";
import {
  AddCustomers,
  AddCarrier,
  AddBroker,
  AddPool,
  FetchCustomersFailure,
  FetchCustomersFailurePayload,
  FetchCustomersRequest,
  FetchCustomersSuccess,
  FetchCustomersSuccessPayload,
  UpdateCustomers,
  UpdateCarrier,
  UpdateBroker,
  UpdatePool,
  UpdateCustomersSuccessPayload,
  AddStore,
  UpdateStore,
  FetchVendorSuccess,
  FetchVendorFailure,
  AddVendor,
  FetchVendorRequest,
  UpdateVendor,
} from "../interfaces/types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchCustomersRequest = (payload: any): FetchCustomersRequest => ({
  type: customerTypes.FETCH_CUSTOMER_REQUEST,
  payload,
});

export const addCustomersRequest = (payload: any): AddCustomers => ({
  type: customerTypes.CREATE_CUSTOMER,
  payload,
});

export const addCarrierRequest = (payload: any): AddCarrier => ({
  type: customerTypes.CREATE_CARRIER,
  payload,
});

export const addBrokerRequest = (payload: any): AddBroker => ({
  type: customerTypes.CREATE_BROKER,
  payload,
});

export const addPoolRequest = (payload: any): AddPool => ({
  type: customerTypes.CREATE_POOL,
  payload,
});

export const addStoreRequest = (payload: any): AddStore => ({
  type: customerTypes.CREATE_STORE,
  payload,
});

export const updateCustomersRequest = (payload: any): UpdateCustomers => ({
  type: customerTypes.UPDATE_CUSTOMER,
  payload,
});

export const updateCarrierRequest = (payload: any): UpdateCarrier => ({
  type: customerTypes.UPDATE_CARRIER,
  payload,
});

export const updateBrokerRequest = (payload: any): UpdateBroker => ({
  type: customerTypes.UPDATE_BROKER,
  payload,
});

export const updatePoolRequest = (payload: any): UpdatePool => ({
  type: customerTypes.UPDATE_POOL,
  payload,
});

export const updateStoreRequest = (payload: any): UpdateStore => ({
  type: customerTypes.UPDATE_STORE,
  payload,
});

export const fetchCustomersSuccess = (
  payload: FetchCustomersSuccessPayload
): FetchCustomersSuccess => ({
  type: customerTypes.FETCH_CUSTOMER_SUCCESS,
  payload,
});

export const updateCustomersSuccess = (
  payload: UpdateCustomersSuccessPayload
): UpdateCustomers => ({
  type: customerTypes.UPDATE_CUSTOMER,
  payload,
});

export const updateCarriersSuccess = (
  payload: UpdateCustomersSuccessPayload
): UpdateCarrier => ({
  type: customerTypes.UPDATE_CARRIER,
  payload,
});

export const updateBrokersSuccess = (
  payload: UpdateCustomersSuccessPayload
): UpdateBroker => ({
  type: customerTypes.UPDATE_BROKER,
  payload,
});

export const updatePoolsSuccess = (
  payload: UpdateCustomersSuccessPayload
): UpdatePool => ({
  type: customerTypes.UPDATE_POOL,
  payload,
});

export const updateStoresSuccess = (
  payload: UpdateCustomersSuccessPayload
): UpdateStore => ({
  type: customerTypes.UPDATE_STORE,
  payload,
});
export const fetchCustomersFailure = (
  payload: FetchCustomersFailurePayload
): FetchCustomersFailure => ({
  type: customerTypes.FETCH_CUSTOMER_FAILURE,
  payload,
});

//Vendor Actions
export const fetchVendorRequest = (payload: any): FetchVendorRequest => ({
  type: customerTypes.FETCH_VENDOR_REQUEST,
  payload,
});

export const addVendorRequest = (payload: any): AddVendor => ({
  type: customerTypes.CREATE_VENDOR,
  payload,
});

export const updateVendorRequest = (payload: any): UpdateVendor => ({
  type: customerTypes.UPDATE_VENDOR,
  payload,
});