// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");

// Import the api keys from 'keys.js'
const keys = require("./keys.js");
// Import the function for reporting the results from 'output.js'.
const output = require("./output.js")

// Function to run when the 'movie-this' command is passed
function run(searchTerm) {
    // Declare a string to hold information returned from the search (begin the string by stating the search being ran).
    let resultsString = "-".repeat(45) + "\nnode liri.js {movie-this}";
    resultsString += searchTerm ? ' "' + searchTerm + '"\n' + " -".repeat(18) + "\n" : "\n" + " -".repeat(18) + "\n";
    // If a movie name was given, search OMDB for that movie name.
    if (searchTerm) {
        search(searchTerm, resultsString);
    }
    // If no movie name was given, search OMDB for the movie Mr. Nobody.
    else {
        search("Mr. Nobody", resultsString);
    }
}

// Function to query OMDB and handle the response
function search(searchTerm, resultsString) {
    // Create the query URL for OMDB using the api key exported from 'keys.js' and the search term provided by user.
    const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${searchTerm}`;
    // Query the OMDB database
    request(queryURL, function(error, response, body) {
        // If there was an error with the search, add a message stating this to the resultsString.
        if (error) {
            resultsString += " There was an error searching the API:\n" + error;
        }
        // If there was no error with the search...
        else {
            // Parse the response body.
            const parsedBody = JSON.parse(body);
            // If the search returned information about a movie...
            if (parsedBody.Response === "True") {
                // Add a message to the 'resultsString' stating this.
                resultsString += " I think I found the movie you were looking for.\n" + " - ".repeat(9);
                // Add the desired pieces of data from the movie object that is the response body to the 'resultsString'.
                resultsString += createMovieInfoString(parsedBody);
            }
            // If no movie was found to match the search term...
            else {
                // Add a message to 'resultsString' stating this.
                resultsString += " Sorry, I couldn't find that movie.";
            }
        }
        // Report the results (to both console and log.txt).
        output.report(resultsString);
    });
}

// Function to grab the desired data from the response returned from OMDB and create a string from it.
function createMovieInfoString(responseBody) {
    // Declare string to store info
    let movieInfoString = "";
    // Grab the IMDB and Rotten Tomatoes Ratings if they are given.
    //  Declare variables to store the ratings.
    let imdbRating, rottenTomatoesRating = null;
    //  If the Ratings property is defined on the response body...
    if (responseBody.Ratings) {
        // For each object in the Ratings array...
        responseBody.Ratings.forEach(function(value) {
            // Check to see if the rating is IMDB or Rotten Tomatoes and grab the value if it is.
            if (value.Source[0] === "I") {
                imdbRating = value.Value;
            }
            else if (value.Source[0] === "R") {
                rottenTomatoesRating = value.Value;
            }
        });
    }
    // Grab the title and year of movie and add to info string.
    //  (If these properties are not defined, the value "undefined" will be added to the string).
    movieInfoString += "\n  Title: " + responseBody.Title + "\n  Year: " + responseBody.Year;
    // Grab values of all other desired properties only when they exist and add them to the string.
    if (imdbRating) { movieInfoString += "\n  IMDB Rating: " + imdbRating; }
    if (rottenTomatoesRating) { movieInfoString += "\n  Rotten Tomatoes Rating: " + rottenTomatoesRating; }
    if (responseBody.Country) { movieInfoString += "\n  Country: " + responseBody.Country; }
    if (responseBody.Language) { movieInfoString += "\n  Language: " + responseBody.Language; }
    if (responseBody.Actors) { movieInfoString += "\n  Actors: " + responseBody.Actors; }
    if (responseBody.Plot) { movieInfoString += "\n  Plot: " + responseBody.Plot; }
    // Return the movie info string
    return movieInfoString;
}

// Export the run function so it can be used in the liri.js app.
module.exports = {
    run
}