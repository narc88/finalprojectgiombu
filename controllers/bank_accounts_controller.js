var BankAccountModel = require('../models/bank_account').BankAccountModel;
var Encrypter = require('./encryption_controller');


exports.create = function (req, res, next) {
	res.render('bank_accounts/create', {title: 'Informacion Bancaria'})
}

exports.add = function (req, res, next) {
	var bank_account_new = new BankAccountModel();
	bank_account_new.user = req.session.user._id;
	bank_account_new.bank_name = Encrypter.encrypt(req.body.bank_account.bank_name);
	bank_account_new.curp = Encrypter.encrypt(req.body.bank_account.curp);
	bank_account_new.bank_clabe = Encrypter.encrypt(req.body.bank_account.bank_clabe);
	bank_account_new.bank_rute = Encrypter.encrypt(req.body.bank_account.bank_rute);
	bank_account_new.bank_number = Encrypter.encrypt(req.body.bank_account.bank_number);
	bank_account_new.ife = Encrypter.encrypt(req.body.bank_account.ife);
	bank_account_new.save(function (err) {
		if (!err) {
			res.render('users/dashboard', {title: 'User View', user : req.session.user });
		} else {
			res.redirect('/');
		}
	});
}

exports.view = function(req, res, next){
	BankAccountModel.findOne( {user: req.session.user._id} , function(err, bank_accounts){
		if(!err){
			if(bank_accounts){
				var bank_account= new BankAccountModel();
				bank_account.bank_name = Encrypter.decrypt(bank_accounts.bank_name);
				bank_account.bank_clabe = Encrypter.decrypt(bank_accounts.bank_clabe);
				bank_account.bank_rute = Encrypter.decrypt(bank_accounts.bank_rute);
				bank_account.bank_number = Encrypter.decrypt(bank_accounts.bank_number);
				bank_account.curp = Encrypter.decrypt(bank_accounts.curp);
				bank_account.ife = Encrypter.decrypt(bank_accounts.ife);
				res.render('bank_accounts/view', {title: 'Bank Account Information', bank_account : bank_account});
			}else{
				console.log('No encontro la info bancaria.'.red.bold + err);
			}
		}else{
			
		}

  });
}
