import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../actions/actionTypes';

const bookmarks = (bookmarks = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return bookmarks;
        case UPDATE:
            return bookmarks;
        case DELETE:
            return bookmarks;
        default:
            return bookmarks;
    }
};

export default bookmarks;