const deleteBook = require('./delete-book');
const deleteProfile = require('./delete-profile');
const deleteWanted = require('./delete-wanted');
const getBook = require('./get-book');
const index = require('./index');
const login = require('./login');
const logout = require('./logout');
const postBook = require('./post-book');
const putWanted = require('./put-wanted');
const register = require('./register');
const updateProfile = require('./update-profile');
const profile = require('./user');
const trade = require('./trade');

module.exports = {
    deleteBook, deleteProfile, deleteWanted, getBook, index, login,
    logout,
    postBook,
    putWanted,
    register,
    updateProfile,
    profile,
    trade
};
