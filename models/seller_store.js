var mongoose = require('mongoose');

var Schema = mongoose.Schema;


exports.SellerStoreSchema = new Schema({
	store				: [{ type: Schema.ObjectId, ref: 'Store' }],
	begin_date			: Date,
	end_date			: Date,
	created				: Date,
	modified			: Date
})	

exports.SellerStoreModel = mongoose.model('SellerStore', exports.SellerStoreSchema);