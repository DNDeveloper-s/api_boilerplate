const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: String,
    description: String,
    timeStamp: Number,
    title: String,
    comments: [
        {
            user: String,
            content: String,
            timeStamp: Number
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);