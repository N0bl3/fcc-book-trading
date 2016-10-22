const bcrypt = require('bcrypt-nodejs');
const Book = require('./Book').schema;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  local: {
    displayName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    banned: { type: Boolean, default: false },
    city: String,
    state: String,
    created_at: { type: Date, default: Date.now() },
    modified_at: { type: Date, default: Date.now() }
  }, facebook: {
    id: String, token: String, email: String, name: String
  }, twitter: {
    id: String, token: String, displayName: String, username: String
  }, google: {
    id: String, token: String, email: String, name: String
  }
});

userSchema.pre('save', function (next) {
  this.modified_at = Date.now();
  next();
});

userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;