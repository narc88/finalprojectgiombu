var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var FranchiseSchema = exports.FranchiseSchema = new Schema({
	name				: { type: String },
	slug				: { type: String },
	is_default			: { type: Boolean },
	timezone			: { type: Number},
	user_count			: { type: Number, min:0},
	subscriber_count	: { type: Number, min:0},
	store_count			: { type: Number, min:0},
	created    		    :  {type: Date, default: Date.now },
	modified			:  {type: Date, default: Date.now }	
});	

exports.FranchiseModel = mongoose.model('Franchise', exports.FranchiseSchema);