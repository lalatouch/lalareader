'use strict';

let async = require("async");

module.exports = function(Playlist) {

	Playlist.prototype.sortedTracks = function(cb) {
		Playlist.app.models.PlaylistTrack.find({
			where: {playlistId: this.id},
			order: "rank",
		}, (err, tracks) => {
			if (err) return cb(err);

			async.map(tracks, (t, cb) => t.track(cb), cb);
		});
	}

	Playlist.prototype.play = function(cb) {
		console.log("Playing playlist " + this.id);

		// Keep track of the currently playing playlist
		Playlist.curPlaylist = this;
		this.sortedTracks((err, tracks) => {
			if (err) return cb(err);

			Playlist.app.models.Track.curTrack = tracks[0];

			var Curtrack = Playlist.app.models.curTrack;
			Curtrack.filename = tracks[0].uri;
			Curtrack.control("play", cb);
		});
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
