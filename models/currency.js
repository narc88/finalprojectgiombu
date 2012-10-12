// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CurrencyValueSchema = require('./currency_value').CurrencyValueSchema;

var CurrencySchema = exports.CurrencySchema = new Schema({
	name				: { type: String, required: true},
	iso						: { type: String, required: true},
	symbol					: { type: String, required: true},
	currency_values			: [CurrencyValueSchema]
});

exports.CurrencyModel = mongoose.model('Currency', exports.CurrencySchema);