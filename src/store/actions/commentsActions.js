import request from '../../api';
import {
  COMMENT_LIST_FAILURE,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
} from '../constants';

export const getCommentsByVideoId = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_LIST_REQUEST });
    const { data } = await request.get('/commentThreads', {
      params: {
        part: 'snippet',
        videoId: id,
      },
    });
    dispatch({ type: COMMENT_LIST_SUCCESS, payload: data.items });
  } catch (err) {
    dispatch({ type: COMMENT_LIST_FAILURE, payload: err.message });
  }
};
