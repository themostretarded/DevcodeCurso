var passport = require('passport'),
    twitterStrategy = require('passport-twitter').Strategy;

var twitterConnection = function (server) {
    passport.use(new twitterStrategy({
        consumerKey: '00000000',
        consumerSecret: '0000000000',
        callbackURL: 'http://locahost:8000/auth/twitter/callback',
        resave: true,
        saveUninitialized: true
    }, function (accessToken, RefreshToken, profile, done) {
        done(null, profile);
    }));
    server.get('/auth/twitter', passport.authenticate('twitter'));

    server.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/error'
        }
        )
    );
};
module.exports = twitterConnection;