const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  owners: [{type: String, ref:'User'}],
  genre: String,
  hidden: {type: Boolean, default: false}
});
const Book = mongoose.model('Book', bookSchema);

module.exports = {model: Book, schema: bookSchema};