// Creación de la Conexión
var mongoose = require('mongoose');

var CitySchema = require('./city').CitySchema;
var Schema = require('mongoose').Schema

var state_schema = new Schema({
	name				: { type: String, required: true},
	cities      		: [City],
	created        		:   Date,
	modified       		:   Date	
})

module.exports = state_schema