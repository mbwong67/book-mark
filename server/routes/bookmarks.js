import express from "express";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark, likeBookmark, getBookmark, getBookmarksBySearch } from '../controllers/bookmarks.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBookmarks);
router.get('/search', getBookmarksBySearch);
router.get('/:id', getBookmark);

router.post('/', auth, createBookmark);
router.patch('/:id', auth, updateBookmark);
router.delete('/:id', auth, deleteBookmark);
router.patch('/:id/likeBookmark', auth, likeBookmark);

export default router;