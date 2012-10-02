// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var BankAccountSchema = exports.BankAccountSchema = new Schema({
	bank_name			: { type: String},
	bank_clabe			: { type: String},
	bank_rute			: { type: String},
	bank_number			: { type: String},
	curp				: { type: String},
	ife 				: { type: String},
	user				: { type: mongoose.Schema.ObjectId, ref: 'User' },
	created    		    : {type: Date, default: Date.now },
	modified			: Date
});

exports.BankAccountModel = mongoose.model('BankAccount', exports.BankAccountSchema);