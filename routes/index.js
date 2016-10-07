const Book = require('../models/Book').model;

module.exports = function (req, res) {
/*  const book = new Book();
  book.title = "Moby Dick";
  book.save((err) => {
    if (err) {
      throw err;
    }
  });*/
  Book.find({sold: false}, (err, books) => {
    if (err) throw err;
    res.render('index.pug', {books, message:  req.flash('authMessage')});
  });
};