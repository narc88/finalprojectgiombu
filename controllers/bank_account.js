var Bank_account = require('../models/bank_account').bank_account;
var crypto = require('crypto'), // for cryptographic tools
    assert = require('assert');

exports.register = function (req, res, next) {
  res.render('users/register', {title: 'Registro'})
}

exports.add = function (req, res, next) {
var bank_account = new Bank_account();
var algorithm = 'aes256';
var key = 'password';

var cipher = crypto.createCipher(algorithm, key);  
var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
var decipher = crypto.createDecipher(algorithm, key);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

assert.equal(decrypted, text);
console.log(cipher)
console.log(encrypted)
console.log(decipher)
console.log(decrypted)
 /* user_new.save(function (err) {
  if (!err) {
      console.log(user_new)
    } else {
      console.log("Error: - " + err)
    }
    res.redirect('/')
  })
  res.render('deals/create', {title: 'Cargar Oferta'})*/
}