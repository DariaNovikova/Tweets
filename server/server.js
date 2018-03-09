var express = require('express');
var cors = require('cors')
var Twitter = require('twitter');

var app = express();

app.use(cors());

var client = new Twitter({
    consumer_key: 'iQBlRPcYDqGiTMLslZhlMKP6G',
    consumer_secret: 'QbFlWVZpYhYkWvitLtG1Fiwrp7llI9hF9OPql7IoKzMpynP2Rs',
    access_token_key: '969939387386560512-OUfTlVcUc0jS54n2KT9ITGMkZYaYhLY',
    access_token_secret: 'szAC390M2SRDopeJVwwi8RVNWLr04ZpoXRJkaJH47gZJB'
});
app.get('/tweets', function (req, res) {
    client.get('search/tweets', { q: `#${req.query.search}` }, function (error, tweets, response) {
        res.send(tweets.statuses.map(tweet => {
            return {
                'tweetId': tweet.id,
                'tweetText': tweet.text,
                'hashtags': tweet.entities.hashtags.map(hash => `#${hash.text}`).join(' '),
                'userId': tweet.user.id,
                'userName': tweet.user.name,
                'userImg': tweet.user.profile_image_url
            }
        }));
        // res.send(tweets.statuses);
    });
});

app.listen(4000, function () {
    console.log('Listening on port 4000!');
});
