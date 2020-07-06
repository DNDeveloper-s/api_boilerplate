const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = mongoose.Schema({
    value: String
})

module.exports = mongoose.model('Item', itemSchema);