const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    type: String,
    chats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Conversation', conversationSchema);