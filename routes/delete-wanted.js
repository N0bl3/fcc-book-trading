const User = require('../models/User');

module.exports = (req, res) =>{
    if ( req.isAuthenticated() ) {
        const user = req.user;
        const book = req.params.book;
        User.findByIdAndUpdate(user._id, {
            $pull: {
                wanted: book
            }
        }, (err) =>{
            if ( err ) {
                res.sendStatus(500);
            }
            User.findByIdAndUpdate(book.owner, {
                $pull: {
                    'demands.author': user._id
                }
            }, (err) =>{
                if ( err ) {
                    res.sendStatus(500);
                }
                res.end();
            });
        });
    } else {
        res.sendStatus(403);
    }
};
