$(document).ready(function () {

  //initial array of baby animals
  var babyAnimals = ["Baby Sloth", "Baby Hedgehog", "Baby Kangaroo", "Baby Fox", "Baby Chameleon", "Baby Shark", "Baby Deer", "Duckling", "Piglet", "Puppy"];

  //displayGifs function re-renders the HTML to display the appropriate content
  function displayGifs() {}



  //function for displaying gifs
  function renderGifs() {

    //deleting gifs prior to adding new gifs
    $("#buttonsView").empty();

    //looping through the array of baby animals
    for (var i = 0; i < babyAnimals.length; i++) {

      //dynamically generate buttons for each baby animal in the array
      var button = $("<button>");

      //adding a class to button
      button.addClass("btn btn-info");

      //adding a data-attribute
      button.attr("data-name", babyAnimals[i]);

      //providing the initial button text
      button.text(babyAnimals[i]);

      //adding the button to the buttonsView div
      $("#buttonsView").append(button);
    }
  }

  //This function handles events where a baby animal button is clicked
  $("#addAnimal").on("click", function (event) {
    event.preventDefault();

    //this line grabs the input from the textbox
    var babyAnimalsInput = $("#animalInput").val().trim();
    //adding movie from the textbox to array
    babyAnimals.push(babyAnimalsInput);
    //calling renderGifs which handles the processing of our baby animals array
    renderGifs();
  });

  //adding a click event listening to all eleemtns with a class of "btn btn-info"
  $(document).on("click", ".btn", function () {

    var gif = $(this).attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=HICxvl3OdBd9BXz6zwFeeHBXSYlmXFT7&limit=5";

    //creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      $("#animalsView").empty();

      for (var i = 0; i < response.data.length; i++) {

        //creating a div to hold the gifs
        var gifDiv = $("<div class='animalsView'>")

        //storing the rating data
        var rating = response.data[i].rating;

        //creating an element to have the rating displayed
        var gifRating = $("<p>").text("Rating: " + rating.toUpperCase());

        //displaying the rating
        gifDiv.append(gifRating);

        //retrieving the URL for the gif
        var gifURL = response.data[i].images.fixed_height.url;

        //retrieving URL fpr the still
        var stillURL = response.data[i].images.fixed_height_still.url;

        //creating an element to hold the gif
        var image = $("<img>");
        image.attr("src", stillURL);
        //image.attr("data-still", stillURL);
        image.attr("data-alt", gifURL);
        //image.attr("data-state", "still");
        image.addClass("giphyImage");


        //appending the image
        gifDiv.prepend(image);
     
      
        $("#animalsView").prepend(gifDiv);

      }


    })



  })

  $(document).on("click", ".giphyImage", function () {
    console.log("click image: ", this)

    var imageSrc =  $(this).attr("src")
    $(this).attr("src", $(this).data("alt"));
    $(this).data("alt", imageSrc);

    // elem1 = 1
    // elem2 =2
    // elem0 = elem1
    // elem1 = elem2
    // elem2 = elem0
    // var state = $(this).data("state");
    // console.log("state: ", state)
    // if(state === "still"){
    //   $(this).attr("src", $(this).data('animated'));
    //   $(this).attr("data-state", "x");
    // } else {
    //  $(this).attr("src", $(this).data("still"));
    //   $(this).attr("data-state", "still");
    // }
  });

  renderGifs();

});