// Creación de la Conexión
var mongoose = require('mongoose');

var PartnerSchema = exports.PartnerSchema = new mongoose.Schema({
	stores	   			: [{ type: mongoose.Schema.ObjectId, ref: 'Store' }],
	created    		    : { type: Date, default: Date.now },
	modified        	: { type: Date, default: Date.now }
})

exports.PartnerModel = mongoose.model('Partner', exports.PartnerSchema);

