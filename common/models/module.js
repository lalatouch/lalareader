'use strict';

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
};

