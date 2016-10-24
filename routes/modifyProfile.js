const User = require('../models/User');
module.exports = (req, res) => {
  if(req.isAuthenticated()){
    const user = req.user;
    const body = req.body;

    User.update({'local.username': user.username}, {
      city: body.city,
      state: body.state
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
