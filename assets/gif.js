// A $( document ).ready() block.
$(document).ready(function() {
    console.log("ready!");


    //Array of film dirctors 
    var directors = ["Woody Allen", "Martin Scorcese", "Alfred Hitchcock", "Stanley Kubrick", "David Lynch"]
    var director;
   



    //this click event causes the displayDirecorGif function to be called whenever a director's button is clicked.
    //this function ensures that a director's button produces gifs pertaining to that director.
    //this function accomplishes this by calling displayDirectorGif()
    $("#bContainer").on("click", ".Drect", function() {

        director = $(this).attr("data-director");

        console.log(director);
        console.log("hello");

        displayDirectorGif();
    });

    //this displayDirectorGif function makes an AJAX call to the gif website, for the director whose button was clicked.
    //it also loops through the gifs and prints them to the screen along with their rating. 
    function displayDirectorGif() {
        //var director = (this).attr("data-director");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7tGp5YYCPv9T3FNcTRLli4JLDAzbeJGJ&q=" + director + "&limit=10&offset=0&rating=G&lang=en"
        var state = $(this).attr("data-state");
        //creating an AJAX call for the button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            //storing array of results in results variable
            var results = response.data;
            console.log(results);



            //looping over every result item
            for (var i = 0; i < results.length; i++) {


                //creating a div with the class "item"
                var gifDiv = $("<div class='items'>");

                //storing the result item's rating
                var rating = results[i].rating;


                //creating an image tag
                var personImage = $("<img>");
                var klass="item"
                personImage.attr("src", results[i].images.fixed_height_still.url)
                personImage.attr("data-state", "still")
                personImage.attr("data-still", results[i].images.fixed_height_still.url)
                personImage.attr("data-animate", results[i].images.fixed_height.url)
                personImage.attr("class", klass);

                //personImage.attr("src", results[i].images.original.url, "data-state=animate", results[i].images.fixed_height.url, "data-state=still", results[i].images.fixed_height_still.url, "class=item");
                //personImage.attr("src", results[i].images.original.url, "data-state=still", results[i].images.fixed_height_still.url, "data-state=animate", results[i].images.fixed_height.url, "class=item");



                //appending the image and rating to the gifDiv
                gifDiv.append(personImage);
                gifDiv.append("<br/>" + "Rating:" + rating);

                $("#gif-Container").prepend(gifDiv);



                //giving the image tag a src attribute of a property pulled off
                //the result item.

                // personImage.attr("src", results[i].images.original.url, "data-state=still", results[i].images.fixed_height_still.url, "data-state=animate", results[i].images.fixed_height.url, "class=item");
                //  personImage.attr("src", results[i].images.original.url, "data-state=animate", results[i].images.fixed_height.url, "data-state=still", results[i].images.fixed_height_still.url, "class=item");
                //  personImage.attr("src", results[i].images.original.url, "data-state=still", results[i].images.fixed_height_still.url, "data-state=animate", results[i].images.fixed_height.url, "class=item");





            }


        });

    };


    $("#gif-Container").on("click", ".item", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }



    });






    // this function will create a button for each film director in the array
    function makeButtons() {
        //this prevents repeat buttons

        $("#bContainer").empty();

        //create a forloop that loops through the directors array and creates buttons that display in the div
        //#gifContainer
        for (var i = 0; i < directors.length; i++) {
            console.log("helloWorld");

            //$("#bContainer").append("<button class=Drect>" + directors[i] + "</button>");

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("Drect");
            // Added a data-attribute
            a.attr("data-director", directors[i]);
            // Provided the initial button text
            a.text(directors[i]);
            // Added the button to the buttons-view div
            $("#bContainer").append(a);

        }

    }

    //this function handles events when the add director button is click

    $("#add-director").on("click", function(event) {
        //this prevents the form from submitting itself.
        event.preventDefault();

        //this line grabs the input from the textbox.

        var direct = $("#director-input").val().trim();

        //adding director from textbox to array
        directors.push(direct);

        //call make buttons so as to add the new button to the html.

        makeButtons();

    });

    //$(document).on("click", ".Drect", displayDirectorGif());


    makeButtons();


});