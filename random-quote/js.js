var key = 'b0kjmp7gykmshKBKKIq9pHUTvQl7p1plbqXjsnS5FPtECsg65I';
var q = '<i class="fa fa-quote-left fa-2x"></i>';
var author = '';
var quote = '';
$(document).ready(function () {
    $('#tweet').on("click", function (e) {
        e.preventDefault();
        var myUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" ' + author);
        window.open(myUrl, 'twitter');
        return false;
    });


    $('#get-quote').on('click', function (e) {
        // e.preventDefault();
        $.ajax({
            url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
            method: 'POST',
            headers: {
                'X-Mashape-Key': key,
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            success: function (data) {
                data = JSON.parse(data);
                author = data.author;
                quote = data.quote;
                $('#quote-author').text('- ' + data.author);
                $('#quote-msg').html(q + data.quote);
            }
        });

    });

});