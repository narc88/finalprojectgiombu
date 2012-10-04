var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var MessageSchema = require('./message').MessageSchema;

var ConversationSchema = exports.ConversationSchema = new Schema({
  	participants 	     	: [String],
    participants_hide		: [String],
  	messages 		      	: [MessageSchema],
    unread              	: [String],
  	created			       	: { type: Date, required: true, default: Date.now },
    modified            	: { type: Date, required: true, default: Date.now }
});

exports.ConversationModel = mongoose.model('Conversation', exports.ConversationSchema);