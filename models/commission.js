// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var CommissionSchema = exports.CommissionSchema = new Schema({
	recipient_id    	: { type: String, required: true },
	sale				: [{ type: Schema.ObjectId, ref: 'Sale' }],
	amount				: { type: Number, required: true, min:0},
	currency	   		: [{ type: Schema.ObjectId, ref: 'Currency' }],
	paid_date			: { type: Date },
	created    		    :   Date,
	modifiend        	:   Date
})

exports.CommissionModel = mongoose.model('Commission', exports.CommissionSchema);