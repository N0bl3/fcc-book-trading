const Book = require('../models/Book');

module.exports = function(req, res){
    Book.find({ hidden: false }, (err, books) =>{
        if ( err ) {
            throw err;
        }
        if ( req.isAuthenticated() ) {
            const user = req.user;
            books.forEach((book) =>{
                if ( user.wanted.some((id) => id.equals(book._id)) ) {
                    book.wanted = true;
                }
            });
            res.render('index.pug', {
                books,
                user
            });
        } else {
            //noinspection JSCheckFunctionSignatures
            res.render('index.pug', {
                books,
                message: req.flash('authMessage')
            });
        }
    });
};
