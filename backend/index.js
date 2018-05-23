// required imports 
const express = require('express'), 
      app = express(); 

const util = require('util');
const Twitter = require('twitter');
const bodyParser = require('body-parser');

// headers to fix CORS issues
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Twitter API Credentials
let client = new Twitter({
    consumer_key: 'BWZkEGkai2eYrWEmVbacMTdJi',
 	consumer_secret: 'y4IFoHISnRpGQbBUFgx51JaiHDxUEYknDoqp2tswijmevQdTtS',
 	access_token_key: '1138274636-mg5b7u1CPE4AEh2ZCxkECQ2PIovzBtf64mrhxPv',
	access_token_secret: 'hG1oxxtR4HALvdg2yx99tR5ykCm0JiKJNHdCRO3TtvH6L'
});


// Create a GET endpoint for when user submits a 'screen_name' on front end
app.post('/username', (req, res) => {

    // the username the frontend provided
    let username = req.body.username;

    // Hit the user endpoint and pass in the screen_name
    client.get('users/show', { screen_name: username }, function(error, tweets, response) {

        // if there's an error, console log it and return
        if(error) {
            console.log(error);
            return;
        }

        // otherwise get the data from the body, parse and and store it in our blank object
        let user_details = JSON.parse(response.body);
        
        // create an object with the details we want
        let user = {
            verified: user_details.verified,
            followers_count: user_details.followers_count,
            friends_count: user_details.friends_count,
            statuses_count: user_details.statuses_count
        }

        // Hit endpoint for user timeline/statuses
        client.get('statuses/user_timeline', { screen_name: username, count: 100 }, function(error, tweets, response) {

            // if there's an error, console log it
            if(error) {
                console.log(error);
                return;
            }

            // otherwise get the last 100 tweet objects
            // these will be sent newest to oldest
            let the_tweets = JSON.parse(response.body);

            // get total retweet number
            let total_rewteets = the_tweets.reduce((acc, curr) => {
                return acc + curr.retweet_count
            }, 0);

            // get total favourites number
            let total_favs = the_tweets.reduce((acc, curr) => {
                return acc + curr.favorite_count
            }, 0);

            // get an array of numbers of retweets for last 100 items
            let retweet_counts = the_tweets.map((elem) => {
                return elem.retweet_count
            });

            // get an array of numbers of favourites for last 100 items
            let favorite_count = the_tweets.map((elem) => {
                return elem.favorite_count
            });

            // SEND BACK ALL THE DATA TO FRONTEND
            let info = {
                user,
                retweet_counts: retweet_counts,
                favorite_count: favorite_count,
                total_rewteets: total_rewteets,
                total_favs: total_favs
            }

            res.json(info);

        });

    });

});


// server setup
app.listen(8080, () => {
    console.log("Server is good to go.")
});