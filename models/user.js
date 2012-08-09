// Creación de la Conexión
var mongoose = require('mongoose');

//Referencio los schemes que voy a usar, tanto embebiendo como referenciando
//Verificar si es necesario hacer un require de los que vamos a referenciar,
//o solo es necesario para los que vamos a embeber
var ProfileSchema = require('./profile').ProfileSchema
var PromoterSchema = require('./promoter').PromoterSchema
var FranchisorSchema = require('./franchisor').FranchisorSchema
var SellerSchema = require('./seller').SellerSchema

var Schema = require('mongoose').Schema

var UserSchema = exports.UserSchema = new Schema({
	username				: { type: String, required: true},
	email					: { type: String, required: true},
	password				: { type: String, required: true},
	facebook_id				: { type: Number, required: true},
	reset_password_token	: String,
	reset_password_sent_at	: Date,
	sign_in_count			: { type: Number, required: true, min:0},
	last_sign_in_at			: Date,
	current_sign_in_at		: Date,
	last_sign_in_ip			: String,
	profile 				: [ProfileSchema],
	seller					: [SellerSchema],
	promoter 				: [PromoterSchema],
	//partner 				: [partner],
	franchisor				: [{ type: Schema.ObjectId, ref: 'Franchisor' }],
	created					: Date,
	modified				: Date,
	//Verificar estos campos
	is_admin				: Boolean,
	is_superadmin			: Boolean,
	is_country_manager		: Boolean,
	is_city_manager			: Boolean,
	is_active				: Boolean,
	wizard					: Boolean //Que es esto
	 
});

exports.UserModel = mongoose.model('User', exports.UserSchema);
