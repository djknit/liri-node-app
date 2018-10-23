// Require the Node modules (packages) needed for this portion of the app. This is a necessary step to be able to use the modules.
//  The 'fs' package is used to read and write to files in the directory.
const fs = require("fs");

// Function for printing the results in the console and writing them to 'log.txt'
function report(results) {
    // Add footer to results string.
    results += "\n" + "_".repeat(45) + "\n";
    // Print the results to the console.
    console.log(results);
    // Write the results to 'log.txt'. (Append to file. Don't erase the current contents.)
    //  If 'log.txt' does not exist in this directory, it will be created.
    fs.appendFile("log.txt", results, function(error) {
        // If an error was experienced log it.
        if (error) {
          console.log("There was an error writing the result to the log.\n" + error);
        }
    });
}

// Export the 'report' function to be used by other modules.
module.exports = {
    report
}