import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, FETCH_BOOKMARK, FETCH_BY_SEARCH } from '../actions/actionTypes';

const bookmarks = (state = { isLoading: true, bookmarks: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_BY_SEARCH:
            return { ...state, bookmarks: action.payload.data };
        case FETCH_BOOKMARK:
            return { ...state, bookmark: action.payload.bookmark };
        case FETCH_ALL:
            return { ...state, bookmarks: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages};
        case CREATE:
            return { ...state, bookmarks: [...state.bookmarks, action.payload]};
        case UPDATE:
            return { ...state, bookmarks: state.bookmarks.map((bookmark) => (bookmark._id === action.payload._id ? action.payload : bookmark))};
        case LIKE:
            return { ...state, bookmarks: state.bookmarks.map((bookmark) => (bookmark._id === action.payload._id ? action.payload : bookmark))};
        case DELETE:
            return { ...state, bookmarks: state.bookmarks.filter((bookmark) => bookmark._id !== action.payload)};
        default:
            return state;
    }
};

export default bookmarks;