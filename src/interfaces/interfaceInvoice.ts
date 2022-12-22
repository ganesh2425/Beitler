import { InvoiceTypes } from "../constants/actionTypes";
import { IInvoiceData, IPurchaseJournalInfo } from "../models/InvoiceModel";

/**
 * Invoice Initial State
 */
export interface InvoiceState {
  pending: boolean;
  invoiceData: IInvoiceData[];
  purchaseJournal: IPurchaseJournalInfo[];
  invoice_success: any;
  error: string | null;
  purchaseJournal_success: any;
  process_queue: [];
}

/**
 * Get Invoice Payload
 */
export interface FetchInvoicePayload {
  invoiceData: IInvoiceData[];
}

/**
 * Invoice Request Type and Payload
 */
export interface FetchInvoiceRequest {
  type: typeof InvoiceTypes.FETCH_INVOICE_REQUEST;
  payload: any;
}

/**
 * Invoice Sucess Request Type and Payload
 */
export interface FetchInvoiceSuccess {
  type: typeof InvoiceTypes.FETCH_INVOICE_SUCCESS;
  payload: FetchInvoicePayload;
}

/**
 * Invoice Failure Payload
 */
export interface FetchInvoiceFailurePayload {
  error: string;
}

/**
 * Invoice Failure Request Type and Payload
 */
export interface FetchInvoiceFailure {
  type: typeof InvoiceTypes.FETCH_INVOICE_FAILURE;
  payload: FetchInvoiceFailurePayload;
}

/**
 * Invoice Success Payload
 */
export interface UpdateInvoiceSuccessPayload {
  invoice_success: string;
}

/**
 * Add Invoice Request Type and Payload
 */
export interface AddInvoiceRequest {
  type: typeof InvoiceTypes.CREATE_INVOICE_REQUEST;
  payload: any;
}

/**
 * Update Invoice Request Type and Payload
 */
export interface UpdateInvoiceRequest {
  type: typeof InvoiceTypes.UPDATE_INVOICE_REQUEST;
  payload: any;
}

/**
 * Update Invoice Success Type and Payload
 */
export interface UpdateInvoiceSuccessRequest {
  type: typeof InvoiceTypes.UPDATE_INVOICE_SUCCESS;
  payload: any;
}

/**
 * Add PurchaseJournal Type and Payload
 */
export interface AddPurchaseJournalRequest {
  type: typeof InvoiceTypes.CREATE_PURCHASEJOURNAL_REQUEST;
  payload: any;
}

export interface UpdatePurchaseJournalRequest {
  type: typeof InvoiceTypes.UPDATE_PURCHASEJOURNAL_REQUEST;
  payload: any;
}

/**
 * Add PurchaseJournal Sucess Request Type and Payload
 */
export interface AddPurchaseJournalSuccess {
  type: typeof InvoiceTypes.CREATE_PURCHASEJOURNAL_SUCCESS;
  payload: AddPurchaseJournalSuccessPayload;
}

/**
 * Add PurchaseJournal Sucess Request Type and Payload
 */
export interface UpdatePurchaseJournalSuccess {
  type: typeof InvoiceTypes.UPDATE_PURCHASEJOURNAL_SUCCESS;
  payload: AddPurchaseJournalSuccessPayload;
}

export interface AddPurchaseJournalFailure {
  type: typeof InvoiceTypes.CREATE_PURCHASEJOURNAL_FAILURE;
  payload: AddPurchaseJournalFailurePayload;
}

export interface AddPurchaseJournalSuccessPayload {
  PurchaseJournal: string;
}

export interface AddPurchaseJournalFailurePayload {
  error: string;
}

/**
 * Invoice Request Type and Payload
 */
export interface FetchPurchaseJournalRequest {
  type: typeof InvoiceTypes.FETCH_PURCHASE_JOURNAL_REQUEST;
  payload: any;
}

/**
 * Get Purchase Journal Payload
 */
export interface FetchPurchaseJournalPayload {
  purchaseJournal: IPurchaseJournalInfo[];
}

/**
 * Purchase Journal Sucess Request Type and Payload
 */
export interface FetchPurchaseJournalSuccess {
  type: typeof InvoiceTypes.FETCH_PURCHASE_JOURNAL_SUCCESS;
  payload: FetchPurchaseJournalPayload;
}

/**
 * Purchase Journal Sucess Request Type and Payload
 */
export interface FetchPurchaseJournalFailure {
  type: typeof InvoiceTypes.FETCH_PURCHASE_JOURNAL_FAILURE;
  payload: FetchPurchaseJournalFailurePayload;
}


export interface InvoiceProcessQueue {
  type: typeof InvoiceTypes.PROCESS_QUEUE;
  payload: any;
}

export interface InvoiceProcessQueueSuccess {
  type: typeof InvoiceTypes.PROCESS_QUEUE_SUCCESS;
  payload: any;
}

/**
 * Purchase Failure Payload
 */
export interface FetchPurchaseJournalFailurePayload {
  error: string;
}

//EDI
export interface AddEDIRequest {
  type: typeof InvoiceTypes.ADD_EDI_REQUEST;
  payload: any;
}