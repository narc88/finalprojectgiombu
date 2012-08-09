// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var BranchSchema = new Schema({
	name				: { type: String },
	address				: { type: String },
	lat					: { type: Number, required: true},
	ltg					: { type: Number, required: true},
	zip					: { type: String },
	phone				: { type: String },
	email				: { type: String },
	website				: { type: String },
	fanpage				: { type: String },
	twitter				: { type: String },
	contact				: { type: String },
	partner	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	created      		:   Date,
	modified			:   Date	
})	

exports.BranchModel = mongoose.model('Branch', exports.BranchSchema);

var StoreSchema = exports.StoreSchema = new Schema({
	name				: { type: String },
	deal_count			: { type: Number, required: true, min:0},
	branch_count		: { type: Number, required: true, min:0},
	sale_count			: { type: Number, required: true, min:0},
	email				: { type: String },
	seller	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	due			        :   Date,
	branches			:  [branch_schema],
	created      		:   Date,
	modified			:   Date	
})	

exports.StoreModel = mongoose.model('Store', exports.StoreSchema);
