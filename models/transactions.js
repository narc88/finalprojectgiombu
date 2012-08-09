// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var TransactionsSchema = exports.TransactionsSchema = new Schema({
	transaction_data	: { any: Schema.Types.Mixed },
	sale				: [{ type: Schema.ObjectId, ref: 'Sale' }],
	created       		:   Date,
	modified	        :   Date	
})

exports.TransactionsModel = mongoose.model('Transactions', exports.TransactionsSchema);
