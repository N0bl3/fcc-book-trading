const getBook = require('./getBook');
const postBook = require('./postBook');
const deleteBook = require('./deleteBook');
const index = require('./index');
const login = require('./login');
const logout = require('./logout');
const profile = require('./profile');
const deleteProfile = require('./deleteProfile');
const register = require('./register');

module.exports = {
  getBook,
  postBook,
  deleteBook,
  index,
  login,
  logout,
  profile,
  deleteProfile,
  register
};