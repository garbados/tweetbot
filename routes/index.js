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
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
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

});

router.get('/gameclash_tweets', function (req, res){

});

module.exports = router;
