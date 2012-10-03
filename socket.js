module.exports = function(server){

	var io = require('socket.io').listen(server);
	//Reduzco la cantidad de info del log
	io.set('log level', 1);


	var user_login;


	//Controllers
	var conversation = require('./controllers/conversations_controller');
	var user = require('./controllers/users_controller');
	var promoter = require('./controllers/promoters_controller');


	// SOCKET.IO -----------------------------------------------------------

	// Add listeners to the sockets
	io.sockets.on('connection', function(socket) {

		// AUTOLOGIN!
		socket.on('auto_login', function(data) {
			console.log('\u001b[34m'); //blue
			console.log('socket - auto_login');
			console.log('\u001b[0m');//reset color
			conversation.auto_login(io, socket, data);
		});


		// Llega un mensaje
		socket.on('message', function(data) {
			console.log('socket - message');
			conversation.message(io, socket, data);
		});

		// Cambio de conversacion
		socket.on('change_conversation', function(data) {
			console.log('socket - change_conversation');
			conversation.change_conversation(io, socket, data);
		});

		// El usuario se loguea
		socket.on('logIn', function(data) {
			console.log('socket - logIn');
			conversations.logIn(io, socket, data);
		});

		// Nueva conversacion
		socket.on('new_conversation', function(data) {
			console.log('socket - new_conversation');
			conversation.new_conversation(io, socket, data);
		});

		// El usuario solicita sus conversaciones
		socket.on('req_conversations', function(data) {
			console.log('socket - req_conversations');
			conversation.req_conversations(io, socket, data);
		});

		// El usuario solicita sus contactos
		socket.on('req_logued_users', function(data) {
			console.log('socket - req_logued_users');
			conversations.req_logued_users(io, socket, data);
		});


		// Agrega contacto a la converesacion acutal
		socket.on('add_contact_to_conversation', function(data) {
			console.log('socket - add_contact_to_conversation');
			conversation.add_contact_to_conversation(io, socket, data);
		});


		// Marca una conversacion como no leida para un contacto
		socket.on('unread', function(data) {
			console.log('socket - unread');
			conversation.unread(io, socket, data);
		});


		// Remueve un user de una conversacion
		socket.on('quit_from_conversation', function(data) {
		console.log('socket - quit_from_conversation');
		conversation.quit_from_conversation(io, socket, data);
		});

	});


	// END SOCKET.IO  ---------------------------------------------------------------


}