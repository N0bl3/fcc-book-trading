const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const debug = require('debug');
const debugDB = debug('database');
const debugPP = debug('passport');
const express = require('express');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes/all');
const session = require('express-session');

const port = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  debugDB('Connection established to MongoDB');
});
mongoose.connection.on('error', (err) => {
  debugDB(`Unable to connect to the mongoDB server. Error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  debugDB('Mongoose default connection disconnected');
});

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(flash());
app.use(session({secret: 'meow', name: 'fcc-book-trade', resave: true, saveUninitialized: false})); // session secret
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get("/", routes.index);
app.get("/book", routes.book);
app.get("/profile", routes.profile);
app.post("/login", (req, res, next) => {
  if( !req.body.username || !req.body.password ){
    debugPP('Missing field(s)');
    req.flash('authMessage', 'Missing field(s)');
    res.redirect("/");
  } else {
    next();
  }
}, passport.authenticate('local-login', {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true
}));
app.post("/register", (req, res, next) => {
  if( !req.body.username || !req.body.password ){
    debugPP('Missing field(s)');
    req.flash('authMessage', 'Missing field(s)');
    res.redirect("/");
  } else {
    next();
  }
}, passport.authenticate('local-register', {
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true
}));
app.post("/logout", routes.logout);

app.listen(port, function () {
  console.log('Your app is listening on port ' + port );
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debugDB('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});