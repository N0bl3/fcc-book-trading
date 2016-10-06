module.exports = function (req, res) {
  res.render('index.pug', {books: undefined, message: req.flash('authMessage') ? req.flash('authMessage') : null });
};