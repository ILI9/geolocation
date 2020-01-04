const express = require('express');
const app = express();
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');
const https = require('https');
const OMDB_apiKey = 'd82d4a5e';

const dataBase = new Datastore('database.db');
dataBase.loadDatabase();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(3000, () => {
    console.log('running on port 3000');
});

// render static file
app.use(express.static('public'));
app.use(express.json());

app.post('/api', function (req, res) {
    var data = req.body;
    data.timestamps = Date.now();
    dataBase.insert(data);
    res.json({
        status: 'succes',
        latitude: data.lat,
        longitude: data.long
    })
    // console.log(dataBase);
});


app.post('/animalo', urlencodedParser, function (req, res) {
    var inputText = req.body.animal;

    dataBase.insert(inputText);
    
    res.redirect('/');
    console.log(req.body.animal);
});


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//     request({
//         uri: `http://www.omdbapi.com/?apikey=${OMDB_apiKey}&s=gatsby`,
//         s: 'gatsby'
//     }).pipe(res)
// });

// app.get('/geo', function(req, res) {
//     fs.readFile('./index.html', function (error, data) {
//         if (error) {
//             res.writeHead(404);
//             res.write('Whoops! File not found!');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// });


module.exports = app;