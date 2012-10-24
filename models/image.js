// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var ImageSchema = exports.ImageSchema = new Schema({
	filename			: { type: String , required: true},
	default				: { type: Boolean ,  default:false},
	created    		    :  {type: Date, default: Date.now },
	modified			:   {type: Date, default: Date.now }
})	

exports.ImageModel = mongoose.model('Image', exports.ImageSchema);