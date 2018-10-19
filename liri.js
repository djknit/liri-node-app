// Require the Node modules (packages) needed for the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");
//  The Spotify API module is used to query the Spotify REST API.
const Spotify = require("node-spotify-api");
//  The 'dontenv' module grabs the data (key-value pairs) from the '.env' file and stores them in the global variable 'process.env'
//   Here, I am both requiring and configuring the module. It is not stored in a variable because it does not need to be called again.
require("dotenv").config();
//  The 'moment' module is used to interpret, manipulate, and format dates and times.
const moment = require("moment");

// Import the api keys from 'keys.js'
const keys = require("./keys.js");

// Create the spotify object needed for performing the Spotify API queries using the keys imported from 'keys.js'
const spotify = new Spotify(keys.spotify);

// Grab the command that was passed in when the program was called. (The calls have the form "node liri.js <command> ...", so the command is index 2 of the arguments array.)
let command = process.argv[2];
// If a command was passed, turn any uppercase letters in the passed command to lowercase to make the interpretation a little more forgiving.
if (command) { command = command.toLowerCase(); }

// Grab the search term if one was passed.
//  Declare a variable to store the search term
let searchTerm = null;
//  Grab portion of the arguments array that excludes "node liri.js <command here>"
let searchTermArray = process.argv.slice(3);
//  If the searchTermArray is not empty, build a string from the array.
if (searchTermArray.length > 0) {
    searchTerm = "";
    searchTermArray.forEach(function(value, index) {
        if (index > 0) { searchTerm = searchTerm + " "; }
        searchTerm = searchTerm + value;
    });
    console.log(searchTerm);
}

// Create a message to display when the command entered does not match any of the expected commands
const INVALID_COMMAND_MESSAGE = `
Sorry, I didn't recognize that command. Please enter a command in one of the following forms.
   node liri.js concert-this <artist/band name here>
   node liri.js spotify-this-song <song name here>
   node liri.js movie-this <movie name here>
   node liri.js do-what-it-says`;

// Determine which command was passed and take the appropriate action.
switch (command) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log(INVALID_COMMAND_MESSAGE);
}

// The following functions each define the steps to be taken when a particular command is passed.
function concertThis() {
    // If an artist/band name was given...
    if (searchTerm) {
        // Create the query URL for the Bandsintown API using the provided artist (searchTerm).
        const queryURL = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`;
        // Query the Bandsintown API
        request(queryURL, function (error, response, body) {
            // Declare a string to hold information returned from the search (begin the string by stating the search being ran).
            let resultsString = "-".repeat(45) + "\nnode liri.js concert-this " + searchTerm + "\n" + " -".repeat(12) + "\n";
            // If there was an error with the search, add a message stating this to the resultsString.
            if (error) {
                resultsString += " There was an error searching the API:\n" + error;
            }
            // If the search returned a body...
            else if (body) {
                // If the body is an array...
                if (body[0] === "[") {
                    // If the array is empty...
                    if (body[1] === "]") {
                        // This means that the artist was found, but no events were found. Add a message to the resultsString stating this.
                        resultsString += " Sorry, I couldn't find any scheduled events for that artist.";
                    }
                    // If the search returned a non-empty array (some events were found)...
                    else {
                        // Parse the returned body (currently a string representing an array of objects) into the array it represents.
                        let parsedBody = JSON.parse(body);
                        // Add the number of results to the resultsString.
                        resultsString += " (" + parsedBody.length + " results)"
                        // For each event object in the body array, add the relevant info to the results string.
                        parsedBody.forEach(function(event, index) {
                            // Create head divider that includes the result number.
                            //  The number of '-'s will differ depending on the number of digits in (index + 1) so as to keep the line the same number of characters.
                            let headDivider = "\n -< " + (index + 1) + " >" + "-".repeat(30);
                            if (index < 9) { headDivider += "-"; }
                            // Create a string with the desired pieces of the event info if they are defined.
                            let eventString = createConcertInfoString(event);
                            // Add the head divider and the event string to the results string.
                            resultsString += headDivider + eventString;
                        });
                    }
                }
                // If a result was returned whose body is not an array...
                else {
                    // This means that the artist was not found. Add a message to 'resultsString' stating this.
                    resultsString += " Sorry, I'm not familiar with that artist.";
                }
            }
            // Print the results.
            console.log(resultsString);
        });
    }
    // If no artist/band was given, alert the user that they must provide an artist/band name.
    else {
        console.log("\nNo search was run. You must supply an artist/band name with the 'concert-this' command.");
    }
}

// Function for creating the string of info to return for a single event returned by the Bandsintown API.
function createConcertInfoString(event) {
    let result = "";
    // If 'venue' is defined...
    if (event.venue) {
        // Add the venue name if defined.
        if (event.venue.name) { result += "\n  Venue: " + event.venue.name; }
        // Add the portions of the location information (political regions, not coordinates) that are defined.
        if (event.venue.city) {
            result += "\n  Location: " + event.venue.city;
            if (event.venue.region) { result += ", " + event.venue.region; }
            if (event.venue.country) { result += ", " + event.venue.country; }
        }
        else if (event.venue.region) {
            result += "\n  Location: " + event.venue.region;
            if (event.venue.country) { result += ", " + event.venue.country; }
        }
        else if (event.venue.country) {
            result += "\n  Location: " + event.venue.country;
        }
    }
    // Use 'moment' to parse and format the datetime of the event and add it to the 'result' string if it is defined.
    if (event.datetime) {
        result += "\n  Time: " + moment(event.datetime).format("ddd, MMM D, YYYY,  hh:mm a");
    }
    return result;
}