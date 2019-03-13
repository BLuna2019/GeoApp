// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

function getLocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

function geoCallback(position){
    console.log(position);
    //var element= document.getElementById('geolocation');
    //element.innerHTML = 'Latitude: '          + position.coords.latitude          + '\n' +
    //                    'Longitude: '         + position.coords.longitude         + '\n' ;

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    document.getElementById('geolocation').innerHTML = 'Latitude' + lat + '<br>' + 'Longitute' + lon + '<br>'; 
}

function onError(message){
    console.log(message);
}

function initMap() {
    var cct = {lat: 53.346, lng: -6.2588};
    var doylesBar = {lat: 53.3458, lng: -6.2575};
    var map = new google.maps.Map(document.getElementById('map'),
    { 
        zoom: 12,
        center: cct
    }
    );
    var marker = new google.maps.Marker({
        position: cct,
        map: map
        });
    var marker2 = new google.maps.Marker({
        position: doylesBar,
        map: map
        });
}

function openCage(){
    var http = new XMLHttpRequest();
    const url= "https://api.opencagedata.com/geocode/v1/json?q=53.3458+-6.2575&key=feff83919a394174a619760e780f4b57";
    http.open("GET", url );
    http.send();

    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON= JSON.parse(response);
        console.log(responseJSON);

        var city = responseJSON.results[0].components.city;
        var country = responseJSON.results[0].components.country;
        var currency = responseJSON.results[0].annotations.currency.name;

        var oc = "City: " + city + "<br>Country: " + country + "<br>Currency: " + currency;
        document.getElementById('opencage').innerHTML = oc;
        }
}
