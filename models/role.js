// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var RoleSchema = exports.RoleSchema = new Schema({
	name				: { type: String, required: true},
	description			: { type: String, required: true},
	created    		    : {type: Date, default: Date.now },
	modified			: {type: Date, default: Date.now }
})

exports.RoleModel = mongoose.model('Role', exports.RoleSchema);
