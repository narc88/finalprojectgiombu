var BranchModel = require('../models/branch').BranchModel;
var Encrypter = require('./encryption_controller');

exports.register = function (req, res, next) {
  res.render('branchs/create', {title: 'Crear Sucursal'});
}

exports.add_branch = function (req, res, next) {
 //Debor recuperar el store primero
  var branch_new = new BranchModel();
  branch_new.name = req.body.branch.name
  branch_new.address = req.body.branch.address
  branch_new.email = req.body.branch.email
  branch_new.zip = req.body.branch.zip
  branch_new.phone = req.body.branch.phone
  branch_new.website = req.body.branch.website
  branch_new.fanpage = req.body.branch.fanpage
  branch_new.twitter = req.body.branch.twitter
  branch_new.contact = req.body.branch.contact
  branch_new.default = '0'
  branch_new.save(function(err){
  if(!err){
      console.log(branch_new);
    } else {
      console.log("Error: - " + err);
    }
    res.redirect('branch/welcome');
  });
  res.render('branch/welcome', {title: 'Cargar Oferta'});
}