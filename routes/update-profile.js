const User = require('../models/User');

module.exports = (res, req) => {
    if (req.isAuthenticated()) {
        const user = req.user;
        User.findByIdAndUpdate(user._id, {
            $set: {
                'local.city': req.body.city || user.local.city,
                'local.state': req.body.state || user.local.state
            }
        }, (err)=> {
            if (err) {
                res.send(500);
            } else {
                res.end();
            }
        })
    }
};
