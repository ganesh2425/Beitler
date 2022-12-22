import { InvoiceTypes } from "../constants/actionTypes";
import {
  FetchInvoiceFailure,
  FetchInvoiceFailurePayload,
  FetchInvoicePayload,
  FetchInvoiceRequest,
  FetchInvoiceSuccess,
  AddInvoiceRequest,
  AddPurchaseJournalRequest,
  UpdatePurchaseJournalRequest,
  AddPurchaseJournalSuccess,
  AddPurchaseJournalFailure,
  AddPurchaseJournalSuccessPayload,
  AddPurchaseJournalFailurePayload,
  UpdateInvoiceRequest,
  UpdateInvoiceSuccessPayload,
  UpdateInvoiceSuccessRequest,
  FetchPurchaseJournalRequest,
  FetchPurchaseJournalPayload,
  FetchPurchaseJournalSuccess,
  FetchPurchaseJournalFailurePayload,
  FetchPurchaseJournalFailure,
  InvoiceProcessQueue,
  InvoiceProcessQueueSuccess,
  AddEDIRequest,
  UpdatePurchaseJournalSuccess,
} from "../interfaces/interfaceInvoice";

/**
 *
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchInvoiceRequest = (payload: any): FetchInvoiceRequest => ({
  type: InvoiceTypes.FETCH_INVOICE_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchInvoiceSuccess = (
  payload: FetchInvoicePayload
): FetchInvoiceSuccess => ({
  type: InvoiceTypes.FETCH_INVOICE_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchInvoiceFailure = (
  payload: FetchInvoiceFailurePayload
): FetchInvoiceFailure => ({
  type: InvoiceTypes.FETCH_INVOICE_FAILURE,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const addInvoiceRequest = (payload: any): AddInvoiceRequest => ({
  type: InvoiceTypes.CREATE_INVOICE_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateInvoiceRequest = (payload: any): UpdateInvoiceRequest => ({
  type: InvoiceTypes.UPDATE_INVOICE_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateInvoiceSuccess = (
  payload: UpdateInvoiceSuccessPayload
): UpdateInvoiceSuccessRequest => ({
  type: InvoiceTypes.UPDATE_INVOICE_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const addPurchaseJournalRequest = (
  payload: any
): AddPurchaseJournalRequest => ({
  type: InvoiceTypes.CREATE_PURCHASEJOURNAL_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updatePurchaseJournalRequest = (
  payload: any
): UpdatePurchaseJournalRequest => ({
  type: InvoiceTypes.UPDATE_PURCHASEJOURNAL_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const addPurchaseJournalSuccess = (
  payload: AddPurchaseJournalSuccessPayload
): AddPurchaseJournalSuccess => ({
  type: InvoiceTypes.CREATE_PURCHASEJOURNAL_SUCCESS,
  payload,
});

//Shivraj
export const processQueue = (
  payload: any
): InvoiceProcessQueue => ({
  type: InvoiceTypes.PROCESS_QUEUE,
  payload,
});

export const processQueueSuccess = (
  payload: any
): InvoiceProcessQueueSuccess => ({
  type: InvoiceTypes.PROCESS_QUEUE_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updatePurchaseJournalSuccess = (
  payload: AddPurchaseJournalSuccessPayload
): UpdatePurchaseJournalSuccess => ({
  type: InvoiceTypes.UPDATE_PURCHASEJOURNAL_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const addPurchaseJournalFailure = (
  payload: AddPurchaseJournalFailurePayload
): AddPurchaseJournalFailure => ({
  type: InvoiceTypes.CREATE_PURCHASEJOURNAL_FAILURE,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchPurchaseJournalRequest = (
  payload: any
): FetchPurchaseJournalRequest => ({
  type: InvoiceTypes.FETCH_PURCHASE_JOURNAL_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchPurchaseJournalSuccess = (
  payload: FetchPurchaseJournalPayload
): FetchPurchaseJournalSuccess => ({
  type: InvoiceTypes.FETCH_PURCHASE_JOURNAL_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchPurchaseJournalFailure = (
  payload: FetchPurchaseJournalFailurePayload
): FetchPurchaseJournalFailure => ({
  type: InvoiceTypes.FETCH_PURCHASE_JOURNAL_FAILURE,
  payload,
});


//EDI
export const addEdiRequest = (payload: any): AddEDIRequest => ({
  type: InvoiceTypes.ADD_EDI_REQUEST,
  payload,
});