const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || '5000';
const socketer = require('./socketer');
const app = express();

app
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));

const http = require('http');
app.set('port', PORT);
const server = http.createServer(app);

socketer.listen(server);

socketer.getIo().sockets.on('connection', socket => {
	socket.on('win', data => {
		wisperTo(data, "IF YOU SEE THSI YOU BEEN HACKED!!1! Send 2 bitcoins to 34$fakeAdress^7 to unlock your pc. Alternatively you can click this link https://www.youtube.com/watch?v=HJC_d4TO3WQ");
	});
});

server.listen(PORT);

server.on('listening', () => {
	console.log(`Listening at port ${PORT}`);
});

const twitch = require('twitch-js');
const requestManager = require("./help_requests/requestManager");
const cooldownManager = require("./premission/cooldownManager");

const guessTheNumber = require("./games/guessTheNumber");
const rougeLike = require("./games/rouge-like/main");
const cardInfo = require("./info/cardInfo");
const montyHall = require("./games/montyHall");
const bigText = require('./big-text');
const corrupt_string = require('./corrupted_string_finder');

const cooldown = cooldownManager(1000 * 1);
const cycleLengh = 1000 * 60 * 30;
const startingTime = Date.now();
var numberOfComments = 0;

var channelString = "#Wormius51";
var channelName = "wormius51";

const options = {
	options: {
		debug: true
	},
	connection: {
		reconnect: true
	},
	identity: require("./private/identity"),
	channels: [channelString]
};

const client = new twitch.client(options);

client.connect();

