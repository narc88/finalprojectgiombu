
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes');


//Controlllers

var deals = require('./controllers/deals_controller');
var users = require('./controllers/users_controller');



var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});




// Routes

app.get('/', routes.index);

//Functions


//DEALS
app.get('/deals/create' , deals.create);
app.post('/deals/add' , deals.add);



//USERS
app.get('/users/register', users.register );
app.post('/users/save', users.register );


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
