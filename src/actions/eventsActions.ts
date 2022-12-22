import { eventsTypes } from "../constants/actionTypes";
import {
  FetchEventsFailure,
  FetchEventsFailurePayload,
  FetchEventsRequest,
  FetchEventsSuccess,
  FetchEventsSuccessPayload,
  CreateEventsRequest,
  UpdateEventsRequest,
  DeleteEventsRequest,
  UpdateEventsSuccessPayload,
  UpdateEventsSuccess,
} from "../interfaces/types";

/**
 *
 * @param payload
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchEventsRequest = (payload: any): FetchEventsRequest => ({
  type: eventsTypes.FETCH_EVENTS_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const createEventsRequest = (payload: any): CreateEventsRequest => ({
  type: eventsTypes.CREATE_EVENTS_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateEventsRequest = (payload: any): UpdateEventsRequest => ({
  type: eventsTypes.UPDATE_EVENTS_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const deleteEventsRequest = (payload: any): DeleteEventsRequest => ({
  type: eventsTypes.DELETE_EVENTS_REQUEST,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const fetchEventsSuccess = (
  payload: FetchEventsSuccessPayload
): FetchEventsSuccess => ({
  type: eventsTypes.FETCH_EVENTS_SUCCESS,
  payload,
});

/**
 *
 * @param payload
 * @returns
 */
export const updateEventsSuccess = (
  payload: UpdateEventsSuccessPayload
): UpdateEventsSuccess => ({
  type: eventsTypes.EVENTS_SUCCESS_MESSAGE,
  payload,
});
/**
 *
 * @param payload
 * @returns
 */
export const fetchEventsFailure = (
  payload: FetchEventsFailurePayload
): FetchEventsFailure => ({
  type: eventsTypes.FETCH_EVENTS_FAILURE,
  payload,
});
