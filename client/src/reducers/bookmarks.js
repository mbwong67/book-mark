import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../actions/actionTypes';

const bookmarks = (bookmarks = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...bookmarks, action.payload];
        case UPDATE:
            return bookmarks.map((bookmark) => (bookmark._id === action.payload._id ? action.payload : bookmark));
        case LIKE:
            return bookmarks.map((bookmark) => (bookmark._id === action.payload._id ? action.payload : bookmark));
        case DELETE:
            return bookmarks.filter((bookmark) => bookmark._id !== action.payload);
        default:
            return bookmarks;
    }
};

export default bookmarks;