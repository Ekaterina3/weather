'use strict';

/* global require, process */

/**
 * Init gulp and modules to global
 */
global.gulp     = require('gulp');
global.gutil    = require('gulp-util');
global.notifier = require('node-notifier');
global.fs       = require('fs');
global.extend   = require('extend');

/**
 * Init global variables
 */
global.config   = require('./gulp.config.js');
global.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Init global functions
 */
global.onError = function onError(done, error) {
	notifier.notify({
		title: 'Error: ' + error.plugin,
		message: error.message
	});

	done(error);
};

global.onSuccess = function onSuccess(done) {
	done();
};

global.getEntriesPath = function getEntriesPath(path) {
	var arr = [];

	config.arrEntry.forEach(function(entry) {
		arr.push(path.replace('{{ entry }}', entry));
	});

	return arr;
};

/**
 * @param  {Object} plugins
 * @param  {string} env - environment
 * @return {Array} inited plugins
 */
global.getInitedPlugins = function getInitedPlugins(plugins, env) {
	var result  = [];

	if (typeof plugins !== 'object') {
		return result;
	}

	plugins = extend((plugins['permanent'] || {}), (plugins[env] || {}));

	for (var name in plugins) {
		if (plugins.hasOwnProperty(name)) {
			var plugin = require(name);
			var params = plugins[name] || [];

			result.push(plugin.apply(null, params));
		}
	}

	return result;
};

global.getSvg = function getSvg(code, className, dir) {
	var svg = '';

	className = className || '';
	dir       = dir || '';

	if (! code) {
		return svg;
	}

	if (! dir) {
		dir = config.public.svg.path;
	}

	try {
		// file exist
		svg = fs.readFileSync(dir + code + '.svg', 'utf-8');

		return svg.replace(/{{ className }}/, className || '');
	} catch(e) {
		// file not exist
		return svg;
	}
};

/**
 * Tasks paths
 */
require('require-dir')('./tasks', { recurse: true });
