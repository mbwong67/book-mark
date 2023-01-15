import { combineReducers } from "redux";

import auth from './auth';
import bookmarks from './bookmarks';

export default combineReducers({ auth, bookmarks });