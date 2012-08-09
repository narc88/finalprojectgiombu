
/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes');
    
//Instancio el server
var app = module.exports = express.createServer();

//Mongoose
app.mongoose = require('mongoose');

//Config file
var config = require('./config.js')(app, express);

//Controlllers
var deals = require('./controllers/deals_controller')
var users = require('./controllers/users_controller')
var bank_accounts = require('./controllers/bank_accounts_controller')

// Configuration
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
app.post('/users/save', users.add );

//Bank accounts
app.get('/bankAccount/add', bank_accounts.add );

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
