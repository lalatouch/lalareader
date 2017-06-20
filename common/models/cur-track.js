'use strict';

module.exports = function(Curtrack) {

  Curtrack.fastDir = function(dir, status, cb) {
	var res;
    console.log("dir=" + dir + ", status=" + status);
	if(dir === "forward") {
		if(status === "go") {
			// TODO Call player
			console.log("Go fforward!");
		} else if(status === "stop") {
			// TODO Call player
			console.log("Stop fforwarding...");
		} else {
			res = new Error("Wrong status");
			res.status = 400;
		}
	} else if(dir === "backward") {
		if(status === "go") {
			// TODO Call player
			console.log("Go backward");
		} else if(status === "stop") {
			// TODO Call player
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
		//TODO Play
		console.log("Playing music");
	} else if(command === "pause") {
		//TODO Pause
		console.log("Pausing music");
	} else if(command === "stop") {
		//TODO Stop
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
		} else {
			res = new Error("Value out of bounds");
			res.status = 400;
		}
	} else if(pos === "rel") {
		if(val >= -100 && val <= 100) {
			console.log("Adding " + val + " to current volume");
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
