// export const BASE_URL = 'http://20.85.233.110/api';
export const BASE_URL = "https://lmsapi.wjbeitler.com/api";

export const PHONE = /^[0-9\- ]{10}$/;
export const LANDlINE = /^[0-9\- ]{8,10}$/;

export const ENC_KEY = "wjbeitler2021!~~"
export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const COMMON_CONFIG = "COMMON_CONFIG";
export const CONTACTS_CONFIG = "CONTACTS_CONFIG";

export enum postTypes {
  FETCH_POST_REQUEST = "FETCH_POST_REQUEST",
  FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS",
  FETCH_POST_FAILURE = "FETCH_POST_FAILURE",
}

export enum permissionTypes {
  FETCH_PERMISSION_REQUEST = "FETCH_PERMISSION_REQUEST",
  FETCH_PERMISSION_SUCCESS = "FETCH_PERMISSION_SUCCESS",
  FETCH_PERMISSION_FAILURE = "FETCH_PERMISSION_FAILURE",
  FETCH_PERMISSION_GROUP_REQUEST = "FETCH_PERMISSION_GROUP_REQUEST",
  FETCH_PERMISSION_GROUP_SUCCESS = "FETCH_PERMISSION_GROUP_SUCCESS",
  CREATE_PERMISSION_REQUEST = "CREATE_PERMISSION_REQUEST",
  CREATE_PERMISSION_GROUP_REQUEST = "CREATE_PERMISSION_GROUP_REQUEST",
  UPDATE_PERMISSION_REQUEST = "UPDATE_PERMISSION_REQUEST",
  UPDATE_PERMISSION_GROUP_REQUEST = "UPDATE_PERMISSION_GROUP_REQUEST",
}

export enum eventsTypes {
  FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST",
  FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS",
  EVENTS_SUCCESS_MESSAGE = "EVENTS_SUCCESS_MESSAGE",
  FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE",
  CREATE_EVENTS_REQUEST = "CREATE_EVENTS_REQUEST",
  UPDATE_EVENTS_REQUEST = "UPDATE_EVENTS_REQUEST",
  DELETE_EVENTS_REQUEST = "DELETE_EVENTS_REQUEST",
}

export enum ordersTypes {
  FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE",
}

export enum ratesTypes {
  FETCH_RATES_REQUEST = "FETCH_RATES_REQUEST",
  FETCH_RATES_SUCCESS = "FETCH_RATES_SUCCESS",
  FETCH_RATES_FAILURE = "FETCH_RATES_FAILURE",
  CREATE_RATES_REQUEST = "CREATE_RATES_REQUEST",
  UPDATE_RATES_REQUEST = "UPDATE_RATES_REQUEST",
}

export enum ediQueueTypes {
  FETCH_EDI_QUEUE_REQUEST = "FETCH_EDI_QUEUE_REQUEST",
  FETCH_EDI_QUEUE_SUCCESS = "FETCH_EDI_QUEUE_SUCCESS",
  FETCH_EDI_QUEUE_FAILURE = "FETCH_EDI_QUEUE_FAILURE",
  CREATE_EDI_QUEUE_REQUEST = "CREATE_EDI_QUEUE_REQUEST",
  UPDATE_EDI_QUEUE_REQUEST = "UPDATE_EDI_QUEUE_REQUEST",
}

export enum deliveryTypes {
  FETCH_DELIVERY_REQUEST = "FETCH_DELIVERY_REQUEST",
  FETCH_DELIVERY_SUCCESS = "FETCH_DELIVERY_SUCCESS",
  FETCH_DELIVERY_FAILURE = "FETCH_DELIVERY_FAILURE",
  UPDATE_DELIVERY_REQUEST = "UPDATE_DELIVERY_REQUEST",
  UPDATE_DELIVERY_SUCCESS = "UPDATE_DELIVERY_SUCCESS",
  UPDATE_DELIVERY_FAILURE = "UPDATE_DELIVERY_FAILURE",
}

