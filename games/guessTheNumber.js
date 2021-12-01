var bound = 500;
var magicNumber = 500;
var params = [1,0,0,0];
function guess(number) {
	number = number * 1;
	var temp = magicNumber;
	if (number === magicNumber) {
		changeNumber();
		return "YOU WIN!!! Kappa";
	} else if (Math.abs(number) > bound) {
		return "it's only between -" + bound + " and " + bound;
	} else {
		changeNumber();
		return "naaa.... it was " + temp + ".";
	}
}

function mystoryFunction(number) {
	var sum = 0;
	
	for (var i = 0; i < params.length; i++) { // a * x ^ 0 + b * x ^ 1 + c * x ^ 2 ...
		sum += params[i] * Math.pow(number,i);
	}
	
	return sum;
}

function randomize(newBound) {
	newBound = Math.floor(newBound * 1);
	if (newBound > 0) {
		bound = newBound;
	}
	for (var i = 0; i < params.length; i++) {
		params[i] = Math.floor(20 * Math.random() - 10);
	}
	changeNumber();
}

function changeNumber() {
	magicNumber = Math.floor(mystoryFunction(magicNumber)) % bound;
}

randomize();
exports.guess = guess;
exports.randomize = randomize;