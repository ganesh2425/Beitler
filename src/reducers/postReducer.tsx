import { postTypes } from '../constants/actionTypes';
import { PostsActions, PostsState } from "../interfaces/types";

const initialState: PostsState = {
    pending: false,
    posts: [],
    error: null
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state = initialState, action: PostsActions) => {
    switch (action.type) {
        case postTypes.FETCH_POST_REQUEST:
            return {
                ...state,
                pending: true
            };
        case postTypes.FETCH_POST_SUCCESS:
            return {
                ...state,
                pending: false,
                posts: action.payload.posts,
                error: null
            };
        case postTypes.FETCH_POST_FAILURE:
            return {
                ...state,
                pending: false,
                posts: [],
                error: action.payload.error
            };
        default:
            return {
                ...state
            };
    }
};
