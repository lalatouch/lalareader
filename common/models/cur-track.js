'use strict';

module.exports = function(Curtrack) {

  Curtrack.fastDir = function(dir, status, cb) {
    console.log("dir=" + dir + ", status=" + status);
	if(dir === "forward") {
		if(status === "go") {
			// TODO Call player
			console.log("Go fforward!");
		} else if(status === "stop") {
			// TODO Call player
			console.log("Stop fforwarding...");
		}
	} else if(dir === "backward") {
		if(status === "go") {
			// TODO Call player
			console.log("Go backward");
		} else if(status === "stop") {
			// TODO Call player
			console.log("Stop going backward");
		}
	}
	cb(null);
  }
};
