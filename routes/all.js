const getBook       = require('./getBook');
const postBook      = require('./postBook');
const deleteBook    = require('./deleteBook');
const index         = require('./index');
const login         = require('./login');
const logout        = require('./logout');
const profile       = require('./profile');
const postWanted    = require('./post-wanted');
const deleteWanted  = require('./delete-wanted');
const modifyProfile = require('./modifyProfile');
const deleteProfile = require('./deleteProfile');
const register      = require('./register');

module.exports = {
    getBook,
    postBook,
    postWanted,
    deleteWanted,
    deleteBook,
    index,
    login,
    logout,
    profile,
    modifyProfile,
    deleteProfile,
    register
};
