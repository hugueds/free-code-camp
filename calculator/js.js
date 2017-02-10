var display = $('.display');
var sub = $('.sub-display')
var expression = '';
var oper = [];
var result = '';


$(document).ready(function(e){
	display.text('0');
});


$('.bot-number').on('click', function(e){
	var v = $(this).text();
	display.text() === '0' ? display.text('') : display.text();
	addToDisplay(v);
});

$('.bot-function').on('click', function(e){
	var txt = display.text();
	if (txt == '0') return;
	var sig = $(this).text();
	if (sig == '\=') return;	
	var s = sub.text();	
	sub.text(s + txt + sig);
	display.text('0');
});

$('#equals').on('click', function(e){
	var a = sub.text().slice(0,-1);	
	result = eval(a);
	display.text(result);
});



//1 + 2 - 3 + 4
//3 - 3 + 4
//0 + 4
//4

$('.bot-clear').on('click', function(e){
	clear();
});

//args.push(parseFloat(num));

function addToDisplay(num){
	var curr = display.text();
	if (curr.length > 7) return console.log("Size is at Max");
	display.text(curr+num);	
}

function clear(){
	display.text('0');
	args = [];
}

























function c(d){
	for(var i=0;i<arguments.length;i++)
		console.log(arguments[i]);
}