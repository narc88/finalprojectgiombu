// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

var commission_schema = new Schema({
	recipient_type		: { type: String, required: true },
	recipient_id    	: { type: String, required: true },
	sale				: [{ type: Schema.ObjectId, ref: 'Sale' }],
	amount				: { type: Number, required: true, min:0},
	currency	   		: [{ type: Schema.ObjectId, ref: 'Currency' }],
	paid_date			: { type: Date },
	created    		    :   Date,
	modifiend        	:   Date
})

module.exports =  commission_schema