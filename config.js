module.exports = function(app, express, mongoose){

  var config = this;
/*
  var fs = require('fs');
  var access_logfile = fs.createWriteStream('./access.log', {flags: 'a'});

  var mongoStore = require('session-mongoose');
*/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

  //env specific config
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.mongoose.connect('mongodb://localhost/giombu');
  });

  app.configure('production', function(){
    app.use(express.errorHandler());
    app.mongoose.connect('mongodb://localhost/giombu');
  });
  return config;

};