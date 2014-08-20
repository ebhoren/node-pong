(function($){

	var socket = io.connect('http://192.168.0.187:1337'),
		game 	= $('#game');


	/*
	$('#loginform').submit(function(event){
		event.preventDefault();
		socket.emit('login', {
			username : $('#username').val(),
			mail : $('#mail').val()

		})

	});
	*/



	function createTank(){ return $('<div class="tank"></div>'); };



	var myTank;


	socket.on('new enemy',function($tank){

		var tank = createTank();
			tank.attr('id', 'tank-'+$tank.id);
			tank.css({top: $tank.x, left: $tank.y});

		game.append( tank );
	});
	socket.on('doum', function($game){

		console.log( $game );

		var $enemies 	= $game.enemies,
			$tank 		= $game.you;

		var i = 0, n = $enemies.length, obj, enemy;
		for(; i<n++; i++)
		{	
			obj 	= $enemies[i];
			if( !obj ) continue;

			enemy = createTank();
			enemy.attr('id', 'tank-'+obj.id);
			enemy.css({top: obj.x, left: obj.y});

			game.append( enemy );
		};

		myTank = createTank();

		myTank.addClass('me')
		myTank.attr('id', 'tank-'+$tank.id);
		myTank.css({top: $tank.x, left: $tank.y});

		game.append( myTank );
	});
	socket.on('move', function($tank){

		$('#tank-'+$tank.id).css({top: $tank.x, left: $tank.y});
	});
	//socket.on('disconnect', function($id){ $('#tank-'+$id).removeChild(); });



})(jQuery);