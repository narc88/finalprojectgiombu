// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var transaction_schema = new Schema({
	transaction_data	: { any: Schema.Types.Mixed },
	sale				: [{ type: Schema.ObjectId, ref: 'Sale' }],
	created       		:   Date,
	modified	        :   Date	
})

module.exports = transaction_schema