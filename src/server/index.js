const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');

var aylien = require("aylien_textapi");

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var textapi = new aylien ({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

console.log(`Your API ID is ${process.env.API_ID}`);
console.log(`Your API KEY is ${process.env.API_KEY}`);

let articleData = {};

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
})

app.post('/analysis', function(req, res) {
    textapi.sentiment({
        url : req.body.url
    }, (error, response) => {
        if(error==null) {
            articleData = {
                "polarity" : response.polarity,
                "subjectivity" : response.subjectivity,
                "text" : response.text,
                "polarity_confidence" : response.polarity_confidence,
                "subjectivity_confidence" : response.subjectivity_confidence
            }
            res.send(articleData);
            console.log(articleData);
        } else {
            console.log('Error', error);
        }
    })
});