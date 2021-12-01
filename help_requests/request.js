

function requestConstructor(user,title) {
	return {
		name: user["display-name"],
		title: title
	}
}

module.exports = requestConstructor;