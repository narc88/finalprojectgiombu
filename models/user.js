// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

//Referencio los schemes que voy a usar, tanto embebiendo como referenciando
//Verificar si es necesario hacer un require de los que vamos a referenciar,
//o solo es necesario para los que vamos a embeber
var Profile = require('profile')
var Promoter = require('promoter')
var Franchise = require('franchise')
var Franchisor = require('franchisor')
var Seller = require('seller')

var Schema = require('mongoose').Schema

var users_schema = new Schema({
	fullname				: { type: String, required: true},
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
	profile 				: [Profile],
	seller					: [Seller],
	promoter 				: [Promoter],
	franchisor				: [{ type: Schema.ObjectId, ref: 'Franchisor' }],
	created					: Date,
	modified				: Date,
	//Verificar estos campos
	is_admin				: Boolean,
	is_superadmin			: Boolean,
	is_country_manager		: Boolean,
	is_city_manager			: Boolean,
	is_partner				: Boolean,
	is_active				: Boolean,
	wizard					: Boolean, //Que es esto
	 
})

module.exports = users_schema