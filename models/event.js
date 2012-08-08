
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var event_schema = new Schema({
	name		: { type: String , required: true},
	body		: { type: String , required: true},
	type		: { type: String },
	created    	:  {type: Date, default: Date.now },
	modified    :   Date	
})

module.exports = event_schema