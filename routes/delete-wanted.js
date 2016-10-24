const User = require('../models/User');

module.exports = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    User.findByIdAndUpdate(user._id, {
      $pull: {
        wanted: req.params.id
      }
    }, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.end();
    });
  } else {
    res.sendStatus(403);
  }
};
