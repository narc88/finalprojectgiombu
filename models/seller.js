// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema
//var Seller_store = require('sellers_stores')

var sellers_stores_schema = new Schema({
	store				: [{ type: Schema.ObjectId, ref: 'Store' }],
	begin_date			: Date,
	end_date			: Date,
	created				: Date,
	modified			: Date
})	

var sellers_schema = new Schema({
	is_dr				: { type: Boolean, required: true},
	is_dn				: { type: Boolean, required: true},
	is_active			: { type: Boolean, required: true},
	store_count			: { type: Number, required: true, min:0 },
	prospect_count		: { type: Number, required: true, min:0 },
	deal_count			: { type: Number, required: true, min:0 },
	//stores				: [sellers_stores_schema], //Embeber relaciones temporales a las diferentes stores 
	created				: Date,
	modified			: Date
})

module.exports = sellers_schema