var rickAndmorty = ["Rick and Morty", "Morty", "Jerry Smith", "Beth Smith", "Meeseeks", "Rickall", "Summer Smith"];
var state;

	function displayRickandMortyinfo(){
		$('#Rickzone').empty();

		var rickAndmorty = $(this).attr('data-name');
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + rickAndmorty + "&api_key=2e373f99308b47f287cfd9016b15dcbf";
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);

			var results = response.data;
			for(var i=0; i<10; i++){
			var RickandMortyDiv = $('<div class="Rick and Morty gif RickandMortyDiv">');

			// Retrieves the Rating Data
			var rating = results[i].rating;
			console.log("Rating : "+ rating);

		// ratings
			var pOne = $('<p class= "rating">').text( "Rating: " + rating);
			RickandMortyDiv.append(pOne);
			
			// Holds img
			var img = $('<img id="giffed">');

 			img.attr({'src': results[i].images.fixed_height_still.url,
                	'data-still' : results[i].images.fixed_height_still.url,
                	'data-animate' : results[i].images.fixed_height.url,
                	'data-state' : 'still'
                });

			RickandMortyDiv.append(img);

			$('#Rickzone').prepend(RickandMortyDiv);
		}
		});

	}

function pauseGif(){
	console.log("inside on click ")
	state = $(this).attr('data-state');
	console.log("state"+state)
	 if ( state == 'still'){
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
    else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }


};

	function renderButtons(){ 

		for (var i = 0; i < rickAndmorty.length; i++){

		    var a = $('<button>') 
		    a.addClass('rickAndmortyBtn'); 
		    a.attr('data-name', rickAndmorty[i]); 
		    a.text(rickAndmorty[i]); 
		    $('#buttonsView').append(a); 
		}
	}


	$('#addGif').on('click', function(){
		var rickInput = $('#gif-input').val().trim();
		if(rickInput!=""){
		rickAndmorty.push(rickInput);
		renderButtons();
		}
		return false;
	})


	$(document).on('click', '.rickAndmortyBtn', displayRickandMortyinfo);
	renderButtons();
	$(document).on("click", '#giffed', pauseGif);