$(document).ready(function(){
// variables
var animalArray= ["cat", "dog", "parrot", "panda", "rabbit", "eagle", "lion", "tiger", "hedgehog", "badger", "bear", "snake"];

// Render Buttons
function renderButtons() {
	// empty div so buttons don't repeat
    $("#gif-buttons").empty();
   // for loop to create buttons for animals in the animalArray
  	for (var i = 0; i < animalArray.length; i++) {
  		var $button = $("<button>");
     	$button.addClass("animal btn btn-info");
        $button.attr("data-name", animalArray[i]);
        $button.text(animalArray[i]);
        $("#gif-buttons").append($button);
        }
};

$("#add-category").on("click", function(event) {
        event.preventDefault();
        // Grab the user's input
        var newAnimal = $("#category-input").val().trim();

        // Adds to animalArray
        animalArray.push(newAnimal);

        // Create the button
        renderButtons();
});

// Ajax call
function displayGif(){
	var animal = $(this).attr("data-name")
	// queryURL including the public API key
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // empty div so no more than 10 total gifs display at once
    $("#display-gif").empty();
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;

      // for loop to create the ratings and images for the gifs returned
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class= 'animalDiv'>");

        // display the ratings for each gif
        var rating = $("<p>").text("Rating: " + results[i].rating);
        animalDiv.append(rating);

        // display the actual gif, starting with the still version, and store other sources
        var animalImage = $("<img class='animalGif'>");
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);
        animalImage.attr("data-state", "still");
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalDiv.append(animalImage);

        // add the div to the html
       $("#display-gif").prepend(animalDiv);
      }
     
    });
 };

// function to pause gifs
$(document.body).on("click", ".animalGif",function() {
	var state = $(this).attr("data-state");
	// change source to opposite state attribute and change state to match
	if (state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else{
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
});

// Event listener for clicking on a button
$(document).on("click", ".animal", displayGif);
	
//create buttons in original array 
renderButtons();
})