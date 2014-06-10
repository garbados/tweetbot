var express = require('express');
var router = express.Router();

var db = require('orchestrate')(process.env.ORCHESTRATE_API_KEY)
, Twit = require('twit')

var T = new Twit({
    consumer_key:         process.env.TWITTER_API_KEY
  , consumer_secret:      process.env.TWITTER_API_SECRET
  , access_token:         process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});


//
var default_topics = '#gaming, #videogames, #games, #gameclash, #gamedev, #xbox, #xboxlive, #xbox360, #xboxone, #xboxlive, #cod';
var stream = T.stream('statuses/filter', {
  track: process.env.TWITTER_TOPICS || default_topics,
  language: 'en'
});
/** the stream **/
stream.on('tweet', function (tweet) {
  T.post('statuses/retweet/:id', { id: tweet.id }, function (err, data, response) {

  });
  db.put("tweets", tweet.id, tweet);
});

/** orchestrate info **/



/* GET home page. */
router.get('/', function(req, res) {

  db.newSearchBuilder()
    .collection("tweets")
    .limit(10)
    .offset(0)
    .query("*")
    .then(function (results){
      if(results.body.count > 0){
        res.render("index", {tweets: results.body.results});
      }
    });
});

router.get('/gameclash_tweets:page', function (req, res){
  if(!req.params.page){
    res.redirect("/");
  } else {

  }
});

router.get('/load/tweets/:page', function (req, res){
    db.newSearchBuilder()
      .collection("tweets")
      .limit(10)
      .offset((parseInt(req.params.page) * 10) - 10)
      .query("*")
      .then(function (results){
        console.log(results.body.count);
        res.json({results: results.body});
      })
      .fail(function (err){
        console.log(err);
      });
});

module.exports = router;
