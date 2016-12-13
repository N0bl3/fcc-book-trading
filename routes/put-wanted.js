const User = require('../models/User');
const Book = require('../models/Book');

module.exports = (req, res) =>{
    if ( req.isAuthenticated() ) {
        const user = req.user;
        User.findByIdAndUpdate(user._id, {
            $addToSet: {
                wanted: req.params.book
            }
        }, (err) =>{
            if ( err ) {
                res.sendStatus(500);
            }

            Book.findById(req.params.book, (err, book) =>{
                if ( err ) {
                    res.sendStatus(500);
                }
                book.tradeStep = 1; // Request sent
                book.save((err) =>{
                    if ( err ) {
                        res.sendStatus(500);
                    }
                    User.findByIdAndUpdate(book.owner, {
                        $addToSet: {
                            demands: {
                                author : user._id,
                                book   : book._id,
                                content: `${user.local.username} is interested in your book ${book.title}`
                            }
                        }
                    }, (err) =>{
                        if ( err ) {
                            res.sendStatus(500);
                        }
                        res.end();
                    });
                });
            });
        });

    } else {
        res.sendStatus(403);
    }
};
