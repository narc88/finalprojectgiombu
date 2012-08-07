// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)


var Schema = require('mongoose').Schema

var mailing_schema = new Schema({
	from_id				: { type: Number, required: true },
	to 					: { type: Number, required: true},
	bcc					: { type: String, required: true},
	subject				: { type: String, required: true},
	body				: { type: String, required: true},
	sent_on				: { type: Date, required: true},
	resent_on			: { type: Date, required: true},
	status				: { type: String, required: true},//Ver porque es un enum
	priority			: { type: Number, required: true},
	type				: { type: Number, required: true},
	created    		    :  {type: Date, default: Date.now },
	created    		    :  {type: Date, default: Date.now },
})

module.exports =  mailing_schema