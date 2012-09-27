// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema
//var Seller_store = require('sellers_stores')
var SellerStoreSchema = require('./seller_store').SellerStoreSchema;

var CommissionSchema = require('./commission').CommissionSchema;


var SellerSchema = exports.SellerSchema = new Schema({
	//IS DIRECTOR NACIONAL Y DIRECTOR REGIONAL
	//Campos donde calculaba cant prospectos, deals, y stores srerán ahora calculados en tiempo real
	sellers_stores		: [SellerStoreSchema], //Embeber relaciones temporales a las diferentes stores 
commissions			: [CommissionSchema],
	created    		    : { type: Date, default: Date.now },
	modified        	: { type: Date, default: Date.now },
})

exports.SellerModel = mongoose.model('Seller', exports.SellerSchema);

