import { rulesTypes } from "../constants/actionTypes";
import {
  FetchRulesFailure,
  FetchRulesFailurePayload,
  FetchRulesRequest,
  FetchRulesSuccess,
  FetchRulesSuccessPayload,
  CreateRulesRequest,
  UpdateRulesRequest,
  DeleteRulesRequest,
  UpdateRulesSuccessPayload,
  UpdateRulesSuccess,
} from "../interfaces/types";

/**
 *
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchRulesRequest = (payload: any): FetchRulesRequest => ({
  type: rulesTypes.FETCH_RULES_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const createRulesRequest = (payload: any): CreateRulesRequest => ({
  type: rulesTypes.CREATE_RULES_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateRulesRequest = (payload: any): UpdateRulesRequest => ({
  type: rulesTypes.UPDATE_RULES_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const deleteRulesRequest = (payload: any): DeleteRulesRequest => ({
  type: rulesTypes.DELETE_RULES_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchRulesSuccess = (
  payload: FetchRulesSuccessPayload
): FetchRulesSuccess => ({
  type: rulesTypes.FETCH_RULES_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateRulesSuccess = (
  payload: UpdateRulesSuccessPayload
): UpdateRulesSuccess => ({
  type: rulesTypes.RULES_SUCCESS_MESSAGE,
  payload,
});
/**
 *
 * @param payload
 * @returns
 */
export const fetchRulesFailure = (
  payload: FetchRulesFailurePayload
): FetchRulesFailure => ({
  type: rulesTypes.FETCH_RULES_FAILURE,
  payload,
});
