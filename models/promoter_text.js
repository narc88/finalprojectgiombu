// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var PromoterTextSchema = exports.PromoterTextSchema = new Schema({
	promoter			: [{ type: Schema.ObjectId, ref: 'Promoter' }],
	page_title			: { type: String, required: true},
	page_body			: { type: String, required: true},
	subscribers_invite	: { type: String, required: true},
	created				: Date,
	modified			: Date
	
})	

exports.PromoterTextModel = mongoose.model('PromoterText', exports.PromoterTextSchema);
