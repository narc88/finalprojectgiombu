// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

var currency_value = new Schema({
	value				: { type: Number, required: true},
	date 				: { type: Date, required: true},
})

var currency = new Schema({
	fullname				: { type: String, required: true},
	name					: { type: String, required: true},
	iso						: { type: String, required: true},
	symbol					: { type: String, required: true},
	currency_values			: [currency_value]
})

module.exports = users_schema