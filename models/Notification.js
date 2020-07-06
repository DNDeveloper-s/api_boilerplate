const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    recipient_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    activity_type: String, // 'send_friend_req'
    object_url: Object,
    timeStamp: Date,
    count: {
        type: Number,
        default: 1
    },
    is_unread: {
        type: Boolean,
        default: false
    }
}, 
{timestamps : true})

module.exports = mongoose.model('Notification', notificationSchema);