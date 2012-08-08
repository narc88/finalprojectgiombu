// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var LevelSchema = exports.LevelSchema = new Schema({
	number				: { type: String, required: true },
	name    			: { type: String, required: true },
	bonus				: { type: Number, required: true, min:0},
	description	   		: { type: String },
	created    		    :  {type: Date, default: Date.now }
	modifiend        	:   Date
})

exports.LevelModel = mongoose.model('Level', exports.LevelSchema);