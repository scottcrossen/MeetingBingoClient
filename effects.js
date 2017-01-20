$(document).ready(function() {
    console.log("JQuery Initialized");



    var words = wordsJson.words;
    words.sort(function(a, b){return 0.5 - Math.random()});
    
    console.log("Loading words:");
    for(var i = 0; i < words.length; i++) {
	console.log(words[i]);
	var list_element="<li>"+words[i]+"</li>";
	if(i==12) list_element="<li value=\"14\">"+words[i]+"</li>";
	var button_element="<div class=\"col-xs-2 ";
	if((i >= 13? i+1 : i)%5==0) button_element+="col-xs-offset-1";
	button_element+="\"><button type=\"button\" class=\"btn btn-default\">"+String(i+1)+"<p>"+words[i]+"</p></button></div>";
	$(list_element).appendTo("#word-list-"+String(Math.floor(i/8)));
	if(i==12) button_element="<div class=\"col-xs-2\"><div style=\"position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);\">Free!</div></div>\n"+button_element;
	$(button_element).appendTo("#word-button-"+String(Math.floor((i >= 13? i+1 : i)/5)));
    }

    $(window).resize(function(){
	//console.log("Resizing Screen");
	$('.row .col-xs-2').each(function() {
	    //console.log("Resizing Object with width",$(this).width());
            $(this).height($(this).width());
	});
	if($('.row .col-xs-2').width() <= 95) $('.row .col-xs-2 button p').hide();
	if($('.row .col-xs-2').width() > 95) $('.row .col-xs-2 button p').show();
    }).resize();
    
});
