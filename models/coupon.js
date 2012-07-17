// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var coupon_schema = new Schema({
	code				: { type: String },
	email				: { type: Number, required: true, min:0},
	status   			: { type: String },
	created        :   Date,
	modified        :   Date	
})
//Este schema va embebido dentro de sales por eso no tiene declarada la venta.
module.exports = coupon_schema