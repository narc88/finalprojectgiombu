var StoreModel = require('../models/store').StoreModel;
var BranchModel = require('../models/branch').BranchModel;
var Encrypter = require('./encryption_controller');

exports.register = function (req, res, next) {
  res.render('stores/create', {title: 'Crear Store'});
}

exports.create_store_branch = function (req, res, next) {
  res.render('stores/create_store_branch', {title: 'Cargar tienda'});
}

exports.add_store_branch = function (req, res, next) {
  var store_new = new StoreModel();
  store_new.name = req.body.store_name
  console.log(req.body)
  store_new.about = req.body.store_about
  store_new.email = req.body.store_email
  
  var branch_new = new BranchModel();
  branch_new.name = req.body.name
  branch_new.address = req.body.email
  branch_new.zip = req.body.zip
  branch_new.phone = req.body.phone
  branch_new.website = req.body.website
  branch_new.fanpage = req.body.fanpage
  branch_new.twitter = req.body.twitter
  branch_new.contact = req.body.contact
  branch_new.default = '1'
  store_new.branches.push(branch_new);

  store_new.save(function(err){
  if(!err){
      console.log(store_new);
    } else {
      console.log("Error: - " + err);
    }
  });
  res.render('users/register', {title: 'Cargar Oferta'});
}

exports.edit = function (req, res, next) {
  StoreModel.findById( req.params.id , function(err, user){
    if(!err){
      if(user){
       res.render('stores/edit', {title: 'Editar Store', user : user});
      }else{
         console.log('Usuario no encontrado, cualquiera el error');
      }
    }else{
      console.log('No lo encontre');
    }
  });
}

exports.update = function (req, res, next) {
  var store_new = new StoreModel();
  StoreModel.findById( req.params.id , function(err, user){
    store_new = user;
    store_new.name = req.body.name
    store_new.about = req.body.about
    store_new.email = req.body.email
    store_new.save(function(err){
      if(!err){
          console.log(store_new);
        } else {
          console.log("Error: - " + err);
        }
        res.render('users/welcome');
    });
  });
  res.render('users/welcome', {title: 'Cargar Oferta'});
}

//Devuelve la lista de stores filtrando por el franquiciante

exports.list = function (req, res, next) {
  StoreModel.find( req.params.franchisor_id , function(err, stores){
    if(!err){
      if(stores){
        res.render('stores/edit', {title: 'Editar Store', stores : stores});
      }else{
        console.log('Esta franquiciante no tiene stores');
      }
    }else{
      console.log('No lo encontre');
    }
  });
}



exports.add_store = function (req, res, next) {
  var store_new = new StoreModel();
  store_new.name = req.body.name
  store_new.about = req.body.about
  store_new.email = req.body.email
  
  store_new.save(function(err){
  if(!err){
      console.log(store_new);
    } else {
      console.log("Error: - " + err);
    }
    res.redirect('store/welcome');
  });
  res.render('store/welcome', {title: 'Cargar Oferta'});
}
