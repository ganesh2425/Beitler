import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchPermissionsFailure,
  fetchPermissionsGroupSuccess,
  fetchPermissionsSuccess,
  updatePermissionsSuccess,
} from "../actions/permissionActions";
import { permissionTypes } from "../constants/actionTypes";
import { API_SERVICE } from "../services/commonApi";
import StorageService from "../services/Storage.service";
import { API_URLS } from "../utilities/api_url_constants";
const token = StorageService.getCookies("token");

const getPermissions = () => {
  return API_SERVICE.get(API_URLS.getPermissions, {}, token);
};
const getPermissionGroups = () => {
  return API_SERVICE.get(API_URLS.getPermissionsGroup, {}, token);
};
const postPermissions = (payload: any) => {
  return API_SERVICE.post(API_URLS.postPermissions, payload, token);
};

const putPermissions = (payload: any) => {
  return API_SERVICE.put(API_URLS.putPermissions, payload, token);
};

const putPermissionGroup = (payload: any) => {
  return API_SERVICE.put(API_URLS.putPermissionGroup, payload, token);
};

const postPermissionGroup = (payload: any) => {
  return API_SERVICE.post(API_URLS.postPermissionGroup, payload, token);
};

function* fetchPermissionSaga(): any {
  try {
    const response: any = yield call(getPermissions);
    yield put(
      fetchPermissionsSuccess({
        Permissions: JSON.parse(response.data),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPermissionsFailure({
        error: message,
      })
    );
  }
}

function* fetchPermissionGroupsSaga(): any {
  try {
    const response: any = yield call(getPermissionGroups);
    yield put(
      fetchPermissionsGroupSuccess({
        PermissionsGroup: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPermissionsFailure({
        error: message,
      })
    );
  }
}

function* createPermissionSaga(payload: any): any {
  try {
    const response: any = yield call(
      postPermissions,
      payload.payload.addPermission
    );
    yield put(
      updatePermissionsSuccess({
        permission_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPermissionsFailure({
        error: message,
      })
    );
  }
}

function* updatePermissionSaga(payload: any): any {
  try {
    if (payload.payload.updatePermission) {
      const response: any = yield call(
        putPermissions,
        payload.payload.updatePermission
      );
      yield put(
        updatePermissionsSuccess({
          permission_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    }
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPermissionsFailure({
        error: message,
      })
    );
  }
}

function* createPermissionGroupSaga(payload: any): any {
  try {
    const response: any = yield call(
      postPermissionGroup,
      payload.payload.addPermissionGroup
    );
    yield put(
      updatePermissionsSuccess({
        permission_success: JSON.parse(JSON.parse(response.data)),
      })
    );
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPermissionsFailure({
        error: message,
      })
    );
  }
}

function* updatePermissionGroupSaga(payload: any): any {
  try {
    if (payload.payload.updatePermissionGroup) {
      const response: any = yield call(
        putPermissionGroup,
        payload.payload.updatePermissionGroup
      );
      yield put(
        updatePermissionsSuccess({
          permission_success: JSON.parse(JSON.parse(response.data)),
        })
      );
    }
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchPermissionsFailure({
        error: message,
      })
    );
  }
}

function* permissionSaga(): Generator<
  AllEffect<ForkEffect<never>>,
  void,
  unknown
> {
  yield all([
    takeLatest(permissionTypes.FETCH_PERMISSION_REQUEST, fetchPermissionSaga),
  ]);
  yield all([
    takeLatest(
      permissionTypes.FETCH_PERMISSION_GROUP_REQUEST,
      fetchPermissionGroupsSaga
    ),
  ]);
  yield all([
    takeLatest(permissionTypes.CREATE_PERMISSION_REQUEST, createPermissionSaga),
  ]);
  yield all([
    takeLatest(permissionTypes.UPDATE_PERMISSION_REQUEST, updatePermissionSaga),
  ]);
  yield all([
    takeLatest(
      permissionTypes.CREATE_PERMISSION_GROUP_REQUEST,
      createPermissionGroupSaga
    ),
  ]);
  yield all([
    takeLatest(
      permissionTypes.UPDATE_PERMISSION_GROUP_REQUEST,
      updatePermissionGroupSaga
    ),
  ]);
}

export default permissionSaga;
