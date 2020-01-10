var container = document.querySelector('.container');
var btnAnimal = document.querySelector('.btn-animal');
var btnWeather = document.querySelector('.weather');
var input = document.querySelector('input');
var geoloc = document.createElement("div");
geoloc.setAttribute("class", 'test');

btnAnimal.addEventListener('click', callPosition);
btnWeather.addEventListener('click', callWeather);

// get the weather api, and send latitute and lonngitude to the server
function callWeather () {
    console.log('dentro weather');
    if ("geolocation" in navigator) {
        /* la geolocalizzazione è disponibile */
        console.log('dentro geoloc');
        navigator.geolocation.getCurrentPosition(async function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            options = {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var resp = await fetch(`/tempo/${lat},${long}`, options);
            var data = await resp.json();
            console.log(data);
        });
    }
} 

//post the input field, call latitude and long and show it to the document
function callPosition () {
    if ("geolocation" in navigator) {
        /* la geolocalizzazione è disponibile */
        navigator.geolocation.getCurrentPosition(async function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var inputText = document.getElementById('animal').value;
            var apiData = { lat, long, inputText };
            geoloc.innerHTML = 'lat ' + '' + lat + '&emsp;' + 'long ' + '' + long;
    
            var options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(apiData)
            }
            var resp = await fetch('/api', options);
            var data = await resp.json();
            console.log(data);
            
        });
    } else {
        /* la geolocalizzazione NON È disponibile */
        console.log('geoloc non disponibile');
    }
    container.appendChild(geoloc);
}
