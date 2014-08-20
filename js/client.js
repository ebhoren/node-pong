(function($){

	var socket = io.connect('http://habs.local:1337');
	var msgtpl = $('#msgtpl').html();
	$('#msgtpl').remove();


	$('#loginform').submit(function(event){
		event.preventDefault();
		socket.emit('login', {
			username : $('#username').val(),
			mail : $('#mail').val()

		})

	});

	socket.on('logged', function(){

		$("#login").fadeOut();

	});

/*----------- ENVOIE DES MESSAGES -------------*/

$('#form').submit(function(event){
	event.preventDefault();
	socket.emit('newmsg', {message : $('#message').val()});

	$('#message').val('');
	$('#message').focus();
});

socket.on('newmsg',function(message){
	$('#messages').append("<div class='message'>" + Mustache.render(msgtpl,message) + "</div>");
	$('#messages').animate({scrollTop : $('#messages').prop('scrollHeight')}, 50);
});


/*----------- GESION DES USERS CONNECTÉS -------------*/

	socket.on("newusr", function(user){
		$('#users').append('<img src="' + user.avatar + '" id="' + user.id + '">');
	});

	socket.on('disusr',function(user){
		$('#' + user.id).remove();
	});

})(jQuery);