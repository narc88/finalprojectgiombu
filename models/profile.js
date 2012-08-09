// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var ProfileSchema = exports.ProfileSchema = new Schema({
	name				: { type: String, required: true},
	lname				: { type: String, required: true},
	code				: { type: String, required: true},
	pic					: { type: String, required: true},
	pic_origin			: { type: String, required: true},
	birthday			: { type: Date, required: true},
	gender				: { type: String, required: true},
	phone				: { type: String},
	mobile				: { type: String},
	address				: { type: String},
	city				: { type: String},
	zip					: { type: String},
	created    		    : {type: Date, default: Date.now },
	modified			: {type: Date, default: Date.now }
})

exports.ProfileModel = mongoose.model('Profile', exports.ProfileSchema);