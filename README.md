# LIRI Node App

### LIRI is a command-line node app that can accept commands to search and return data from Spotify, Bands in Town, and OMDB.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* GitHub Repository: [github.com/djknit/liri-node-app](https://github.com/djknit/liri-node-app)

#### Demo Videos
* For a full demonstration of the app, see [this video](https://www.youtube.com/watch?v=GGi05Dj_tzY) (3 min, 25 sec).
* For a very brief demonstration of the app, see [this video](https://www.youtube.com/watch?v=Ork3psUDaNM) (1 min, 6 sec).

## Project Goals
* Create a command line Node app that can interpret and execute commands passed by the user.
* Include commands to do the following.
    * Search Bandsintown for concerts featuring a given artist.
    * Search Spotify for information about a given song.
    * Search OMDB for information about a given movie.
* Output results to the console and log the commands and results to a text file.
* Protect API keys by placing them in a '.env' file and telling Git to ignore said file.
* Practice working with Node modules, working with the Node Package Manager, and creating a modular Node App.

## Project Features
* Parses command-line input and runs the function corresponding to the command that was passed.
* When the 'concert-this' command is passed:
    * If a search term (artist name) was passed with the command, LIRI queries the Bandsintown API to find scheduled concerts for the artist and reports the findings.
* When the 'spotify-this-song' command is passed:
    * If a search term (song name) was passed with the command, LIRI queries Spotify for information about the song and reports the findings.
    * If no search term was passed with the command, LIRI queries Spotify for information about the song 'The Sign' by 'Ace of Base' and reports the findings.
* When the 'movie-this' command is passed:
    * If a search term (movie name) was passed with the command, LIRI queries OMDB for information about the movie and reports the findings.
    * If no search term was passed with the command, LIRI queries OMDB for information about the movie 'Mr. Nobody and reports the findings.
* When the 'do-what-it-says' command is passed, LIRI reads the text in 'random.txt' and executes the command stated in the text.
* All results are printed in the console and appended to the file 'log.txt'.
* All API keys are kept in a '.env' file which is not published to the repository so that the keys remain protected.

## Technologies Used
* Node
* Request (Node package)
* Moment (as a Node package)
* Dotenv (Node package)

## Instructions for Use
#### Building the App
If you want to try this app out for yourself, you will have to register your own keys for Bandsintown, Spotify, and OMDB. Once you have your keys, you will need to clone the repository to your local machine. You will need to have Node installed on your machine. Navigate to the directory that you cloned the repository to in the console and install the Node modules required for the app by running the command
```
npm i
```
Next, you will need to create a new file in the same directory called '.env'. (Do not put anything in front of the '.' The filename should be '.env' exactly). Inside your '.env' file, copy and paste the following.
```
# API keys

### Spotify

SPOTIFY_ID=your_key_here
SPOTIFY_SECRET=your_key_here


### Bandsintown

BANDSINTOWN_APP_ID=your_key_here


### OMDB

OMDB_API_KEY=your_key_here
```
Replace the text "your_key_here" with your keys for each occurrance. That's it! You should be ready to run the app.

#### Running the App
Open the command terminal and make sure that you have navigated to the directory where you have cloned the app. LIRI can accept any of the following commands.
* `node liri.js concert-this <band name here>`
* `node liri.js spotify-this-song <song name here>`
* `node liri.js movie-this <movie name here>`
* `node liri.js do-what-it-says`

For a description of what each command is doing, see [Features](#project-features). The results of each search will be printed to the terminal and appended to the file 'log.txt'.

## Developer
This project is developed and maintained by David Knittel. Any and all questions, comments, suggestions, or proposed contributions are welcome.
* Email: [djknit@gmail.com](mailto:djknit@gmail.com)
* Portfolio: [djknit.github.io](https://djknit.github.io/)
* GitHub: [github.com/djknit](https://github.com/djknit)
* LinkedIn: [linkedin.com/in/djknit](https://www.linkedin.com/in/djknit/)

This project was originally developed as a homework assignment for the KU Coding Bootcamp Full Stack Flex program and uses specifications laid out by the homework requirements.