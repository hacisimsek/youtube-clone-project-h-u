import {
  HOME_VIDEOS_FAILURE,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAILURE,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEOS_FAILURE,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAILURE,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
} from '../constants';

const homeVideosState = {
  videos: [],
  nextPageToken: null,
  loading: false,
  activeCategory: 'All',
};

export const homeVideosReducer = (state = homeVideosState, action) => {
  switch (action.type) {
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload.videos,
        nextPageToken: action.payload.nextPageToken,
        loading: false,
        activeCategory: action.payload.category,
      };
    case HOME_VIDEOS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        nextPageToken: null,
      };
    default:
      return state;
  }
};

const selectedVideoState = {
  loading: true,
  video: null,
};

export const selectedVideoReducer = (state = selectedVideoState, action) => {
  switch (action.type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        video: action.payload,
        loading: false,
      };
    case SELECTED_VIDEO_FAILURE:
      return {
        ...state,
        video: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const relatedVideoState = {
  loading: true,
  videos: [],
};

export const relatedVideoReducer = (state = relatedVideoState, action) => {
  switch (action.type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    case RELATED_VIDEO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const searchedVideosState = {
  loading: true,
  videos: [],
};

export const searchedVideosReducer = (state = searchedVideosState, action) => {
  switch (action.type) {
    case SEARCHED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCHED_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    case SEARCHED_VIDEOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
