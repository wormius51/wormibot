const Request = require("./request.js");


var requests = [];

function enterLine(user, title) {
	if (!title) {
		return "@" + user["display-name"] + ", please enter a title to your request";
	}
	var request = Request(user,title);
	requests[requests.length] = request;
	return "@" + user["display-name"] + ", your request has been saved. Your number is " + requests.length;
}

function getRequests() {
	var s = "";
	for (var i = 0; i < requests.length; i++) {
		var request = requests[i];
		s += "(" + (i + 1) + ") " + request.name + ": " + request.title + ".";
	}
	return s;
}

function next() {
	if (requests.length < 1) {
		return "end for the line";
	}
	requests.shift();
	var request = requests[0];
	if (!request) return "no more requests";
	return request.name + ": " + request.title;
}

function getCurrent() {
	if (!requests || requests.length < 1) return "no more requests";
	var request = requests[0];
	if (!request.name) return "no more requests";
	return request.name + ": " + request.title;
}

exports.enterLine = enterLine;
exports.getRequests = getRequests;
exports.next = next;
exports.getCurrent = getCurrent;