const Book = require('../models/Book').model;

module.exports = function (req, res) {
  if(req.isAuthenticated()){
    Book.find({title: req.body.title}, (err, book) => {
      if(err){
        res.sendStatus(500);
      }
      if(!book) {
        let book = new Book();
        book.title = req.body.title;
      }
      book.owners.push(req.user.username);
      book.save((err) => {
        if(err){
          console.error(err);
          res.sendStatus(500);
        }
        res.status(200).send(book);
      });
    });
  }
};
