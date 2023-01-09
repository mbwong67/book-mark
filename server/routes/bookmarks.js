import express from "express";
import { getBookmarks, createBookmark } from '../controllers/bookmarks.js';

const router = express.Router();

router.get('/', getBookmarks);
router.post('/', createBookmark);

export default router;