const User = require('../models/User');

module.exports = function (req, res) {
  if(req.isAuthenticated()){
    const user = req.user;
    User.findOne({'local.username': user.local.username}).populate('books', 'title author').exec((err, user) => {
      if(err){
        console.error(err);
        res.sendStatus(500);
      }
      res.render('profile.pug', {user});
    });

  } else {
    res.redirect("/");
  }
};