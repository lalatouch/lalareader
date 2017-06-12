/* index.js - Main Bluetooth file
 *
 * Copyright (C) 2017 LaLaTouch
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

module.exports = { }

var noble = require('noble');

function register_events() {
	noble.on('stateChange', function(state) {
		// Possible states: "unknown", "resetting", "unsupported", "unauthorized", "poweredOff", "poweredOn"
		if(state === 'poweredOn') {
			noble.startScanning();
		} else {
			noble.stopScanning();
		}
	});

	noble.on('discover', function(peripheral) {
		console.log('Found device with local name: ' + peripheral.advertisement.localName);
		console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
		console.log();
	});
}

module.exports.init = function() {
	register_events();
}
