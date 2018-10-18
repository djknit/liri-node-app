// Use the 'dontenv' Node module to grab the values (api keys) stored in the '.env' file
//   The module grabs the keys and values and stores them in the global variable process.env
require("dotenv").config();

// Require the Node modules needed for the app. This is a necessary step to be able to use the modules.

const request = require("request");

// Require the spotify api
const Spotify = require("node-spotify-api");

// Import the api keys from 'keys.js'
const keys = require("./keys.js");