client.on("chat", function (channel, userstate, message, self) {
	// Don't listen to my own messages..
	if (self) return;
	if (userstate.username === "Moobot" || userstate.username === "moobot") return;

	numberOfComments++;
	if (message.indexOf("my game") != -1 || message.indexOf("my link") != -1 || message.indexOf("submit command") != -1) {
		var response = "To submit: https://docs.google.com/forms/d/e/1FAIpQLScglnPe7p1PHlQNDx7loKx7FxoAy8WSqG5kvY2Vj0YAAgfZtQ/viewform";
		say(response, userstate);
	}
	if (corrupt_string.doesContain(message ,
		["Wanna become famous?","Buy followers", "bigfollows.com"])) {
		socketer.getIo().emit("play music", "!m \"Spammer alert.\"");
		client.timeout(channelName, userstate.username, 1, "spam");
		return;
	}
	if (!(message[0] === "!")) {
		socketer.getIo().emit("message", message);
		return;
	}

	var command = message.split(' ')[0];
	var params = message.substring(command.length + 1);


	switch (command) {
		case "!onlyfans":
			say("https://www.youtube.com/watch?v=09hWCkA2mNg&t=250s", userstate);
			break;
		case "!termix":
			say("Termix the terrific is finally among us!", userstate);
			break;
		case "!j":
			socketer.getIo().emit("j-spawn", params);
			break;
		case "!variant":
		case "!soccer":
			say("https://wormius.herokuapp.com/chess-ball", userstate);
			break;
		case "!challenge":
			say("https://lichess.org/@/wormius", userstate);
			break;
		case "!paint":
			socketer.getIo().emit("paint", userstate.username, params);
			if (!params)
				say("To draw type \"!paint\" followed by coordinates. For example: !paint 70 5 80 700 green 7", userstate);
			break;
		case "!clear":
			socketer.getIo().emit("clear");
			break;
		case "!uptime":
			let time = uptime();
			var response = time.hours + " hours, " + time.minutes + " minutes, " + time.seconds + " seconds";
			say(response, userstate);
			break;
		case "!music":
		case "!m":
		case "!M":
			socketer.getIo().emit("play music", params);
			break;
		case "!save":
		case "!s":
		case "!S":
			socketer.getIo().emit("save music", {username : userstate.username, musicScript : params});
			break;
		case "!play":
		case "!p":
		case "!P":
			socketer.getIo().emit("play saved music", userstate.username);
			break;
		case "!volume":
		case "!v":
			socketer.getIo().emit("set volume", params);
			break;
		case "!mega":
			var response = "!m 8 d2 d2 d3 0 a2 0 0 g2# 0 g2 0 f2 0 d2 f2 g2 c2 c2 d3 0 a2 0 0 g2# 0 g2 0 f2 0 d2 f2 g2 b1 b1 d3 0 a2 0 0 g2# 0 g2 0 f2 0 d2 f2 g2 bb1 bb1 d3 0 a2 0 0 g2# 0 g2 0 f2 0 d2 f2 g2";
			say(response, userstate);
			break;
		case "!ocarina":
			var response = "!m 8 d3 f3 d 0 0 d3 f3 d 0 0 e 0 0 f e f e c a3 0 0 a3 0 d3 0 f3 g3 a3 0 0 a3 0 d3 0 f3 g3 e3 0 0 d3 f3 d 0 0 d3 f3 d 0 0 e 0 0 f e f e c a3 0 0 a3 0 d3 0 f3 g3 a3 0 0 a3 0 d3 0 0 0 0 0 0 0 d f d5 0 0 d f d5 0 0 e5 0 0 f5 e5 f5 e5 c5 a 0 0 a 0 d 0 f g a 0 0 0 a 0 d 0 f f g e 0 0 0 d f d5 0 0 d f d5 0 0 e5 0 0 f5 e5 f5 e5 c5 a 0 0 a 0 d 0 f g a 0 a 0 a 0 d";
			say(response, userstate);
			break;
		case "!coffin":
			var response = "!m 4 0 b a g# e f#,a3,f3#,d3 0 f# c5# b 0 a 0 g#,b3,g3#,e3 0 g# g# b 0 a g# f#,a3,f3#,c3# 0 f# a5 g5# a5 g5# a5 f#,a3,f3#,c3# 0 f# a5 g5# a5 g5# a5 f#,a3,f3#,d3 0 f# c5# b 0 a 0 g#,b3,g3#,e3 0 g# g# b 0 a g# f#,a3,f3#,c3# 0 f# a5 g5# a5 g5# a5 f#,a3,f3#,c3# 0 f# a5 g5# a5 g5# a5";
			say(response, userstate);
		case "!tetris":
			var response = "!m 4 e5 0 b c5 d5 e5 d5 c5 b a 0 a c5 e5 d5 c5 b 0 b b c5 d5 0 e5 0 c5 0 a 0 a 0 0 d5 0 d5 f5 a5 0 g5 f5 e5 0 e5 c5 e5 d5 c5 b 0 b b c5 d5 0 e5 0 c5 0 a 0 a 0 0 e5 0 b c5 d5 e5 d5 c5 b a 0 a c5 e5 d5 c5 b 0 b c5 d5 0 e5 0 c5 0 a 0 a 0 0 d5 0 d5 f5 a5 0 g5 f5 e5 0 e5 c5 e5 0 d5 c5 b 0 b c5 d5 e5 c5 0 a 0 a 0 0 c5,e5 0 0 c5,a 0 0 d5,b 0 0 b,g# c5,a 0 0 a,e 0 0 g#,e b,g# 0 0 e5,c5 0 0 c5,a 0 0 d5,b 0 0 b,g# 0 0 c5,a 0 e5,c5 0 a5,e5 0 a5,e5 0 g5#,e5 0 0 0 e5,b 0 b,g# c5,a, d5,b e5 d5 c5,a b,g#";
			say(response, userstate);
			break;
		case "!submit":
			var response = "https://docs.google.com/forms/d/e/1FAIpQLScglnPe7p1PHlQNDx7loKx7FxoAy8WSqG5kvY2Vj0YAAgfZtQ/viewform";
			say(response, userstate);
			break;
		case "!queue":
			var response = "https://docs.google.com/spreadsheets/d/1KTfzuLJiP_KsNgObiKDONKn11OprdjnfAHx_0kTCmmU/edit?usp=sharing";
			say(response, userstate);
			break;
		case "!right":
			socketer.getIo().emit("right", userstate.username);
			break;

		case "!left":
			socketer.getIo().emit("left", userstate.username);
			break;

		case "!up":
			socketer.getIo().emit("up", userstate.username);
			break;

		case "!down":
			socketer.getIo().emit("down", userstate.username);
			break;

		case "!hi":
			client.action(channelName, "hello there @" + userstate["display-name"]);
			break;

		case "!hr":
			var response = requestManager.enterLine(userstate, params);
			client.action(channelName, response);
			break;

		case "!hl":
			var response = requestManager.getRequests();
			client.action(channelName, response);
			break;

		case "!next":
			if (isAuthorized(userstate)) {
				var response = requestManager.next();
				client.action(channelName, response);
			}
			break;

		case "!current":
			var response = requestManager.getCurrent();
			client.action(channelName, response);
			break;
		case "!wcurrent":
			var response = requestManager.getCurrent();
			client.whisper(userstate.username, response);
			break;

		case "!commands":
		case "!Commands":
			client.action("wormius51",
				"commands: !m to play music. !paint to paint"
			);
			break;

		case "!color":
			if (isAuthorized(userstate)) {
				client.color(params);
			}
			break;

		case "!guess":
			var response = "@" + userstate["display-name"] + " " + guessTheNumber.guess(params);
			say(response, userstate);
			break;

		case "!randomize":
			if (isAuthorized(userstate)) {
				guessTheNumber.randomize(params);
				client.action(channelName, "The function has been randomized.");
			}
			break;

		case "!!":
			var response = rougeLike.action(params);
			say(response, userstate);
			break;

		case "!monty":
			var response = montyHall.action(params, userstate);
			say(response, userstate);
			break;

		case "!wmode":
			if (isAuthorized(userstate)) {
				wisperMode = true;
				client.action(channelName, "Wisper mode active.");
			}
			break;
		case "!pmode":
			if (isAuthorized(userstate)) {
				wisperMode = false;
				client.action(channelName, "Wisper mode is off.");
			}
			break;
		case "!card":
			var response = cardInfo.info(params);
			say(response, userstate);
			break;
		case "!worm":
			var response = "worm to you too!";
			say(response, userstate);
			break;
		case "!disco":
			var response = "wrong stream.";
			say(response, userstate);
			break;
		case "!punch":
			var response = "can punch too!!";
			say(response, userstate);
			break;
		case "!morse":
			var response = "https://clips.twitch.tv/UnsightlyCourageousCarabeefFeelsBadMan";
			say(response, userstate);
			break;
		case "!join":
			var response = "https://wormius.herokuapp.com/canvas-land";
			say(response, userstate);
			break;
		case "!site":
			var response = "https://wormius.herokuapp.com";
			say(response, userstate);
			break;
		case "!discord":
			var response = "https://discord.gg/Xzzg5T7";
			say(response, userstate);
			break;
		case "!patreon":
			var response = "https://www.patreon.com/wormius";
			say(response, userstate);
			break;
		case "!game":
				var response = "https://wormius51.itch.io/creatures-of-energy";
				say(response, userstate);
				break;
		case "!skill":
			var response = "Want to make games using html? Check out my class on Skillshare https://skl.sh/2Gu5tLH";
			say(response, userstate);
			break;
		case "!big":
			var response = bigText(params);
			client._sendMessage(0, channelName, response);
			break;
		case "!load":
			if (isAuthorized(userstate)) {
				bigText.load();
			}
	}
});

