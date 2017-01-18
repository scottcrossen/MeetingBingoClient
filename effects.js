$(document).ready(function() {
    
    console.log("JQuery Initialized");
    $(window).resize(function(){
	console.log("Resizing Screen");
	$('.row .col-xs-2').each(function() {
	    console.log("Resizing Object with width",$(this).width());
            $(this).height($(this).width());
	});
    }).resize();
});
