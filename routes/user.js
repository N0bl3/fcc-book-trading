const Book = require('../models/Book');

module.exports = function(req, res){
    if ( req.isAuthenticated() ) {
        const user = req.user;
        Book.find({}, (err, books) =>{
            if ( err ) {
                res.sendStatus(500);
            }

            user.books = [];
            books.forEach((book) =>{

                user.wanted.forEach((wantedBook, index) =>{
                    if ( book._id.toString() === wantedBook.toString() ) {
                        user.wanted[index] = book;
                    }
                });

                user.demands.forEach((demand, index) =>{
                    if ( book._id.toString() === demand.book.toString() ) {
                        user.demands[index].book = book;
                    }
                });

                if ( book.owner.toString() === user._id.toString() ) {
                    user.books.push(book);
                }

            });
            res.render('profile.pug', { user });
        });
    } else {
        res.redirect('/');
    }
};
