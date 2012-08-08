// Creación de la Conexión
var mongoose = require('mongoose');

var PromoterTextSchema = require('./promoter_text').PromoterTextSchema;
var ImageSchema = require('./image').ImageSchema;

var Schema = require('mongoose').Schema

var PromoterSchema = exports.PromoterSchema = new Schema({
	username				: { type: String, required: true},
	page_visits				: { type: Number, required: true, min: 0},
	level					: [{ type: Schema.ObjectId, ref: 'Level' }],
	confirm_promoter_token	: { type: String, required: true},
	is_active				: { type: Boolean, required: true},
	sponsored_count			: { type: Number, required: true, min: 0},
	subscriber_count		: { type: Number, required: true, min: 0},
	parent					: [{ type: Schema.ObjectId, ref: 'User' }],
	promoter_text 			: [PromoterTextSchema],
	images					: [ImageSchema],
	created					: Date,
	modified				: Date
})

exports.PromoterModel = mongoose.model('Promoter', exports.PromoterSchema);
