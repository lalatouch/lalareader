'use strict';

const mpv = require('mpv-controller');
 
var player = new mpv(status => {
    console.log(status);
});

player.limitStatusMessages(5);
 
module.exports = function(Curtrack) {

  Curtrack.fastDir = function(dir, status, cb) {
	var res;
    console.log("dir=" + dir + ", status=" + status);
	if(dir === "forward") {
		if(status === "go") {
			player.increaseSpeed();
			console.log("Go fforward!");
		} else if(status === "stop") {
			player.resetSpeed();
			console.log("Stop fforwarding...");
		} else {
			res = new Error("Wrong status");
			res.status = 400;
		}
	} else if(dir === "backward") {
		if(status === "go") {
			player.seekBackward();
			console.log("Go backward");
		} else if(status === "stop") {
			player.resetSpeed();
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
		// TODO Choose the current track
		player.play("/mnt/Musique/rayman legends.m4a");
		console.log("Playing music");
	} else if(command === "pause") {
		player.togglePause();
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
			// TODO
		} else {
			res = new Error("Value out of bounds");
			res.status = 400;
		}
	} else if(pos === "rel") {
		if(val >= -100 && val <= 100) {
			console.log("Adding " + val + " to current volume");
			// TODO Correct
			if(val>0)
				player.increaseVolume();
			else
				player.decreaseVolume();
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
