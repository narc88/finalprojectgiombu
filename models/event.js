
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

var event_schema = new Schema({
	body		: { type: String },
	type		: { type: String },
	created     :   Date,
	modified    :   Date	
})

module.exports = event_schema