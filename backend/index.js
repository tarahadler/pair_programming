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

// Empty object to store the info we want about our user
let user = {};

// Hit the user endpoint and pass in the screen_name
client.get('users/show', { screen_name: 'Drake' }, function(error, tweets, response) {

    // if there's an error, console log it and return
    if(error) {
        console.log(error);
        return;
    }

    // otherwise get the data from the body, parse and and store it in our blank object
    let json = JSON.parse(response.body)
    console.log(json.favourites_count);

});


// Create a GET endpoint for when user submits a 'screen_name' on front end


// server setup
app.listen(8080, () => {
    console.log("Server is good to go.")
})