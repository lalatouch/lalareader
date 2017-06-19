'use strict';

module.exports = function(Playlist) {

  Playlist.prototype.play = function(cb) {
    console.log("Playing playlist " + this.id);
	// TODO
    this.tracks((err, tracks) => {
    });
	cb(null);
  }

  Playlist.prototype.shuffle = function(cb) {
    console.log("Shuffling playlist " + this.id);
	// TODO
    this.tracks((err, tracks) => {
    });
	cb(null);
  }

  Playlist.prototype.next = function(cb) {
    console.log("Playing next song");
	// TODO
    this.tracks((err, tracks) => {
    });
	cb(null);
  }

  Playlist.prototype.previous = function(cb) {
    console.log("Playing previous song");
	// TODO
    this.tracks((err, tracks) => {
    });
	cb(null);
  }
};
