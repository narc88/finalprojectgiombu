// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var profiles_schema = new Schema({
	fname				: { type: String, required: true},
	mname				: { type: String, required: true},
	lname				: { type: String, required: true},
	code				: { type: String, required: true},
	picture				: { type: String, required: true},
	picture_from		: { type: String, required: true},
	birthday			: Date,
	gender				: { type: String, required: true},
	phone				: { type: String, required: true},
	mobile				: { type: String, required: true},
	adress				: { type: String, required: true},
	location			: { type: String, required: true},
	zip					: { type: String, required: true},
	page_title			: { type: String, required: true},
	page_body			: { type: String, required: true},
	page_visits			: { type: Number, required: true, min:0},
	bank_name			: { type: String, required: true},
	bank_clabe			: { type: String, required: true},
	bank_rute			: { type: String, required: true},
	bank_number			: { type: String, required: true},
	curp				: { type: String, required: true},
	ife 				: { type: String, required: true},
	created				: Date,
	modified			: Date

})

module.exports = profiles_schema