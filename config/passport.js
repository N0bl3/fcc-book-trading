const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, username, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.username': username }, (err, user) => {
        if (err) {
          return done(err);
        } else if (user) {
          return done(null, false, req.flash('authMessage', 'Username already taken'));
        } else {
          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save((err) => {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.username': username }, (err, user) => {
        if (err) {
          return done(err);
        } else if (user) {
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('authMessage', 'Bad password'));
          } else {
            return done(null, user);
          }
        } else {
          return done(null, false, req.flash('authMessage', 'Username unknown'));
        }
      });
    });
  }));

};