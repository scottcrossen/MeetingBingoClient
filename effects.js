$(document).ready(function() {

    // The first few lines do the initialization whenever a fresh-load happens.
    console.log("JQuery Initialized");
    // Randomize Board.
    var words = wordsJson.words;
    words.sort(function(a, b){return 0.5 - Math.random()});
    // Load Words into both possible places.
    console.log("Loading words:");
    for(var i = 0; i < words.length; i++) {
	console.log("\t"+words[i]);
	var list_element="<li>"+words[i]+"</li>";
	if(i==12) list_element="<li value=\"13\">"+words[i]+"</li>";
	var button_element="<div class=\"col-xs-2 ";
	if((i >= 13? i+1 : i)%5==0) button_element+="col-xs-offset-1";
	button_element+="\"><button type=\"button\" class=\"btn btn-default\">"+String(i+1)+"<p>"+words[i]+"</p></button></div>";
	if(i==12) button_element="<div class=\"col-xs-2\"><div style=\"position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);\">Free!</div></div>\n"+button_element;
	$(list_element).appendTo("#word-list-"+String(Math.floor(i/12)));
	$(button_element).appendTo("#word-button-"+String(Math.floor((i >= 13? i+1 : i)/5)));
    }

    // The next few lines set listeners to various tasks.
    // Set a window-resize listener.
    $(window).resize(function(){
	// Set board length to board width.
	$('.row .col-xs-2').each(function() {
            $(this).height($(this).width());
	});
	// If screen is small then display words below.
	if($('.row .col-xs-2').width() <= 95){
	    $('.row .col-xs-2 button p').hide();
	    $('#word-list').show();
	}
	// If screen is big then display words on button.
	else{
	    $('.row .col-xs-2 button p').show();
	    $('#word-list').hide();
	}
    }).resize(); // Perform resize.
    // Add button-click listener.
    $("button").click(function(){
	$(this).addClass("pushed");
	console.log("Button pressed");
    });
    // Remove bootstrap focus.
    $(".btn").mouseup(function(){
	$(this).blur();
    })
});
