// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");
//  The Spotify API module is used to query the Spotify REST API.
const Spotify = require("node-spotify-api");

// Import the api keys from 'keys.js'.
const keys = require("./keys.js");
// Import the function for reporting the results from 'output.js'.
const output = require("./output.js")

// Create the spotify object needed for performing the Spotify API queries using the keys imported from 'keys.js'
const spotify = new Spotify(keys.spotify);

// Function to run when the 'spotify-this-song' command is passed
function run(searchTerm) {
    // Declare a string to hold information returned from the search (begin the string by stating the search being ran).
    let resultsString = "-".repeat(45) + "\nnode liri.js {spotify-this-song}";
    resultsString += searchTerm ? ' "' + searchTerm + '"\n' + " -".repeat(18) : "\n" + " -".repeat(18);
    // If an song name was given...
    if (searchTerm) {
        // Search the Spotify API for that song (function defined below).
        search(searchTerm, resultsString);
    }
    // If no artist/band was given, alert the user that they must provide an artist/band name.
    else {
        // Search the Spotify API for the song "The Sign" by 'Ace of Base'.
        search("the sign ace of base", resultsString);
    }
}

// Function for searching the Spotify API
function search(searchTerm, resultsString) {
    // Query the Spotify API using the method on the Spotify object provided by the 'node-spotify-api' module.
    spotify.search({type: "track",
        query: searchTerm,
        limit: 4
    // If and when a response (not error) is returned from the search...
    }).then(function(response) {
        // If the search returns a match...
        if (response.tracks.items.length > 0) {
            // Add a message introducing results to the 'resultsString'.
            resultsString += "\n I think I found the song you were looking for.\n"
            // If there were multiple matches, add suggestion that the user narrow their search.
            if (response.tracks.items.length > 1) {
                resultsString += " If this isn't it, try adding the artist or album name.\n";
            }
            resultsString += " - ".repeat(9);
            // Build a string from the array of artists returned from the search
            let artistsString = "";
            if (response.tracks.items[0].artists) {
                response.tracks.items[0].artists.forEach(function(artist, index) {
                    artistsString += index > 0 ? ", " + artist.name : artist.name ;
                });
            }
            // Build a string containing the relevant information returned from the search.
            let songInfoString = "\n  Artist(s): " + artistsString;
            songInfoString += response.tracks.items[0].name ? "\n  Song name: " + response.tracks.items[0].name : "";
            songInfoString += response.tracks.items[0].external_urls.spotify ? "\n  Spotify preview link:\n     " + response.tracks.items[0].external_urls.spotify : "";
            songInfoString += response.tracks.items[0].album && response.tracks.items[0].album.name ? "\n  Album: " + response.tracks.items[0].album.name : "";
            // Add the song information string to the 'resultsString'.
            resultsString += songInfoString;
        }
        // If an empty array was returned (no song found matching search)...
        else {
            // Add a message informing user that no results were found to the 'resultsString'.
            resultsString += "\n I'm sorry, I couldn't find that song."
        }
        // Report the results (to both console and log.txt).
        output.report(resultsString);
    // If the Spotify API search returned an error...
    }).catch(function(error) {
        // Add a message about the error to the 'resultsString'
        resultsString += "\n There was an error searching Spotify.\n" + error;
        // Report the results (to both console and log.txt).
        output.report(resultsString);
    });
}

// Export the run function so it can be used in the liri.js app.
module.exports = {
    run
}