module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        if (req.isAuthenticated()) {
            res.render('home.ejs', { title: 'Accueil', user: req.user });
        } else {
            res.render('login.ejs', { title: 'Connexion', message: req.flash('loginMessage') });
        }
    });

    // process the login form
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function(req, res) {

        var messagesEvent = require('./event.js');
        
        messagesEvent.getOldMessages(function(messages) {
            res.render('profile.ejs', {
                title: 'Profile',
                user : req.user, // get the user out of session and pass to template
                messages: messages
            });
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('*', function (req, res) {
        res.status(404);
        res.render('404.ejs', { title: 'Page Introuvable' });
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}