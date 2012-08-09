// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var CurrencyValueSchema = exports.CurrencyValueSchema = new Schema({
	value				: { type: Number, required: true},
	date 				: { type: Date, required: true},
})

var CurrencySchema = exports.CurrencySchema = new Schema({
	fullname				: { type: String, required: true},
	name					: { type: String, required: true},
	iso						: { type: String, required: true},
	symbol					: { type: String, required: true},
	currency_values			: [CurrencyValueSchema]
})
exports.CurrencyValueModel = mongoose.model('CurrencyValue', exports.CurrencyValueSchema);
exports.CurrencyModel = mongoose.model('Currency', exports.CurrencySchema);