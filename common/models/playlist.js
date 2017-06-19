'use strict';

module.exports = function(Playlist) {

  Playlist.prototype.play = function() {
    console.log("Playing playlist " + this.id);
    this.tracks((err, tracks) => {
    });
  }

  Playlist.remoteMethod('prototype.play', {
    accepts: {},
    returns: {},
    http: {path: '/play'}
  });

};
