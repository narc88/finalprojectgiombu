// Creación de la Conexión
var mongoose        = require('mongoose')
  , db_lnk          = 'mongodb://localhost/giombu'
  , db              = mongoose.createConnection(db_lnk)

var Image = require('image')
var Schema = require('mongoose').Schema

var deal_schema = new Schema({
	title				: { type: String, required: true },
	tagline				: { type: String, required: true },
	slug				: { type: String, required: true },
	characteristics		: { type: String, required: true },
	conditions			: { type: String, required: true },
	price				: { type: Number, required: true },
	special_price		: { type: Number, required: true },
	discount			: { type: Number, required: true, min:0, max:99 },
	start_date        	:   Date,
	end_date        	:   Date,
	start_redeem        :   Date,
	end_redeem        	:   Date,
	max_coupons			: { type: Number, required: true, min:0},
	max_coupons_by_user	: { type: Number, required: true, min:0},
	seller_percentage	: { type: Number, required: true, min:0, max:99 },
	giombu_percentage	: { type: Number, required: true, min:0, max:99 },
	promoter_percentage	: { type: Number, required: true, min:0, max:99 },
	status				: { type: String },
	sale_count			: { type: Number, required: true, min:0},
	coupon_count		: { type: Number, required: true, min:0},
	shipping_cost		: { type: Number, required: true, min:0},
	store   			: [{ type: Schema.ObjectId, ref: 'Store' }],
	seller   			: [{ type: Schema.ObjectId, ref: 'Seller' }],
	franchisor   		: [{ type: Schema.ObjectId, ref: 'Franchisor' }],
	currency	   		: [{ type: Schema.ObjectId, ref: 'Currency' }],
	images 				: [Image],
	created    		    :   Date,
	modifiend        	:   Date
})

module.exports = deal_schema