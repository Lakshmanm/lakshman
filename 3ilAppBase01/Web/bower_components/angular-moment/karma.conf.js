/* License: MIT.
 * Copyright (C) 2013, 2014, 2015, Uri Shaked.
 */

'use strict';

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		logLevel: config.LOG_INFO,
		browsers: ['PhantomJS'],
		autoWatch: true,
		reporters: ['dots', 'coverage'],
		files: [
			'3ilAppBase01/Web/bower_components/angular/angular.js',
			'3ilAppBase01/Web/bower_components/moment/moment.js',
			'3ilAppBase01/Web/bower_components/moment/{locale,lang}/fr.js',
			'3ilAppBase01/Web/bower_components/moment-timezone/moment-timezone.js',
			'angular-moment.js',

			// angular-mocks defines a global variable named 'module' which confuses moment-timezone.js.
			// Therefore, it must be included after moment-timezone.js.
			'3ilAppBase01/Web/bower_components/angular-mocks/angular-mocks.js',

			'tests.js'
		],
		preprocessors: {
			'angular-moment.js': 'coverage'
		},
		coverageReporter: {
			type: 'lcov',
			dir: 'coverage/'
		}
	});
};
