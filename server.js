var http 		= require('http'),
	socketIO 	= require('socket.io');



// servers
var httpServer = http.createServer(function(req, res){}).listen(1337, '192.168.0.187'),
	io = require('socket.io').listen( httpServer );




// game API
var Tank 		= require('./js/tank.js');


var tanks = [],
	numTanks = 0;





function getTankByID( $id ){

	for(var i = 0, tank; i<numTanks; i++)
	{
		tank = tanks[i];
		if( tank.id === $id ) return tank;
	};

	return false;
};





io.sockets.on('connection', function(socket){


	var tank = new Tank( socket.id );
		tank.x = Math.random() * 375 >> 0;
		tank.y = Math.random() * 350 >> 0;


	socket.emit('doum', {enemies: tanks, you: tank});
	socket.broadcast.emit('new enemy', tank);

	numTanks = tanks.push( tank );


	/*
	socket.on('move', function($x, $y){

		tank.x = $x;
		tank.y = $y;

		socket.broadcast.emit('move', tank);
	});

	socket.on('disconnect',function(){

		tanks.splice( tanks.indexOf( tank ), 1 );
		numTanks--;

		socket.broadcast.emit('disconnect', tank);
	});
*/

});
