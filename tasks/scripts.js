'use strict';

/* global require, process, NODE_ENV, gulp, config, onError, onSuccess */

/**
 * Полезные ссылки:
 * Webpack documentation: https://webpack.github.io/docs
 *
 * Webpack node.js API documentaion:
 * https://github.com/webpack/docs/wiki/node.js-api
 */
var webpack       = require('webpack');
var webpackConfig = {
	output: {
		path: config.public.scripts.path,
		filename: '[name].js',
		pathinfo: true
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js'],
		alias: {
			'inputmask.dependencyLib': process.cwd() + '/node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib',
			'inputmask': process.cwd() + '/node_modules/jquery.inputmask/dist/inputmask/inputmask',
			'jquery.inputmask': process.cwd() + '/node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask',
			'inputmask.numeric': process.cwd() + '/node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions',
			'inputmask.date': process.cwd() + '/node_modules/jquery.inputmask/dist/inputmask/inputmask.date.extensions',
			// 'handlebars': process.cwd() + '/node_modules/handlebars/dist/handlebars',
		},
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV),
		}),
	],
};

if (NODE_ENV == 'development') {
	webpackConfig.devtool = 'eval';
}

if (NODE_ENV == 'production') {
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin(config.params.uglifyJsPlugin)); // minifying scripts
}

function onComplete(done, error, stats) {
	var log = stats.toString(config.params.statsLog);

	if (error) { // fatal error
		onError(done, error);
	} else if ( stats.hasErrors() ) { // soft error
		onError(done, new gutil.PluginError('webpack', log));
	} else {
		gutil.log('[webpack]', log);
		onSuccess(done);
	}
}

gulp.task('scripts', function(done) {
	webpackConfig.entry = (function() {
		var obj  = {};
		var path = config.src.scripts.entry;
		var name = config.src.scripts.outputName;

		config.arrEntry.forEach(function(entry) {
			obj[name.replace('{{ entry }}', entry)] = path.replace('{{ entry }}', entry);
		});

		return obj;
	})();

	// run webpack
	webpack(webpackConfig, onComplete.bind(null, done));
});
