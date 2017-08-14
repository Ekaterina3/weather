'use strict';

/* global require, gulp, config */

gulp.task('copy', ['copy:fonts', 'copy:favicons', 'copy:githooks']);

/**
 * Copy fonts
 */
gulp.task('copy:fonts', function() {
	return gulp.src(config.src.fonts.all).
		pipe( gulp.dest(config.public.fonts.path) );
});

/**
 * Copy favicons
 */
gulp.task('copy:favicons', function() {
	return gulp.src(config.src.favicons.all).
		pipe( gulp.dest(config.public.favicons.path) );
});

/**
 * Hook tasks
 */
gulp.task('copy:githooks', function() {
	return gulp.src(config.githooks.src.all).
		pipe( gulp.dest(config.githooks.public.path), { mode: 755 } );
});