var wisperMode = false;
var sayCommandsCycle = setInterval(() => {
	sayPeriodically("My games: https://wormius.herokuapp.com/games");
}, cycleLengh);
var pingCycle = setInterval(ping, 5000);

function ping () {
	client.ping().catch(reason => {
		console.log(reason);
	});
}

function sayCommands() {
	if (numberOfComments < 3) return;
	numberOfComments = 0;
	client.action("wormius51",
		"commands: !m to play music. !paint to paint"
	);
	setTimeout(sayItchLink, cycleLengh / 2);
}

function saySkill() {
	client.action("wormius51", "Want to make games using html? Check out my class on Skillshare https://skl.sh/2Gu5tLH");
}

function saySite() {
	client.action("wormius51", "Check out my site: https://wormius.herokuapp.com");
}

function saySteam() {
	client.action("wormius51", "The store page is now live on: https://store.steampowered.com/app/1354800/Really_Bad_Flying_Machine/");
}

function sayPeriodically (text) {
	if (numberOfComments < 3) return;
	numberOfComments = 0;
	client.action("wormius51", text);
}

function say (response, userstate) {
	if (wisperMode) {
		client.whisper(userstate.username, response);
	} else {
		client.action(channelName, response);
	}
}

function wisperTo (username, message) {
	client.whisper(username, message);
}

function sayItchLink () {
	say("https://wormius51.itch.io");
}

function isAuthorized (userstate) {
	return userstate["badges-raw"].match("broadcaster.*") || userstate.mod;
}

function uptime () {
	let miliseconds = Date.now() - startingTime;
	let seconds = Math.floor(miliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	seconds %= 60;
	minutes %= 60;
	return {
		seconds: seconds,
		minutes: minutes,
		hours: hours
	};
}