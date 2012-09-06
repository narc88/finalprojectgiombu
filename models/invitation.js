// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema

var InvitationSchema = exports.InvitationSchema = new Schema({
	name				: { type: String, required: true},
	email				: { type: String, required: true},
	subject   			: { type: String, required: true },
	body        		: { type: String, required: true },
	accepted_date  		:   Date,
	declined_date  		:   Date,
	resend_date   		:   Date,
	invitation_type		: { type: String },
	//Usuario que Realizó la invitación.
	user				: [{ type: Schema.ObjectId, ref: 'User' }],
	bounce				: [{ type: Schema.ObjectId, ref: 'Bounce' }],
	created    		    :  {type: Date, default: Date.now },	
})

exports.InvitationModel = mongoose.model('Invitation', exports.InvitationSchema);


