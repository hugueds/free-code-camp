var key = 'b0kjmp7gykmshKBKKIq9pHUTvQl7p1plbqXjsnS5FPtECsg65I';
var lat, lng;

$(document).ready(function () {
    var geo = navigator.geolocation.getCurrentPosition(success, error);
});

function Weather(data) {
    this.forecast = data.item.forecast;
    this.foreToday = data.item.forecast[0];
    this.today = data.item.condition;
    this.locations = data.location;
    return this;
}


function getWeather() {
    $.ajax({        
        url: 'https://simple-weather.p.mashape.com/weatherdata?lat=' + lat + '&lng=' + lng,
        method: 'GET',
        headers: {
            'X-Mashape-Key': key,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        success: function (data) {
            var data = JSON.parse(data);
            data = data.query.results.channel;
            getToday(data);            
            getFore(data);      
               
        }
    });
}



function success(position, callback) {
    var coord = position.coords;
    lat = coord.latitude;
    lng = coord.longitude;
    c(coord)
    getWeather();
}

function error(){
    lat = -23.6742228;
    lng = -46.5436003;
    getWeather();
}

function getIcon(cond) {
    var icon = {
        "Thunderstorms": 'wi wi-thunderstorm',
        "Scattered Thunderstorms": "wi wi-day-storm-showers",
        "Showers": "wi wi-day-rain-wind",
        "Partly Cloudy": "wi wi-day-cloudy",
        "Scattered Showers": "wi wi-day-showers"
    }
    return icon[cond]
}

function getToday(data) {
    var w = new Weather(data);
    var icon = getIcon(w.today.text);
    var date = w.today.date.slice(0,-5).toLocaleString();
    $(".myCity").html(w.locations.city + ' - ' + w.locations.region + ' / ' + w.locations.country);
    $('.date').html(date);
    $('#temp-today .max').html(w.foreToday.high + ' ºC');
    $('#temp-today .min').html(w.foreToday.low + ' ºC');
    $('#cond-now .temp-now').html(w.today.temp + ' ºC');    
    $('#icon-now').addClass(icon);
}

function getFore(data) {
    var w = new Weather(data);
    c(w);    
    for (day in w.forecast) {
        if (day == 0) continue;
        var icon = getIcon(w.forecast[day].text);        
        
        $('.fore').append(`<div class="f-${day} fore-day">  ${w.forecast[day].day}  </div>`);
        $('.fore').append(`<div class="f-${day} fore-date">  ${w.forecast[day].date} </div>`);
        $('.fore').append(`<div class="f-${day} fore-min">  ${w.forecast[day].low}  </div>`);        
        $('.fore').append(`<div class="f-${day} fore-max">  ${w.forecast[day].high}  </div>`);        
        $('.fore').append(`<i class="f-${day} fore-icon ${icon}" ></i>`);  
        $('.f-'+day).wrapAll('<div class="fore-line">');              
    }
     
}



function c() {
    for (i in arguments)
        console.log(arguments[i])
}
