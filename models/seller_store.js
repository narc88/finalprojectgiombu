// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var sellers_stores_schema = new Schema({
	store				: [{ type: Schema.ObjectId, ref: 'Store' }],
	seller				: [{ type: Schema.ObjectId, ref: 'Seller' }],
	begin_date			: Date,
	end_date			: Date,
	created				: Date,
	modified			: Date
	
})	

module.exports = sellers_stores_schema