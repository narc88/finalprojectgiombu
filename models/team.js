// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var TeamSchema = exports.TeamSchema = new Schema({
	name				: { type: String, required: true},
	is_active			: { type: Boolean, required: true},
	promoters_count		: { type: Number, required: true, min: 0},
	contacts_count		: { type: Number, required: true, min: 0},
	created				: Date,
	modified			: Date,
	promoters 			: [{ type: Schema.ObjectId, ref: 'Promoter' }],
	capitan 			: { type: Schema.ObjectId, ref: 'Promoter' }

})

exports.TeamModel = mongoose.model('Team', exports.TeamSchema);
