'use strict';

/* global require, gulp, config, getSvg */

/**
 * Init servers
 * 1. Express server
 * 2. Browser-sync server with proxy to Express server (1)
 */
gulp.task('serve', function() {
	/* 1 */
	var Twig    = require('twig');
	var express = require('express');
	var app     = express();

	/**
	 * Include twig
	 * 1. Disable Twig cache
	 * 2. Define functions
	 * 3. Set twig like engine
	 * 4. Set twig options
	 */
	Twig.cache(false); /* 1 */

	Twig.extendFunction('getSvg', getSvg);

	app.set('view engine', 'twig'); /* 3 */

	app.set('twig options', { /* 4 */
		base: './',
		strict_variables: false
	});

	/**
	 * Path to views
	 */
	app.set('views', './');

	/**
	 * Path to static files:
	 * - css: ./public_html/assets/css/
	 * - js: ./public_html/assets/js/
	 * - img: ./public_html/assets/img/
	 * - fonts: ./public_html/assets/fonts/
	 */
	app.use('/assets', express.static(config.public.assets.path));

	/**
	 * Routing
	 */
	app.get('/static/*.*', function(req, res) {
		// get file name from url
		var fileName = req.url.replace(/static\/|\..*$/g, '') || 'index';

		res.render('frontend/templates/' + fileName);
	});

	/**
	 * Redirects
	 */
	app.get('/static', function(req, res) {
		res.redirect('/static/index.html');
	});

	/**
	 * Start listen
	 */
	var listener = app.listen();
	var port     = listener.address().port;

	/* 2 */
	var browserSync = require('browser-sync').create();

	browserSync.init({
		proxy: 'http://localhost:'   + port,
		host: 'localhost',
		logPrefix: 'Proxy to localhost:' + port,
		startPath: '/static/',
		notify: false,
		tunnel: false,
	});

	// when something change in public folder
	// for us it mean some assets were compiled
	browserSync.watch(config.public.assets.all).on('change', browserSync.reload);

	// special for templates. We watching source code, because they compiling
	// only for the browser when developing
	browserSync.watch(config.src.templates.all).on('change', browserSync.reload);
});
