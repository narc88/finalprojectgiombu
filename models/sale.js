// Creación de la Conexión
var mongoose = require('mongoose');
var CouponSchema = require('./coupon').CouponSchema;
var Schema = require('mongoose').Schema

var SaleSchema = exports.SaleSchema = new Schema({
	user	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	payment_method		: { type: String },
	status				: { type: String },
	currency	   		: [{ type: Schema.ObjectId, ref: 'Currency' }],
	coupons      		: [CouponSchema],
	created       		: Date,
	modified        	: Date	
})

exports.SaleModel = mongoose.model('Sale', exports.SaleSchema);
