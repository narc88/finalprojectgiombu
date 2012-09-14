// Creación de la Conexión
var mongoose = require('mongoose');

var ImageSchema = require('./image').ImageSchema;
var SaleSchema = require('./sale').SaleSchema;
var Schema = require('mongoose').Schema

var DealSchema = exports.DealSchema = new Schema({
	title				: { type: String, required: true },
	tagline				: { type: String, required: true },
	slug				: { type: String, required: true },
	characteristics		: { type: String, required: true },
	conditions			: { type: String, required: true },
	price				: { type: Number, required: true },
	special_price		: { type: Number, required: true },
	discount			: { type: Number, required: true, min:0, max:99 },
	start_date        	:   Date,
	end_date        	:   Date,
	start_redeem        :   Date,
	end_redeem        	:   Date,
	max_coupons			: { type: Number, required: true, min:0},
	max_coupons_by_user	: { type: Number, required: true, min:0},
	seller_percentage	: { type: Number, required: true, min:0, max:99 },
	giombu_percentage	: { type: Number, required: true, min:0, max:99 },
	promoter_percentage	: { type: Number, required: true, min:0, max:99 },
	status				: { type: String },
	sale_count			: { type: Number, required: true, min:0},
	coupon_count		: { type: Number, required: true, min:0},
	shipping_cost		: { type: Number, required: true, min:0},
	/*
	store   			: { type: Schema.ObjectId, ref: 'Store' },
	seller   			: { type: Schema.ObjectId, ref: 'Seller' },
	franchisor   		: { type: Schema.ObjectId, ref: 'Franchisor' },
	franchise  			: [{ type: Schema.ObjectId, ref: 'Franchise' }],
	currency	   		: [{ type: Schema.ObjectId, ref: 'Currency' }],
	*/
	//Compras realizadas
	sales				: [SaleSchema],
	//Imagenes
	images 				: [ImageSchema],
	created    		    : { type: Date, default: Date.now },
	modifiend        	: { type: Date, default: Date.now }
})

exports.DealModel = mongoose.model('Deal', exports.DealSchema);