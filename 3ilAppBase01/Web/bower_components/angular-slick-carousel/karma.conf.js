module.exports = function (config) {
  config.set({

    // Base path, that will be used to resolve files and exclude
    basePath: '',

    // Frameworks to use
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: [
      '3ilAppBase01/Web/bower_components/jquery/dist/jquery.js',
      '3ilAppBase01/Web/bower_components/angular/angular.js',
      '3ilAppBase01/Web/bower_components/angular-mocks/angular-mocks.js',

      '3ilAppBase01/Web/bower_components/slick-carousel/slick/slick.js',
      'dist/angular-slick.js',
      'test/**/*.spec.js'
    ],

    // List of files to exclude
    exclude: [],

    // Web server port
    port: 9876,

    // Level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
