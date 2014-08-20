var http = require('http');
var MD5 = require('MD5');

httpServer = http.createServer(function(req, res){
	console.log('un utilisateur a affiche la page');
});


httpServer.listen(1337);



var io = require('socket.io').listen(httpServer);
var users = {};
var messages = [];
var history = 2;

io.sockets.on('connection',function(socket){

	var me = false;
	console.log('nouvel utilisateur');

	for(var k in users){
		socket.emit('newusr', users[k]);
	};

	for(var k in messages){
		socket.emit('newmsg', messages[k]);
	};

	/* ON A RECU UN MSG */
	socket.on('newmsg', function(message){
		console.log(message);
		message.user = me;
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		messages.push(message);
		if(messages.length > history)
		{
			messages.shift();
		}
		io.sockets.emit('newmsg', message);

	});




	socket.on('login', function(user){
		 me = user;
		 me.id = user.mail.replace('@','-').replace('.','-');
		 me.avatar = 'https://gravatar.com/avatar/' + MD5(user.mail) + '?s=50';
		 socket.emit('logged');
		 users[me.id] = me;
		 io.sockets.emit('newusr', me);

	});


	socket.on('disconnect',function(){

		if(!me)
		{
			return false;
		};
		delete users[me.id];
		io.sockets.emit('disusr', me);

		console.log('déconnexion');

	});

	

});
