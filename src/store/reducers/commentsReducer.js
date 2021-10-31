import {
  COMMENT_LIST_FAILURE,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
} from '../constants';

const channelDetailsState = {
  comments: null,
  loading: true,
};

export const commentsReducer = (state = channelDetailsState, action) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LIST_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case COMMENT_LIST_FAILURE:
      return {
        ...state,
        comments: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
