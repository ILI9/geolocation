const express = require('express');
const app = express();
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();
const request = require('request');
const fs = require('fs');
const https = require('https');

const dataBase = new Datastore('database.db');
dataBase.loadDatabase();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(3000, () => {
    console.log(`running on port 3000`);
});



// render static file
app.use(express.static('public'));
app.use(express.json());

app.get('/tempo/:latlon', async function (req, res) {
    var latLong = req.params.latlon.split(',');
    var lat = latLong[0];
    var long = latLong[1];
    var urlApi = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${long}`;
    var fetch_response = await fetch(urlApi);
    var data = await fetch_response.json();
    res.json(data);
});

app.post('/api', function (req, res) {
    var data = req.body;
    data.timestamps = Date.now();
    dataBase.insert(data);
    res.json({
        status: 'succes',
        latitude: data.lat,
        longitude: data.long,
        animal: data.inputText
    })
    // console.log(dataBase);
});


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//     request({
//         uri: `http://www.omdbapi.com/?apikey=${process.env.OMDB_apiKey}&s=gatsby`,
//         s: 'gatsby'
//     }).pipe(res)
// });

module.exports = app;