// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'dontenv' module grabs the data (key-value pairs) from the '.env' file and stores them in the global variable 'process.env'
//   Here, I am both requiring and configuring the module. It is not stored in a variable because it does not need to be called again.
require("dotenv").config();

// Import the api keys from 'keys.js'
const keys = require("./keys.js");
// Import the functions for each command from their respective JS files.
const concertThis = require("./concertThis.js");
const spotifyThisSong = require("./spotifyThisSong.js");

// Grab the command that was passed in when the program was called. (The calls have the form "node liri.js <command> ...", so the command is index 2 of the arguments array.)
let command = process.argv[2];
// If a command was passed, turn any uppercase letters in the passed command to lowercase to make the interpretation a little more forgiving.
if (command) { command = command.toLowerCase(); }

// Grab the search term if one was passed. (This is the portion of the arguments array that excludes "node liri.js <command here>".)
//  In the same line, join words in the array into a string with the words separated by single spaces.
//  If there was no search term passed, 'searchTerm' will be set to the empty string (a falsey value).
let searchTerm = process.argv.slice(3).join(" ");

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
        spotifyThisSong.run(searchTerm);
        break;
    case "movie-this":
        movieThis.run(searchTerm);
        break;
    case "do-what-it-says":
        doWhatItSays.run();
        break;
    // If none of the above commands were entered...
    default:
        console.log(INVALID_COMMAND_MESSAGE);
}