export enum customerTypes {
  FETCH_CUSTOMER_REQUEST = "FETCH_CUSTOMER_REQUEST",
  CREATE_CUSTOMER = "CREATE_CUSTOMER",
  UPDATE_CUSTOMER = "UPDATE_CUSTOMER",
  FETCH_CUSTOMER_SUCCESS = "FETCH_CUSTOMER_SUCCESS",
  FETCH_CUSTOMER_FAILURE = "FETCH_CUSTOMER_FAILURE",
  FETCH_INVOICE_CUSTOMER_SUCCESS = "FETCH_INVOICE_CUSTOMER_SUCCESS",
  FETCH_INVOICE_CUSTOMER_FAILURE = "FETCH_INVOICE_CUSTOMER_FAILURE",
  FETCH_INVOICE_CUSTOMER_REQUEST = "FETCH_INVOICE_CUSTOMER_REQUEST",
  FETCH_PICKUP_SUCCESS = "FETCH_PICKUP_SUCCESS",
  FETCH_PICKUP_FAILURE = "FETCH_PICKUP_FAILURE",
  FETCH_CONSIGNEE_SUCCESS = "FETCH_CONSIGNEE_SUCCESS",
  FETCH_CONSIGNEE_FAILURE = "FETCH_CONSIGNEE_FAILURE",
  CREATE_CARRIER = "CREATE_CARRIER",
  UPDATE_CARRIER = "UPDATE_CARRIER",
  CREATE_BROKER = "CREATE_BROKER",
  UPDATE_BROKER = "UPDATE_BROKER",
  CREATE_POOL = "CREATE_POOL",
  UPDATE_POOL = "UPDATE_POOL",
  UPDATE_STORE = "UPDATE_STORE",
  CREATE_STORE = "CREATE_STORE",
  CREATE_VENDOR = "CREATE_VENDOR",
  UPDATE_VENDOR = "UPDATE_VENDOR",
  FETCH_VENDOR_REQUEST = "FETCH_VENDOR_REQUEST",
  FETCH_VENDOR_SUCCESS = "FETCH_VENDOR_SUCCESS",
  FETCH_VENDOR_FAILURE = "FETCH_VENDOR_FAILURE",
}

export enum brokerTypes {
  FETCH_BROKER_REQUEST = "FETCH_BROKER_REQUEST",
  CREATE_BROKER = "CREATE_BROKER",
  UPDATE_BROKER = "UPDATE_BROKER",
  FETCH_BROKER_SUCCESS = "FETCH_BROKER_SUCCESS",
  FETCH_BROKER_FAILURE = "FETCH_BROKER_FAILURE",
}

/**
 * Actions for Notification Templates
 */
export enum NotificationTemplateTypes {
  FETCH_NOTIFICATION_TEMPLATE_REQUEST = "FETCH_NOTIFICATION_TEMPLATE_REQUEST",
  CREATE_NOTIFICATION_TEMPLATE = "CREATE_NOTIFICATION_TEMPLATE",
  UPDATE_NOTIFICATION_TEMPLATE = "UPDATE_NOTIFICATION_TEMPLATE",
  UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION",
  DELETE_NOTIFICATION_TEMPLATE = "DELETE_NOTIFICATION_TEMPLATE",
  FETCH_NOTIFICATION_TEMPLATE_SUCCESS = "FETCH_NOTIFICATION_TEMPLATE_SUCCESS",
  FETCH_NOTIFICATION_TEMPLATE_FAILURE = "FETCH_NOTIFICATION_TEMPLATE_FAILURE",
}

export enum InvoiceTypes {
  FETCH_INVOICE_REQUEST = "FETCH_INVOICE_REQUEST",
  FETCH_INVOICE_SUCCESS = "FETCH_INVOICE_SUCCESS",
  FETCH_INVOICE_FAILURE = "FETCH_INVOICE_FAILURE",
  CREATE_INVOICE_REQUEST = "CREATE_INVOICE_REQUEST",
  UPDATE_INVOICE_SUCCESS = "UPDATE_INVOICE_SUCCESS",
  UPDATE_INVOICE_REQUEST = "UPDATE_INVOICE_REQUEST",
  DELETE_INVOICE_REQUEST = "DELETE_INVOICE_REQUEST",
  FETCH_PURCHASE_JOURNAL_REQUEST = "FETCH_PURCHASE_JOURNAL_REQUEST",
  FETCH_PURCHASE_JOURNAL_SUCCESS = "FETCH_PURCHASE_JOURNAL_SUCCESS",
  FETCH_PURCHASE_JOURNAL_FAILURE = "FETCH_PURCHASE_JOURNAL_FAILURE",
  CREATE_PURCHASEJOURNAL_REQUEST = "CREATE_PURCHASEJOURNAL_REQUEST",
  UPDATE_PURCHASEJOURNAL_REQUEST = "UPDATE_PURCHASEJOURNAL_REQUEST",
  UPDATE_PURCHASEJOURNAL_SUCCESS = "UPDATE_PURCHASEJOURNAL_SUCCESS",
  CREATE_PURCHASEJOURNAL_SUCCESS = "CREATE_PURCHASEJOURNAL_SUCCESS",
  CREATE_PURCHASEJOURNAL_FAILURE = "CREATE_PURCHASEJOURNAL_FAILURE",
  PROCESS_QUEUE = "PROCESS_QUEUE",
  PROCESS_QUEUE_SUCCESS = "PROCESS_QUEUE_SUCCESS",
  ADD_EDI_REQUEST = "ADD_EDI_REQUEST"
}

