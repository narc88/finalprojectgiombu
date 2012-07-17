// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Schema = require('mongoose').Schema

//Puede ir embebido dentro del promotor
var bounus_schema = new Schema({
	amount				: { type: Number, required: true, min: 0},
	bonus				: { type: String, required: true},
	paid				: { type: Boolean, required: true},
	paid_date			: { type: Date, required: true},
	sale				: { type: Schema.ObjectId, ref: 'Sale'},
	sponsor				: { type: Schema.ObjectId, ref: 'Sponsor'},
	promoter			: { type: Schema.ObjectId, ref: 'Promoter'},
	currency			: { type: Schema.ObjectId, ref: 'Currency'},
	created				: { type: Date, required: true},
	modified			: { type: Date, required: true}


})

module.exports = bounus_schema