const Book     = require('../models/Book');
const User     = require('../models/User');
module.exports = function(req, res){
    if ( req.isAuthenticated() ) {
        const username = req.user.local.username;
        const request  = req.body;
        if ( request.title && request.author ) {
            let book    = new Book();
            book.title  = request.title;
            book.author = request.author;
            book.genre  = request.genre;
            User.findOne({ 'local.username': username }, (err, user) =>{
                if ( err ) {
                    res.sendStatus(500);
                }
                if ( user ) {
                    book.owner = user._id;
                    book.save((err) =>{
                        if ( err ) {
                            res.sendStatus(500);
                        }
                        res.redirect('/profile');
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            res.sendStatus(400);
        }

    } else {
        res.sendStatus(403);
    }
};
