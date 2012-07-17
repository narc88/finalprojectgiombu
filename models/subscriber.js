// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

//Podria estar embebido en la franquicia
var subscribers_schema = new Schema({
	name				: { type: String, required: true},
	email				: { type: String, required: true},
	subscribe_method	: { type: String, required: true},
	unsubscribe			: { type: Boolean, required: true},
	unsubscribe_date	: { type: Date, required: true},
	registered			: { type: Boolean, required: true},
	ip					: { type: String, required: true},
	user				: { type: Schema.ObjectId, ref: 'User'},
	promoter			: { type: Schema.ObjectId, ref: 'Promoter'},
	franchisor			: { type: Schema.ObjectId, ref: 'Franchisor'}, 
	bounce				: { type: Schema.ObjectId, ref: 'Bounce'},
	verified			: { type: Boolean, required: true},
	created				: { type: Date, required: true},
	modified			: { type: Date, required: true}

})

module.exports = subscribers_schema