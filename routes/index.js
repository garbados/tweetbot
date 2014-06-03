var express = require('express');
var router = express.Router();

var db = require('orchestrate')("...")
, Twit = require('twit')

var T = new Twit({
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
});


//
var stream = T.stream('statuses/filter', {
  track: '#gaming, #videogames, #games, #gameclash, #gamedev, #xbox, #xboxlive, #xbox360, #xboxone, #xboxlive, #cod',
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
