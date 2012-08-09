
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema;

exports.BranchSchema = new Schema({
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
});

exports.BranchModel = mongoose.model('Branch', exports.BranchSchema);