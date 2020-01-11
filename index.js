const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;
require('dotenv').config();

const dataBase = new Datastore('database.db');
dataBase.loadDatabase();

app.listen(port, () => {
    console.log(`running on port ${process.env.PORT}`);
});

// render static file
app.use(express.static('public'));
app.use(express.json());

app.get('/tempo/:latlon', async function (req, res) {
    var latLong = req.params.latlon.split(',');
    var lat = latLong[0];
    var long = latLong[1];
    var weather_url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${lat},${long}`;
    var weather_resp = await fetch(weather_url);
    var weather_data = await weather_resp.json();

    var latBerlin = 52.520007;
    var longBerlin = 13.404954;
    var airQ_url = `https://api.openaq.org/v1/latest?coordinates=${latBerlin},${longBerlin}`;
    var aq_resp = await fetch(airQ_url);
    var aq_data = await aq_resp.json();

    var data = {
        weather: weather_data,
        airQuality: aq_data
    }
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