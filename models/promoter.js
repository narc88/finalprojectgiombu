// Creación de la Conexión
var mongoose = require('mongoose');

var promoter_text_schema = require('./promoter_text')
var image_schema = require('./image')

var Schema = require('mongoose').Schema

var promoters_schema = new Schema({
	username				: { type: String, required: true},
	page_visits				: { type: Number, required: true, min: 0},
	level					: [{ type: Schema.ObjectId, ref: 'Level' }],
	confirm_promoter_token	: { type: String, required: true},
	is_active				: { type: Boolean, required: true},
	sponsored_count			: { type: Number, required: true, min: 0},
	subscriber_count		: { type: Number, required: true, min: 0},
	parent					: [{ type: Schema.ObjectId, ref: 'User' }],
	promoter_text 			: [promoter_text_schema],
	images					: [image_schema],
	created					: Date,
	modified				: Date
})

module.exports = promoters_schema