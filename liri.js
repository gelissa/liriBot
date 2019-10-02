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
    if (!userInput){
        userInput = "The Sign Ace of Base";
    };
    spotify
        // how do i get more than one reference?
        .search({ type: 'track', query: userInput, limit: 10 })
        .then(function (response) {
            for (i = 0; i <= 9; i++) {
                console.log("===================================" + "\n");
                console.log("ARTIST: " + response.tracks.items[i].artists[0].name + "\n");
                console.log("SONG: " + response.tracks.items[i].name + "\n");
                console.log("LINK: " + response.tracks.items[i].external_urls.spotify + "\n");
                console.log("ALBUM: " + response.tracks.items[i].album.name + "\n");
                console.log("===================================" + "\n");
            }
        })

        .catch(function (err) {
            console.log(err);
        });

        // fs.appendFile("log.txt", actorData + divider, function (err) {
        //     if (err) throw err;
        //     console.log(actorData);
        //   });
}

function concertThis(input) {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios
        .get(queryURL)
        .then(function (response) {
            // handle success
            for (i = 0; i <= 9; i++) {
                var concert = response.data
                // console.log(concert);
                console.log("===================================" + "\n");
                console.log("VENUE: " + concert[i].venue.name + "\n");
                console.log("VENUE LOCATION: " + concert[i].venue.city + "\n");
                console.log("VENUE: " + concert[i].datetime + "\n");
                console.log("===================================" + "\n");
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}

function movieThis(input) {
    if (!userInput){
        userInput = "Mr. Nobody";
    };
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput;

    // console.log(queryURL);
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
        // console.log(data);
        var dataArr = data.split(",");
        whatToDo = dataArr[0];
        userInput = dataArr[1];
        spotifyThis();
        // the fs needs to read what is in the file and parse it at the comma
        // when it does so, the first part becomes process.argv[2]
        // the second part becomes process.argv.slice(3). join(" ")
        // somehow i have to get the terminal to understand that the .txt is an array? or an input?
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

// FINAL COMMENTS:
// I would like to make the content log to the .txt file, which I can work on at a later time.