export enum loginTypes {
  FETCH_LOGIN_REQUEST = "FETCH_LOGIN_REQUEST",
  FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS",
  FETCH_LOGIN_FAILURE = "FETCH_LOGIN_FAILURE",
  LOGGED_INFO = "LOGGED_INFO",
}

export enum rulesTypes {
  FETCH_RULES_REQUEST = "FETCH_RULES_REQUEST",
  FETCH_RULES_SUCCESS = "FETCH_RULES_SUCCESS",
  RULES_SUCCESS_MESSAGE = "RULES_SUCCESS_MESSAGE",
  FETCH_RULES_FAILURE = "FETCH_RULES_FAILURE",
  CREATE_RULES_REQUEST = "CREATE_RULES_REQUEST",
  UPDATE_RULES_REQUEST = "UPDATE_RULES_REQUEST",
  DELETE_RULES_REQUEST = "DELETE_RULES_REQUEST",
}

export enum commonTypes {
  LOOKUPS = "LOOKUPS",
  LOOKUP_SUCCESS = "LOOKUP_SUCCESS",
  LOOKUP_FAILURE = "LOOKUP_FAILURE",
}

export const TITLES = [
  { id: 1, value: "Mr" },
  { id: 2, value: "Mrs" },
];

export const ENTITY_TYPES = [
  { id: 2, value: "Carrier" },
  { id: 3, value: "Broker" },
  { id: 4, value: "PoolProvider" },
  { id: 5, value: "Store" },
  { id: 50, value: "Corporate(BLS)" },
  { id: 54, value: "DC info" },
];

export const CONTACT_TYPE = [
  { id: 6, value: "Primary Contact" },
  { id: 7, value: "Secondary Contact" },
  { id: 8, value: "Additional Contact" },
  { id: 9, value: "Executive Level" },
  { id: 10, value: "Account/Sales Rep" },
  { id: 11, value: "Terminal" },
  { id: 12, value: "Operations" },
  { id: 13, value: "Other" },
];

export const ADDRESS_TYPE = [
  { id: 14, value: "Corporate" },
  { id: 15, value: "DC" },
  { id: 16, value: "Bill To" },
  { id: 17, value: "Remit T0" },
  { id: 18, value: "Terminal" },
  { id: 52, value: "Insurance/Policy" },
  { id: 53, value: "Store" },
];

export const BILL_TYPE = [
  { id: 19, value: "Bill To" },
  { id: 20, value: "Remit To" },
  { id: 51, value: "Insurance/Policy" },
];

export const SCAN_TYPE = [
  { id: 21, value: "Inbound" },
  { id: 22, value: "Outbound" },
  { id: 23, value: "AtstoreScan" },
  { id: 24, value: "PalletBuildScan" },
];

export const DOC_TYPE = [
  { id: 25, value: "Copy of Shippers In" },
  { id: 26, value: "Copy of BOL" },
  { id: 27, value: "Copy of Signed Proof" },
  { id: 28, value: "Delivery" },
  { id: 29, value: "Filled Claim form" },
  { id: 30, value: "Images of damaged" },
  { id: 31, value: "products" },
  { id: 32, value: "Type of Damage" },
];

export const CLAIM_TYPE = [
  { id: 33, value: "Claimant" },
  { id: 34, value: "Carrier" },
  { id: 35, value: "Shipper" },
  { id: 36, value: "ShipFrom" },
  { id: 37, value: "ShipTo" },
  { id: 38, value: "Consignee" },
];

export const SECTION_TYPE = [
  { id: 39, value: "DeliveryCharges" },
  { id: 40, value: "Handling" },
  { id: 41, value: "Accessorial" },
];

export const RATE_TYPE = [
  { id: 42, value: "Per piece" },
  { id: 43, value: "CWT" },
  { id: 44, value: "flatRate" },
  { id: 45, value: "permile" },
];

export const TRANS_TYPE = [
  { id: 46, value: "Inbound" },
  { id: 47, value: "Delivery" },
];

export const NOTIFICATION_TYPE = [
  { id: 48, value: "email" },
  { id: 48, value: "sms" },
];