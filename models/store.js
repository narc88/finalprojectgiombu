// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var store_schema = new Schema({
	name				: { type: String },
	deal_count			: { type: Number, required: true, min:0},
	branch_count		: { type: Number, required: true, min:0},
	seller	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	due			        :   Date,
	created      		:   Date,
	modified			:   Date	
})	

module.exports = store_schema