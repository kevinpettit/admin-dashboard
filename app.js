
/**
 * Module dependencies
 */

var express = require('express'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport');
require('./models/models');
var  routes = require('./routes'),
  api = require('./routes/api'),
  partials = require('./routes/partials'),
  authenticate = require('./routes/authenticate')(passport),

  mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');


var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//merge tutorial
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

/**
 * Routes
 */

// serve index and view partials
app.use('/', routes);
app.use('/partials', partials);

//auth
app.use('/auth', authenticate);

// JSON API
app.use('/api', api);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);



// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//comment out
// redirect all others to the index (HTML5 history)
//app.get('*', function(req, res, next){
//  res.render('index');
//});



app.use('*', function(req, res, next){
  res.render('index');
});



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
