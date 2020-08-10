const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    nickname: {
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
    date: {
        type: Date,
        default: Date.now()
    },
    ShelfId: {
        type: String,
        default: ''
    }


}, { collection: 'Users' })

module.exports = mongoose.model('Users', UserSchema)