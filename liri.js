// Require the Node modules (packages) needed for the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");
//  The Spotify API module is used to query the Spotify REST API.
const Spotify = require("node-spotify-api");
//  The 'dontenv' module grabs the data (key-value pairs) from the '.env' file and stores them in the global variable 'process.env'
//   Here, I am both requiring and configuring the module. It is not stored in a variable because it does not need to be called again.
require("dotenv").config();

// Import the api keys from 'keys.js'
const keys = require("./keys.js");
// Import the files containing the functions for each command.
const concertThis = require("./concertThis.js");

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
        concertThis.run(searchTerm);
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
