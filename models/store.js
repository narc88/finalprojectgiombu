// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema;

var BranchSchema = require('./branch').BranchSchema;
var ImageSchema = require('./image').ImageSchema;

var StoreSchema = exports.StoreSchema = new Schema({
	name				: { type: String },
	about				: { type: String },
	email				: { type: String },
	seller	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	franchisor			: { type: Schema.ObjectId, ref: 'Franchisor' },
	image 				: [ImageSchema],
	branches			: [BranchSchema],
	created    			: {type: Date, default: Date.now },
	modified			: {type: Date, default: Date.now }
});

exports.StoreModel = mongoose.model('Store', exports.StoreSchema);
