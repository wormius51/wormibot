module.exports = function (name, displayChar) {
	return {
		name: name,
		displayChar: displayChar,
		moveCount: 0,
		hp: 100,
		action: function () {}, // something the object does each turn
		onCollision: function (other) {}, //called upon collision with other
		onDestroy: function () {}, //called when this object is destoryed
	};
}