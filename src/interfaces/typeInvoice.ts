import {
  FetchInvoiceFailure,
  FetchInvoiceRequest,
  FetchInvoiceSuccess,
  UpdateInvoiceRequest,
  UpdateInvoiceSuccessRequest,
  AddInvoiceRequest,
  AddPurchaseJournalRequest,
  AddPurchaseJournalSuccess,
  AddPurchaseJournalFailure,
  FetchPurchaseJournalRequest,
  FetchPurchaseJournalSuccess,
  InvoiceProcessQueueSuccess,
  UpdatePurchaseJournalSuccess,
} from "./interfaceInvoice";

/**
 *Invoice Action Types
 */
export type InvoiceActions =
  | FetchInvoiceRequest
  | FetchInvoiceSuccess
  | UpdateInvoiceRequest
  | UpdateInvoiceSuccessRequest
  | AddInvoiceRequest
  | FetchInvoiceFailure
  | FetchPurchaseJournalRequest
  | FetchPurchaseJournalSuccess
  | AddPurchaseJournalRequest
  | UpdatePurchaseJournalSuccess
  | AddPurchaseJournalSuccess
  | AddPurchaseJournalFailure
  | InvoiceProcessQueueSuccess;
