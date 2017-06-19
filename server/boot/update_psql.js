'use strict';

module.exports = app => {
	var dss = app.dataSources;

	for (var key in dss) if (dss.hasOwnProperty(key)) {
		dss[key].autoupdate(null, err => {
			if (err) module.exports(app);
		});
	}
};
