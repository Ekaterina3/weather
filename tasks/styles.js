'use strict';

/* global require, NODE_ENV, gulp, config, onError, onSuccess, getEntriesPath, getInitedPlugins */

var stylus     = require('gulp-stylus');
var cssGroupMQ = require('gulp-group-css-media-queries');
var cssBase64  = require('gulp-css-base64');
var postcss    = require('gulp-postcss');

var postcssPlugins = getInitedPlugins(config.params.postcss.use, NODE_ENV);

config.params.stylus.use = getInitedPlugins(config.params.stylus.use, NODE_ENV);

gulp.task('styles', function(done) {
	gulp.src(getEntriesPath(config.src.styles.entry), { base: config.src.styles.path }).
		pipe( stylus(config.params.stylus).on('error', onError.bind(null, done)) ).
		pipe( NODE_ENV == 'production' ? cssGroupMQ().on('error', onError.bind(null, done)) : gutil.noop() ).
		pipe( postcss(postcssPlugins).on('error', onError.bind(null, done)) ).
		pipe( cssBase64(config.params.cssBase64).on('error', onError.bind(null, done)) ).
		pipe( gulp.dest(config.public.styles.path) ).
		on('end', onSuccess.bind(null, done));
});
