import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchInvoiceFailure,
  fetchInvoiceSuccess,
  updateInvoiceSuccess,
  addPurchaseJournalSuccess,
  addPurchaseJournalFailure,
  fetchPurchaseJournalSuccess,
  fetchPurchaseJournalFailure,
  processQueueSuccess,
  updatePurchaseJournalSuccess,
} from "../actions/invoiceActions";
import { InvoiceTypes } from "../constants/actionTypes";
import {
  CreateInvoice,
  FetchInvoiceDetailsByIdnType,
  UpdateInvoice,
  CreatePurchaseJournal,
  FetchPurchaseJournalDetailsById,
  AddEdiRequest,
  UpdatePurchaseJournal,
} from "../services/invoice.service";

/**
 *
 * @param payload
 */
function* fetchInvoiceSaga(payload: any): any {
  try {
    const response: any = yield call(FetchInvoiceDetailsByIdnType, payload);

    yield put(
      fetchInvoiceSuccess({
        invoiceData: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchInvoiceFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* createInvoiceSaga(payload: any): any {
  try {
    const response: any = yield call(CreateInvoice, payload);

    yield put(
      updateInvoiceSuccess({
        invoice_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchInvoiceFailure({
        error: message,
      })
    );
  }
}

function* createEdiSaga(payload: any): any {
  try {
    const response: any = yield call(AddEdiRequest, payload);

    yield put(
      updateInvoiceSuccess({
        invoice_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchInvoiceFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* updateInvoiceSaga(payload: any): any {
  try {
    const response: any = yield call(UpdateInvoice, payload);

    yield put(
      updateInvoiceSuccess({
        invoice_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchInvoiceFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* createPurchaseJournalSaga(payload: any): any {
  try {
    const response: any = yield call(CreatePurchaseJournal, payload);

    yield put(
      addPurchaseJournalSuccess({
        PurchaseJournal: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      addPurchaseJournalFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* updatePurchaseJournalSaga(payload: any): any {
  try {
    const response: any = yield call(UpdatePurchaseJournal, payload);

    yield put(
      updatePurchaseJournalSuccess({
        PurchaseJournal: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      addPurchaseJournalFailure({
        error: message,
      })
    );
  }
}

/**
 *
 * @param payload
 */
function* fetchPurchaseJournalSaga(payload: any): any {
  try {
    const response: any = yield call(FetchPurchaseJournalDetailsById, payload);

    yield put(
      fetchPurchaseJournalSuccess({
        purchaseJournal: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPurchaseJournalFailure({
        error: message,
      })
    );
  }
}

//Shivraj
function* setProcessQueue(payload:any): any{
  try {
    console.log("step 2", payload);
    yield put(
      processQueueSuccess({
        process_queue: payload.payload
      })
    );
  } catch (e: any) {
   
  }
}

function* invoiceSaga(): Generator<
  AllEffect<ForkEffect<never>>,
  void,
  unknown
> {
  yield all([takeLatest(InvoiceTypes.FETCH_INVOICE_REQUEST, fetchInvoiceSaga)]);
  yield all([takeLatest(InvoiceTypes.PROCESS_QUEUE, setProcessQueue)]);
  yield all([
    takeLatest(InvoiceTypes.CREATE_INVOICE_REQUEST, createInvoiceSaga),
  ]);
    yield all([
    takeLatest(InvoiceTypes.ADD_EDI_REQUEST, createEdiSaga),
  ]);
  yield all([
    takeLatest(InvoiceTypes.UPDATE_INVOICE_REQUEST, updateInvoiceSaga),
  ]);
  yield all([
    takeLatest(
      InvoiceTypes.CREATE_PURCHASEJOURNAL_REQUEST,
      createPurchaseJournalSaga
    ),
  ]);
  yield all([
    takeLatest(
      InvoiceTypes.UPDATE_PURCHASEJOURNAL_REQUEST,
      updatePurchaseJournalSaga
    ),
  ]);
  yield all([
    takeLatest(
      InvoiceTypes.FETCH_PURCHASE_JOURNAL_REQUEST,
      fetchPurchaseJournalSaga
    ),
  ]);
}

export default invoiceSaga;
