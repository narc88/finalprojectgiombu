var mongoose = require('mongoose');

var Schema = mongoose.Schema


exports.CurrencyValueSchema = new Schema({
	value				: { type: Number, required: true},
	date 				: { type: Date, required: true},
});

exports.CurrencyValueModel = mongoose.model('CurrencyValue', exports.CurrencyValueSchema);