// Creación de la Conexión
var mongoose = require('mongoose');


var Schema = require('mongoose').Schema

var QuestionSchema = exports.QuestionSchema = new Schema({
	deal  			: { type: Schema.ObjectId, ref: 'Deal' },
	user  			: { type: Schema.ObjectId, ref: 'User' },
	partner 		: { type: Schema.ObjectId, ref: 'User' },
	question 		: { type: String },
	answer			: { type: String },
	answer_admin	: { type: String },
	created			       	: { type: Date, required: true, default: Date.now },
    modified            	: { type: Date, required: true, default: Date.now }
})

exports.QuestionModel = mongoose.model('Question', exports.QuestionSchema);
