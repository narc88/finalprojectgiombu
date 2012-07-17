// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

var level_schema = new Schema({
	number				: { type: String, required: true },
	name    			: { type: String, required: true },
	bonus				: { type: Number, required: true, min:0},
	description	   		: { type: String },
	created    		    :   Date,
	modifiend        	:   Date
})

module.exports =  level_schema