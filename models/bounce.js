// Creación de la Conexión
var mongoose = require('mongoose');

var Schema = require('mongoose').Schema


var bounce_schema = new Schema({
	email				: { type: String, required: true},
	modified_email		: { type: String, required: true},
	promoter			: { type: Schema.ObjectId, ref: 'Promoter'},
	status				: { type: String, required: true},
	reason				: { type: String, required: true},
	bounce_date			: { type: Date, required: true},
	created				: { type: Date, required: true},
	modified 			: { type: Date, required: true}

})

module.exports = bounce_schema