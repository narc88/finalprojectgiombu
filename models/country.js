// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema
var StateSchema = require('./state').StateSchema;

var CountrySchema = exports.CountrySchema = new Schema({
	name				: { type: String},
	states      		: [StateSchema],
	created        		:   Date,
	modified       		:   Date	
});

exports.CountryModel = mongoose.model('Country', exports.CountrySchema);