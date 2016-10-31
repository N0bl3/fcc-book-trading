const Book = require('../models/Book');

module.exports = function(req, res){
    if ( req.isAuthenticated() ) {
        const user = req.user;
        Book.find({ owner: user._id }, (err, books) =>{
            if ( err ) {
                res.sendStatus(500);
            }
            user.books = books;
            res.render('profile.pug', { user });
        });
    } else {
        res.redirect('/');
    }
};
