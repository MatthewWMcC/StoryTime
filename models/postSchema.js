const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let postSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: ''
    },
    start: {
        type: Number,
        default: 0
    },
    end: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 5
    },
    nickname: {
        type: String,
        default: ''
    },
    dateOfPost: {
        type: String,
        default: Date.now()
    },
    rgb: {
        type: {
            r: {
                type: Number,
                default: 100
            },
            g: {
                type: Number,
                default: 100
            },
            b: {
                type: Number,
                default: 100
            }
        }

    },
    likes: {
        type: [],
        default: []
    },
    comments: {
        type: [{
            nickname: {
                type: String,
                default: ''
            },
            comment: {
                type: String,
                default: ''
            },
            date: {
                type: String,
                default: Date.now()
            }
        }],
        default: []

    },

}, { collection: 'Posts' })

module.exports = mongoose.model('Posts', postSchema)