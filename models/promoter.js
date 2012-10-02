// Creación de la Conexión
var mongoose = require('mongoose');
var PromoterTextSchema = require('./promoter_text').PromoterTextSchema;
var CommissionSchema = require('./commission').CommissionSchema;

var PromoterSchema = exports.PromoterSchema = new mongoose.Schema({
	page_visits				: { type: Number, min: 0},
	level					: { type: mongoose.Schema.ObjectId, ref: 'Level' },
	confirm_promoter_token	: { type: String},
	parent_id 				: { type: mongoose.Schema.ObjectId, ref: 'User' },
	promoter_text 			: [PromoterTextSchema],
	created    		 	    : {type: Date, default: Date.now },
	modified				: {type: Date, default: Date.now },
	commissions				: [CommissionSchema]
})

exports.PromoterModel = mongoose.model('Promoter', exports.PromoterSchema);
