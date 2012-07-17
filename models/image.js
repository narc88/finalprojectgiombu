// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var image_schema = new Schema({
	filename			: { type: String , required: true},
	default				: { type: Boolean },
	active				: { type: Boolean },
	created      		:   Date,
	modified			:   Date	
})	

module.exports = image_schema