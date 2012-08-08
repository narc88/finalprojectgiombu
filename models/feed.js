// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var FeedSchema = exports.FeedSchema = new Schema({
	from_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	to_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	event  		: [{ type: Schema.ObjectId, ref: 'Event' }],
	created    	:  {type: Date, default: Date.now },
	modified    :   Date	
})

exports.FeedModel = mongoose.model('Feed', exports.FeedSchema);