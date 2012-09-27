// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var CommissionSchema = exports.CommissionSchema = new Schema({
	user_id   			: { type: Schema.ObjectId, ref: 'User' },
	sale				: [{ type: Schema.ObjectId, ref: 'Sale' }],
	amount				: { type: Number, required: true, min:0},
	currency	   		: [{ type: Schema.ObjectId, ref: 'Currency' }],
	paid_date			: { type: Date },
	created  		    : {type: Date, default: Date.now },
	modified			: {type: Date, default: Date.now }
})

exports.CommissionModel = mongoose.model('Commission', exports.CommissionSchema);