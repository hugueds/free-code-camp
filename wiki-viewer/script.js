$(document).ready(function (e) {

});


$('#abc').on('click', function (e) {
    $('#abc').animate({
        left: '500px'
    });
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
        url: '//en.wikipedia.org/w/api.php',
        data: {
            action: 'query',
            list: 'search',
            srsearch: search,
            format: 'json'
        },
        dataType: 'jsonp',
        success: success
    });
}

function success(data) {
    var results = data.query.search;
    results.map(function (a) {        
        var div = $('<div></div>').addClass('topic');
        var title = $('<h3></h3>').addClass('s-title').text(a.title);
        var snp = $('<h5></h5>').addClass('s-title').html(a.snippet);
        div.append(title);
        div.append(snp);
        $('.res-body').append(div);        
    });
    
}

function clean(callback){
    $('.res-body').empty(); 
    return callback;
}