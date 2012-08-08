// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var franchise_schema = new Schema({
	name				: { type: String },
	slug				: { type: String },
	is_default			: { type: Boolean },
	timezone			: { type: Number},
	user_count			: { type: Number, min:0},
	subscriber_count	: { type: Number, min:0},
	store_count			: { type: Number, min:0},
	created    		    :  {type: Date, default: Date.now },
	modified			:   Date	
})	



var franchisor_schema = new Schema({
	name				: { type: String },
	domain				: { type: String },
	secure_domain		: { type: String },
	tlc					: { type: String },
	email				: { type: String },
	smtp				: { type: String },
	default_timezone	: { type: Number },
	locale				: { type: String },
	language			: { type: String },
	fanpage				: { type: String },
	franchise_count		: { type: Number, required: true, min:0},
	country	   			: [{ type: Schema.ObjectId, ref: 'Country' }],
	currency   			: [{ type: Schema.ObjectId, ref: 'Crrency' }],
	franchises			:  [franchise_schema],
	created    		    :  {type: Date, default: Date.now },
	modified			:   Date	
})	

module.exports = franchisor_schema