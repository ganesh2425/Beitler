import { permissionTypes } from "../constants/actionTypes";
import { PermissionsActions, PermissionsState } from "../interfaces/types";
import { RootState } from "./index";

const initialState: PermissionsState = {
  pending: false,
  permissions: [],
  permissionsGroup: [],
  permission_success: {},
  error: null,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: PermissionsActions) => {
  switch (action.type) {
    case permissionTypes.FETCH_PERMISSION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case permissionTypes.CREATE_PERMISSION_REQUEST:
      return {
        ...state,
        permission_success: action.payload.permission_success,
        pending: true,
      };
    case permissionTypes.UPDATE_PERMISSION_REQUEST:
      return {
        ...state,
        permission_success: action.payload.permission_success,
        pending: true,
      };
    case permissionTypes.FETCH_PERMISSION_SUCCESS:
      return {
        ...state,
        pending: false,
        permissions: action.payload.Permissions,
        error: null,
      };
    case permissionTypes.FETCH_PERMISSION_FAILURE:
      return {
        ...state,
        pending: false,
        permissions: [],
        error: action.payload.error,
      };
    case permissionTypes.FETCH_PERMISSION_GROUP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case permissionTypes.FETCH_PERMISSION_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        permissionsGroup: action.payload.PermissionsGroup,
        error: null,
      };
    case permissionTypes.CREATE_PERMISSION_GROUP_REQUEST:
      return {
        ...state,
        permission_success: action.payload.permission_success,
        pending: true,
      };
    case permissionTypes.UPDATE_PERMISSION_GROUP_REQUEST:
      return {
        ...state,
        permission_success: action.payload.permission_success,
        pending: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getPermissionDetails = (state: RootState) =>
  state.permissions.permissions;
export const getPermissionGroupDetails = (state: RootState) =>
  state.permissions.permissionsGroup;
export const getPermissionSuccess = (state: RootState) =>
  state.permissions.permission_success;
export const getPermissionFailure = (state: RootState) =>
  state.permissions.error;
