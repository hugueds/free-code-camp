var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var link = 'https://en.wikipedia.org/?curid=';
const rndLink = 'https://en.wikipedia.org/wiki/Special:Random';


$(document).ready(function (e) {

});


$('form').on('submit', function (e) {
    e.preventDefault();
    var search = $('#search-input').val();
    if (!search) return;
    $('#search-input').val('');
    $(".search-input").animate({
        top: '-200'
    });
    clean(getData(search));
    
});

function getData(search) {
    $.ajax({
        url: api + search ,        
        dataType: 'jsonp',
        success: success
    });
}

function success(data) {    
    console.log(data.query);    
    var results = data.query.pages;    
    for (key in results){
        var curr = results[key];        
        console.log(curr)         
        var div = $('<div></div>').addClass('topic');
        var title = $('<a href='+link+curr.pageid+'><h3></h3></a>').addClass('s-title').text(curr.title);
        var snp = $('<h5></h5>').addClass('s-title').html(curr.extract);
        div.append(title);
        div.append(snp);
        $('.res-body').append(div);   
    }   
}

function clean(callback){
    $('.res-body').empty(); 
    return callback;
}