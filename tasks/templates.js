'use strict';

/* global require, gulp, config, getSvg */

var twig = require('gulp-twig');

gulp.task('templates', ['templates:styleguide', 'templates:pages', 'templates:blocks']);

gulp.task('templates:styleguide', ['svg'], function(done) {
	return gulp.src(config.src.templates.entry).
		pipe( twig({
			base: './',
			functions: [{
				name: 'getSvg',
				func: getSvg
			}],
			data: {
				title: 'Guideline'
			}
		}) ).
		pipe( gulp.dest(config.public.templates.path) );
});

gulp.task('templates:pages', ['svg'], function(done) {
	return gulp.src(config.src.templates.pages.entry).
		pipe( twig({
			base: './',
			functions: [{
				name: 'getSvg',
				func: getSvg
			}],
			data: {
				title: 'Pages'
			}
		}) ).
		pipe( gulp.dest(config.public.templates.pages.path) );
});

gulp.task('templates:blocks', ['svg'], function(done) {
	return gulp.src([config.src.templates.blocks.ignore, config.src.templates.blocks.all]).
		pipe( twig({
			base: './',
			functions: [{
				name: 'getSvg',
				func: getSvg
			}],
			data: {
				title: 'Blocks'
			}
		}) ).
		pipe( gulp.dest(config.public.templates.blocks.path) );
});
