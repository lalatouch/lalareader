/* index.js - Main server entrypoint
 *
 * Copyright (C) 2017 LaLaTouch
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

var bluetooth = require('./bluetooth/index');

bluetooth.init();

console.log('Hello, world !');
