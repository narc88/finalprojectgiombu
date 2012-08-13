var SellerModel = require('../models/seller').SellerModel;
var SellerStoreModel = require('../models/seller_store').SellerStoreModel;
var UserModel = require('../models/user').UserModel;


exports.register = function (req, res, next) {
  res.render('sellers/register', {title: 'Registro de Vendedor'});
}

exports.add = function (req, res, next) {
  UserModel.findOne({_id: req.session.user._id}, function(err, doc){
    var user = new UserModel();
    user = doc;
    var seller_new = new SellerModel();
    user.seller = seller_new;
    
    user.save(function(err){
    if(!err){
        console.log(user);
      } else {
        console.log("Error: - " + err);
      }
    });
    res.render('users/register', {title: 'Cargar Oferta'});
  });
}