import { IPost } from "../models/IPost";
import {
  loginTypes,
  postTypes,
  permissionTypes,
  customerTypes,
  eventsTypes,
  commonTypes,
  ordersTypes,
  deliveryTypes,
  ratesTypes, ediQueueTypes, rulesTypes
} from "../constants/actionTypes";
import { IEvents, IRules } from "../models/IEvents";
import { ICustomer, IPermission } from "../models/IPermission";

export interface PostsState {
  pending: boolean;
  posts: IPost[];
  error: string | null;
}

export interface LoginState {
  pending: boolean;
  error: string | null;
  token: string;
}

export interface Login {
  login_id: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface FetchPostsSuccessPayload {
  posts: IPost[];
}

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchPostsRequest {
  type: typeof postTypes.FETCH_POST_REQUEST;
}

export type FetchPostsSuccess = {
  type: typeof postTypes.FETCH_POST_SUCCESS;
  payload: FetchPostsSuccessPayload;
};

export type FetchPostsFailure = {
  type: typeof postTypes.FETCH_POST_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type PostsActions =
  | FetchPostsRequest
  | FetchPostsSuccess
  | FetchPostsFailure;

export interface FetchLoginRequest {
  type: typeof loginTypes.FETCH_LOGIN_REQUEST;
  payload: Login;
}

export type FetchLoginSuccess = {
  type: typeof loginTypes.FETCH_LOGIN_SUCCESS;
  payload: AuthResponse;
};

export type FetchLoginFailure = {
  type: typeof loginTypes.FETCH_LOGIN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type LoginActions =
  | FetchLoginRequest
  | FetchLoginSuccess
  | FetchLoginFailure;

//Permissions

export interface PermissionsState {
  pending: boolean;
  permissions: IPermission[];
  permissionsGroup: any;
  permission_success: any;
  error: string | null;
}

export interface FetchPermissionsSuccessPayload {
  Permissions: IPermission[];
}

export interface FetchPermissionsGroupSuccessPayload {
  PermissionsGroup: any;
}

export interface UpdatePermissionsSuccessPayload {
  permission_success: any;
}

export interface FetchPermissionsFailurePayload {
  error: string;
}

export interface FetchPermissionsRequest {
  type: typeof permissionTypes.FETCH_PERMISSION_REQUEST;
  payload: any;
}

export interface CreatePermissionRequest {
  type: typeof permissionTypes.CREATE_PERMISSION_REQUEST;
  payload: any;
}

export interface UpdatePermissionRequest {
  type: typeof permissionTypes.UPDATE_PERMISSION_REQUEST;
  payload: any;
}

export type FetchPermissionsSuccess = {
  type: typeof permissionTypes.FETCH_PERMISSION_SUCCESS;
  payload: FetchPermissionsSuccessPayload;
};

export type FetchPermissionsFailure = {
  type: typeof permissionTypes.FETCH_PERMISSION_FAILURE;
  payload: FetchPermissionsFailurePayload;
};

export interface FetchPermissionGroupRequest {
  type: typeof permissionTypes.FETCH_PERMISSION_GROUP_REQUEST;
  payload: any;
}
export type FetchPermissionsGroupSuccess = {
  type: typeof permissionTypes.FETCH_PERMISSION_GROUP_SUCCESS;
  payload: FetchPermissionsGroupSuccessPayload;
};
export interface CreatePermissionGroupRequest {
  type: typeof permissionTypes.CREATE_PERMISSION_GROUP_REQUEST;
  payload: any;
}

export interface UpdatePermissionGroupRequest {
  type: typeof permissionTypes.UPDATE_PERMISSION_GROUP_REQUEST;
  payload: any;
}

export type PermissionsActions =
  | FetchPermissionsRequest
  | FetchPermissionsSuccess
  | FetchPermissionsFailure
  | FetchPermissionGroupRequest
  | FetchPermissionsGroupSuccess
  | CreatePermissionRequest
  | CreatePermissionGroupRequest
  | UpdatePermissionRequest
  | UpdatePermissionGroupRequest;

//Events

export interface EventsState {
  pending: boolean;
  events: IEvents[];
  events_success: any;
  error: string | null;
}

export interface FetchEventsSuccessPayload {
  Events: IEvents[];
}

export interface UpdateEventsSuccessPayload {
  events_success: any;
}

export interface FetchEventsFailurePayload {
  error: string;
}

export interface FetchEventsRequest {
  type: typeof eventsTypes.FETCH_EVENTS_REQUEST;
  payload: any;
}

export interface CreatePermissionGroupRequest {
  type: typeof permissionTypes.CREATE_PERMISSION_GROUP_REQUEST;
  payload: any;
}

export interface UpdatePermissionGroupRequest {
  type: typeof permissionTypes.UPDATE_PERMISSION_GROUP_REQUEST;
  payload: any;
}

export interface CreateEventsRequest {
  type: typeof eventsTypes.CREATE_EVENTS_REQUEST;
  payload: any;
}

export interface UpdateEventsRequest {
  type: typeof eventsTypes.UPDATE_EVENTS_REQUEST;
  payload: any;
}

export interface DeleteEventsRequest {
  type: typeof eventsTypes.DELETE_EVENTS_REQUEST;
  payload: any;
}

export type FetchEventsSuccess = {
  type: typeof eventsTypes.FETCH_EVENTS_SUCCESS;
  payload: FetchEventsSuccessPayload;
};

export type UpdateEventsSuccess = {
  type: typeof eventsTypes.EVENTS_SUCCESS_MESSAGE;
  payload: UpdateEventsSuccessPayload;
};
export type FetchEventsFailure = {
  type: typeof eventsTypes.FETCH_EVENTS_FAILURE;
  payload: FetchEventsFailurePayload;
};

export type EventsActions =
  | FetchEventsRequest
  | FetchEventsSuccess
  | FetchEventsFailure
  | CreateEventsRequest
  | UpdateEventsRequest
  | DeleteEventsRequest;

export type IEventsProps = {
  text: string;
  NotinTempTypeLookUp?: any;
  NotinTempEventLookUp?: any;
};

export interface IEventsEntryForm {
  NotinEventName: string;
  NotinEventDescription: string;
  isActive: any;
}

//Inteface for Template Entry Form Payload
export interface IEventsEntryFormPayload {
  // Type: number;
  //Event: number;
  // Subject: string;
  Id: number;
  Name: string;
  Description: string;
  IsActive: boolean;
  IsDeleted: boolean;
}
//customers

export interface CustomersState {
  pending: boolean;
  customers: ICustomer[];
  consingee: ICustomer[];
  pickup: ICustomer[];
  customer_success: any;
  consignee_success: any;
  pickup_success: any;
  error: string | null;
}

export interface FetchCustomersSuccessPayload {
  customers: ICustomer[];
}

export interface FetchConsigneeSuccessPayload {
  consingee: ICustomer[];
}

export interface FetchPickUpSuccessPayload {
  pickup: ICustomer[];
}

export interface UpdateCustomersSuccessPayload {
  customer_success: any;
}

export interface FetchCustomersFailurePayload {
  error: string;
}

export interface FetchInvoiceCustomersRequest {
  type: typeof customerTypes.FETCH_INVOICE_CUSTOMER_REQUEST;
  payload: any;
}

export interface FetchCustomersRequest {
  type: typeof customerTypes.FETCH_CUSTOMER_REQUEST;
  payload: any;
}
export interface AddCustomers {
  type: typeof customerTypes.CREATE_CUSTOMER;
  payload: any;
}

export interface AddCarrier {
  type: typeof customerTypes.CREATE_CARRIER;
  payload: any;
}

export interface AddPool {
  type: typeof customerTypes.CREATE_POOL;
  payload: any;
}

export interface AddStore {
  type: typeof customerTypes.CREATE_STORE;
  payload: any;
}

export interface AddBroker {
  type: typeof customerTypes.CREATE_BROKER;
  payload: any;
}

export interface UpdateCustomers {
  type: typeof customerTypes.UPDATE_CUSTOMER;
  payload: any;
}

export interface UpdateCarrier {
  type: typeof customerTypes.UPDATE_CARRIER;
  payload: any;
}

export interface UpdateBroker {
  type: typeof customerTypes.UPDATE_BROKER;
  payload: any;
}

export interface UpdatePool {
  type: typeof customerTypes.UPDATE_POOL;
  payload: any;
}

export interface UpdateStore {
  type: typeof customerTypes.UPDATE_STORE;
  payload: any;
}

export type FetchCustomersSuccess = {
  type: typeof customerTypes.FETCH_CUSTOMER_SUCCESS;
  payload: FetchCustomersSuccessPayload;
};

export type FetchInvoiceCustomersSuccess = {
  type: typeof customerTypes.FETCH_INVOICE_CUSTOMER_SUCCESS;
  payload: FetchCustomersSuccessPayload;
};

export type FetchConsigneeSuccess = {
  type: typeof customerTypes.FETCH_CONSIGNEE_SUCCESS;
  payload: FetchConsigneeSuccessPayload;
};

export type FetchPickupSuccess = {
  type: typeof customerTypes.FETCH_PICKUP_SUCCESS;
  payload: FetchPickUpSuccessPayload;
};

export type FetchCustomersFailure = {
  type: typeof customerTypes.FETCH_CUSTOMER_FAILURE;
  payload: FetchPermissionsFailurePayload;
};

export type CustomersActions =
  | FetchCustomersRequest
  | AddCustomers
  | AddCarrier
  | AddBroker
  | AddPool
  | AddStore
  | UpdateCustomers
  | UpdateCarrier
  | UpdateBroker
  | UpdatePool
  | UpdateStore
  | FetchCustomersSuccess
  | FetchCustomersFailure
  | FetchInvoiceCustomersSuccess
  | FetchInvoiceCustomersRequest
  | FetchConsigneeSuccess
  | FetchVendorRequest
  | FetchVendorSuccess
  | FetchVendorFailure
  | AddVendor
  | FetchVendorRequest
  | FetchPickupSuccess;

export interface IType {
  createdBy: number;
  createdDt: Date;
  displayText: string;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  modifiedBy: number;
  modifiedDt: Date;
  sequence: number;
  type: string;
  value: string;
}

export interface Idept {
  createdBy: number;
  createdDt: Date;
  description: string;
  entity_Id: number;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  modifiedBy: number;
  modifiedDt: Date;
  name: string;
  permission_Group_Id: number;
}

//Inteface Notification Template Entry Form
export interface INotificationTemplateEntryForm {
  NotinTempType: number;
  NotinTempEvent: number;
  NotinTempSubject: string;
  NotinTempBody: string;
  isActive: any;
}

//Inteface for Template Entry Form Payload
export interface INotificationTemplateEntryFormPayload {
  Type: number;
  EventId: string;
  Subject: string;
  BodyText: string;
  IsActive: boolean;
  Id?: number;
  IsDeleted: boolean;
}

//lookups

export interface LookupState {
  pending: boolean;
  lookups: any;
  error: string | null;
}

export interface FetchLookupsRequest {
  type: typeof commonTypes.LOOKUPS;
  payload: any;
}

export interface FetchLookupsSuccess {
  type: typeof commonTypes.LOOKUP_SUCCESS;
  payload: any;
}

export type FetchLookupsFailure = {
  type: typeof commonTypes.LOOKUP_FAILURE;
  payload: any;
};

export type LookupsActions =
  | FetchLookupsRequest
  | FetchLookupsSuccess
  | FetchLookupsFailure;

//ORDER
export interface FetchOrdersRequest {
  type: typeof ordersTypes.FETCH_ORDERS_REQUEST;
  payload: any;
}
export type FetchOrderSuccess = {
  type: typeof ordersTypes.FETCH_ORDERS_SUCCESS;
  payload: FetchOrderSuccessPayload;
};

export type FetchOrderFailure = {
  type: typeof ordersTypes.FETCH_ORDERS_FAILURE;
  payload: FetchOrdersFailurePayload;
};

export interface FetchOrderSuccessPayload {
  Orders: any;
}

export interface FetchOrdersFailurePayload {
  error: string;
}

export type OrderActions =
  | FetchOrdersRequest
  | FetchOrderSuccess
  | FetchOrderFailure;

export interface OrderState {
  pending: boolean;
  orders: any;
  order_success: any;
  error: string | null;
}

//DELIVERY
export interface FetchDeliveryRequest {
  type: typeof deliveryTypes.FETCH_DELIVERY_REQUEST;
  payload: any;
}
export type FetchDeliverySuccess = {
  type: typeof deliveryTypes.FETCH_DELIVERY_SUCCESS;
  payload: FetchDeliverySuccessPayload;
};

export type FetchDeliveryFailure = {
  type: typeof deliveryTypes.FETCH_DELIVERY_FAILURE;
  payload: FetchDeliveryFailurePayload;
};

export interface FetchDeliverySuccessPayload {
  Delivery: any;
}

export interface FetchDeliveryFailurePayload {
  error: string;
}

export interface UpdateDeliveryRequest {
  type: typeof deliveryTypes.UPDATE_DELIVERY_REQUEST;
  payload: any;
}
export type UpdateDeliverySuccess = {
  type: typeof deliveryTypes.UPDATE_DELIVERY_SUCCESS;
  payload: any;
};

export type UpdateDeliveryFailure = {
  type: typeof deliveryTypes.UPDATE_DELIVERY_FAILURE;
  payload: any;
};

export interface UpdateDeliverySuccessPayload {
  Delivery: any;
}

export interface UpdateDeliveryFailurePayload {
  error: string;
}

export type DeliveryActions =
  | FetchDeliveryRequest
  | FetchDeliverySuccess
  | FetchDeliveryFailure
  | UpdateDeliveryRequest
  | UpdateDeliverySuccess
  | UpdateDeliveryFailure;

export interface DeliveryState {
  pending: boolean;
  delivery: any;
  delivery_success: any;
  error: string | null;
  update_delivery_pending: boolean;
  update_delivery:any;
  update_delivery_success:any;
  update_delivery_error: string | null;
}

//RATES
export interface FetchRatesRequest {
  type: typeof ratesTypes.FETCH_RATES_REQUEST;
  payload: any;
}
export type FetchRatesSuccess = {
  type: typeof ratesTypes.FETCH_RATES_SUCCESS;
  payload: FetchRatesSuccessPayload;
};

export type FetchRatesFailure = {
  type: typeof ratesTypes.FETCH_RATES_FAILURE;
  payload: FetchRatesFailurePayload;
};

export interface CreateRatesRequest {
  type: typeof ratesTypes.CREATE_RATES_REQUEST;
  payload: any;
}

export interface UpdateRatesRequest {
  type: typeof ratesTypes.UPDATE_RATES_REQUEST;
  payload: any;
}

export interface FetchRatesSuccessPayload {
  Rates: any;
}

export interface FetchRatesFailurePayload {
  error: string;
}

export interface UpdateRatesSuccessPayload {
  rate_success: any;
}

export type RatesActions =
  | FetchRatesRequest
  | FetchRatesSuccess
  | FetchRatesFailure
  | CreateRatesRequest
  | UpdateRatesRequest;

export interface RatesState {
  pending: boolean;
  rates: any;
  rate_success: any;
  error: string | null;
}

//EDI
export interface FetchEdiQueueRequest {
  type: typeof ediQueueTypes.FETCH_EDI_QUEUE_REQUEST;
  payload: any;
}
export type FetchEdiQueueSuccess = {
  type: typeof ediQueueTypes.FETCH_EDI_QUEUE_SUCCESS;
  payload: FetchEdiQueueSuccessPayload;
};

export type FetchEdiQueueFailure = {
  type: typeof ediQueueTypes.FETCH_EDI_QUEUE_FAILURE;
  payload: FetchEdiQueueFailurePayload;
};

export interface CreateEdiQueueRequest {
  type: typeof ediQueueTypes.CREATE_EDI_QUEUE_REQUEST;
  payload: any;
}


export interface FetchEdiQueueSuccessPayload {
  EDIQueue: any;
}

export interface FetchEdiQueueFailurePayload {
  error: string;
}

export type EdiQueueActions =
    | FetchEdiQueueRequest
    | FetchEdiQueueSuccess
    | FetchEdiQueueFailure
    | CreateEdiQueueRequest

export interface EdiQueueState {
  pending: boolean;
  ediQueue: any;
  ediQueue_success: any;
  error: string | null;
}

//Vendor
export interface FetchVendorRequest {
  type: typeof customerTypes.FETCH_VENDOR_REQUEST;
  payload: any;
}
export type FetchVendorSuccess = {
  type: typeof customerTypes.FETCH_VENDOR_SUCCESS;
  payload: FetchCustomersSuccessPayload;
};

export type FetchVendorFailure = {
  type: typeof customerTypes.FETCH_VENDOR_FAILURE;
  payload: FetchCustomersSuccessPayload;
};

export interface AddVendor {
  type: typeof customerTypes.CREATE_VENDOR;
  payload: any;
}
export interface UpdateVendor {
  type: typeof customerTypes.UPDATE_VENDOR;
  payload: any;
}

//Rules
export interface RulesState {
  pending: boolean;
  rules: IRules[];
  rules_success: any;
  error: string | null;
}

export interface FetchRulesSuccessPayload {
  Rules: IRules[];
}

export interface UpdateRulesSuccessPayload {
  rules_success: any;
}

export interface FetchRulesFailurePayload {
  error: string;
}

export interface FetchRulesRequest {
  type: typeof rulesTypes.FETCH_RULES_REQUEST;
  payload: any;
}

export interface CreateRulesRequest {
  type: typeof rulesTypes.CREATE_RULES_REQUEST;
  payload: any;
}

export interface UpdateRulesRequest {
  type: typeof rulesTypes.UPDATE_RULES_REQUEST;
  payload: any;
}

export interface DeleteRulesRequest {
  type: typeof rulesTypes.DELETE_RULES_REQUEST;
  payload: any;
}

export type FetchRulesSuccess = {
  type: typeof rulesTypes.FETCH_RULES_SUCCESS;
  payload: FetchRulesSuccessPayload;
};

export type UpdateRulesSuccess = {
  type: typeof rulesTypes.RULES_SUCCESS_MESSAGE;
  payload: UpdateRulesSuccessPayload;
};
export type FetchRulesFailure = {
  type: typeof rulesTypes.FETCH_RULES_FAILURE;
  payload: FetchRulesFailurePayload;
};

export type RulesActions =
  | FetchRulesRequest
  | FetchRulesSuccess
  | FetchRulesFailure
  | CreateRulesRequest
  | UpdateRulesRequest
  | DeleteRulesRequest;

export type IRulesProps = {
  text: string;
  NotinTempTypeLookUp?: any;
  NotinTempRulesLookUp?: any;
};

export interface IRulesEntryForm {
  NotinRulesName: string;
  NotinRulesDescription: string;
  isActive: any;
}
