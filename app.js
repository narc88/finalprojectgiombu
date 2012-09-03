
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express();
//Colores de la consola
var colors = require('colors')


//Mongoose
app.mongoose = require('mongoose');

//Config file
var config = require('./config.js')(app, express);



//Controlllers
var images = require('./controllers/images_controller');
var roles = require('./controllers/roles_controller');
var sellers = require('./controllers/sellers_controller');
var branches = require('./controllers/branches_controller');
var deals = require('./controllers/deals_controller');
var users = require('./controllers/users_controller');
var stores = require('./controllers/stores_controller');
var promoters = require('./controllers/promoters_controller');
var bank_accounts = require('./controllers/bank_accounts_controller');
var franchises = require('./controllers/franchises_controller');
var franchisors = require('./controllers/franchisors_controller');


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

//Index
app.get('/',  users.login);

//Promotres
app.get('/promoters/register' ,checkAuth , promoters.register);
app.post('/promoters/add' ,checkAuth , promoters.add);

//Roles
app.get('/roles/create' , roles.create);
app.post('/roles/add' , roles.add);

//Sellers
app.get('/sellers/register' ,checkAuth , sellers.register);
app.post('/sellers/add' ,checkAuth , sellers.add);

//Branches
app.get('/branches/register' , branches.register);
app.post('/branches/add_branch' , branches.add_branch);

//Deals
app.get('/deals/create', deals.create);
app.post('/deals/add', deals.add);
app.post('/deals/update', deals.update);
app.get('/deals/list', deals.list);
app.get('/deals/edit/:deal_id', deals.edit);
app.get('/deals/remove/:deal_id', deals.remove);
app.get('/intranet/deals/view/:id', deals.review);
app.get('/deals/deals_show', deals.show);
app.get('/intranet/deals/list', deals.list);

//Users
app.get('/users/register', users.register );
app.post('/users/save', users.add );
app.get('/users/login', users.login );
app.post('/users/login_user' , users.login_user );
app.get('/users/edit', users.edit );
app.post('/users/update' , users.update );
app.get('/users/dashboard', users.dashboard );

//Stores
app.get('/stores/create_store_branch', stores.create_store_branch );
app.post('/stores/add_store_branch', stores.add_store_branch );
app.get('/stores/edit/:id', stores.edit );
app.post('/stores/update/:id' , stores.update );

//Bank accounts
app.get('/bankAccount/add',checkAuth , bank_accounts.add );

//Franchises
app.get('/franchises/create', franchises.create);
app.post('/franchises/add', franchises.add);

//Images
app.get('/images/upload', images.upload);
app.post('/images/save_image', images.save_image);

//Franchisors
app.get('/franchisors/create', franchisors.create);
app.post('/franchisors/add', franchisors.add);
app.get('/franchisors/list', franchisors.list);
app.get('/franchisors/edit/:franchisor_id', franchisors.edit);



app.listen(3000, function(){
  console.log("Express server listening on port 3000".cyan.bold);
});
