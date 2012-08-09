// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FranchiseSchema = require('./franchise').FranchiseSchema;

var FranchisorSchema = exports.FranchisorSchema  = new Schema({
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
	franchises			:  [FranchiseSchema],
	created    		    :  {type: Date, default: Date.now },
	modified			:   Date	
});

exports.FranchisorModel = mongoose.model('Franchisor', exports.FranchisorSchema);