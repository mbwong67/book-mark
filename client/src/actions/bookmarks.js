import * as api from '../api';
import { FETCH_ALL } from './actionTypes.js';

export const getBookmarks = () => async( dispatch ) => {
    try {
        const { data } = await api.fetchBookmarks();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.error(error.message);
    }    
};