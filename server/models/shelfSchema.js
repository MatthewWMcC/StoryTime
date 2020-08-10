const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShelfSchema = new Schema({
    nickname: {
        type: String,
        default: ''
    },
    Shelf: {
        type:
            [{
                title: String,
                author: String,
                pagesRead: Number,
                pagesTotal: Number,
                rating: Number,
                numEntries: Number,
                bookNotes: [{
                    note: String,
                    date: String,
                    start: Number,
                    end: Number,
                    timeRead: Number
                }],
                totTime: Number

            }]

        ,
        default: []
    }
}, { collection: 'Shelves' })


module.exports = mongoose.model('Shelves', ShelfSchema)