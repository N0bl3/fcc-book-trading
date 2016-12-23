const Book = require('../models/Book');
const User = require('../models/User');

//Dev

module.exports = (req, res) =>{
    if ( req.isAuthenticated() ) {
        const user = req.user;

        // Find users who want the book and remove the book from the user.wanted array
        User.find(false, (err, user) =>{
            if ( err ) {
                console.error(err);
            }
        });

        Book.remove({
            owner: user._id,
            _id  : req.params.id
        }, (err) =>{
            if ( err ) {
                res.sendStatus(500);
            }
            res.end('Deleted: ' + req.params._id);
        });
    } else {
        res.sendStatus(403);
    }
};
