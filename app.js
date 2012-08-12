
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    MongoStore = require('connect-mongo')(express)
    _ = require('underscore'),
    config = require('./config.js'),
    db = require('./models/db');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({
        secret: 'alfjsdlkjbzaw2',
        maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90), // valid for 90 days
        store: new MongoStore({
            db: config.dbname,
            host: config.dbhost,
            port: parseInt(config.dbport, 10),
            username: config.dbuser,
            password: config.dbpassword,
            collection: 'sessions'
        }) 
      }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/signup', routes.showSignup);
app.post('/signup', routes.processSignup);
app.get('/login', routes.login);
app.post('/userpage', routes.userPage);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
