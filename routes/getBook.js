const Book = require('../models/Book');
module.exports = function (req, res) {
  Book.find({title: req.params.title}, (err, book) => {
    if (err) {
      res.sendStatus(500);
    }
    if (!book) {
      res.sendStatus(404);
    }
    res.render('book.pug',{book, user: req.user});
  });
};