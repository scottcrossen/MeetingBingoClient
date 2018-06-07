// Initialize array to track which buttons are pressed.
var pushed_array=Array(25).fill(false);
pushed_array[12]=true;

// Randomize board.
var words = wordsJson.words;
words.sort(function(a, b){return 0.5 - Math.random()});

// Define function to be called when an array button is pushed.
function toggle_push(index){
    pushed_array[index]=!pushed_array[index];
}

// Define function to be called when bingo-button is pressed.
function test_bingo(){
    var found_bingo=false;
    function win(){
	console.log("\tBingo correct.");
	$("#board").hide();
	$("#win").show();
    }
    function lose(){
	console.log("\tBingo incorrect.");
	$("#board").hide();
	$("#lose").show();
    }
    // Test horizontal
    for(var i=0; i<=4; i++){
	for (var j=0; j<=4; j++){
	    if (!pushed_array[j+i*5]) break;
	    else if (j==4) found_bingo=true;
	}
    }
    // Test vertical
    for(var i=0; i<=4; i++){
	for (var j=0; j<=4; j++){
	    if (!pushed_array[j*5+i]) break;
	    else if (j==4) found_bingo=true;
	}
    }
    // Test diagonals
    for(var i=0; i<=4; i++){
	if(!pushed_array[i*6]) break;
	else if (i==4) found_bingo=true;
    }
    for(var i=0; i<=4; i++){
	if(!pushed_array[4+i*4]) break;
	else if (i==4) found_bingo=true;
    }
    found_bingo? win() : lose();
}

// Define function to create a button and place it on the board.
function create_button(i){
    var button_element="<div class=\"col-xs-2 ";
    if((i >= 13? i+1 : i)%5==0) button_element+="col-xs-offset-1";
    button_element+="\"><button type=\"button\" class=\"btn btn-default\" data-id=\""+String(i >= 12? i+1 : i)+"\">"+String(i+1)+"<p>"+words[i]+"</p></button></div>";
    if(i==12) button_element="<div class=\"col-xs-2\"><div style=\"position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);\">Free!</div></div>\n"+button_element;
    $(button_element).appendTo("#word-button-"+String(Math.floor((i >= 13? i+1 : i)/5)));
}

// Define function to create a list item for smaller screens.
function create_list_item(i){
    var list_element="<li>"+words[i]+"</li>";
    if(i==12) list_element="<li value=\"13\">"+words[i]+"</li>";
    $(list_element).appendTo("#word-list-"+String(Math.floor(i/12)));
}

// Define the "main" function.
$(document).ready(function() {
    
    // The first few lines do the initialization whenever a fresh-load happens.
    console.log("JQuery Initialized");
    
    // Load Words into both possible places.
    console.log("Loading words:");
    for(var i = 0; i < 24; i++) {
	console.log("\t"+words[i]);
	create_button(i);
	create_list_item(i);
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
    
    // Add button-click listener for bingo board.
    $(".col-xs-2 button").click(function(){
	$(this).toggleClass("pushed");
	console.log("Button pressed with content: ");
	console.log("\ttext: "+$(this).text());
	console.log("\tindex: "+$(this).data("id"));
	toggle_push($(this).data("id"));
    });
    
    // Add button-click listener for bingo button.
    $(".col-xs-10 button:not(#back-to-game)").click(function(){
	console.log("Bingo button pressed");
	test_bingo();
    });
    
    // Add button-click listener for back-to-game button.
    $("#back-to-game").click(function(){
	console.log("Back-to-game button pressed");
	$("#lose").hide();
	$("#board").show();
    });
    
    // Remove bootstrap focus.
    $(".btn").mouseup(function(){
	$(this).blur();
    })
});
