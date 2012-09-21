// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema
var StateSchema = require('./state').StateSchema;

var CountrySchema = exports.CountrySchema = new Schema({
	name				: { type: String},
	states      		: [StateSchema],
	created        		:   { type: Date, default: Date.now },
	modified       		:   { type: Date, default: Date.now }
});

exports.CountryModel = mongoose.model('Country', exports.CountrySchema);