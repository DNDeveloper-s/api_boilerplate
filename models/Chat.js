const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    messages: [{
        type: String
    }],
    sentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    isSent: false,
    sentTo: Object,
    timeStamp: Date
}, {
    timestamps: true
})

module.exports = mongoose.model('Chat', chatSchema);