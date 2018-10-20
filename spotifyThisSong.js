// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");
//  The Spotify API module is used to query the Spotify REST API.
const Spotify = require("node-spotify-api");

// Import the api keys from 'keys.js'
const keys = require("./keys.js");

// Create the spotify object needed for performing the Spotify API queries using the keys imported from 'keys.js'
const spotify = new Spotify(keys.spotify);

