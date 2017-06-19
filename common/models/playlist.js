'use strict';

module.exports = function(Playlist) {

  Playlist.prototype.play = function(cb) {
    console.log("Playing playlist " + this.id);
    this.tracks((err, tracks) => {
    });
	cb(null);
  }

  Playlist.remoteMethod('prototype.play', {
    accepts: [],
    returns: [],
    http: {path: '/play'}
  });

};
