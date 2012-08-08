var Bank_account = require('../models/bank_account').bank_account;
var Crypto = require('crypto');

exports.register = function (req, res, next) {
  res.render('users/register', {title: 'Registro'})
}

exports.add = function (req, res, next) {
  bank_account = new Bank_account();
 
  
  user_new.save(function (err) {
    if (!err) {
        console.log(user_new)
      } else {
        console.log("Error: - " + err)
      }
      res.redirect('/')
    });
  res.render('deals/create', {title: 'Cargar Oferta'})
}