// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var GuestSchema = exports.GuestSchema = new Schema({
	name				: { type: Number, required: true, min:0},
	email				: { type: Number, required: true, min:0},
	subject   			: { type: String },
	body        		: { type: String },
	accepted_date  		:   Date,
	declined_date  		:   Date,
	resend_date   		:   Date,
	archived			: { type: Boolean },
	invitation_type		: { type: String },
	token        		: { type: String },
	user				: [{ type: Schema.ObjectId, ref: 'User' }],
	promoter			: [{ type: Schema.ObjectId, ref: 'User' }],
	bounce				: [{ type: Schema.ObjectId, ref: 'Bounce' }],
	created    		    :  {type: Date, default: Date.now },
	modified      		:   Date	
})

exports.GuestModel = mongoose.model('Guest', exports.GuestSchema);