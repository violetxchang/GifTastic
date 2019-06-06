$(document).ready(function () {

//initial array of baby animals
var babyAnimals = ["Baby Sloth", "Baby Hedgehog", "Baby Kangaroo", "Baby Fox", "Baby Chameleon", "Baby Shark", "Baby Deer", "Duckling", "Piglet", "Puppy"];

//displayGifs function re-renders the HTML to display the appropriate content
function displayGifs(){

var gif = $(this).attr()
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + babyAnimals + "&api_key=HICxvl3OdBd9BXz6zwFeeHBXSYlmXFT7&limit=9";

//creating an AJAX call for the specific movie button being clicked
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

//creating a div to hold the gifs
var gifDiv = $("<div id='animalsView'>")

//storing the rating data
var rating = response.data.rating;

//creating an element to have the rating displayed
var gifRating = $("<p>").text("Rating: " + rating);

//displaying the rating
gifDiv.append(gifRating);

//retrieving the URL for the image
var gifURL = response.data.images.mp4;

//creating an element to hold the gif
var actualGif = $("<img>").attr("src", gifURL);

//appending the image
gifDiv.append(actualGif);

});
}



//function for displaying gifs
function renderGifs() {

    //deleting gifs prior to adding new gifs
    $("#animalsView").empty();

    //looping through the array of baby animals
    for (var i=0; i<babyAnimals.length; i++){

        //dynamically generate buttons for each baby animal in the array
        var a = $("<button>");

        //adding a class to button
        a.addClass("btn btn-info");

        //adding a data-attribute
        a.attr("data-name", babyAnimals[i]);

        //providing the initial button text
        a.text(babyAnimals[i]);

        //adding the button to the buttonsView div
        $("#buttonsView").append(a);
        $("#buttonsView").append(" ");
    }
}

//This function handles events where a baby animal button is clicked
$("addAnimal").on("click",function(event){
    event.preventDefault();

    //this line grabs the input from the textbox
    var babyAnimals = $("#animalInput").val().trim();

    //adding movie from the textbox to array
    babyAnimals.push(babyAnimals);

    //calling renderGifs which handles the processing of our baby animals array
    renderGifs();
});

//adding a click event listening to all eleemtns with a class of "btn btn-info"
$(document).on("click", ".btn btn-info", displayGifs);

renderGifs();
})



