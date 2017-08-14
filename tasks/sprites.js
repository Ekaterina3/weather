'use strict';

/* global require, extend, gulp, config */

var spritesmith = require('gulp.spritesmith');
var svgSprite   = require('gulp-svg-sprite');
var Stream      = require('merge-stream');
var svgmin      = require('gulp-svgmin');

gulp.task('sprites', ['sprites:png', 'sprites:svg']);

gulp.task('sprites:png', function(done) {
	var allStreams = new Stream();

	config.arrEntry.forEach(function(entry) {
		// Copy user config for spritesmith
		var spriteConfig = extend({}, config.params.spritesmith);
		// Paths
		var srcPath      = config.src.sprites.png.entry.replace('{{ entry }}', entry);
		var publicPath   = config.public.sprites.png.path;
		var cssPath      = spriteConfig.cssPath.replace('{{ entry }}', entry);

		if (spriteConfig.retinaImgName) {
			spriteConfig.retinaSrcFilter = spriteConfig.retinaSrcFilter.replace('{{ entry }}', entry);
			spriteConfig.retinaImgName   = spriteConfig.retinaImgName.replace('{{ entry }}', entry); // sprite@2x.<entry>.png
		}

		spriteConfig.imgName = spriteConfig.imgName.replace('{{ entry }}', entry); // sprite.<entry>.png

		var spriteData = gulp.src(srcPath)
			.pipe( spritesmith(spriteConfig) )
			.on('error', onError.bind(null, done));

		var imgStream = spriteData.img
			.pipe( gulp.dest(publicPath) )
			.on('error', onError.bind(null, done));

		var cssStream = spriteData.css
			.pipe( gulp.dest(cssPath) )
			.on('error', onError.bind(null, done));

		allStreams.add(imgStream);
		allStreams.add(cssStream);
	});

	return allStreams;
});

gulp.task('sprites:svg', function(done) {
	var allStreams = new Stream();

	config.arrEntry.forEach(function(entry) {
		// Copy user config for spritesmith
		var spriteConfig = extend(true, {}, config.params.svgSprite);
		// Paths
		var srcPath      = config.src.sprites.svg.entry.replace('{{ entry }}', entry);
		var publicPath   = config.public.sprites.svg.path;

		spriteConfig.mode.symbol.sprite = spriteConfig.mode.symbol.sprite.replace('{{ entry }}', entry); // sprite.<entry>.svg

		var spriteData = gulp.src(srcPath)
			.pipe( svgmin() )
			.on('error', onError.bind(null, done))
			.pipe( svgSprite(spriteConfig) )
			.on('error', onError.bind(null, done))
			.pipe( gulp.dest(publicPath) )

		allStreams.add(spriteData);
	});

	return allStreams;
});
