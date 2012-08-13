var RoleModel = require('../models/role').RoleModel;

exports.create = function (req, res, next) {
  res.render('roles/create', {title: 'Crear nuevo rol'});
}

exports.add = function (req, res, next) {
 
    var role_new = new RoleModel();
   
    role_new.name = req.body.name
    role_new.description = req.body.description
    role_new.save(function(err){
    if(!err){
        console.log(user);
      } else {
        console.log("Error: - " + err);
      }
    });
    res.render('users/register', {title: 'Cargar Oferta'});
  
}