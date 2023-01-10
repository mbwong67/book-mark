import axios from 'axios';

const BOOKMARKS_URL = 'http://localhost:8800/bookmarks';

export const fetchBookmarks = () => axios.get(BOOKMARKS_URL);