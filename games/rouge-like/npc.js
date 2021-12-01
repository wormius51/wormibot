const main = require("./main");
const object = require("./object");

module.exports = {

	rock: function() {
		return object("rock","⊙");
	},
	
	coin: function() {
		var coin = object("coin","$");
		coin.onCollision = function (other) {
			if (other.name === "player") {
				main.changeCoins(1);
				main.destroyObject(this);
			}
		};
		return coin;
	},

	 flower: function() {
		var flower = object("flower","▲");
		flower.action = function () {
			if (this.displayChar === "▲") {
				this.displayChar = "I";
			} else {
				this.displayChar = "▲";
			}			
		};
		return flower;	
	},

	 walky: function() {
		var walky = object("walky",">");
		walky.direction = 0;
		walky.hp = 10;
		walky.action = function () {
			if (Math.random() > 0.7) {
				this.direction = (this.direction + 1) % 4;
			}
			switch (this.direction) {
				case 0:
					this.displayChar = ">";
					main.moveObject(this,1,0);
					break;
				case 1:
					this.displayChar = "^";
					main.moveObject(this,0,1);
					break;
				case 2:
					this.displayChar = "<";
					main.moveObject(this,-1,0);
					break;
				case 3:
					this.displayChar = "v";
					main.moveObject(this,0,-1);
					break;
			}
			
		};
		
		walky.onDestroy = function () {
			main.changeLevel(1);
		};
		
		return walky;
	},
	
	arrow: function () {
		var arrow = object("arrow", "a");
		arrow.direction = 0;
		arrow.action = function () {
			switch (this.direction) {
				case 0:
					this.displayChar = "🠆";
					main.moveObject(this,1,0);
					break;
				case 1:
					this.displayChar = "🠅";
					main.moveObject(this,0,1);
					break;
				case 2:
					this.displayChar = "🠄";
					main.moveObject(this,-1,0);
					break;
				case 3:
					this.displayChar = "🠇";
					main.moveObject(this,0,-1);
					break;
			}
			
		};
		
		arrow.onCollision = function (other) {
			other.hp -= 10;
			if (other.hp <= 0) {
				main.destroyObject(other);
			}
			main.destroyObject(this);
		};
		
		return arrow;
	}
}