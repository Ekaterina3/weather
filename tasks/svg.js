'use strict';

/* global require, extend, gulp, config, onError, onSuccess, getEntriesPath */

var svgmin = require('gulp-svgmin');

gulp.task('svg', function(done) {
	gulp.src(getEntriesPath(config.src.svg.entry), { base: config.src.svg.path }).
		pipe( svgmin(config.params.svgmin).on('error', onError.bind(null, done)) ).
		pipe( gulp.dest(config.public.svg.path) ).
		on('end', onSuccess.bind(null, done));
});
