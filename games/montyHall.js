
function action(params,userState) {
	var method = params.split(' ')[0];
	var param = "";
	if (params.length > 2) {
		param = params.split(' ')[1];
	}
	if (params == "") {
		return main.explain(userState);
	}
	if (main[method] != undefined) {
		return main[method](userState);
	} else {
		return "i don't know this method.";
	}
}

var main = {
	
	explain: function(userState) {
		return "@" + userState.username + ", Welcome  to my show! Lets test your math shell we? " +
		"Behind one of the doors 1-3 there is a prize. Choose one of them (!monty [door number])." 
	},
	
	no: function(userState) {
		if (rooms[userState.username] != undefined) {
			return finalPick(rooms[userState.username].firstPick, userState);
		} else {
			return "No? we didnt even start the game. Why so negative @" + 
			userState.username + "?";
		}
	},
	
	yes: function(userState) {
		if (rooms[userState.username] != undefined) {
			var room = rooms[userState.username];
			for (var i = 1; i < 4; i++) {
				if (i != room.firstPick && i != room.revealedDoor) {
					return finalPick(i, userState);
				}
			}
		} else {
			return "I like your positive attitude @" + userState.username + ". " +
			"But maybe you should pick a door first?";
		}
	}
};

main["1"] = function (userState) {return choose(1,userState);}
main["2"] = function (userState) {return choose(2,userState);}
main["3"] = function (userState) {return choose(3,userState);}

var rooms = [];
var scores = [];

function giveScore(points,userState) {
	if (scores[userState.username] == undefined) {
		scores[userState.username] = points;
	} else {
		scores[userState.username] += points;
	}
	return scores[userState.username];
}

function choose(pick,userState) {
	if (rooms[userState.username] == undefined) {
		var room = createRoom(pick,userState);
		return "@" + userState.username + ", you picked door number " + pick + ". " +
		"I reveal door number " + room.revealedDoor + " and it is empty. " +
		"You now have the option to change  your choice or stay with your first pick. " +
		"Would you like to switch? (!monty no or !monty yes)";
	} else {
		return finalPick(pick,userState);
	}
}

function createRoom(pick,userState) {
	var room = {
		firstPick : pick,
		correctDoor : 0,
		revealedDoor : 0
	};
	room.correctDoor = Math.floor(Math.random() * 3) + 1;
	for (var i = 1; i < 4; i++) {
		if (i != room.firstPick && i != room.correctDoor) {
			room.revealedDoor = i;
			break;
		}
	}
	rooms[userState.username] = room;
	return room;
}

function finalPick(pick,userState) {
	if (rooms[userState.username] == undefined) {
		return createRoom(pick,userState);
	}
	var room = rooms[userState.username];
	rooms[userState.username] = undefined;
	if (room.correctDoor == pick) {
		var score = giveScore(1,userState);
		return "PogChamp @" + userState.username + ", you got the right one! " + 
		"You gain one point and now have " + score + ".";
	} else {
		var score = giveScore(-1,userState);
		return "FailFish @" + userState.username + ", you missed, gg. " + 
		"You lose one point and now have " + score + ".";
	}
}

exports.action = action;