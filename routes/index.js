module.exports = function (req, res) {
  console.log(req.flash('authMessage'));
  res.render('index.pug', {books: undefined, message: req.flash('authMessage')});
};