import axios from 'axios';

const BOOKMARKS_URL = 'http://localhost:8800/bookmarks';

export const fetchBookmarks = () => axios.get(BOOKMARKS_URL);
export const createBookmark = (newBookmark) => axios.post(BOOKMARKS_URL, newBookmark);
export const updateBookmark = (id, updatedBookmark) => axios.patch(`${BOOKMARKS_URL}/${id}`, updatedBookmark);
export const likeBookmark = (id) => axios.patch(`${BOOKMARKS_URL}/${id}/likeBookmark`);
export const deleteBookmark = (id) => axios.delete(`${BOOKMARKS_URL}/${id}`);