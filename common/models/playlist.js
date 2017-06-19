'use strict';

module.exports = function(Playlist) {

  Playlist.prototype.play = function(cb) {
    console.log("Playing playlist " + this.id);
	// TODO
    this.tracks((err, tracks) => {
    });
	cb(null);
  }

  Playlist.remoteMethod('prototype.play', {
    accepts: [],
    returns: [],
    http: {path: '/play'}
  });

  Playlist.prototype.shuffle = function(cb) {
    console.log("Shuffling playlist " + this.id);
	// TODO
    this.tracks((err, tracks) => {
    });
	cb(null);
  }

  Playlist.remoteMethod('prototype.shuffle', {
    accepts: [],
    returns: [],
    http: {path: '/shuffle'}
  });
};
