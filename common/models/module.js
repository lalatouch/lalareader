'use strict';

let http = require("http"), async = require("async");

module.exports = Module => {
	Module.register = function(req, identifier, cb) {
		// Find if it already exists
		Module.findOne({where: {identifier: identifier}}, (err, mod) => {
			if (err) return cb(err);

			if (mod) {
				mod.ip = req.connection.remoteAddress;
				mod.save(cb);
			}
			else Module.create({
				identifier: identifier,
				ip: req.connection.remoteAddress
			}, cb);
		});
	}

	Module.prototype.playlist = function(cb) {
		Module.app.models.Playlist.findById(this.playlistId, cb);
	}

	Module.prototype.lightUp = function(cb) {
		http.get({
			host: this.ip,
			path: "/led?red=1024&green=1024&blue=1024"
		}, cb);
	}

	Module.prototype.lightDown = function(cb) {
		http.get({
			host: this.ip,
			path: "/led?red=0&green=0&blue=0"
		}, cb);
	}

	Module.prototype.put = function(status, cb) {
		if (["up", "down"].indexOf(status) == -1) return cb(new Error("Invalid status"));

		let Playlist = Module.app.models.Playlist,
		    CurTrack = Module.app.models.curTrack;

		this.isDown = status == "down";
		this.save(err => {
			if (err) return cb(err);

			if (this.isDown) {
				// We put down the figurine
				if (this.playlistId) { // If we are a playlist
					// Is is the playlist currently playing
					if (this.playlistId == (Playlist.curPlaylist || {id: 0}).id)
						// Then we just resume playing
						CurTrack.control("play", cb);
					else // Play the associated playlist
						this.playlist((err, p) => {
							if (err) cb(err);
							else p.play(cb);
						});
				}
				else Module.doSearch(cb);
			}
			else {
				// We took up the figurine
				if (this.playlistId)
					CurTrack.control("pause", cb);
				else Module.doSearch(cb);
			}
		});
	}

	Module.doSearch = function(cb) {
		// Find all modules that are put down with no playlist
		Module.find({where: {
				playlistId: null,
				isDown: true
		}}, (err, mods) => {
			if (err) return cb(err);
			// Load their tags
			async.map(mods, (m, cb) => m.tags(cb), (err, tags) => {
				if (err) return cb(err);

				// Merge tags list
				var tagsIds = [];
				tags.forEach(t => (t || []).forEach(t => {
					if (tagsIds.indexOf(t.id) == -1) tagsIds.push(t.id);
				}));

				// Load links for those tags
				Module.app.models.TagLink.find({where: {
					taggableType: "playlist",
					tagId: {inq: tagsIds}
				}}, (err, links) => {
					if (err) return cb(err);

					// Extract IDs
					links = links.map(l => l.taggableId);
					// Dedupe IDs
					links = links.filter((l, p) => links.indexOf(l) === p);
					// Load corresponding modules
					Module.find({where: {
						playlistId: {neq: null}
					}}, (err, mods) => {
						if (err) return cb(err);

						async.each(mods, (m, cb) => {
							if (links.indexOf(m.playlistId) === -1)
								m.lightDown(cb);
							else m.lightUp(cb);
						}, cb);
					});
				});
			});
		});
	};

	Module.put = function(req, status, cb) {
		// Get module with proper IP
		Module.findOne({
			where: {ip: req.connection.remoteAddress}
		}, (err, mod) => {
			if (err) cb(err);
			else if (mod) mod.put(status, cb);
			else {
				err = new Error("No such module with IP address", req.connection.remoteAddress);
				err.statusCode = 404;
				cb(err);
			}
		});
	}
};

