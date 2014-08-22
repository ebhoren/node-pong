'use strict';




var BattleCity = function( $el ){


	var me 				= this,
		el 				= $el;


	// public API
	this.start = function(){

	};

};




$(function(){

	var game = new BattleCity( window.document.getElementById('app') );
		game.start();

});