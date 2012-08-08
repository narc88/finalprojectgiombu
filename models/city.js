// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var CitySchema = exports.CitySchema = new Schema({
	name				: { type: String, required: true},
	created        		:   Date,
	modified       		:   Date	
})

exports.CityModel = mongoose.model('City', exports.CitySchema);