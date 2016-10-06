const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  console.log("pass");
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {
    console.log("r");
    process.nextTick(() => {
      User.findOne({ 'local.username': username }, (err, user) => {
        if (err) {
          return done(err);
        } else if (user) {
          return done(null, false, req.flash('registerMessage', 'That username is already taken.'));
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
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {
    console.log("logging");
    process.nextTick(() => {
      User.findOne({ 'local.username': username }, (err, user) => {
        console.log("f");
        if (err) {
          console.error(err);
          return done(err);
        } else if (user) {
          if (!user.validPassword(password)) {
            console.log("pw miss");
            return done(null, false, req.flash('authMessage', 'Bad password'));
          } else {
            console.log("usr");
            return done(null, user);
          }
        } else {
          console.log("usruk");
          return done(null, false, req.flash('authMessage', 'That username is unknown'));
        }
      });
    });
  }));
};