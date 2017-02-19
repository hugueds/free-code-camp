const key = 'b0kjmp7gykmshKBKKIq9pHUTvQl7p1plbqXjsnS5FPtECsg65I';
var lat, lng;
const scales = {
    "celsius" : 'ºC',
    "farenheit" : 'ºF'
};

var currScale = scales["celsius"];
//var currScale = scales["farenheit"];

$(document).ready(function () {
    var geo = navigator.geolocation.getCurrentPosition(success, error);
    $('#bot-change').on('click', function(e){
        currScale == 'ºC' ? $(this).text(scales["celsius"]) : $(this).text(scales["farenheit"]);
        currScale == 'ºC' ? currScale = scales["farenheit"] : currScale = scales["celsius"];        
        getWeather();
        c(currScale)     
    });
});

function Weather(data) {    
    this.forecast = data.item.forecast;
    this.foreToday = data.item.forecast[0];
    this.today = data.item.condition;
    this.locations = data.location;    
    if (currScale == 'ºC') return this; 
    else{      
        this.today.temp = toFarenheit(this.today.temp);
        this.foreToday.high = toFarenheit(this.foreToday.high);
        this.foreToday.low = toFarenheit(this.foreToday.low);
    }    
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
    return icon[cond];
}

function getBg(cond){
    var bg = {
        "Thunderstorms": 'https://dreamlandia.com/images/T/thunderstorm.jpg',
        "Scattered Thunderstorms": "https://dreamlandia.com/images/T/thunderstorm.jpg",
        "Showers": "https://s-media-cache-ak0.pinimg.com/originals/49/00/05/4900051c6f4da2f5e55cc87878b7f1e5.jpg",
        "Partly Cloudy": "http://combiboilersleeds.com/images/cloudy/cloudy-8.jpg",
        "Scattered Showers": "https://s-media-cache-ak0.pinimg.com/originals/49/00/05/4900051c6f4da2f5e55cc87878b7f1e5.jpg",
        "Sunny": 'https://cdn.pixabay.com/photo/2015/05/30/19/55/desert-790640_960_720.jpg'
    }
    return bg[cond]
}

function getToday(data) {
    var w = new Weather(data);
    var icon = getIcon(w.foreToday.text); 
    var bg = getBg(w.foreToday.text);
    var date = w.today.date.slice(0,-5).toLocaleString();    
    $(".myCity").html(w.locations.city + ' - ' + w.locations.region + ' / ' + w.locations.country);
    $('.date').html(date);
    $('#temp-today .max').html(w.foreToday.high + currScale);
    $('#temp-today .min').html(w.foreToday.low + currScale);
    $('#cond-now .temp-now').html(w.today.temp + currScale);    
    $('#icon-now').addClass(icon);
    $('body').css('background-image', "url("+ bg + ")");
}

function getFore(data) {
    var w = new Weather(data);    
    $('.fore').html('');
    $('.fore-line').html('');
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


function toFarenheit(temp){
    temp = parseFloat(temp, 10);
    return (temp * 9/5) + 32;
}

function toCelsius(temp){
    return (temp  - 32) * (5/9);
}


function c() {
    for (i in arguments)
        console.log(arguments[i])
}
