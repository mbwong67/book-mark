import mongoose from "mongoose";
import Bookmark from "../models/bookmark.js";

export const getBookmarks = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await Bookmark.countDocuments({});
        const bookmarks = await Bookmark.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: bookmarks, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBookmark = async (req, res) => { 
    const { id } = req.params;

    try {
        const bookmark = await Bookmark.findById(id);

        res.status(200).json(bookmark);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBookmarksBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    
    try {
        const title = new RegExp(searchQuery, "i");
        const bookmarks = await Bookmark.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: bookmarks });
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

export const updateBookmark = async (req, res) => {
    const { id } = req.params;
    const bookmark = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No bookmark with id: ${id}`);

    const updatedBookmark = await Bookmark.findByIdAndUpdate(id, bookmark, { new: true });
    
    res.json(updatedBookmark);
}

export const deleteBookmark = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No bookmark with id: ${id}`);

    await Bookmark.findByIdAndRemove(id);

    res.json({ message: "Bookmark deleted successfully." });
}

export const likeBookmark = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Must login to like bookmark" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No bookmark with id: ${id}`);
    
    const bookmark = await Bookmark.findById(id);

    const index = bookmark.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      bookmark.likes.push(req.userId);
    } else {
      bookmark.likes = bookmark.likes.filter((id) => id !== String(req.userId));
    }
    const updatedBookmark = await Bookmark.findByIdAndUpdate(id, bookmark, { new: true });

    res.json(updatedBookmark);
}