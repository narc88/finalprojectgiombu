// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema;

var BranchSchema = require('./branch').BranchSchema;

var StoreSchema = exports.StoreSchema = new Schema({
	name				: { type: String },
	sale_count			: { type: Number, required: true, min:0},
	email				: { type: String },
	seller	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	due			        :   Date,
	branches			:  [BranchSchema],
	created      		:   Date,
	modified			:   Date	
});

exports.StoreModel = mongoose.model('Store', exports.StoreSchema);
