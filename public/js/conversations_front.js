$(function() {
	var socket = io.connect('http://' + window.location.hostname + ':' + window.location.port);

	//CHAT VIEW --------------------------------
	var ChatView = Backbone.View.extend({
		el: '.contenedor',

		scroll: 0,

		events: {
			'keyup .message': 'send',
			'click .contact': 'new_conversation',
			'click .conversation': 'change_conversation',
			'click .add_contact_to_conversation' : 'add_contact_to_conversation',
			'click .remove' : 'remove_conversation'
		},

		initialize: function() {
			_.bindAll(this);
			socket.on('message', this.message);
			socket.on('load_conversation', this.load_conversation);
			socket.on('add_conversation', this.add_conversation);
			socket.on('list_conversations', this.list_conversations);
			socket.on('check_conversations', this.check_conversations);
			socket.on('remove_atual_conversation', this.remove_atual_conversation);
			
			//Id de la conversacion actual
			this.current_conversation = 0;
			this.participants;
			this.conversation_list;
			this.auto_login();
			this.last_sender= '';

		},

		auto_login: function(){
			alert('auto_login');
			var user_id = $('.contenedor').attr('id');
			socket.emit('auto_login', {
				user_id: user_id
			});

		}

		,

		send: function(event) {
			if (event.keyCode === 13) {
				if(chat.current_conversation != 0){
					var message = $(event.target).val();
					socket.emit('message', {
						message			: message,
						conversation_id	: chat.current_conversation,
						username		: user.username,
						user_id			: user.id //Revisar este id, si es el de mongo o el interno
					});
					$('.message').val('');
				}else{
					alert('Seleccione una conversacion');
				}
			}
		},

		message: function(data) {

			var log = $('.log');
			if(chat.current_conversation == data.conversation_id){
				var message = $('<div class="message_line"></div>'),
				message_nickname = $('<div class="message_nickname"></div>'),
				nickname = '',
				row = $('<div class="row"></div>');
				
				//Busco el nombre del contacto
				if(user.id == data.sender){
					nickname = user.username;
				}else{
					user.contacts.forEach(function(contact){
						if(contact.id == data.sender){
							nickname = contact.username;
						}
					});
				}

				//evito repetir el nickname si envia varios mensajes seguidos
				if(chat.last_sender == data.sender){
					
				}else{
					message_nickname.text(nickname);
					row.append(message_nickname);
					chat.last_sender = data.sender;
				}

				message.css('margin-top', '0px');
				message.text(data.message);
				row.append(message);

				log.append(row);

				log.scrollTop(log.prop("scrollHeight"));
			}else{
				//la conversacion no esta activa
				$('.conv_element#'+data.conversation_id).css("color","orange");
				socket.emit('unread', { 
					conversation_id : data.conversation_id,
					user_id 		: user.id
				});
			}
		},

		//Cambia la conversacion, solicita mensajes de la conversacion seleccionada
		change_conversation: function(event){
			
			socket.emit('change_conversation', {
				conversation_id	: event.target.id,
				user_id			: user.id
			});
		},

		//Carga la conversacion que llega desde el server
		load_conversation: function(conversation){
			//Vuelvo a poner la conversacion del color default
			//$('.conv_element#'+chat.current_conversation).css("color","green");
			$('.conv_element#'+conversation._id).css("color","#505050");


			//Reinicio el last_sender
			chat.last_sender = '';

			var log = $('.log');
			log.empty();
			log.attr({ id: conversation._id});
			//Actualizo la conversacion actual
			chat.current_conversation = conversation._id;
			chat.participants = conversation.participants;
			//Quito el id del usuario logueado de la conversacion
			var idx = conversation.participants.indexOf(user.id); // Find the index
			if(idx!=-1) conversation.participants.splice(idx, 1); // Remove it if really found!
			//Armo una lista con los nombres de los participantes y se la asigno como nombre a la conversacion
			var name_conversation = '';
			conversation.participants.forEach(function(participant_id){
				//busco los nombres de los participantes
				user.contacts.forEach(function(contact){
					if(contact.id == participant_id){
						name_conversation = name_conversation + contact.username + "  ";
					}
				});
			});

			$('.current_conversation').text(name_conversation);
			conversation.messages.forEach(function(msg){
				var message = $('<div class="message_line"></div>'),
				message_nickname = $('<div class="message_nickname"></div>'),
				row = $('<div class="row"></div>'),
				nickname = '';
				//Busco el nombre del contacto
				if(user.id == msg.sender){
					nickname = user.username;
				}else{
					user.contacts.forEach(function(contact){
						if(contact.id == msg.sender){
							nickname = contact.username;
						}
					});
				}

				//evito repetir el nickname si envia varios mensajes seguidos

				if(chat.last_sender == msg.sender){
					
				}else{
					message_nickname.text(nickname);
					row.append(message_nickname);
					chat.last_sender = msg.sender;
				}

				message.css('margin-top', '0px');
				message.text(msg.message);
				row.append(message);

				log.append(row);
				
			});

			//alert('largo '+$(".log").prop("scrollHeight"));
			log.scrollTop(log.prop("scrollHeight"));
			//log.scrollTop = log.scrollHeight;



		},

		//Clickea un usuario para comenzar una nueva conversacion
		new_conversation: function(event){
			//Datos del usuario con el que quiero iniciar una nueva conversacion
			//var target_user = $(event.target).text();
			var target_user_id = event.target.id;
			//alert('new_conversation - '+ target_user_id);

			socket.emit('new_conversation', {
				target_user_id	: target_user_id,
				username		: user.username,
				user_id			: user.id
			});


			
		},

		//Agrega la nueva conversacion que llega desde el server
		add_conversation: function(data){
			//Ver como hacer para agregar la nueva conversacion, pero solo una vez, en vez de recargar
			//alert('add_conversation');
			chat.req_conversations();
			//chat.load_conversation(data);
		},

		//Solicito las conversaciones en las que el contacto participa
		req_conversations: function(event){
			socket.emit('req_conversations', {
				user_id		: user.id
			});
		},

		//Arma la lista de las conversaciones activas
		list_conversations: function(data){
			//alert('Llegan las conversaciones del usuario');
			$('#conversations').empty();
			//Guardo las conversaciones en backbone
			chat.conversation_list = data.conversations;
			
			data.conversations.forEach(function(con){
				//Quito el id del usuario logueado de la conversacion
				var idx = con.participants.indexOf(user.id); // Find the index
				if(idx!=-1) con.participants.splice(idx, 1); // Remove it if really found!
				//Armo una lista con los nombres de los participantes y se la asigno como nombre a la conversacion
				var name_conversation = '';
				con.participants.forEach(function(participant_id){
					//busco los nombres de los participantes
					user.contacts.forEach(function(contact){
						if(contact.id == participant_id){
							name_conversation = name_conversation + contact.username + "  ";
						}
					});
				});

				var conversation_element = $("<div class='conv_element' id="+con._id+"></div>");
				// conversation_element.append($("<img src='images/erase.gif' width='10' height='10'>"));
				conversation_element.append($("<img src='images/erase.gif' id="+con._id+" class='remove' alt='remove conversation' width='10' height='10'>"));
				conversation_element.append($("<div class='conversation' id="+con._id+" >"+name_conversation+" </div>"));
				
				//Si el user no leyo los ultimos mensajes de la conversacion
				if( con.unread.indexOf(user.id) != -1 ){
					conversation_element.css('color', 'orange');
				}
				$('#conversations').append(conversation_element);
			});
		},

		//Desde el server le notifican que debe actualizar su lista de conversaciones
		check_conversations: function(data){
			//alert('check_conversations - ' + data.target_user_id);
			if(user.id == data.target_user_id){
				
				chat.req_conversations();
			}
		},

		//Agrega un contacto a la actual conversacion

		add_contact_to_conversation: function(event){
			if(chat.current_conversation != 0 ){
				var target_user_id = event.target.id;
				//alert('add_contact_to_conversation - '+ target_user_id);
				socket.emit('add_contact_to_conversation', {
					target_user_id : target_user_id,
					current_conversation : chat.current_conversation,
					user_id : user.id,
					participants : chat.participants
				});

				chat.req_conversations();
			}
			
		},

		remove_conversation: function(event){
			
			var id = event.target.id;
			if( chat.current_conversation == id){
				socket.emit('change_conversation', {
					conversation_id	: 0,
					user_id			: user.id
				});
			}
			socket.emit('quit_from_conversation', {
				user_id 			: user.id,
				conversation_id		: id
			});

		}


	});

	//USER VIEW --------------------------------
	var UserView = Backbone.View.extend({
		el: '#user',

		scroll: 0,

		events: {
			'keyup .userLogIn': 'logIn'
		},

		initialize: function() {
			_.bindAll(this);
			socket.on('logInOk', this.logInOk);
			socket.on('req_logued_users', this.req_logued_users);
			socket.on('list_logued_users', this.list_logued_users);
			//Id del usuario logueado
			this.id = 0;
			this.username = '';
			this.contacts;
		},

		logIn: function(event){
			if (event.keyCode === 13) {
				var username = $(event.target).val();
				socket.emit('logIn', {
					username: username
				});
				//$('.message').val('');
			}
		},

		logInOk: function(data){
			//Luego de que el usuario se loguee
			var contacts_div = $('#contacts');

			//Seteo el username y el id de usuario a UserView
			this.username = data.user.username;
			this.id = data.user._id;

			$('.logued_user').text('Usuario Logueado: ' + data.user.username);
			$('.userLogIn').val('');
			$('.userLogIn').hide();
			contacts_div.empty();

			this.contacts = data.contacts;


			//CARGO LA LISTA DE CONTACTOS

			data.contacts.forEach(function(contact){
				var contact_button = $('<div class="contact_element" id='+contact._id+'></div>');
				
				
				if(contact.facebook_id != 0){
						var contact_image_html = '<img id='+contact._id+'  src="https://c324764.ssl.cf1.rackcdn.com/'+contact.image+'" width="30" height="30"/>';
						//var contact_image_html =  '<img src="https://graph.facebook.com/'+contact.facebook_id+'/picture?type=normal" width="30" height="30" />'
				}else{
						var contact_image_html = '<img id='+contact._id+'  src="https://c324764.ssl.cf1.rackcdn.com/'+contact.image+'" width="30" height="30"/>';
				}
				var contact_button_html = $("<div class='contact_button_html contact' id="+contact._id+" ></div>");	
				contact_button_html.append($("<div class='contact_image' id="+contact._id+">"+contact_image_html+"</div>"));
				contact_button_html.append($("<div class='contact_username' id="+contact._id+">"+contact.username+"</div>"));					
				contact_button.append(contact_button_html);
				contact_button.append($("<div id="+contact._id+" class='add_contact_to_conversation'><img id="+contact._id+" src='images/add.png' alt='add contact to conversation' width='15' height='15'></div>"));
				contacts_div.append(contact_button);
			});

			//Verifico si trae el parent y si lo trae lo sumo a la lista de contactos
			if(data.parent){
				var contact_button = $('<div class="contact_element" id='+data.parent.user_id+'></div>');
				var contact_image_html = '';
				
				if(data.parent.facebook_id != 0){
					contact_image_html = '<img id='+data.parent.user_id+'  src="https://c324764.ssl.cf1.rackcdn.com/'+data.parent.image+'" width="30" height="30"/>';		
				}else{
					contact_image_html = '<img id='+data.parent.user_id+'  src="https://c324764.ssl.cf1.rackcdn.com/'+data.parent.image+'" width="30" height="30"/>';
				}
				
				var contact_button_html = $("<div class='contact_button_html contact' id="+data.parent.user_id+" ></div>");
				contact_button_html.append($("<div class='contact_image' id="+data.parent.user_id+">"+contact_image_html+"</div>"));
				contact_button_html.append($("<div class='contact_username' id="+data.parent.user_id+">"+data.parent.username+"</div>"));					
				contact_button.append(contact_button_html);
				contact_button.append($("<div id="+data.parent.user_id+" class='add_contact_to_conversation'><img id="+data.parent.user_id+" src='images/add.png' width='15' height='15'></div>"));
				contacts_div.append(contact_button);
						
			}

			//solicita las conversaciones del usuario
			chat.req_conversations();

		},

		//Solicita la lista de usuarios
		req_logued_users: function(){
			socket.emit('req_logued_users', {});
		},

		//Lista los usuarios conectados
		list_logued_users: function(data){
			var contacts_div = $('#contacts');
			var logued_user_id = $('.contenedor').attr('id');
			contacts_div.empty();
			this.contacts = data.contacts;
			if(this.id != 0 ){
				data.contacts.forEach(function(contact){
					var contact_button = $('<button class="contact" id='+contact.id+'></button>');
					contact_button.text(contact.username);
					contacts_div.append(contact_button);
				});
			}
		}

	});
	var chat = new ChatView();
	var user = new UserView();


});

