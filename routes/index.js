var express = require('express');
var router = express.Router();


/** twitter api module **/
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'nwTesjrCxeKdLtCGATFMJSQXf',
    consumerSecret: 'N4LadDlA4d0yuLuvrMWKEk1S6H1woqhdXY31dSHkJH7VEbvDOx',
    callback: 'http://localhost:3000/tweets'
});

var db = require('orchestrate')("104758bd-7e1e-4023-9000-12437f96a5a4");

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'nwTesjrCxeKdLtCGATFMJSQXf'
  , consumer_secret:      'N4LadDlA4d0yuLuvrMWKEk1S6H1woqhdXY31dSHkJH7VEbvDOx'
  , access_token:         '212382364-wjqwsJzZvqOzdoGVYbRQzv5JxPcmHfiUtJuYYXgc'
  , access_token_secret:  'QuV99OzEBDijkMB8FIe3Z17xVyCYnHoxJz5EJrg7QZYe7'
});

var stream = T.stream('statuses/filter', {
  track: 'gaming, games, #gameclash, #gamedev, xbox, xboxlive, xbox360, xboxone, #xboxlive, #cod',
  language: 'en'
});
/** the stream **/
stream.on('tweet', function (tweet) {
  db.put("tweets", tweet.id, tweet);
});

/** orchestrate info **/



/* GET home page. */
router.get('/', function(req, res) {
  res.send("works"); 
});

router.get('/gameclash_tweets', function (req, res){

});

module.exports = router;
