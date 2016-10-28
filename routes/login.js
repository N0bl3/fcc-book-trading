module.exports = (req, res, next) =>{
    if ( !req.body.username || !req.body.password ) {
        req.flash('authMessage', 'Missing field(s)');
        res.redirect('/');
    } else {
        next();
    }
};
