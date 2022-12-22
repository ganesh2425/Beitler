import {permissionTypes} from "../constants/actionTypes";
import {
    FetchPermissionsFailure,
    FetchPermissionsFailurePayload,
    FetchPermissionsRequest,
    FetchPermissionsSuccess,
    FetchPermissionsSuccessPayload,
    FetchPermissionGroupRequest,
    CreatePermissionRequest,
    CreatePermissionGroupRequest,
    UpdatePermissionRequest,
    UpdatePermissionGroupRequest,
    // UpdateCustomersSuccessPayload,
    // UpdateCustomers,
    UpdatePermissionsSuccessPayload,
    FetchPermissionsGroupSuccessPayload, FetchPermissionsGroupSuccess
} from "../interfaces/types";

export const fetchPermissionsRequest = (payload: any): FetchPermissionsRequest => ({
    type: permissionTypes.FETCH_PERMISSION_REQUEST,
    payload
});

export const createPermissionRequest = (payload: any): CreatePermissionRequest => ({
    type: permissionTypes.CREATE_PERMISSION_REQUEST,
    payload
});

export const updatePermissionRequest = (payload: any): UpdatePermissionRequest => ({
    type: permissionTypes.UPDATE_PERMISSION_REQUEST,
    payload
});


export const fetchPermissionsSuccess = (
    payload: FetchPermissionsSuccessPayload
): FetchPermissionsSuccess => ({
    type: permissionTypes.FETCH_PERMISSION_SUCCESS,
    payload
});

export const fetchPermissionsGroupSuccess = (
    payload: FetchPermissionsGroupSuccessPayload
): FetchPermissionsGroupSuccess => ({
    type: permissionTypes.FETCH_PERMISSION_GROUP_SUCCESS,
    payload
});

export const updatePermissionsSuccess = (
    payload: UpdatePermissionsSuccessPayload
): UpdatePermissionRequest => ({
    type: permissionTypes.UPDATE_PERMISSION_REQUEST,
    payload
});

export const fetchPermissionsFailure = (
    payload: FetchPermissionsFailurePayload
): FetchPermissionsFailure => ({
    type: permissionTypes.FETCH_PERMISSION_FAILURE,
    payload
});

export const fetchPermissionGroupRequest = (payload: any): FetchPermissionGroupRequest => ({
    type: permissionTypes.FETCH_PERMISSION_GROUP_REQUEST,
    payload
});

export const createPermissionGroupRequest = (payload: any): CreatePermissionGroupRequest => ({
    type: permissionTypes.CREATE_PERMISSION_GROUP_REQUEST,
    payload
});

export const updatePermissionGroupRequest = (payload: any): UpdatePermissionGroupRequest => ({
    type: permissionTypes.UPDATE_PERMISSION_GROUP_REQUEST,
    payload
});