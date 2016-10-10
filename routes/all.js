const getBook = require('./getBook');
const postBook = require('./postBook');
const index = require('./index');
const login = require('./login');
const logout = require('./logout');
const profile = require('./profile');
const del = require('./delete');
const deleteProfile = require('./deleteProfile');
const register = require('./register');

module.exports = {
  getBook,
  postBook,
  index,
  login,
  logout,
  profile,
  del,
  deleteProfile,
  register
};