import express from "express";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark, likeBookmark, getBookmark } from '../controllers/bookmarks.js';

const router = express.Router();

router.get('/', getBookmarks);
router.get('/:id', getBookmark);
router.post('/', createBookmark);
router.patch('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);
router.patch('/:id/likeBookmark', likeBookmark);

export default router;