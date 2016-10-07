const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, required: true},
  owner: String,
  genre: String,
  sold: {type: Boolean, default: false}
});
const Book = mongoose.model('Book', bookSchema);

module.exports = {model: Book, schema: bookSchema};