import { RootState } from ".";
import { InvoiceTypes } from "../constants/actionTypes";
import { InvoiceState } from "../interfaces/interfaceInvoice";
import { InvoiceActions } from "../interfaces/typeInvoice";

/**
 * Initial State for Notification Template
 * Reducer Call
 */
const initialState: InvoiceState = {
  pending: false,
  invoiceData: [],
  purchaseJournal: [],
  error: null,
  invoice_success: {},
  purchaseJournal_success: null,
  process_queue: []
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: InvoiceActions) => {
  switch (action.type) {
    case InvoiceTypes.FETCH_INVOICE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case InvoiceTypes.FETCH_INVOICE_SUCCESS:
      return {
        ...state,
        pending: false,
        invoiceData: action.payload.invoiceData,
        error: null,
      };
    case InvoiceTypes.CREATE_INVOICE_REQUEST:
      return {
        ...state,
        pending: true,
      };

    case InvoiceTypes.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoice_success: action.payload.invoice_success,
        pending: false,
      };
    case InvoiceTypes.UPDATE_INVOICE_REQUEST:
      return {
        ...state,
        invoice_success: action.payload.invoice_success,
        pending: false,
      };

    case InvoiceTypes.FETCH_INVOICE_FAILURE:
      return {
        ...state,
        pending: false,
        invoiceData: [],
        error: action.payload.error,
      };
    case InvoiceTypes.CREATE_PURCHASEJOURNAL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case InvoiceTypes.CREATE_PURCHASEJOURNAL_SUCCESS:
      return {
        ...state,
        pending: false,
        purchaseJournal_success: action.payload.PurchaseJournal,
        error: null,
      };
    case InvoiceTypes.UPDATE_PURCHASEJOURNAL_SUCCESS:
      return {
        ...state,
        pending: false,
        purchaseJournal_success: action.payload.PurchaseJournal,
        error: null,
      };

    case InvoiceTypes.CREATE_PURCHASEJOURNAL_FAILURE:
      return {
        ...state,
        pending: false,
        purchaseJournal_success: null,
        error: action.payload.error,
      };
    case InvoiceTypes.FETCH_PURCHASE_JOURNAL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case InvoiceTypes.FETCH_PURCHASE_JOURNAL_SUCCESS:
      return {
        ...state,
        pending: false,
        purchaseJournal: action.payload.purchaseJournal,
        error: null,
      };
      case InvoiceTypes.PROCESS_QUEUE_SUCCESS:
        {
        console.log('step 3', action.payload.process_queue);
        return {
          ...state,
          process_queue: action.payload.process_queue,
        };
      }
    default:
      return {
        ...state,
      };
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getInvoiceDetails = (state: RootState) =>
  state.invoice.invoiceData;
export const getInvoiceSuccess = (state: RootState) =>
  state.invoice.invoice_success;
export const getInvoiceFailure = (state: RootState) => state.invoice.error;

export const getPurchaseJournalDetails = (state: RootState) =>
  state.invoice.purchaseJournal;
export const getPurchaseJournalSuccess = (state: RootState) =>
  state.invoice.purchaseJournal_success;
export const getPurchaseJournalError = (state: RootState) =>
  state.invoice.error;
export const getProcessQueueSuccess = (state: RootState) =>
  state.invoice;


