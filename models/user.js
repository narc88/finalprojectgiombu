// Creación de la Conexión
var mongoose = require('mongoose');

//Referencio los schemes que voy a usar, tanto embebiendo como referenciando
//Verificar si es necesario hacer un require de los que vamos a referenciar,
//o solo es necesario para los que vamos a embeber
var PromoterSchema = require('./promoter').PromoterSchema
var RoleSchema = require('./promoter').RoleSchema
var ImageSchema = require('./image').ImageSchema;
var InvitationSchema = require('./invitation').InvitationSchema;
var PartnerSchema = require('./partner').PartnerSchema;
//var FranchisorSchema = require('./franchisor').FranchisorSchema
var SellerSchema = require('./seller').SellerSchema

var Schema = require('mongoose').Schema

var UserSchema = exports.UserSchema = new Schema({
	username				: { type: String, required: true},
	email					: { type: String, required: true},
	password				: { type: String, required: true},
	facebook_id				: { type: Number},
	reset_password_token	: String,
	reset_password_sent_at	: Date,
	sign_in_count			: { type: Number, min:0},
	last_sign_in_at			: Date,
	current_sign_in_at		: Date,
	last_sign_in_ip			: String,
	name					: { type: String, required: true},
	lname					: { type: String, required: true},
	birthday				: { type: Date, required: true},
	gender					: { type: String, required: true},
	phone					: { type: String},
	mobile					: { type: String},
	address					: { type: String},
	city					: { type: String},
	zip						: { type: String},
	created    			    : {type: Date, default: Date.now },
	modified				: {type: Date, default: Date.now },
	promoter_id 			: { type: mongoose.Schema.ObjectId, ref: 'User' },
	//Relacionados
	invitation				: [InvitationSchema],
	image 					: [ImageSchema],
	seller					: [SellerSchema],
	promoter 				: [PromoterSchema],
	role 					: [RoleSchema],
	partner 				: [PartnerSchema],
	//franchisor			: [{ type: Schema.ObjectId, ref: 'Franchisor' }],
	//Verificar estos campos
	is_admin				: Boolean,
	is_superadmin			: Boolean,
	is_country_manager		: Boolean,
	is_city_manager			: Boolean,
	is_active				: Boolean,
	wizard					: Boolean //Que es esto
	 
});

exports.UserModel = mongoose.model('User', exports.UserSchema);
