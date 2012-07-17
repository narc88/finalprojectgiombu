// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var User = require('user')
var Promoter_text = require('promoter_text')

var Schema = require('mongoose').Schema

var promoters_schema = new Schema({
	username				: { type: String, required: true},
	page_title				: { type: String, required: true},
	page_body				: { type: String, required: true},
	page_visits				: { type: Number, required: true, min: 0},
//	level					: { type: String, required: true}, //Que es esto ?? El nivel en base a la cantidad de promotores
//	bonus					: { type: String, required: true}, //Que es esto ?? (LO voy a sacar, voy a crear un modelo con los niveles.)
	level					: [{ type: Schema.ObjectId, ref: 'Level' }],
	confirm_promoter_token	: { type: String, required: true},
	is_active				: { type: Boolean, required: true},
	sponsored_count			: { type: Number, required: true, min: 0},
	subscriber_count		: { type: Number, required: true, min: 0},
	parent					: [{ type: Schema.ObjectId, ref: 'User' }],
	promoter_text 			: [promoter_text], //Son varios o es una sola instancia??? Una sola
	created					: Date,
	modified				: Date

})

module.exports = promoters_schema