const User = require('../models/User');
module.exports = (req, res) => {
  if(req.isAuthenticated()){
    const user = req.user;
    const body = req.body;

    User.findByIdAndUpdate(user._id, {
      $set: {
        'local.city': body.city, 'local.state': body.state
      }
    }, (err) => {
      if(err){
        res.sendStatus(500);
      }
      res.redirect('/profile');
    })
  } else {
    res.sendStatus(403);
  }
};
