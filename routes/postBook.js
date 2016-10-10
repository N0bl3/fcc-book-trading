const Book = require('../models/Book').model;
const User = require('../models/User');
module.exports = function (req, res) {
  if(req.isAuthenticated()){
    const username = req.user.local.username;
    const request = req.body;
    if (request.title && request.author){
      Book.findOne({title: request.title}, (err, book) => {
        if(err){
          res.sendStatus(500);
        }
        if(!book) {
          book = new Book();
          book.title = request.title;
          book.owners = [];
        }
        book.author = request.author;
        book.genre = request.genre;
        User.findOne({'local.username': username}, (err, user) => {
          if(err){
            res.sendStatus(500);
          }
          if(user) {
            book.owners.push(user._id);
            book.save((err, newBook) => {
              if(err){
                res.sendStatus(500);
              }
              user.books.push(newBook._id);
              user.save((err) => {
                if(err){
                  res.sendStatus(500);
                }
                res.render("profile.pug", {user: req.user});
              });
            });
          } else {
            res.sendStatus(500);
          }
        });
      });
    } else {
      res.sendStatus(400);
    }

  } else{
    res.sendStatus(401);
  }
};
