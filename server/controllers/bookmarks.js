import mongoose from "mongoose";
import Bookmark from "../models/bookmark.js";

export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find();
        res.status(200).json(bookmarks);
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