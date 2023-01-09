import Bookmark from "../models/bookmark.js";

export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find();
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createBookmark = async (req, res) => {
    const bookmark = req.body;
    const newBookmark = new Bookmark(bookmark);
    try {
        await newBookmark.save();
        res.status(201).json(newBookmark);
    } catch (error) {
        res.status(409).json({ message: error.message });        
    }
}