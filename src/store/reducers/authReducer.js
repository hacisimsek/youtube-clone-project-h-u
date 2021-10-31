import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../constants';

const initState = {
  accessToken: sessionStorage.getItem('ytc-access-token')
    ? sessionStorage.getItem('ytc-access-token')
    : null,
  user: sessionStorage.getItem('ytc-user')
    ? JSON.parse(sessionStorage.getItem('ytc-user'))
    : null,
  loading: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        loading: false,
        user: action.payload.profile,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
