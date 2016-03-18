$.fn.center = function () {
   // this.css("position","absolute");
   this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   // this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   return this;
}


$.fn.fully_center = function() {
   // this.css("position","absolute");
   this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   return this;
}


$(function() {
	var window_h = $(window).height();
	var racket1 = $('#racket1');
	var racket_h = racket1.height();
	var playing_field = $( "#playing_field" );
	var playing_field_h = playing_field.height();
	var ball = $('#ball');

	// center the rackets initially
	$('.racket').center();
	ball.fully_center();


	// caps
	var cap_top = 0.1 * playing_field_h + playing_field.position().top;
	var cap_bottom = 0.9 * playing_field_h - racket_h + playing_field.position().top;


	playing_field.mousemove(function( event ) {
		racket1.css("top", Math.min(cap_bottom , Math.max(cap_top, event.pageY)) );
		// console.log(event.pageY);
	});

});