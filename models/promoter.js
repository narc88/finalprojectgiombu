// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var User = require('user')

var Schema = require('mongoose').Schema

var promoters_schema = new Schema({
	username				: { type: String, required: true},
	page_title				: { type: String, required: true},
	page_body				: { type: String, required: true},
	page_visits				: { type: Number, required: true, min: 0},
	level					: { type: String, required: true}, //Que es esto ??
	bonus					: { type: String, required: true}, //Que es esto ??
	confirm_promoter_token	: { type: String, required: true},
	is_active				: { type: Boolean, required: true},
	sponsored_count			: { type: Number, required: true, min: 0},
	subscriber_count		: { type: Number, required: true, min: 0},
	parent_id				: [{ type: Schema.ObjectId, ref: 'User' }],
	created					: Date,
	modified				: Date

})

module.exports = promoters_schema