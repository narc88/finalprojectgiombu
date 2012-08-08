// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var level_schema = new Schema({
	number				: { type: String, required: true },
	name    			: { type: String, required: true },
	bonus				: { type: Number, required: true, min:0},
	description	   		: { type: String },
	created    		    :  {type: Date, default: Date.now }
	modifiend        	:   Date
})

module.exports =  level_schema