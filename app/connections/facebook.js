var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var facebookConnection = function (server) {
    passport.use(new FacebookStrategy({
        clientID: '1962281584035505',
        clientSecret: '4d241b90dc14184ba3e6495ecaa2b11e',
        callbackURL: ' https://cursonodedev.herokuapp.com/auth/facebook/callback',
        resave: true,
        saveUninitialized: true
    }, function (accessToken, RefreshToken, profile, done) {
        done(null, profile);
    }));
    server.get('/auth/facebook', passport.authenticate('facebook'));

    server.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/extra-data',
            failureRedirect: '/error'
        }
        )
    );
};
module.exports = facebookConnection;