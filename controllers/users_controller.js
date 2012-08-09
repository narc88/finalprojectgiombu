var UserModel = require('../models/user').UserModel;
var Encrypter = require('encryption_controller');

exports.register = function (req, res, next) {
  res.render('users/register', {title: 'Registro'});
}

exports.add = function (req, res, next) {
  var user_new = new UserModel();
  user_new.username = req.body.username
  user_new.name = req.body.name
  user_new.lname = req.body.lname
  user_new.email = req.body.email
  user_new.password = req.body.password
  user_new.gender = req.body.gender
  user_new.birthday = req.body.birthday
  user_new.phone = req.body.phone
  user_new.mobile = req.body.mobile
  user_new.address = req.body.address
  user_new.country = req.body.country
  user_new.city = req.body.city
  user_new.zip = req.body.zip
  user_new.save(function (err) {
  if (!err) {
      console.log(user_new);
    } else {
      console.log("Error: - " + err);
    }
    res.redirect('deals/create');
  });
  res.render('deals/create', {title: 'Cargar Oferta'});
}

exports.login = function (req, res, next) {
  res.render('users/register', {title: 'Registro'})
}

exports.login_user = function (req, res, next) {

    UserModel.findOne({username: req.body.username}, function(err, doc){
      if(!doc){
        res.render('users/login', {title: 'Error'});
      }else{
        var pass = Encrypter.decrypt(doc.password);
        if(pass == req.body.password){
          req.session = data;
          res.render('users/welcome', {title: 'Cargar Oferta'});
        }else{
          res.render('users/login', {title: 'Error'});
        }
      }
       res.render('users/login', {title: 'Error'});
    }
   
  }