// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema
var Seller_store = require('sellers_stores')

var sellers_schema = new Schema({
	is_dr				: { type: Boolean, required: true},
	is_dn				: { type: Boolean, required: true},
	is_active			: { type: Boolean, required: true},
	store_count			: { type: Number, required: true, min:0 },
	prospect_count		: { type: Number, required: true, min:0 },
	deal_count			: { type: Number, required: true, min:0 },
	stores				: [Seller_store], //Guardar asi?? o mantener referencia desde sellers_store ??
	created				: Date,
	modified			: Date
})

module.exports = sellers_schema