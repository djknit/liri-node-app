// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");
//  The Spotify API module is used to query the Spotify REST API.
const Spotify = require("node-spotify-api");

// Import the api keys from 'keys.js'
const keys = require("./keys.js");

// Create the spotify object needed for performing the Spotify API queries using the keys imported from 'keys.js'
const spotify = new Spotify(keys.spotify);

// Function to run when the 'spotify-this-song' command is passed
function run(searchTerm) {
    // If an song name was given...
    if (searchTerm) {
        // Search the Spotify API for that song (function defined below).
        search(searchTerm);
    }
    // If no artist/band was given, alert the user that they must provide an artist/band name.
    else {
        // Search the Spotify API for the song "The Sign" by 'Ace of Base'.
        search("the sign ace of base");
    }
}

// Export the run function so it can be used in the liri.js app.
module.exports = {
    run
}

// Function for searching the Spotify API
function search(searchTerm) {
    // Declare a string to hold information returned from the search (begin the string by stating the search being ran).
    let resultsString = "-".repeat(45) + '\nnode liri.js {spotify-this-song} "' + searchTerm + '"\n' + " -".repeat(18)
      + `\n I searched Spotify for the song "${searchTerm}."\n`;
    // Query the Spotify API using the method on the Spotify object provided by the 'node-spotify-api' module.
    spotify.search({type: "track",
        query: searchTerm,
        limit: 4
    // If and when a response (not error) is returned from the search...
    }).then(function(response) {
        // If the search returns a match...
        if (response.tracks.items.length > 0) {
            // Add a message introducing results to the 'resultsString'.
            resultsString += " I think I found it.\n"
            // If there were multiple matches, add suggestion that the user narrow their search.
            if (response.tracks.items.length > 1) {
                resultsString += " If this isn't it, try adding the artist's name to your search.\n";
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
        // Print the 'resultsString' to the console.
        console.log(resultsString);
    // If the Spotify API search returned an error...
    }).catch(function(error) {
        // Add a message about the error to the 'resultsString'
        resultsString += ""
    });
}

// request(queryURL, function (error, response, body) {
            
//     // If there was an error with the search, add a message stating this to the resultsString.
//     if (error) {
//         resultsString += " There was an error searching the API:\n" + error;
//     }
//     // If the search returned a body...
//     else if (body) {
//         // And the body is an array...
//         if (body[0] === "[") {
//             // And the array is empty...
//             if (body[1] === "]") {
//                 // This means that the artist was found, but no events were found. Add a message to the resultsString stating this.
//                 resultsString += " Sorry, I couldn't find any scheduled events for that artist.";
//             }
//             // If the search returned a non-empty array (some events were found)...
//             else {
//                 // Parse the returned body (currently a string representing an array of objects) into the array it represents.
//                 let parsedBody = JSON.parse(body);
//                 // Add the number of results to the resultsString.
//                 resultsString += "     (" + parsedBody.length + " results)"
//                 // For each event object in the body array, add the relevant info to the results string.
//                 parsedBody.forEach(function(event, index) {
//                     // Create head divider string that includes the result number.
//                     //  The number of '-'s will differ depending on the number of digits in (index + 1) so as to keep the line the same number of characters.
//                     let headDivider = "\n -< " + (index + 1) + " >" + "-".repeat(30);
//                     if (index < 9) { headDivider += "-"; }
//                     // Create a string with the desired pieces of the event info if they are defined. (The function is defined @line 75.)
//                     let eventString = createConcertInfoString(event);
//                     // Add the head divider and the event string to the results string.
//                     resultsString += headDivider + eventString;
//                 });
//             }
//         }
//         // If a result was returned whose body is not an array...
//         else {
//             // This means that the artist was not found. Add a message to 'resultsString' stating this.
//             resultsString += " Sorry, I'm not familiar with that artist.";
//         }
//     }
//     // If there was no error returned and the response body is empty...
//     //   (I don't think this is possible, but this covers all of the cases just in case.)
//     else {
//         // Notify the user.
//         resultsString += " There was an error searching the API:\n  No response body.";
//     }