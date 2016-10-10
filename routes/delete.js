const User = require('../models/User');

module.exports = (req, res) => {
  if (req.isAuthenticated()) {
    User.find({'local.username': req.user.username}, (err, user) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }else if (user && user.validPassword(req.user.password)) {
        User.remove({'local.username': req.user.username}, (err) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          }else {
            res.status(204).end();
          }
        })
      }else {
        res.sendStatus(403);
      }
    });
  }
    res.sendStatus(403);
};
