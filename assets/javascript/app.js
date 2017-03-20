$(document).ready(function(){
// variables
var animalArray= ["cat", "dog", "parrot", "panda", "rabbit", "eagle", "lion", "tiger", "hedgehog", "badger", "bear", "snake"];

// Ajax call
function displayGif(){
	var animal = $(this).attr("data-name")
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $("#display-gif").empty();
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class='animalGif'>");
        var rating = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url)
        animalDiv.append(rating);
        
        animalDiv.append(animalImage);
       $("#display-gif").prepend(animalDiv);
      }
     
    });
 };
// Render Buttons
function renderButtons() {

    $("#gif-buttons").empty();
   
  	for (var i = 0; i < animalArray.length; i++) {
  		var $button = $("<button>");
     	$button.addClass("animal btn btn-info");
        $button.attr("data-name", animalArray[i]);
        $button.text(animalArray[i]);
        $("#gif-buttons").append($button);
        }
}
$("#add-category").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var newAnimal = $("#category-input").val().trim();

        // The movie from the textbox is then added to our array
        animalArray.push(newAnimal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
$(document).on("click", ".animal", displayGif);
renderButtons();
})