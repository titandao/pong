$.fn.center = function () {
   // this.css("position","absolute");
   this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   // this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   return this;
}


$(function() {
	var w_h = $(window).height();
	var racket1 = $('#racket1');
	$('.racket').center();


	$( "#playing_field" ).mousemove(function( event ) {
		racket1.css("top", Math.min(w_h * 0.5 , Math.max(w_h * 0.1, event.pageY)) );
		// console.log(event.pageY);
	});

});