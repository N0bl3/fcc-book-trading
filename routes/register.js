module.exports = (req, res, next) => {
  if( !req.body.username || !req.body.password ){
    debugPP('Missing field(s)');
    req.flash('authMessage', 'Missing field(s)');
    res.redirect("/");
  } else {
    next();
  }
};
