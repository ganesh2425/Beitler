import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchCustomersFailure,
  fetchCustomersSuccess,
  updateCustomersSuccess,
  updateCarriersSuccess,
  updateBrokersSuccess,
  updatePoolsSuccess,
  updateStoresSuccess,
} from "../actions/customerActions";
import { customerTypes } from "../constants/actionTypes";
import {
  customerDetails,
  createRecord,
  updateRecord,
} from "../services/customerApi";

function* fetchCustomerSaga(payload: any): any {
  try {
    const response: any = yield call(customerDetails, payload);

    yield put(
      fetchCustomersSuccess({
        customers: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* createCustomerSaga(payload: any): any {
  try {
    const response: any = yield call(createRecord, payload, "customer");
    yield put(
      updateCustomersSuccess({
        customer_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* createCarrierSaga(payload: any): any {
  try {
    const response: any = yield call(createRecord, payload, "carrier");
    yield put(
      updateCustomersSuccess({
        customer_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* createBrokerSaga(payload: any): any {
  try {
    const response: any = yield call(createRecord, payload, "broker");
    yield put(
      updateCustomersSuccess({
        customer_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* createPoolSaga(payload: any): any {
  try {
    const response: any = yield call(createRecord, payload, "pool");
    yield put(
      updateCustomersSuccess({
        customer_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* createStoreSaga(payload: any): any {
  try {
    const response: any = yield call(createRecord, payload, "store");
    yield put(
      updateCustomersSuccess({
        customer_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* createVendorSaga(payload: any): any {
  try {
    const response: any = yield call(createRecord, payload, "vendor");
    yield put(
      updateCustomersSuccess({
        customer_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchCustomersFailure({
        error: message,
      })
    );
  }
}

function* updateCustomerSaga(payload: any): any {
  if (payload.payload.BillTo || payload.payload.CorporateOffice) {
    try {
      const response: any = yield call(updateRecord, payload, "customer");
      yield put(
        updateCustomersSuccess({
          customer_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    } catch (e: any) {
      let message = "";
      e === "Network Error" ? (message = e) : (message = e.message);
      yield put(
        fetchCustomersFailure({
          error: message,
        })
      );
    }
  }
}

function* updateCarrierSaga(payload: any): any {
  if (payload.payload.CorporateOffice) {
    try {
      const response: any = yield call(updateRecord, payload, "carrier");
      yield put(
        updateCarriersSuccess({
          customer_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    } catch (e: any) {
      let message = "";
      e === "Network Error" ? (message = e) : (message = e.message);
      yield put(
        fetchCustomersFailure({
          error: message,
        })
      );
    }
  }
}

function* updateBrokerSaga(payload: any): any {
  if (payload.payload.CorporateOffice) {
    try {
      const response: any = yield call(updateRecord, payload, "broker");
      yield put(
        updateBrokersSuccess({
          customer_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    } catch (e: any) {
      let message = "";
      e === "Network Error" ? (message = e) : (message = e.message);
      yield put(
        fetchCustomersFailure({
          error: message,
        })
      );
    }
  }
}

function* updatePoolSaga(payload: any): any {
  if (payload.payload.CorporateOffice) {
    try {
      const response: any = yield call(updateRecord, payload, "pool");
      yield put(
        updatePoolsSuccess({
          customer_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    } catch (e: any) {
      let message = "";
      e === "Network Error" ? (message = e) : (message = e.message);
      yield put(
        fetchCustomersFailure({
          error: message,
        })
      );
    }
  }
}
function* updateStoreSaga(payload: any): any {
  if (payload.payload.CorporateOffice) {
    try {
      const response: any = yield call(updateRecord, payload, "store");
      yield put(
        updateStoresSuccess({
          customer_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    } catch (e: any) {
      let message = "";
      e === "Network Error" ? (message = e) : (message = e.message);
      yield put(
        fetchCustomersFailure({
          error: message,
        })
      );
    }
  }
}

function* customerSaga(): Generator<
  AllEffect<ForkEffect<never>>,
  void,
  unknown
> {
  yield all([
    takeLatest(customerTypes.FETCH_CUSTOMER_REQUEST, fetchCustomerSaga),
  ]);
  yield all([takeLatest(customerTypes.CREATE_CUSTOMER, createCustomerSaga)]);
  yield all([takeLatest(customerTypes.UPDATE_CUSTOMER, updateCustomerSaga)]);
  yield all([takeLatest(customerTypes.CREATE_CARRIER, createCarrierSaga)]);
  yield all([takeLatest(customerTypes.UPDATE_CARRIER, updateCarrierSaga)]);
  yield all([takeLatest(customerTypes.CREATE_BROKER, createBrokerSaga)]);
  yield all([takeLatest(customerTypes.UPDATE_BROKER, updateBrokerSaga)]);
  yield all([takeLatest(customerTypes.CREATE_POOL, createPoolSaga)]);
  yield all([takeLatest(customerTypes.UPDATE_POOL, updatePoolSaga)]);
  yield all([takeLatest(customerTypes.CREATE_STORE, createStoreSaga)]);
  yield all([takeLatest(customerTypes.CREATE_VENDOR, createVendorSaga)]);
  yield all([takeLatest(customerTypes.UPDATE_STORE, updateStoreSaga)]);
}

export default customerSaga;
