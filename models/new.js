// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var NewSchema = exports.FeedSchema = new Schema({
	from_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	to_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	deal  		: [{ type: Schema.ObjectId, ref: 'Deal' }],
	event  		: [{ type: Schema.ObjectId, ref: 'Event' }],
	created    	:  {type: Date, default: Date.now },
	modified    :   Date	
})

exports.NewModel = mongoose.model('New', exports.NewSchema);