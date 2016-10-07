module.exports = function (req, res) {
  res.logout();
  res.redirect("/");
};