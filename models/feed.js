// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var feed_schema = new Schema({
	from_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	to_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	event  		: [{ type: Schema.ObjectId, ref: 'Event' }],
	created    		    :  {type: Date, default: Date.now },
	modified    :   Date	
})

module.exports = feed_schema