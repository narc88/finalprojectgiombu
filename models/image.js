// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var ImageSchema = exports.ImageSchema = new Schema({
	filename			: { type: String , required: true},
	default				: { type: Boolean },
	active				: { type: Boolean },
	created    		    :  {type: Date, default: Date.now },
	modified			:   Date	
})	

exports.ImageModel = mongoose.model('Image', exports.ImageSchema);