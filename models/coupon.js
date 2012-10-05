// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var CouponSchema = exports.CouponSchema = new Schema({
	code				: { type: String },
	status   			: { type: String },
	created			       	: { type: Date, required: true, default: Date.now },
    modified            	: { type: Date, required: true, default: Date.now }	
})
//Este schema va embebido dentro de sales por eso no tiene declarada la venta.
exports.CouponModel = mongoose.model('Coupon', exports.CouponSchema);