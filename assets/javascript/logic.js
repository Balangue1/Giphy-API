// Define variables

var topics = ["Cats", "Dogs", "Birds", "Chinchilla", "Dragons",
"Lions", "Tigers", "Bears", "Panther", "Sharks",
"Dolphins", "Deer", "Cheetah", "Alligator", "Hamster",
"Rabbit", "Elephant", "Koala", "Kangaroo", "Pigs"];
var numberOfGIFs = 10;
var cutOffRating = "PG";

// Function for displaying animal data
function renderButtons(){

// Looping through the array of topics
	for(var i = 0; i < topics.length; i++) {
// Then dynamically generating buttons for each topic in the array	
		var newButton = $("<button>");
// Adding classes		
		newButton.addClass("btn");
		newButton.addClass("animal-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".animal-button").unbind("click");

// This function handles events where one button is clicked	
	$(".animal-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("dotted-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=0CPSLPSKE2G3K7cIK4zS6NKdhjlaaXBz&rating=" + cutOffRating + "&limit=" + numberOfGIFs,

		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("dotted-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
// event.preventDefault() prevents the form from trying to submit itself		
		event.preventDefault();
// This line will grab the text from the input box		
		addButton($("#animal-gif").val().trim());
		$("#animal-gif").val("");
	});
});