# LIRI Node App

##### LIRI is a command-line node app that can accept commands to search and return data from Spotify, Bands in Town, and OMDB.

## Demo Videos
* For a full demonstration of the app, see [this video](https://www.youtube.com/watch?v=GGi05Dj_tzY) (3 min, 25 sec)
* For a very brief demonstration of the app, see [this video](https://www.youtube.com/watch?v=Ork3psUDaNM) (1 min, 6 sec)

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

## Instructions for Use
#### Building the App
If you want to try this app out for yourself, you will have to register your own keys for Bandsintown, Spotify, and OMDB. Once you have your keys, you will need to clone the repository to your local machine. You will need to have Node installed on your machine. Navigate to the directory that you cloned the repository to in the console and initialize Node by running 
```
npm init -y
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