const Book     = require('../models/Book');
const User     = require('../models/User');
module.exports = (req, res) =>{
    if ( req.isAuthenticated() ) {
        const user = req.user;

        req.logout();
        res.sendStatus(202);

        Book.remove({ owner: user._id }, (err) =>{
            if ( err ) {
                console.log(`Deleting books error: ${err}`)
            }
            else {
                User.update({ 'demands.author': user._id }, { $pull: { 'demands': { 'author': user._id } } }, (err) =>{
                    if ( err ) {
                        console.log(`Updating demands error: ${err}`)
                    }
                    else {
                        User.remove({ _id: user._id }, (err) =>{
                            if ( err ) {
                                console.log(`Deleting user error: ${err}`)
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.sendStatus(403);
    }
};
