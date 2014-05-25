var express = require('express');
var router = express.Router();


/** twitter api module **/
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'nwTesjrCxeKdLtCGATFMJSQXf',
    consumerSecret: 'N4LadDlA4d0yuLuvrMWKEk1S6H1woqhdXY31dSHkJH7VEbvDOx',
    callback: 'http://localhost:3000/tweets'
});

var CronJob = require("cron").CronJob;


/** orchestrate info **/

var db = require('orchestrate')("104758bd-7e1e-4023-9000-12437f96a5a4");


db.get("twitter_creds", "usercred")
  .then(function (results){
    if(results.body.access && results.body.secret){
      twitter.search("show", {q: "gaming"}, results.body.access, results.body.secret,
        function (error, data, response){
          console.log("error :      " + error);
          console.log("data :      " + data);
          console.log("response :      " + response);
        });
    }
  });

/* GET home page. */
router.get('/', function(req, res) {
  // db.get("twitter_creds", "usercred")
  //   .then(function (results){
  //
  //   });
  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
      db.put("twitter_creds", "tweetbot", {
        key: requestToken,
        secret: requestTokenSecret
      });
      res.redirect("https://twitter.com/oauth/authenticate?oauth_token=" + requestToken);
    }
  });
});

router.get('/tweets', function (req, res){
  var oauth_verifier = req.param("oauth_verifier");
  var requestToken = req.param("oauth_token");
  db.get("twitter_creds", "tweetbot")
    .then(function (results){

      secretToken = results.body.secret;
      twitter.getAccessToken(requestToken, secretToken, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            db.put("twitter_creds", "usercred", {
              access: accessToken,
              secret: accessTokenSecret
            });
        }
      });
    });
});

module.exports = router;
