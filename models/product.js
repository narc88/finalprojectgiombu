// Creación de la Conexión
var mongoose = require('mongoose');

var Image = require('image');
var Schema = require('mongoose').Schema

var ProductSchema = exports.ProductSchema = new Schema({
	code				: { type: String, required: true },
	brand   			: [{ type: Schema.ObjectId, ref: 'Brand' }],
	slug				: { type: String, required: true },
	name				: { type: String, required: true },
	short_name			: { type: String, required: true },
	description			: { type: String, required: true },
	price				: { type: Number, required: true },
	special_price		: { type: Number, required: true },
	discount			: { type: Number, required: true, min:0, max:99 },
	stock				: { type: Number, required: true, min:0},
	seller_percentage	: { type: Number, required: true, min:0, max:99 },
	giombu_percentage	: { type: Number, required: true, min:0, max:99 },
	promoter_percentage	: { type: Number, required: true, min:0, max:99 },
	status				: { type: String },
	sale_count			: { type: Number, required: true, min:0},
	shipping_cost		: { type: Number, required: true, min:0},
	store   			: { type: Schema.ObjectId, ref: 'Store' },
	seller   			: { type: Schema.ObjectId, ref: 'Seller' },
	franchisor   		: [{ type: Schema.ObjectId, ref: 'Franchisor' }], //Representa la union franchises_products
	currency	   		: { type: Schema.ObjectId, ref: 'Currency' },
	created    		    :  {type: Date, default: Date.now },
	modifiend        	:   Date
})

exports.ProductModel = mongoose.model('Product', exports.ProductSchema);