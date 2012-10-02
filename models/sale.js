// Creación de la Conexión
var mongoose = require('mongoose');
var CouponSchema = require('./coupon').CouponSchema;
var Schema = require('mongoose').Schema

var SaleSchema = exports.SaleSchema = new Schema({
	user	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	payment_method		: { type: String },
	status				: { type: String },
	coupons      		: [CouponSchema],
	created    		 	    : {type: Date, default: Date.now },
	modified				: {type: Date, default: Date.now }

})

exports.SaleModel = mongoose.model('Sale', exports.SaleSchema);
