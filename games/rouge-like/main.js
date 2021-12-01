const tile = require("./tile");
const object = require("./object");
const npc = require("./npc");

const specialCharacter = "░░░░░░███████ ]▄▄▄▄▄▄▄▄▃ ▂▄▅█████████▅▄▃▂ I███████████████████]. ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤♿";
const emptyRow = "__________________________________________________";
var map = [];
var playerPosition = [];
var maxVerView = 8;
var turnNumber = 0;
var player;

function action(params) {
	var method = params.split(' ')[0];
	var param = "";
	if (params.length > 2) {
		param = params.split(' ')[1];
	}
	if (main[method] != undefined) {
		return main[method](param);
	} else {
		return "i don't know this method.";
	}
}

exports.action = action;

var main = {

	initiate: function (mapSize) {
		playerPosition = [Math.floor(mapSize / 2),Math.floor(mapSize / 2)]
		for (var i = 0; i < mapSize; i++) {
			map[i] = [];
			for (var j = 0; j < mapSize; j++) {
				map[i][j] = tile();
			}
		}
		player = object("player", "p");
		map[playerPosition[0]][playerPosition[1]].content = player;
		map[playerPosition[0] - 3][playerPosition[1] - 3].content = npc.rock();
		map[playerPosition[0] - 6][playerPosition[1]].content = npc.flower();
		map[playerPosition[0] - 9][playerPosition[1] - 1].content = npc.walky();
		map[playerPosition[0] - 9][playerPosition[1] - 2].content = npc.walky();
		map[playerPosition[0] - 9][playerPosition[1] - 3].content = npc.walky();
		map[playerPosition[0] - 9][playerPosition[1] - 4].content = npc.walky();
		map[playerPosition[0] - 9][playerPosition[1] - 5].content = npc.walky();
		map[playerPosition[0] - 9][playerPosition[1] - 6].content = npc.walky();
		map[playerPosition[0] - 9][playerPosition[1] - 7].content = npc.walky();
		map[playerPosition[0] - 8][playerPosition[1] - 3].content = npc.coin();
		map[playerPosition[0] + 8][playerPosition[1] + 3].content = npc.coin();
		map[playerPosition[0] + 20][playerPosition[1] + 10].content = npc.coin();
		map[playerPosition[0]][playerPosition[1] + 1].content = npc.coin();
		
	},

	showEmpty: function () {
		var s = "";
		for (var i = 0; i < 8; i++) {
			s += emptyRow;
		}
		return s;
	},
	
	show: function () { //show the part of the map the player can see (50 by 8 frame)
		var s = "";
		var firstRow = playerPosition[1] - maxVerView / 2;
		var lastRow = playerPosition[1] + (maxVerView / 2) - 1;
		var firstCol = playerPosition[0] - 24;
		var lastCol = playerPosition[0] + 25;
		
		for (var y = lastRow; y >= firstRow; y--) {
			for (var x = firstCol; x <= lastCol; x++) {
				var tile = map[x][y];
				if (tile.content == null) {
					s += tile.defaultChar;
				} else {
					s += tile.content.displayChar;
				}
			}
		}
		
		return s;
	},
	
	up: function() {
		moveObject(player, 0, 1);
		return this.show();
	},
	
	down: function() {
		moveObject(player, 0, - 1);
		return this.show();
	},
	
	left: function() {
		moveObject(player, - 1, 0);
		return this.show();
	},
	
	right: function() {
		moveObject(player, 1, 0);
		return this.show();
	},
	
	stats: function() {
		var invString = "";
		for (var i = 0; i < playerStats.inventory.length; i++) {
			invString += playerStats.inventory[i].name + ": " + playerStats.inventory[i].amount;
		}
		return "hp: " + playerStats.hp + ", level: " + playerStats.level + ", inventory: " + invString;
	},
	
	shoot: function(direction) {
		var d = 0;
		var dx = 1;
		var dy = 0;
		switch (direction) {
			case "up":
				d = 1;
				dx = 0;
				dy = 1;
				break;
			case "left":
				d = 2;
				dx = -1;
				dy = 0;
				break;
			case "down":
				d = 3;
				dx = 0;
				dy = -1;
				break;
		}
		var arrow = npc.arrow();
		arrow.direction = d;
		var x = playerPosition[0] + dx;
		var y = playerPosition[1] + dy;
		spawObject(arrow, x, y);
		objectsAct();
		return this.show();
	}
}

