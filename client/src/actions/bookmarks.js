import * as api from '../api';
import { CREATE, DELETE, END_LOADING, FETCH_ALL, FETCH_BOOKMARK, FETCH_BY_SEARCH, LIKE, START_LOADING, UPDATE } from './actionTypes.js';

export const getBookmark = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchBookmark(id);
    dispatch({ type: FETCH_BOOKMARK, payload: { bookmark: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarks = (page) => async ( dispatch ) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchBookmarks(page);
      dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }    
};

export const getBookmarksBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchBookmarksBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createBookmark = (bookmark, history) => async( dispatch ) => {
    try {
      const { data } = await api.createBookmark(bookmark);
      dispatch({ type: CREATE, payload: data });
      history.push(`/bookmarks/${data._id}`);
    } catch (error) {
      console.log(error.message);
    }   
};

export const updateBookmark = (id, bookmark) => async (dispatch) => {
  try {
    const { data } = await api.updateBookmark(id, bookmark);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeBookmark = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeBookmark(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBookmark = (id) => async (dispatch) => {
  try {
    await api.deleteBookmark(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};