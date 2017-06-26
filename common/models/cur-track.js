'use strict';

const mpv = require('node-mpv');

var player = new mpv({
	"audio_only": true
});

var playerStat = { mute: false,
	pause: false,
	volume: 100,
	filename: 'sample.mp3',
	'playlist-pos': 0,
	'playlist-count': 0,
	loop: false
};

player.on('statuschange', function(status){
	console.log(status);
	playerStat = status;
});

module.exports = function(Curtrack) {

	Curtrack.fastDir = function(dir, status, cb) {
		var res;
		console.log("dir=" + dir + ", status=" + status);
		if(dir === "forward") {
			if(status === "go") {
				player.speed(10);
				console.log("Go fforward!");
			} else if(status === "stop") {
				player.speed(1);
				console.log("Stop fforwarding...");
			} else {
				res = new Error("Wrong status");
				res.status = 400;
			}
		} else if(dir === "backward") {
			if(status === "go") {
				// TODO Go backward...
				player.seek(-5);
				console.log("Go backward");
			} else if(status === "stop") {
				player.speed(1);
				console.log("Stop going backward");
			} else {
				res = new Error("Wrong status");
				res.status = 400;
			}
		} else {
			res = new Error("Wrong direction");
			res.status = 400;
		}
		cb(res);
	}

	Curtrack.control = function(command, cb) {
		console.log("command=" + command);
		var res;
		if(command === "play") {
			if(playerStat.pause == true && playerStat['playlist-count'] > 0)
				player.togglePause();
			else
				player.loadFile("songs/" + (this.filename || "sample.mp3"));
			console.log("Playing music");
		} else if(command === "pause") {
			player.pause();
			console.log("Pausing music");
		} else if(command === "stop") {
			player.stop();
			console.log("Stopping music");
		} else {
			res = new Error("Command not recognized");
			res.status = 400;
		}
		cb(res);
	}

	Curtrack.volume = function(pos, val, cb) {
		console.log("pos=" + pos + ", val = " + val);
		var res;
		if(pos === "abs") {
			if(val >= 0 && val <= 100) {
				console.log("Set absolute volume to " + val);
				player.volume(val);
			} else {
				res = new Error("Value out of bounds");
				res.status = 400;
			}
		} else if(pos === "rel") {
			if(val >= -100 && val <= 100) {
				console.log("Adding " + val + " to current volume");
				player.adjustVolume(val);
			} else {
				res = new Error("Value out of bounds");
				res.status = 400;
			}
		} else {
			res = new Error("Wrong positionning");
			res.status = 400;
		}
		cb(res);
	}
};
