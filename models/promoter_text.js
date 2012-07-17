// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var promoters_texts_schema = new Schema({
	store				: [{ type: Schema.ObjectId, ref: 'Store' }],
	subscribers_invite	: { type: String, required: true},
	created				: Date,
	modified			: Date
	
})	

module.exports = promoters_texts_schema