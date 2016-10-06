const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const debug = require('debug');
const debugDB = debug('database');
const debugServer = debug('server');
const express = require('express');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes/all');
const session = require('express-session');

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

require('./config/passport')(passport);
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());



app.get("/", routes.index);
app.get("/book", routes.book);
app.get("/profile", routes.profile);
app.post("/login", passport.authenticate('local-login', {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
}));
app.post("/register", passport.authenticate('local-register', {
  succesRedirect: "/profile",
  failureRedirect: "/register",
  failureFlash: true
}));
app.post("/logout", routes.logout);

app.listen(process.env.PORT || 8888, function () {
  debugServer('Your app is listening on port ' + process.env.PORT);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debugDB('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});