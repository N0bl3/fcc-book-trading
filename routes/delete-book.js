const Book = require('../models/Book');

module.exports = (req, res) =>{
    if ( req.isAuthenticated() ) {
        const user = req.user;
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
