// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

//var state_schema = require('./state')
var Schema = require('mongoose').Schema

var country_schema = new Schema({
	name				: { type: Number, required: true, min:0},
//	states      		: [state_schema],
	created        		:   Date,
	modified       		:   Date	
})

module.exports = country_schema