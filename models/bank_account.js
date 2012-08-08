// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var bank_account_schema = new Schema({
	any: {}
})

var bank_data_schema = new Schema({
	account_data		: bank_account_schema,
	created    		    : {type: Date, default: Date.now },
	modified			: Date
})

module.exports = bank_data_schema