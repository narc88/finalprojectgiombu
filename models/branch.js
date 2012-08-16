
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema;

exports.BranchSchema = new Schema({
	default				: { type: Boolean },
	name				: { type: String , required:true},
	address				: { type: String },
	lat					: { type: Number},
	ltg					: { type: Number},
	zip					: { type: String },
	phone				: { type: String },
	email				: { type: String },
	website				: { type: String },
	fanpage				: { type: String },
	twitter				: { type: String },
	contact				: { type: String },
	partner	   			: [{ type: Schema.ObjectId, ref: 'User' }],
	created    			: {type: Date, default: Date.now },
	modified			: {type: Date, default: Date.now }	
});

exports.BranchModel = mongoose.model('Branch', exports.BranchSchema);