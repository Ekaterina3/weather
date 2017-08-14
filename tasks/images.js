'use strict';

/* global require, gulp, config, onError, onSuccess, getEntriesPath, getInitedPlugins */

var imagemin = require('gulp-imagemin');

config.params.imagemin.use = getInitedPlugins(config.params.imagemin.use, NODE_ENV);;

gulp.task('images', function(done) {
	gulp.src(getEntriesPath(config.src.images.entry), { base: config.src.images.path }).
		pipe( imagemin(config.params.imagemin) ).on('error', onError.bind(null, done)).
		pipe( gulp.dest(config.public.images.path) ).
		on('end', onSuccess.bind(null, done));
});
