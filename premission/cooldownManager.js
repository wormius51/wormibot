
function coodownManagerConstructor(cooldown) {
	return {
		cooldownTime: cooldown,
		store: {},
		
		touch: function (commandName,userName) {
			if (!this.store[commandName]) {
				this.store[commandName] = {};
			}
			this.store[commandName][userName] = Date.now();
		},
		
		canUse: function (commandName,userName) {
			if (!this.store[commandName]) return true;
			if (!this.store[commandName][userName]) return true;
			return this.store[commandName][userName] + this.cooldownTime < Date.now();
		}
	};
}


module.exports = coodownManagerConstructor;