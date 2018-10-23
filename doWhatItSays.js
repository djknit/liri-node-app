// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'fs' package is used to read and write to files in the directory.
const fs = require("fs");

// Function to run when the 'do-what-it-says' command is passed
function run(callback) {
    // Use the 'fs' Node package to read the text from 'random.txt'
    fs.readFile("random.txt", "utf8", function(error, data) {
        // Declare variables to hold the command and search term read from the file.
        let command, searchTerm = null;
        // Declare a string stating the search being ran
        let resultsString = "-".repeat(45) + "\nnode liri.js {do-what-it-says}\n" + " -".repeat(18) + "\n";
        // If there was an error reading the file...
        if (error) {
            // Add a message stating the error to the 'resultsString'.
            resultsString += " There was an error reading the file.\n" + error;
        }
        // If there was no error reading the file...
        else {
            // Grab the text and store it in a variable
            const randomText = data;
            // Add the text to the resultsString.
            resultsString += " It says: `" + data + "`";
            // Split the text at the comma to separate the command and search term.
            const splitData = data.split(",");
            command = splitData[0];
            // Remove the first and last character (quotation marks) from the search term portion of the text.
            //  (Only do this if the first character is verified to be a quotation mark.)
            searchTerm = splitData[1][0] === '"' || splitData[1][0] === "'" ? splitData[1].slice(1, -1) : splitData[1];
        }
        // Print the resultsString
        console.log(resultsString);
        // Run the callback function ('doThis' from 'liri.js') on the command and search term taken from 'random.txt'.
        callback(command, searchTerm);
    });
}

// Export the run function so it can be used in the liri.js app.
module.exports = {
    run
}