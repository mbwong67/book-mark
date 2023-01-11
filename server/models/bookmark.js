import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    tags: [String], 
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    } 
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;