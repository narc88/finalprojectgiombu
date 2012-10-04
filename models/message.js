var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = exports.MessageSchema = new Schema({
  	sender 		: { type: String, required: true},
  	sender_name	: { type: String, required: true},
  	message		: { type: String, required: true},
  	hide		: [String],
  	read		: [String],
  	created		: { type: Date, default: Date.now }
});

exports.MessageModel = mongoose.model('Message', exports.MessageSchema);