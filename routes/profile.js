
module.exports = function (req, res) {
  if(req.isAuthenticated()){
    const user = req.user;
    
    res.render('profile.pug', {user});
  } else {
    res.redirect("/");
  }
};