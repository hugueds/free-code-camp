var display = $('.display');
var sub = $('.sub-display');

var expression = '';
var oper = [];
var result = '';
var ac = false;
var confirm = false;

$(document).ready(function (e) {
	display.text('0');
	sub.text('0');
});


$('.bot-number').on('click', function (e) {
	var v = $(this).text();
	if (confirm) {
		display.text('')
		sub.text('')
		confirm = false;
	}
	display.text() === '0' ? display.text('') : display.text();
	addToDisplay(v);
});

$('.bot-function').on('click', function (e) {
	var ds = display.text();
	var sig = $(this).text();
	if (ds == '0') return;
	oper.push(ds);
	oper.push(sig);
	display.text('0');
	sub.text(oper.join(''));
});



$('#equals').on('click', function (e) {
	var ds = display.text();
	var sig = $(this).text();
	oper.push(ds);
	oper.push(sig);
	console.log(oper)
	sub.text(oper.join(''));
	var expression = oper.join('').slice(0, -1);
	result = eval(expression);
	display.text(result);
	confirm = true;
	oper = [];
	oper.push(result);
});



//1 + 2 - 3 + 4
//3 - 3 + 4
//0 + 4
//4

$('.bot-clear').on('click', function (e) {
	clear();
});

//args.push(parseFloat(num));

function addToDisplay(num) {
	var curr = display.text();
	if (curr.length > 7) return console.log("Size is at Max");
	display.text(curr + num);
	//sub.text(curr+num);
}

function clear() {
	display.text('0');
	if (ac) {
		oper = [];
		//sub.text('0');
		ac = false;
	} else {
		ac = true;
		sub.text('0');
	}

}

























function c(d) {
	for (var i = 0; i < arguments.length; i++)
		console.log(arguments[i]);
}