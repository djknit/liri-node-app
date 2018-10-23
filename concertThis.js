// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'request' module is used to get data from web pages using an HTTP call.
const request = require("request");
//  The 'moment' module is used to interpret, manipulate, and format dates and times.
const moment = require("moment");

// Import the api keys from 'keys.js'
const keys = require("./keys.js");
// Import the function for reporting the results from 'output.js'.
const output = require("./output.js")

// Function to run when the 'concert-this' command is passed
function run(searchTerm) {
    // If an artist/band name was given...
    if (searchTerm) {
        // Create the query URL for the Bandsintown API using the provided artist (searchTerm).
        const queryURL = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=${keys.bandsInTown.id}`;
        // Query the Bandsintown API
        request(queryURL, function (error, response, body) {
            // Declare a string to hold information returned from the search (begin the string by stating the search being ran).
            let resultsString = "-".repeat(45) + '\nnode liri.js {concert-this} "' + searchTerm + '"\n' + " -".repeat(18) + "\n";
            // If there was an error with the search, add a message stating this to the resultsString.
            if (error) {
                resultsString += " There was an error searching the API:\n" + error;
            }
            // If the search returned a body...
            else if (body) {
                // And the body is an array...
                if (body[0] === "[") {
                    // And the array is empty...
                    if (body[1] === "]") {
                        // This means that the artist was found, but no events were found. Add a message to the resultsString stating this.
                        resultsString += " Sorry, I couldn't find any scheduled events for that artist.";
                    }
                    // If the search returned a non-empty array (some events were found)...
                    else {
                        // Parse the returned body (currently a string representing an array of objects) into the array it represents.
                        let parsedBody = JSON.parse(body);
                        // Add the number of results to the resultsString.
                        resultsString += " I found " + parsedBody.length + " scheduled events for that artist.";
                        // For each event object in the body array, add the relevant info to the results string.
                        parsedBody.forEach(function(event, index) {
                            // Create head divider string that includes the result number.
                            //  The number of '-'s will differ depending on the number of digits in (index + 1) so as to keep the line the same number of characters.
                            let headDivider = "\n -< " + (index + 1) + " >" + "-".repeat(30);
                            if (index < 9) { headDivider += "-"; }
                            // Create a string with the desired pieces of the event info if they are defined. (The function is defined @line 75.)
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
            // If there was no error returned and the response body is empty...
            //   (I don't think this is possible, but this covers all of the cases just in case.)
            else {
                // Notify the user.
                resultsString += " There was an error searching the API:\n  No response body.";
            }
            // Report the results (to both console and log.txt).
            output.report(resultsString);
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
        result += "\n  Date: " + moment(event.datetime).format("MM/DD/YYYY  (ddd., hh:mm a)");
    }
    return result;
}

// Export the run function so it can be used in the liri.js app.
module.exports = {
    run
}