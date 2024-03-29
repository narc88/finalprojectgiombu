
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express();
var http = require('http')
 , server = http.createServer(app);

//Colores de la consola
var colors = require('colors')


//Mongoose
app.mongoose = require('mongoose');

//Config file
var config = require('./config.js')(app, express);

var socket = require('./socket.js')(server);



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
var invitations = require('./controllers/invitations_controller');
var sales = require('./controllers/sales_controller');
var events = require('./controllers/events_controller');
var news = require('./controllers/news_controller');
var conversations = require('./controllers/conversations_controller');
var questions = require('./controllers/questions_controller');
var currencies = require('./controllers/currencies_controller');

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
/*
 app.helpers({
      renderScriptsTags: function (all) {
        if (all != undefined) {
          return all.map(function(script) {
            return '';
          }).join('\n ');
        }else {
          return '';
        }
      },
      renderCssTags: function (all) {
        if (all != undefined) {
          return all.map(function(cssFile) {
            return '';
          }).join('\n ');
        }else {
          return '';
        }
      }
    });

 app.dynamicHelpers({
      scripts: function(req, res) {
        return [];
      },
      cssFiles: function(req, res){
        return [];
      }
    });

   */
//Functions

//Autenticacion
function checkAuth(req, res, next) {
  if (!req.session.user) {
    res.render('error');
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
app.get('/intranet/promoters/list_sons' , promoters.list_sons);

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
app.get('/deals/remove/:deal_id', deals.remove);
app.get('/intranet/deals/view/:id', deals.view);
app.get('/deals/deals_show', deals.show);
app.get('/deals/view', deals.view);
app.get('/intranet/deals/list', deals.list);
app.get('/intranet/deals/edit/:deal_id', deals.edit);
app.get('/intranet/deals/admin', deals.intranet_admin);
app.get('/deals/home', deals.home);
//DealImage Treatment
app.get('/intranet/deals/erase_image/:id/:image_id', deals.erase_image);
app.get('/intranet/deals/set_as_principal/:id/:image_id', deals.set_ppal);

//Users
app.get('/users/register', users.register );
app.post('/users/save', users.add );
app.get('/users/login', users.login );
app.post('/users/login_user' , users.login_user );
app.get('/users/edit', users.edit );
app.post('/users/update' , users.update );
app.get('/users/dashboard', checkAuth, users.dashboard );
//Users invitation
app.get('/users/accept_invitation/:id', users.accept_invitation );
app.post('/users/save_guest/:id', users.save_guest );
//Users intranet
app.get('/intranet/users/my_promoters', users.list_promoters );

//Stores
app.get('/stores/create_store_branch', stores.create_store_branch );
app.post('/stores/add_store_branch', stores.add_store_branch );
app.get('/stores/edit/:id', stores.edit );
app.post('/stores/update/:id' , stores.update );

//Bank accounts
app.get('/bankAccount/create', bank_accounts.create );
app.post('/bankAccount/add', bank_accounts.add);
app.get('/bankAccount/view', bank_accounts.view);

//Franchises
app.get('/intranet/franchises/admin', checkAuth, franchises.admin);
app.get('/intranet/franchises/create/:franchisor_id', checkAuth, franchises.create);
app.post('/franchises/add/:franchisor_id', checkAuth, franchises.add);
app.get('/intranet/franchises/edit/:id', checkAuth, franchises.edit);
app.post('/franchises/update', checkAuth, franchises.update);

//Images

//Se va a dejar de usar
app.get('/images/upload', images.upload);
app.post('/images/save_image', images.save_image);

//Se seguirán usando
app.post('/images/save_image/:id', images.save_image);
app.post('/images/crop', images.crop);

//Franchisors
app.get('/intranet/franchisors/create', franchisors.create);
app.post('/franchisors/add', franchisors.add);
app.post('/franchisors/update', franchisors.update);
app.get('/intranet/franchisors/list', franchisors.list);
app.get('/intranet/franchisors/view/:franchisor_id', franchisors.view);
app.get('/intranet/franchisors/edit/:franchisor_id', franchisors.edit);

//Invitations
app.get('/intranet/invitations/create', invitations.create);
app.post('/intranet/invitations/add', invitations.add);
app.get('/intranet/invitations/list_promoters', invitations.list_promoters);
app.get('/intranet/invitations/list_contacts', invitations.list_contacts);

//Sales
app.get('/sales/checkout/:id', sales.checkout);
app.post('/sales/buy/:id', sales.buy);
app.get('/sales/list/:id', sales.list);

//Questions
app.post('/questions/admin_answer/:id_question', questions.add_admin_answer);
app.post('/questions/answer/:id_question', questions.add_answer);
app.post('/questions/add/:id', questions.add);
app.get('/questions/list/:id', questions.list);

//Currencies
app.get('/intranet/currencies/create', currencies.create);
app.post('/currencies/add', currencies.add);
app.get('/intranet/currencies/edit/:id', currencies.edit);
app.post('/intranet/currencies/update/:id', currencies.update);
app.get('/intranet/currencies/list', currencies.list);

/*
//countries
app.get('/countries/create', countries.create);
app.post('/countries/add', countries.create);
app.get('/countries/list', countries.create);
app.get('/countries/view/:id', countries.create);
app.get('/countries/edit/:id', countries.create);
app.get('/countries/update', countries.create);
*/


//Conversations
app.get('/conversations', conversations.conversation);
app.get('/conversations/chat_window', conversations.chat_window);
app.get('/conversations/panel', conversations.panel);

server.listen(3000, function(){
  console.log("Express server listening on port 3000".cyan.bold);
});



//Events
app.get('/events/initialize', events.initialize);
