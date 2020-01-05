var xhr = new XMLHttpRequest();

var container = document.querySelector('.container');
var btnAnimal = document.querySelector('.btn-animal');
var input = document.querySelector('input');
var geoloc = document.createElement("div");
geoloc.setAttribute("class", 'test');

btnAnimal.addEventListener('click', callPosition);

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

// function favouriteAnimal () {
//     xhr.open("POST", '/animal', true);
//     //Send the proper header information along with the request
//     // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//     xhr.onreadystatechange = function() { // Call a function when the state changes.
//         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//             // Request finished. Do processing here.
//             console.log('btnAnimal');
            
//         }
//     }
// }

