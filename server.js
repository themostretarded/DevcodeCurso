var express = require('express'),
    swig = require('swig'),
    passport = require('passport'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');
var server = express();

swig.setDefaults({
    cache : false
})

//config de express
server.use(cookieParser());
server.use(session({secret : 'mi clave'}));

//config de passport
server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user); // req.user
});
passport.deserializeUser(function(user, done){
    done(null, user);
});

//config de swig
server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views',__dirname + '/app/views');

server.use(express.static('./public'));

//controllers
require('./app/controllers/home')(server);
require('./app/controllers/user')(server);

//connections
require('./app/connections/facebook')(server);
require('./app/connections/twitter')(server);

server.listen(8000);
