// Requires
var express = require('express');
var socketio = require('socket.io');

// Configuration
var appConfig = {
    staticPath: __dirname + '/public'
};

// Application
var app = express();
var server = require('http').createServer(app);
var io = socketio.listen(server);

// Middlewares
app.use(express.static(appConfig.staticPath));
app.use(function(req,res,next){
    res.send(404, '404 Not Found. Sorry.\n');
});






// Game logics
var tanks = [];


// Socket
io.sockets.on('connection', function(socket){

	var tank = {id: socket.id, x: Math.random() * 500 >> 0, y: Math.random() * 500 >> 0};
	

    socket.on('disconnect', function(){

    	if( !tank ) return;

    	tanks.splice( tanks.indexOf( tank ), 1 );
    	io.sockets.emit('leaved', {id: tank.id});
    	tank = null;
    });

    socket.on('moved', function( $data ){

    	if( !tank ) return;

    	tank.x = $data.x;
    	tank.y = $data.y;

    	io.sockets.emit('moved', tank);
    });




	// initialize new player into game
	socket.emit('init', {'enemies': tanks, 'tank': tank});

	// add tank to game and broadcast to all players
	tanks.push( tank );
	socket.broadcast.emit('joined', tank);
});

// Listen
server.listen(8000);