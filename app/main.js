define(

['require', 'jquery',
'helpers'
],

function(require, $, helpers) {

	// var $ = require('jquery');
	// require('bootstrap')

	// var $ = jQuery;
    // Load any app-specific modules
    // with a relative require call,
    // like:
    // var messages = require('./messages');

    // Load library/vendor modules using
    // full IDs, like:
    // var print = require('print');

    // DOM ready
    $(function() {
    	var SPEED = 2;

    	// useful variables
		var window_h = $(window).height();
		var racket1 = $('#racket1');
		var racket2 = $('#racket2');
		var racket_h = racket1.height();
		var racket_w = racket1.width();
		var playing_field = $( "#playing_field" );
		playing_field.height(window_h * 0.8 );
		var playing_field_h = playing_field.height();
		var ball = $('#ball');
		var ball_w = ball.width();
		var ball_h = ball_w;
		// caps	
		// top/bottom are for rackets
		var cap_top = 0.05 * playing_field_h + playing_field.position().top;
		var cap_bottom = 0.95 * playing_field_h - racket_h + playing_field.position().top;	
		// these are for the ball
		var cap_left = racket1.position().left + racket_w;
		var cap_right = racket2.position().left - ball_w;
		var cap_ball_top = playing_field.position().top;
		var cap_ball_bottom = playing_field_h - ball_w + playing_field.position().top;
		
		// console.log(playing_field_h)



		// center the rackets initially
		$('.racket').center();
		ball.fully_center();





		// racket keyboard control
		var tickRate = 30,
	    	keyArrowUp    = false,
	    	keyArrowDown  = false;
		$('body').keydown(function(e){
		  switch (e.which) {
		    case 38:
		      keyArrowUp = true;
		      break;
		    case 40:
		      keyArrowDown = true;
		      break;
		  }
		});
		$('body').keyup(function(e){
		  switch (e.which) {
		    case 38:
		      keyArrowUp = false;
		      break;
		    case 40:
		      keyArrowDown = false;
		      break;
		  }
		});
		var tick = function() {
			var top = racket1.position().top;
			if (keyArrowUp && top > cap_top) {
				// up code
				racket1.css("top", top - 8);
			} else if (keyArrowDown && top < cap_bottom) {
				// down code
				racket1.css("top", top + 8);
			}
			
			setTimeout(tick, tickRate);
		};
		tick();


		// racket mouse control
		var mousey = -1;
		playing_field.mousemove(function( event ) {
			mousey = event.pageY;
			racket1.css("top", Math.min(cap_bottom , Math.max(cap_top, mousey)) );
		});
		


		var dx = SPEED;
		var dy = SPEED;
		var curr_left;
		var curr_top;
		tickBall(ball_h, dx, dy, curr_left, curr_top, ball, cap_left, cap_right, cap_ball_top, cap_ball_bottom);





    });


	function handleOut() {
		console.log('out');
	};

	function tickBall(ball_h, dx, dy, curr_left, curr_top, ball, cap_left, cap_right, cap_ball_top, cap_ball_bottom) {
		setInterval(function() {
			curr_left = ball.position().left;
			curr_top = ball.position().top;

			// if (curr_left < cap_left && mousedy != 0) {
			// 	console.log(mousedy);
			// 	dy *= Math.sign(mousedy);
			// }

			// report violation i.e. check if racket there
			if (curr_left < cap_left) {

				var racket_top = $('#racket1').position().top;
				var racket_bottom = racket_top + $('#racket1').height();

				if (curr_top < racket_top || curr_top + ball_h > racket_bottom) {
					handleOut();
				}
			}

			if (curr_left < cap_left || curr_left > cap_right) { 
				dx *= -1;
			}
			if (curr_top < cap_ball_top || curr_top > cap_ball_bottom) { 
				dy *= -1; 
			}

			ball.css("left", curr_left + dx);
			ball.css("top", curr_top + dy);
		}, 10);
	}


	


	/*
		Websockets
	*/

	// thanks to 
	// http://www.ahoj.io/nodejs-and-websocket-simple-chat-tutorial
	/*
	function socketStuff() {
	    // if user is running mozilla then use it's built-in WebSocket
	    window.WebSocket = window.WebSocket || window.MozWebSocket;

	    if (!window.WebSocket) {
	        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
	                                    + 'support WebSockets.'} ));
	        input.hide();
	        $('span').hide();
	        return;
	    }

	    var connection = new WebSocket('ws://127.0.0.1:1337');

	    connection.onopen = function () {
	        // connection is opened and ready to use

		    connection.send("hello");
	    };

	    connection.onerror = function (error) {
	        // an error occurred when sending/receiving data
	    };

	    connection.onmessage = function (message) {
	        // try to decode json (I assume that each message from server is json)
	        try {
	            var json = JSON.parse(message.data);
	        } catch (e) {
	            console.log('This doesn\'t look like a valid JSON: ', message.data);
	            return;
	        }
	        // handle incoming message
	    };
	}
*/
	/*
		DOM ready
	*/

/*
	$(function() {
		socketStuff();




		var window_h = $(window).height();
		var racket1 = $('#racket1');
		var racket2 = $('#racket2');
		var racket_h = racket1.height();
		var racket_w = racket1.width();
		var playing_field = $( "#playing_field" );
		var playing_field_h = playing_field.height();
		var ball = $('#ball');
		var ball_w = ball.width();


		// center the rackets initially
		$('.racket').center();
		ball.fully_center();


		// caps
		
		// top/bottom are for rackets
		var cap_top = 0.05 * playing_field_h + playing_field.position().top;
		var cap_bottom = 0.95 * playing_field_h - racket_h + playing_field.position().top;
		
		// these are for the ball
		var cap_left = racket1.position().left + racket_w;
		var cap_right = racket2.position().left - ball_w;

		var cap_ball_top = playing_field.position().top;
		var cap_ball_bottom = playing_field_h - ball_w + playing_field.position().top;
		
		// console.log(cap_left + ", " + cap_right);
		// ball.css("left", cap_right);

		// var lastmousey = -1;
		var mousey = -1;
		// var mousedy = 0;
		playing_field.mousemove(function( event ) {
			mousey = event.pageY;
		// 	if (lastmousey > -1) {
		// 		mousedy = mousey - lastmousey;
		// 	}
		// 	lastmousey = mousey;

			racket1.css("top", Math.min(cap_bottom , Math.max(cap_top, mousey)) );
			// console.log(event.pageY);
		});


		// $("body").on("keydown", function(e){
		// 	var thisIndex = $(".selected").index();
		// 	var newIndex = null;


		// 	// up
		// 	if(e.keyCode === 38) {
		// 		racket1.animate({top: "-=10"}, 0);
		// 	}
		// 	// down
		// 	else if(e.keyCode === 40) {
		// 		racket1.animate({top: "+=10"}, 0);
		// 	}
		// });

	var tickRate = 30,
	    keyArrowUp    = false,
	    keyArrowDown  = false;

	$('body').keydown(function(e){
	  switch (e.which) {
	    case 38:
	      keyArrowUp = true;
	      break;
	    case 40:
	      keyArrowDown = true;
	      break;
	  }
	});
	$('body').keyup(function(e){
	  switch (e.which) {
	    case 38:
	      keyArrowUp = false;
	      break;
	    case 40:
	      keyArrowDown = false;
	      break;
	  }
	});

	var tick = function() {
		var top = racket1.position().top;


	  if (keyArrowUp && top > cap_top) {
	    // up code
	    racket1.css("top", top - 8);
	  } else if (keyArrowDown && top < cap_bottom) {
	    // down code
	    racket1.css("top", top + 8);
	  }
	  setTimeout(tick, tickRate);
	};
	tick();



		var dx = 1;
		var dy = 1;
		var curr_left;
		var curr_top;
		setInterval(function() {
			curr_left = ball.position().left;
			curr_top = ball.position().top;

			// if (curr_left < cap_left && mousedy != 0) {
			// 	console.log(mousedy);
			// 	dy *= Math.sign(mousedy);
			// }
			if (curr_left < cap_left || curr_left > cap_right) { 
				dx *= -1;
			}
			if (curr_top < cap_ball_top || curr_top > cap_ball_bottom) { 
				dy *= -1; 
			}

			ball.css("left", curr_left + dx);
			ball.css("top", curr_top + dy);
		}, 10);

	});
*/
});