import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
    title: String,
    description: String,
    creatorId: String,
    creatorName: String,
    tags: [String], 
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    } 
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;