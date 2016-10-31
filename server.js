/**
 * @todo Implement facebook & google+ login
 * @todo /profile should be /me ou /profile/id
 * @todo We should be able to give a profile admin rights
 * @todo Implement "I'm interested"
 * @todo Then implement messaging on the book page?
 * @todo Show all books from a user so that he can know if interested in exchange
 */
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const debug        = require('debug');
const debugDB      = debug('database');
const express      = require('express');
const flash        = require('connect-flash');
const mongoose     = require('mongoose');
const passport     = require('passport');
const routes       = require('./routes/all');
const session      = require('express-session');

const port = process.env.PORT || 8080;
const app  = express();
debug('server')('starting');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () =>{
    debugDB('Connection established to MongoDB');
});
mongoose.connection.on('error', (err) =>{
    debugDB(`Unable to connect to the mongoDB server. Error: ${err}`);
});
mongoose.connection.on('disconnected', () =>{
    debugDB('Mongoose default connection disconnected');
});

app.set('views', __dirname + '/views');
app.use(express.static('public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret           : 'meow',
    name             : 'fcc-book-trade',
    resave           : true,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', routes.index);
app.post('/login', routes.login, passport.authenticate('local-login', {
    successRedirect: '/users/me',
    failureRedirect: '/',
    failureFlash: true
}));
app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/users/me',
    failureRedirect: '/',
    failureFlash: true
}));
app.get('/logout', routes.logout);

app.post('/books', routes.postBook); // Add a book to the collection
app.get('/books/:id', routes.getBook); // Shows the book
app.delete('/books/:id', routes.deleteBook); // Removes the book
app.get('/users/me', routes.profile); // Shows the current user
app.put('/users/me', routes.updateProfile); // Updates the current user
app.put('/users/:id/wanted/:book', routes.putWanted); // Add the book to the list of wanted books
app.delete('/users/:id/wanted/:book', routes.deleteWanted); // Remove the book from the list of wanted books
app.delete('/users/me', routes.deleteProfile); // Deletes the current user

app.listen(port, function(){
    console.log('Your app is listening on port ' + port);
});

process.on('SIGINT', () =>{
    mongoose.connection.close(() =>{
        debugDB('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
