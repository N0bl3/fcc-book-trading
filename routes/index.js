const Book = require('../models/Book').model;

module.exports = function (req, res) {
  Book.find({hidden: false}, (err, books) => {
    if (err) throw err;
    if(req.isAuthenticated()){
      res.render('index.pug', {books, user: req.user});
    } else {
      res.render('index.pug', {books, message: req.flash('authMessage')});
    }
  });
};