function spawObject(obj, x, y) {
	var tile = map[x][y];
	if (tile.content == null) {
		tile.content = obj;
	}
}

function objectsAct() {
	turnNumber++;
	placeRandomObject();
	placeRandomObject();
	placeRandomObject();
	placeRandomObject();
	var firstRow = playerPosition[1] - maxVerView / 2;
	var lastRow = playerPosition[1] + (maxVerView / 2) - 1;
	var firstCol = playerPosition[0] - 24;
	var lastCol = playerPosition[0] + 25;
	
	for (var y = lastRow; y >= firstRow; y--) {
		for (var x = firstCol; x <= lastCol; x++) {
			var tile = map[x][y];
			
			if (tile.content != null) {
				if (tile.content.moveCount < turnNumber) {
					tile.content.moveCount = turnNumber;
					tile.content.action();
				}
			} 
		}
	}
}

function moveObject(obj,dx,dy) {
	var firstRow = playerPosition[1] - maxVerView / 2;
	var lastRow = playerPosition[1] + (maxVerView / 2) - 1;
	var firstCol = playerPosition[0] - 24;
	var lastCol = playerPosition[0] + 25;
	for (var y = lastRow; y >= firstRow; y--) {
		for (var x = firstCol; x <= lastCol; x++) {
			var tile = map[x][y];
			if (tile.content != null && tile.content === obj) {
				
				var newTile = map[x + dx][y + dy];
				if (newTile.content == null) {
					tile.content = null;
					newTile.content = obj;
					if (obj === player) {
						playerPosition[0] = x + dx;
						playerPosition[1] = y + dy;
						objectsAct();
					}
				} else {
					var other = newTile.content;
					newTile.content.onCollision(obj);
					obj.onCollision(other);
				}
				return;
			} 
		}
	}
}

function destroyObject(obj) {
	var firstRow = playerPosition[1] - maxVerView / 2;
	var lastRow = playerPosition[1] + (maxVerView / 2) - 1;
	var firstCol = playerPosition[0] - 24;
	var lastCol = playerPosition[0] + 25;
	
	for (var y = lastRow; y >= firstRow; y--) {
		for (var x = firstCol; x <= lastCol; x++) {
			var tile = map[x][y];
			
			if (tile.content === obj) {
				tile.content.onDestroy();
				tile.content = null;
			} 
		}
	}
}

function placeRandomObject() {
	var obj;
	switch(Math.floor(Math.random() * 4)) {
		case 0:
			obj = npc.rock();
			break;
		case 1:
			obj = npc.coin();
			break;
		case 2:
			obj = npc.walky();
			break;
		case 3:
			obj = npc.flower();
			break;
	}
	
	var dx = Math.floor(Math.random() * 10) - 5;
	var dy = Math.floor(Math.random() * 10) - 5;
	if (dx > 0) {
		dx += 5;
	} else {
		dx -= 5;
	}
	if (dy > 0) {
		dy += 5;
	} else {
		dy -= 5;
	}
	var x = playerPosition[0] + dx;
	var y = playerPosition[1] + dy;
	var tile = map[x][y];
	if (tile.content == null) {
		tile.content = obj;
	}
}

main.initiate(1000);

var playerStats = {
	hp: 100,
	level: 1,
	inventory: [{name: "coins", amount: 5}]
}

function changeCoins(amount) {
	playerStats.inventory[0].amount += amount;
}

function changeLevel(amount) {
	playerStats.level += amount;
}

exports.moveObject = moveObject;
exports.destroyObject = destroyObject;
exports.changeCoins = changeCoins;
exports.changeLevel = changeLevel;
