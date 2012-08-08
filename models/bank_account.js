// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var BankAccountDataSchema = exports.BankAccountDataSchema = new Schema({
	any: {}
})

exports.BankAccountDataModel  = mongoose.model('BankAccountData', exports.BankAccountDataSchema);

var BankAccountSchema = exports.BankAccountSchema = new Schema({
	account_data		: [BankAccountDataSchema],
	created    		    : {type: Date, default: Date.now },
	modified			: Date
})

exports.BankAccountModel = mongoose.model('BankAccount', exports.BankAccountSchema);

/*
	bank_name			: { type: String},
	bank_clabe			: { type: String},
	bank_rute			: { type: String},
	bank_number			: { type: String},
	curp				: { type: String},
	ife 				: { type: String},*/