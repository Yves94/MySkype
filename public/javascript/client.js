var progress;

$(function() {

    $('#menu .tabs li').click(function() {
        location.href = $(this).data('url');
    });

    $('.message a').click(function() {
        $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
    });

    $('.card').click(function() {
    	console.log('Mine - Click at ' + $('.time').html());
    	progress = setInterval('updateCard()', 3000);
    });

    var time = setInterval('updateClock(false)', 1000);  

});

function updateClock(format) {

 	var currentTime = new Date ();
  	var currentHours = currentTime.getHours ();
  	var currentMinutes = currentTime.getMinutes ();
  	var currentSeconds = currentTime.getSeconds ();

  	// Pad the minutes and seconds with leading zeros, if required
  	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  	currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  	var timeOfDay = '';

  	if (format) {
	  	// Choose either "AM" or "PM" as appropriate
	  	var timeOfDay = ( currentHours < 12 ) ? " AM" : " PM";

	  	// Convert the hours component to 12-hour format if needed
	  	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

	  	// Convert an hours component of "0" to "12"
	  	currentHours = ( currentHours == 0 ) ? 12 : currentHours;
  	}

  	// Compose the string for display
  	var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + timeOfDay;
  	
   	$('.time').html(currentTimeString);
   	  	
}

function updateCard() {
	clearInterval(progress);
	console.log('Mine - Finish at ' + $('.time').html());
}