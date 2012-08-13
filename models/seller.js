// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema
//var Seller_store = require('sellers_stores')
var SellerStoreSchema = require('./seller_store').SellerStoreSchema;


var SellerSchema = exports.SellerSchema = new Schema({
	
//ROLES
	is_dr				: { type: Boolean, required: true},
	is_dn				: { type: Boolean, required: true},
	
	//Campos donde calculaba cant prospectos, deals, y stores srerán ahora calculados en tiempo real
		sellers_stores	: [SellerStoreSchema], //Embeber relaciones temporales a las diferentes stores 
	created    		    : { type: Date, default: Date.now },
	modifiend        	: { type: Date, default: Date.now }
})

exports.SellerModel = mongoose.model('Seller', exports.SellerSchema);

