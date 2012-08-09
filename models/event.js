
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var EventSchema = exports.EventSchema =  new Schema({
	name		: { type: String , required: true},
	body		: { type: String , required: true},
	type		: { type: String },
	created    	:  {type: Date, default: Date.now },
	modified    :  {type: Date, default: Date.now }
})

exports.EventModel = mongoose.model('Event', exports.EventSchema);