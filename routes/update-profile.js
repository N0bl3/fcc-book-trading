const User = require('../models/User');
//Why should i look in req.req
module.exports = (req, res) =>{
    if (req.isAuthenticated()) {
        const user = req.user;
        User.findByIdAndUpdate(user._id, {
            $set: {
                'local.city': req.body.city || user.local.city,
                'local.state': req.body.state || user.local.state
            }
        }, (err)=> {
            if (err) {
                res.sendStatus(500);
            } else {
                res.end();
            }
        })
    }
};
