'use strict';

let async = require("async");

module.exports = function(Playlist) {

	Playlist.prototype.sortedTracks = function(cb) {
		Playlist.app.models.PlaylistTrack.find({
			where: {playlistId: this.id},
			order: "rank",
		}, (err, tracks) => {
			if (err) return cb(err);

			async.map(tracks, (t, cb) => t.track((err, track) => {
				if (err) return cb(err);

				cb(null, track);
			}), cb);
		});
	}

	Playlist.prototype.nearTrack = function(isNext, cb) {
		var r = {};
		r[isNext ? "gt" : "lt"] = Playlist.curTrack.rank;
		console.log("=====================");
		console.log(r);
		console.log("=====================");

		Playlist.app.models.PlaylistTrack.findOne({
			where: {
				playlistId: this.id,
				rank: r
			},
			order: "rank " + (isNext ? "ASC" : "DESC")
		}, cb);
	}

	Playlist.prototype.playTrack = function(track, cb) {
		Playlist.curTrack = track;

		var Curtrack = Playlist.app.models.curTrack;
		Curtrack.filename = track.uri;
		Curtrack.control("stop", err => {
			if (err) cb(err);
			else Curtrack.control("play", cb);
		})
	}

	Playlist.prototype.play = function(cb) {
		console.log("Playing playlist " + this.id);

		// Keep track of the currently playing playlist
		Playlist.curPlaylist = this;
		this.sortedTracks((err, tracks) => {
			if (err) return cb(err);
			this.playTrack(tracks[0], cb);
			
			console.log(tracks);
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

		// Find next track in the playlist
		this.nearTrack(true, (err, track) => {
			if (err) cb(err);
			// Not the last track, play is
			else if (track) this.playTrack(track, cb);
			// No track found <=> last track => play first one
			else this.play(cb);
		});
	}

	Playlist.prototype.previous = function(cb) {
		console.log("Playing previous song");
		// TODO
		this.tracks((err, tracks) => {
		});
		cb(null);
	}
};
