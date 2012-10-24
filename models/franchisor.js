// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var FranchiseSchema = require('./franchise').FranchiseSchema;

var FranchisorSchema = exports.FranchisorSchema  = new Schema({
	name				: { type: String },
	default_domain		: { type: String },
	secure_domain		: { type: String },
	cctdl				: { type: String },
	email				: { type: String },
	smtp				: { type: String },
	default_timezone	: { type: Number },
	language			: { type: String },
	fanpage				: { type: String },
	country	   			: { type: Schema.ObjectId, ref: 'Country' },	//Un franchisor es para un solo pais/estado/ciudad
	currency   			: [{ type: Schema.ObjectId, ref: 'Crrency' }],
	franchises			:  [FranchiseSchema],
	created    		    :  {type: Date, default: Date.now },
	modified			:  {type: Date, default: Date.now }
});

exports.FranchisorModel = mongoose.model('Franchisor', exports.FranchisorSchema);