require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');


var whatToDo = process.argv[2];

// cues in user input at the third argument line
var userInput = process.argv.slice(3).join(" ");


// making a function that will search thru the spotify api
function spotifyThis(input) {
    spotify
        .search({ type: 'track', query: userInput, limit: 2 })
        .then(function (response) {
            console.log(response.data)
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concertThis(input) {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios
        .get(queryURL)
        .then(function (response) {
            // handle success
            var concert = response.data
            console.log("Venue: " + concert[0].venue.name);
            console.log("Venue Location: " + concert[0].venue.city);
            console.log("Venue: " + concert[0].datetime);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}

function movieThis(input) {
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput;
    
    console.log(queryURL);
    axios
    .get(queryURL)
    .then(function (response) {
        // handle success
        var movie = response.data
        console.log("===================================" + "\n");
        console.log("TITLE: " + movie.Title + "\n");
        console.log("RELEASE DATE: " + movie.Year + "\n");
        console.log("IMDB RATING: " + movie.Ratings[0].Value + "\n");
        console.log("ROTTEN TOMATOES RATING: " + movie.Ratings[1].Value + "\n");
        console.log("COUNTRY: " + movie.Country + "\n");
        console.log("LANGUAGE: " + movie.Language + "\n");
        console.log("PLOT: " + movie.Plot + "\n");
        console.log("ACTORS: " + movie.Actors + "\n");
        console.log("===================================");
        // console.log(JSON.stringify(response.venue, null, 2));
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })

}

function doWhatItSays(input) {
    fs.readFile('./random.txt', "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });

}

switch (whatToDo) {
    case "spotify-this-song":
        spotifyThis(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "concert-this":
        concertThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays(userInput);
        break;
}