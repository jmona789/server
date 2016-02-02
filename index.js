// Create an app that has two web servers.
// One that listens on port 7000 and one that listens on port 7500.
// The one listening on port 7000 will always tell the user something good about themselves.
// The one listening on 7500 will always tell the user something bad about themselves.
// Make sure you create a Github repo and commit this code!
// ** Bonus **

// Generate the good / bad phrase randomly from a list of predefined phrases
// Use the twitter package inside the response to also return a random tweet!

var http = require("http");
var Twitter = require("twitter");
var keys = require("./keys.js");
//grabs twitter api keys from keys.js file
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
var PORT = 7000;
var goodThings = ["You're awesome", "You have great taste", "You look fantastic today", "You are an expert developer"]
var badThings =["You suck bro", "You're having a bad hair day", "That dress does make you look fat", "You're a bad person and you should feel bad"]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var handleRequest = function (req, res) {
  var num = getRandomInt(0, goodThings.length);
  res.end(goodThings[num]);
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("Server is listening at http://localhost:%s", PORT);
});

var PORT2 = 7500;

var handleRequest = function (req, res) {
  var num = getRandomInt(0, badThings.length);
  res.end(badThings[num]);
}

var server = http.createServer(handleRequest);

server.listen(PORT2, function() {
  console.log("Server is listening at http://localhost:%s", PORT2);
});

client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
   console.log(tweets);
});