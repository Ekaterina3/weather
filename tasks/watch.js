'use strict';

/* global require, gulp, config */

var watch = require('gulp-watch');

gulp.task('watch', function() {

	// NOTE: It don't watching templates files. See task 'serve' for more detail.

	watch(config.src.scripts.all, function (evt) {
		gulp.start('scripts');
	});
	watch(config.src.styles.all, function (evt) {
		gulp.start('styles');
	});
	watch(config.src.images.all, function (evt) {
		gulp.start('images');
	});
	watch(config.src.svg.all, function (evt) {
		gulp.start('svg');
	});
	watch(config.src.sprites.png.all, function (evt) {
		gulp.start('sprites:png');
	});
	watch(config.src.sprites.svg.all, function (evt) {
		gulp.start('sprites:svg');
	});
	watch(config.src.fonts.all, function (evt) {
		gulp.start('copy:fonts');
	});
	watch(config.src.favicons.all, function (evt) {
		gulp.start('copy:favicons');
	});
});
