var ConversationModel = require('../models/conversation').ConversationModel;
var MessageModel = require('../models/message').MessageModel;
var UserModel = require('../models/user').UserModel;


exports.conversation = function(req, res, next){
	console.log('conversations - conversation');
	res.render('conversations/conversation', { 	title: ' - Chat de Giombu',
							user_id : req.session.user._id,
							user: req.session.user});
}

exports.conversation_thin = function(req, res, next){
	console.log('conversations - conversation_thin');
	res.render('conversations/conversation_thin', { 	title: ' - Chat de Giombu',
							user_id : req.session.user._id,
							user: req.session.user});
}



exports.new_conversation = function(io, socket, data) {

	var participants = [data.user_id, data.target_user_id];
	//var participants_names = [data.username, data.target_user];
	//debo buscar si ya hay un chat con estos participantes

	console.log('new_conversation - Busco una conversacion con los participantes ( ' + participants + ' )');

	var query = ConversationModel.findOne({});
	query.where('participants').all(participants);
	query.where('participants').size(participants.length);
	query.exec( function(err, conversation){
	
		if(conversation){
			//Ya existe la conversacion
			console.log('new_conversation - Ya existe la conversacion ( '+conversation._id+' )');

			//Si el id del usuario esta en la lista participants_hide , hay que quitarlo
			var idx = conversation.participants_hide.indexOf(data.user_id);
			console.log('new_conversation - Indice en la lista participants_hide ( '+ idx +' )');
			if(idx != -1 ){
				conversation.participants_hide.splice(idx, 1);
				console.log('new_conversation - Desoculto la conversacion para el usuario ( '+ data.user_id +' )');
			}
			//Quito al usuario de la lista de unread ya que la conversacion se va a cargar
			idx = conversation.unread.indexOf(data.user_id);
			console.log('new_conversation - Indice en la lista unread ( '+ idx +' )');
			if(idx != -1 ){
				conversation.unread.splice(idx, 1);
				console.log('new_conversation - Quito al usuario de la lista unread ( '+ data.user_id +' )');
			}
			
			conversation.save();

			// Solicito que checkee las conversaciones - por las dudas
			socket.emit('check_conversations', { target_user_id : data.user_id});
			// Solicito que cargue la conversacion
			socket.emit('load_conversation', conversation);
		}else{
			//Si no existe debo crear la conversacion y notificar a los participantes de la nueva conversacion
			var new_conversation = new ConversationModel({ 
				participants		: participants
				//participants_names 	: participants_names
			});
			//Lo guardo en la base de datos
			new_conversation.save();
			console.log('new_conversation - Se crea una nueva conversacion');
			// Envio La conversación al usuario que la genera.
			socket.emit('add_conversation', new_conversation);
			// Solicito que cargue la conversacion nueva
			socket.emit('load_conversation', new_conversation);
			//Fuerzo a consultar por nuevas conversaciones a los usuarios involucrados en la nueva conversacion
			io.sockets.emit('check_conversations', { target_user_id : data.target_user_id});
			console.log('new_conversation - check_conversations - target_user_id : ' + data.target_user_id);
		}
	});
}

exports.req_conversations = function(io, socket, data){
	//Traigo todas las conversaciones en donde participa el usuario
	console.log('req_conversations - Usuario solicita lista de conversaciones ( '+ data.user_id + ' )');

	var query = ConversationModel.find({});
	query.where('participants' , data.user_id);
	query.where('participants_hide').nin([data.user_id]);
	//El usuario debe ser participante, pero no debe estar en la lista de ocultos, participants_hide
	//ConversationModel.find({ participants : data.user_id, participants_hide : { $nin:  [data.user_id]}}, function(err, conversations){
	query.exec(function(err, conversations){
		if(conversations){
			console.log('req_conversations - Tiene conversaciones');
			socket.emit('list_conversations', { conversations : conversations } );
			conversations.forEach( function(conversation){
				console.log(conversation._id);
			});
			console.log('req_conversations - Se envian las conversaciones');
		}else{
			console.log('req_conversations - NO tiene conversaciones');
		}
	});

}


exports.change_conversation = function(io, socket, data){
	if(data.conversation_id == 0){
		//Devuelvo una conversacion en blanco
		var conversation = {
				_id					: 0,
				participants 		: [],
				participants_hide   : [],
				messages 		  	: [],
				unread              : [],
				created		       	: '',
				modified            : ''

		}

		socket.emit('load_conversation', conversation);

	}else{
		//Traigo el chat que solicita
		ConversationModel.findById(data.conversation_id, function(err, conversation){
			if(conversation){
				console.log('change_conversation - Conversacion encontrada ( '+ data.conversation_id +' )');

				var idx = conversation.unread.indexOf(data.user_id);

				console.log('change_conversation - Indice unread ( '+ idx +' ) para el user_id ( '+ data.user_id + ' )');
				if(idx!=-1) conversation.unread.splice(idx, 1);
				conversation.save();

				//Actualizo la conversacion actual del usuario
				UserModel.findOne( { user_id : data.user_id }, function(err, user){
					if(user){
						console.log('change_conversation - usuario encontrado ( '+ user.username +' )');
						user.current_conversation = data.conversation_id;
						user.save();
						console.log('change_conversation - Actualizo la conversacion actual del usuario');
					}
				});

				socket.emit('load_conversation', conversation);
			}
		});

	}

}

