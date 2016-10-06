const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  owner: String,
  genre: String,
  sold: {type: Boolean, default: false}
});
const Book = mongoose.model('Book', bookSchema);

module.exports = {model: Book, schema: bookSchema};