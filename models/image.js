// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var image_schema = new Schema({
	filename			: { type: String , required: true},
	default				: { type: Boolean },
	active				: { type: Boolean },
	created    		    :  {type: Date, default: Date.now },
	modified			:   Date	
})	

module.exports = image_schema