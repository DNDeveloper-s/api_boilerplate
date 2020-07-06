const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    activity: {
        status: String,
        lastOnline: Date,
    },
    socketId: String,
    image: String,
    status: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);