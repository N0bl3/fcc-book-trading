
module.exports = function (req, res) {
  if(req.isAuthenticated()){
    res.render('profile.pug', {user: req.user});
  } else {
    res.redirect("/");
  }
};