exports.message = function(io, socket, data) {
	console.log('message - Llega el mensaje : ' + data.message );
	ConversationModel.findById(data.conversation_id, gotConversations);
	function gotConversations (err, chat) {
		console.log('message - Encontro la conversacion');
		//console.log(chat);

		var msg = new MessageModel({
			message 	: data.message,
			sender 		: data.user_id,
			sender_name	: data.username

		});

		msg.read.push(data.user_id);

		chat.messages.push(msg);
		//Lo guardo en la base de datos
		chat.save();

		//Debo buscar la conversacion y volverla visible para todos y ademas solicitarles que resfresquen
		//su lista de conversaciones
		ConversationModel.findById( data.conversation_id, function(err, conversation){

			//console.log(data.conversation_id);
			// Envio La conversación.
			console.log('message - Broadcast message');	
			io.sockets.emit('message', {
				message 		: data.message,
				sender 			: data.user_id,
				conversation_id	: data.conversation_id,
				sender_name		: data.username
			});

			//Hago visible la conversacion para todos los participantes y
			//Notifico a los usuarios que tenian la conversacion oculta, que actualicen su lista de conv
			var participants = conversation.participants_hide;
			console.log('message - La conversacion esta oculta para los participantes ( '+participants+' )');
			conversation.unread = conversation.participants_hide;
			conversation.participants_hide = [];
			conversation.save();
			participants.forEach(function(participant){
				io.sockets.emit('check_conversations', { target_user_id : participant});
				console.log('message - Notifica al contacto ( '+ participant + ' )');	
			});



		});


	}

}

exports.add_contact_to_conversation = function(io, socket, data){

	//Si ya existe una conversacion con los participantes actuales mas el participante que desean agregar,
	//se debe devolver la conversacion existente y no crear una nueva

	var idx;
	var bandera = true;

	//Evita que agregue contactos a una conversacion vacia
	if (data.current_conversation != 0) {

		var new_participants = data.participants
		new_participants.push(data.user_id);
		new_participants.push(data.target_user_id);
		//Busco si ya existe una conversacion con esos participantes, y si esta oculta para el usuario
		//la vuelvo visible, tanto para el, como para el contacto que agrego
		//y debo forzar a refrescar la lista de conversaciones tanto para el usuario como para
		//el contacto que agrego
		console.log('add_contact_to_conversation - Busco conversacion con los participantes ( '+ data.participants + ' )');

		var query = ConversationModel.findOne({});
		query.where('participants').all(new_participants);
		query.where('participants').size(new_participants.length);
		query.exec( function(err, conversation_element){

			if(conversation_element){

				console.log('add_contact_to_conversation - Ya existe una conversacion con estos participantes ( '+ conversation_element._id + ' )');

				//Desoculto la conversacion para el user
				idx = conversation_element.participants_hide.indexOf(data.user_id);
				conversation_element.participants_hide.splice(idx, 1);
				//Desoculto la conversacion para el usuario que iba a ser agregado
				idx = conversation_element.participants_hide.indexOf(data.target_user_id);
				conversation_element.participants_hide.splice(idx, 1);

				conversation_element.save();

				//Solicito al usuario que refresque su lista de conversaciones
				socket.emit('check_conversations',  { target_user_id : data.user_id} );

				//Fuerzo a consultar por nuevas conversaciones al usuario que agregan
				io.sockets.emit('check_conversations', { target_user_id : data.target_user_id});

				//Le digo al user que cargue la conversacion que ya existe
				socket.emit('load_conversation', conversation_element);
					
			}else{
				console.log('add_contact_to_conversation - NO existe una conversacion con estos participantes ');


				ConversationModel.findById(data.current_conversation , function(err, conversation){
					console.log('add_contact_to_conversation - Encontro la conversacion ( '+ data.current_conversation + ' )');
					
					//Valido que no haya sido agregado previamente a la conversacion
					idx = conversation.participants.indexOf(data.target_user_id);
					if(idx == -1){
						conversation.participants.push(data.target_user_id);
						conversation.save();
						console.log('add_contact_to_conversation - Agrega el user a la conversacion ( '+ data.target_user_id + ' )');

						conversation.participants.forEach(function(participant){
							io.sockets.emit('check_conversations', { target_user_id : participant});
							console.log('add_contact_to_conversation - Notifica al contacto ( '+ participant + ' )');	
						});

						socket.emit('load_conversation', conversation);
					}else{
						console.log('add_contact_to_conversation - El contacto ya se encuentra en la conversacion ( '+ data.target_user_id + ' )');			
					}

				});


			}

		});

	}else{
		console.log('add_contact_to_conversation - No hay una conversacion activa');	
	}


/*

*/
}



