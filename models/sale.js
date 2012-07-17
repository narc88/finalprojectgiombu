// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Coupon = require('coupon')
var Schema = require('mongoose').Schema

var sale_schema = new Schema({
	coupon_count		: { type: Number, required: true, min:0},
	deal   				: [{ type: Schema.ObjectId, ref: 'Deal' }],
	product   			: [{ type: Schema.ObjectId, ref: 'Product' }],
	user	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	payment_method		: { type: String },
	status				: { type: String },
	user	   			: [{ type: Schema.ObjectId, ref: 'Franchise' }],
	coupons       : [Coupon],
	created        :   Date,
	modified        :   Date	
})

module.exports = sale_schema