
/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes');

//Colores de la consola
var colors = require('colors')
    
//Instancio el server
var app = module.exports = express.createServer();

//Mongoose
app.mongoose = require('mongoose');

//Config file
var config = require('./config.js')(app, express);

//Controlllers
var deals = require('./controllers/deals_controller');
var users = require('./controllers/users_controller');
var bank_accounts = require('./controllers/bank_accounts_controller');

// Configuration
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



//Functions

//Autenticacion
function checkAuth(req, res, next) {
  console.log('checkAuth - User : '+ req.session.user_id);
  if (!req.session.user_id) {
    res.send('Error - Acceso no permitido');
  } else {
    next();
  }
}


// ROUTES --------------------------------------------------------------------------

//INDEX
app.get('/', routes.index);

//DEALS
app.get('/deals/create' , deals.create);
app.post('/deals/add' , deals.add);

//USERS
app.get('/users/register', users.register );
app.post('/users/save', users.add );
app.get('/users/login', users.login );
app.post('/users/login_user', users.login_user );

//Bank accounts
app.get('/bankAccount/add', bank_accounts.add );


// ROUTES --------------------------------------------------------------------------

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode".cyan.bold, app.address().port, app.settings.env);
});
