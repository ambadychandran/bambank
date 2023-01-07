var authController = require('../controllers/authController.js');
var dashController = require('../controllers/dashController.js');

module.exports = function (app, passport) {
    app.get('/',isLoggedIn, dashController.dashboard);
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }

    ));
    app.get('/dashboard',isLoggedIn, dashController.dashboard);
    app.post('/dashboard',isLoggedIn, dashController.transfer)
    app.get('/logout',authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
));
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
};