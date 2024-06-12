const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = new Schema({
    folderName: {
        type: String,
        required: [
            true,
            "you must enter a folder name"
        ]
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now },imagesUrl: {
        images: [
            {
                type: String,
                required: [
                    false,
                    "you must enter at least one image"
                ],
            }
        ]
    },
    updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
