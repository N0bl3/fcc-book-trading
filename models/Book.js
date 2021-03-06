const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
    title : {
        type    : String,
        required: true
    },
    author: {
        type    : String,
        required: true
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    genre : String,
    hidden: {
        type   : Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    tradeStep: Number
});

const Book       = mongoose.model('Book', bookSchema);

module.exports = Book;
