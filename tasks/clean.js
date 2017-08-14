'use strict';

/* global require, gulp, config */

var rimraf = require('rimraf');

gulp.task('clean', ['clean:assets', 'clean:templates', 'clean:logs']);

gulp.task('clean:assets', function(cb) {
	return rimraf(config.public.assets.path + '/*', cb);
});

gulp.task('clean:templates', function(cb) {
	return rimraf(config.public.templates.path + '/*', cb);
});

gulp.task('clean:logs', function(cb) {
	return rimraf(config.src.logs.all, cb);
});

gulp.task('clean:githooks', function(cb) {
	return rimraf(config.githooks.public.all, cb);
});