exports.unread = function(io, socket, data){
	ConversationModel.findById( data.conversation_id, function(err, conversation){
		if(conversation){
			var idx = conversation.unread.indexOf(data.user_id);
			if(idx == -1){
				conversation.unread.push(data.user_id);
				conversation.save();
				console.log('unread - Agrego el user_id a la lista de unread ( '+ data.user_id + ' )');
			}else{
				console.log('unread - El user ya esta en la lista de unread ( '+ data.user_id + ' )');
			}
			//socket.emit('check_conversations', { target_user_id : data.target_user_id});
		}else{
			console.log('unread - No encuentra la conversacion');
		}
	});

}


exports.quit_from_conversation = function(io, socket, data){
	//Busco la conversacion
	console.log('quit_from_conversation - Busca la conversacion ( '+ data.conversation_id +' )');
	ConversationModel.findById( data.conversation_id, function(err, conversation){
		if(conversation){
			console.log('quit_from_conversation - Encuentra la conversacion');
			var idx = conversation.participants_hide.indexOf(data.user_id);
			if(idx == -1){
				conversation.participants_hide.push(data.user_id);
				console.log('quit_from_conversation - Oculta la conversacion para el usuario ( '+ data.user_id +' )');
				conversation.save(function(err){
					if(err){
						console.log('quit_from_conversation - '+ err);
					}
				});
			}else{
				console.log('quit_from_conversation - El usuario ya esta en la lista participants_hide ( '+ data.user_id +' )');
			}

			//Solicito al usuario que refresque su lista de conversaciones
			socket.emit('check_conversations',  { target_user_id : data.user_id} );
		}else{
			console.log('quit_from_conversation - NO encuentra la conversacion');

		}
	});



}

exports.logIn = function(io, socket, data) {
	var user;
	console.log('logIn - username : '+data.username);
	UserModel.findOne({username: data.username}, function(err, doc){
		if(!doc){
			//ESTO ES PROVISORIO, DEBE MODIFICARSE
			console.log('logIn - No encontro el usuario');
			user = new UserModel({
				user_id		: socket.id,
				username	: data.username,
				fullname	: data.username
				//promoters	: [],
				//socket_id 	: socket.id

			});
			//Guardo el nuevo usuario
			user.save(function (err) {
				if(!err){
					console.log('logIn - Creo el usuario');
					//muestro el usuario que devuelvo
					console.log('logIn - Datos nuevo usuario : '+ user);
				}else{
					console.log('logIn - Error al crear el usuario: '+err);
				}
			});
			
		}else{
			//Encontro el usuario
			user = doc;
			//user.socket_id = socket.id;
			user.save();
			console.log('logIn - Encontro el usuario');
		}

		//Los contactos que le paso al user que se loguea deben ser sus propios promotores
		UserModel.find({},function(err, docs){
			var datos = {};
			datos.contacts = docs;
			datos.user = user;
			socket.emit('logInOk', datos);
			socket.emit('req_logued_users', {});
			console.log('logIn - logInOk : envia datos');
		});


	});

}


exports.auto_login = function(io, socket, data) {

	console.log('auto_login - user_id : ' + data.user_id);

	UserModel.findOne( { _id: data.user_id } , function(err, user){
		if(!user){

			console.log('auto_login - No encontro el usuario');
			
		}else{
			//Encontro el usuario
			console.log('auto_login - Encontro el usuario');
			//console.log(user);

			var datos = {};
			
			UserModel.find({}, function(err, users){
				datos.contacts = users;
				console.log(datos.contacts);
				datos.user = user;
				socket.emit('logInOk', datos);
				console.log('logIn - logInOk : envia datos');
			});

		}
	});
}





exports.req_logued_users = function(io, socket, data){

	UserModel.find({},function(err, docs){
		var datos = {};
		datos.contacts = docs;
		//io.sockets.emit('logInOk', datos);
		io.sockets.emit('list_logued_users', datos);
		console.log('req_logued_users - Envia usuarios');
	});
}







/*
exports.read = function(io, socket, data) {
		models.conversation.findById(data.idConversation, gotConversation);
		function gotConversation(err, conversation) {
	    	if (err) {
	    		console.log(err)
	    		return next()
	    	}
	   		conversation.messages.id(data.idMessage).read.push(data.reader)
	   		conversation.save()
		}   
}

exports.hide = function(io, socket, data) {
		models.conversation.findById(data.idConversation, gotConversation);
		function gotConversation(err, conversation) {
	    	if (err) {
	    		console.log(err)
	    		return next()
	    	}
	   		conversation.messages.id(data.idMessage).hide.push(data.reader)
	   		conversation.save()
		}   
}
*/