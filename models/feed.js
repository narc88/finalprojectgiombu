// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var feed_schema = new Schema({
	from_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	to_user  	: [{ type: Schema.ObjectId, ref: 'User' }],
	event  		: [{ type: Schema.ObjectId, ref: 'Event' }],
	created     :   Date,
	modified    :   Date	
})

module.exports = feed_schema