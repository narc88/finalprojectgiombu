
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
var roles = require('./controllers/roles_controller');
var sellers = require('./controllers/sellers_controller');
var deals = require('./controllers/deals_controller');
var users = require('./controllers/users_controller');
var promoters = require('./controllers/promoters_controller');
var bank_accounts = require('./controllers/bank_accounts_controller');
var franchises = require('./controllers/franchises_controller');

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
  if (!req.session.user._id) {
    res.send('Error - Acceso no permitido');
  } else {
    next();
  }
}


// ROUTES --------------------------------------------------------------------------

//INDEX
app.get('/',  users.login);

//Promotres

app.get('/promoters/register' ,checkAuth , promoters.register);
app.post('/promoters/add' ,checkAuth , promoters.add);

//Roles
app.get('/roles/register' ,checkAuth , roles.register);
app.post('/roles/add' ,checkAuth , roles.add);

//Sellers
app.get('/sellers/register' ,checkAuth , sellers.register);
app.post('/sellers/add' ,checkAuth , sellers.add);

//DEALS
app.get('/deals/create' ,checkAuth , deals.create);
app.post('/deals/add' ,checkAuth , deals.add);

//USERS
app.get('/users/register', users.register );
app.post('/users/save', users.add );
app.get('/users/login', users.login );
app.post('/users/login_user' , users.login_user );

//Bank accounts
app.get('/bankAccount/add',checkAuth , bank_accounts.add );

//FRANCHISES
app.get('/franchises/create', franchises.create);
app.post('/franchises/add', franchises.add);


// ROUTES --------------------------------------------------------------------------

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode".cyan.bold, app.address().port, app.settings.env);
});
