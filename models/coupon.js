// Creación de la Conexión
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var CouponSchema = exports.CouponSchema = new Schema({
	code				: { type: String },
	email				: { type: Number, required: true, min:0},
	status   			: { type: String },
	created        :   Date,
	modified        :   Date	
})
//Este schema va embebido dentro de sales por eso no tiene declarada la venta.
exports.CouponModel = mongoose.model('Coupon', exports.CouponSchema);