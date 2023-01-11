import * as api from '../api';
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from './actionTypes.js';

export const getBookmarks = () => async ( dispatch ) => {
    try {
        const { data } = await api.fetchBookmarks();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }    
};

export const createBookmark = (bookmark) => async( dispatch ) => {
    try {
        const { data } = await api.createBookmark(bookmark);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }   
};

export const updateBookmark = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateBookmark(id, post);

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