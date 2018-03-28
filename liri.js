require("dotenv").config();

// grabbing files and packages using npm
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var userArg = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

switch (userArg) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      callSpotify();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;

      default:
      console.log('You need to tell me what to do');
    } 
function getTweets() {
    var params = {
        screen_name: 'ValeriePalo1'
    };
   
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
 
        if (!error) {
            for (var i=0; i < 20; i++) {
                console.log(tweets[i].text);
            };
        };
    });
};


function spotifyThisSong(){
	var params1 = {
        screen_name: 'vale-palo'
    };
   

  lengthCheck();
   spotify.search({ type: 'track', query: title }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(
    "Artist Name: " + data.tracks.items[0].artists[0].name + "\r\n" +
    "Song Name: " + data.tracks.items[0].name + "\r\n" +
    "Song Link: " + data.tracks.items[0].external_urls.spotify + "\r\n" +
    "Album Name: " + data.tracks.items[0].album.name);    

    appendData(data.tracks.items[0].artists[0].name + " " +  data.tracks.items[0].name + " " +
    data.tracks.items[0].external_urls.spotify + " " + data.tracks.items[0].album.name);
  });

}

function movieThis(){
  lengthCheck();
 
  var queryUrl = "http://www.omdbapi.com/?t=" + title  + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movie = JSON.parse(body);
      console.log(movie.Title + "\r\n" +
      "Movie's release year is: " + movie.Year + "\r\n" +
      "Movie's IMDB rating is: " + movie.imdbRating + "\r\n" +
      "Movie's plot is: " + movie.Plot + "\r\n" +
      "Movie's Rotten Tomato rating is: " + movie.Ratings[1].Value + "\r\n" +
      "Movie's country is: " + movie.Country + "\r\n" +
      "Movie's actors are: " + movie.Actors); +
      "Movie's language is: " + movie.Language + "\r\n" +     
      "Movie's plot is: " + movie.Plot + "\r\n" 
         
    }
    appendData(movie.Title + " " + movie.Year + " " + movie.imdbRating + " " + movie.Ratings[1].Value
    + " " + movie.Country + " " + movie.Language + " " + movie.Plot + " " + movie.Actors);
  });
}
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    console.log(dataArr);

    fs.appendFile("log.txt"); 
 
  });
};
