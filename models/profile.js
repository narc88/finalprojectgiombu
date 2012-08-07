// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var profiles_schema = new Schema({
	name				: { type: String, required: true},
	lname				: { type: String, required: true},
	code				: { type: String, required: true},
	pic					: { type: String, required: true},
	pic_origin			: { type: String, required: true},
	birthday			: Date,
	gender				: { type: String, required: true},
	phone				: { type: String, required: true},
	mobile				: { type: String, required: true},
	address				: { type: String, required: true},
	city				: { type: String, required: true},
	zip					: { type: String, required: true},

	bank_name			: { type: String},
	bank_clabe			: { type: String},
	bank_rute			: { type: String},
	bank_number			: { type: String},
	curp				: { type: String},
	ife 				: { type: String},
	created    		    :  {type: Date, default: Date.now },
	modified			: Date

})

module.exports = profiles_schema