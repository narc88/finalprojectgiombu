// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

var city_schema = new Schema({
	name				: { type: String, required: true},
	created        		:   Date,
	modified       		:   Date	
})

module.exports = city_schema