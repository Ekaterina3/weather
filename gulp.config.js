'use strict';

var config = {};

/**
 * Entries name
 * @type {Array}
 */
config.arrEntry = ['main'];

/**
 * Configuration for gulp plugins.
 *
 * Using plugins inside plugins:
 *
 * use: {
 *   permanent: { // init always
 *     <full_plugin_name>: [<params>],
 *     ...
 *   },
 *   development: { // init when building for development
 *     ...
 *   },
 *   production: { // init when building for production
 *     ...
 *   },
 * }
 *
 * Example:
 *
 * use: {
 *   produciton: {
 *     'gulp-uglify': [{ compress: true }],
 *     autoprefixer: ['last 10 versions', 'ie >= 8'],
 *   }
 * }
 *
 * @type {Object}
 */
config.params = {
	stylus: {
		'include css': true,
		errors: true,
		use: {
			permanent: {
				jeet: [],
				rupture: [],
			},
			development: {},
			production: {},
		},
	},

	svgSprite: {
		mode: {
			symbol: {
				sprite: '../sprite.{{ entry }}.svg',
			}
		}
	},

	spritesmith: {
		// Base images
		imgName: 'sprite.{{ entry }}.png',
		// Retina images
		retinaSrcFilter: './frontend/sprites/png/{{ entry }}/*@2x.png',
		retinaImgName: 'sprite@2x.{{ entry }}.png',
		// CSS
		cssPath: './frontend/styles/{{ entry }}/0-helpers/',
		cssName: '_sprites-variable-png.styl',
		cssTemplate: 'spriteStylus.template.mustache',
		// Sprite options
		algorithm: 'binary-tree',
		padding: 2,
		cssOpts: {
			functions: false,
			variableNameTransforms: ['camelize'],
		}
	},

	imagemin: {
		progressive: true,
		use: {
			permanent: {
				'imagemin-pngquant': [],
			},
			development: {},
			production: {},
		},
	},

	cssBase64: {
		baseDir: '../../',
		maxWeightResource: 32768,
		extensionsAllowed: ['.gif', '.png', '.svg'],
	},

	postcss: {
		use: {
			permanent: {
				autoprefixer: ['last 10 versions', 'ie >= 8'],
			},
			development: {},
			production: {
				cssnano: [],
			},
		},
	},

	svgmin: {
		/**
		 * All plugin info: https://github.com/svg/svgo
		 * If some plugin redefined - set '<--- redefined' comment to by it right side.
		 * Example:
		 * // cleanupIDs: active:true|param:Object <--- redefined
		 */
		plugins: [{
			cleanupIDs: {
				prefix: '',
				minify: true,
				remove: true,
			},
		}, {
			addClassesToSVGElement: {
				className: '{{ className }}',
			},
		}, {
			removeTitle: true,
		}, {
			removeDesc: {
				removeAny: true,
			},
		},
		// cleanupAttrs: active:true|param:Object
		// removeDoctype: active:true|param:Bool
		// removeXMLProcInst: active:true|param:Bool
		// removeComments: active:true|param:Bool
		// removeMetadata: active:true|param:Bool
		// removeTitle: active:true|param:Bool <--- redefined
		// removeDesc: active:true|param:Object <--- redefined
		// removeUselessDefs: active:true|param:Bool
		// removeXMLNS: active:false|param:Bool
		// removeEditorsNSData: active:true|param:Bool
		// removeEmptyAttrs: active:true|param:Bool
		// removeHiddenElems: active:false|param:Object
		// removeEmptyText: active:true|param:Object
		// removeEmptyContainers: active:true|param:Bool
		// removeViewBox: active:false|param:Bool
		// cleanupEnableBackground: active:true|param:Bool
		// minifyStyles: active:true|param:Object
		// convertStyleToAttrs: active:true|param:Bool
		// convertColors: active:true|param:Object
		// convertPathData: active:true|param:Object
		// convertTransform: active:true|param:Object
		// removeUnknownsAndDefaults: active:true|param:Object
		// removeNonInheritableGroupAttrs: active:true|param:Bool
		// removeUselessStrokeAndFill: active:true|param:Object
		// removeUnusedNS: active:true|param:Bool
		// cleanupIDs: active:true|param:Object <--- redefined
		// cleanupNumericValues: active:true|param:Object
		// cleanupListOfValues: active:false|param:Object
		// moveElemsAttrsToGroup: active:true|param:Bool
		// moveGroupAttrsToElems: active:true|param:Bool
		// collapseGroups: active:true|param:Bool
		// removeRasterImages: active:false|param:Bool
		// mergePaths: active:true|param:Object
		// convertShapeToPath: active:true|param:Bool
		// sortAttrs: active:false|param:Object
		// transformsWithOnePath: active:false|param:Bool
		// removeDimensions: active:false|param:Bool
		// removeAttrs: active:false|param:Object
		// removeElementsByAttr: active:false|param:Object
		// addClassesToSVGElement: active:false|param:Object <--- redefined
		// addAttributesToSVGElement: active:false|param:Object
		// removeStyleElement: active:false|param:Object
		],
	},

	statsLog: {
		colors: true,
		reasons: true,
	},

	uglifyJsPlugin: {
		compress: {
			warnings: false,
			drop_console: true,
			unsafe: false,
		},
		comments: false,
		sourceMap: false,
		beautify: false,
	},
};

/**
 * Githooks paths.
 * @type {Object}
 */
config.githooks = {
	src: {
		all: './.githooks/*',
		path: './.githooks/',
	},

	public: {
		all: './.git/hooks/*',
		path: './.git/hooks/',
	},
};

/**
 * Source paths.
 * @type {Object}
 */
config.src = {
	all:  './frontend/**/*.*',
	path: './frontend/',

	logs: {
		all: './frontend/logs/*.log',
		path: './frontend/logs/',
	},

	templates: {
		all: './frontend/templates/**/*.*',
		path: './frontend/templates/',
		entry: './frontend/templates/index.*',
		pages: {
			all: './frontend/templates/pages/**/*.*',
			path: './frontend/templates/pages/',
			entry: './frontend/templates/pages/*.*',
		},
		blocks: {
			all: './frontend/templates/blocks/**/*.*',
			path: './frontend/templates/blocks/',
			ignore: '!./frontend/templates/blocks/layouts/*.*',
		},
	},

	styles: {
		all: './frontend/styles/**/*.*',
		path: './frontend/styles/',
		entry: './frontend/styles/{{ entry }}/*.*',
	},

	fonts: {
		all: './frontend/fonts/**/*.*',
		path: './frontend/fonts/',
	},

	images: {
		all: './frontend/images/**/*.*',
		path: './frontend/images/',
		entry: './frontend/images/{{ entry }}/**/*',
	},

	svg: {
		all: './frontend/svg/**/*.svg',
		path: './frontend/svg/',
		entry: './frontend/svg/{{ entry }}/**/*',
	},

	sprites: {
		png: {
			all: './frontend/sprites/png/**/*.png',
			path: './frontend/sprites/png/',
			entry: './frontend/sprites/png/{{ entry }}/*.png',
		},

		svg: {
			all: './frontend/sprites/svg/**/*.svg',
			path: './frontend/sprites/svg/',
			entry: './frontend/sprites/svg/{{ entry }}/*.svg',
		}
	},

	favicons: {
		all: './frontend/favicons/**/*.*',
		path: './frontend/favicons/',
	},

	scripts: {
		all: './frontend/scripts/**/*.*',
		path: './frontend/scripts/',
		entry: './frontend/scripts/{{ entry }}/scripts.js',
		outputName: '{{ entry }}/scripts',
	}
};

/**
 * Build paths.
 * @type {Object}
 */
config.public = {
	path: './public_html/',

	assets: {
		all: './public_html/assets/**/*.*',
		path: './public_html/assets/',
	},

	templates: {
		all: './public_html/static/**/*',
		path: './public_html/static/',
		pages: {
			path: './public_html/static/pages/',
		},
		blocks: {
			path: './public_html/static/blocks/',
		},
	},

	styles: {
		all: './public_html/assets/css/**/*',
		path: './public_html/assets/css/',
	},

	fonts: {
		all: './public_html/assets/fonts/*',
		path: './public_html/assets/fonts/',
	},

	images: {
		all: './public_html/assets/img/**/*',
		path: './public_html/assets/img/',
	},

	svg: {
		all: './public_html/assets/svg/**/*.*',
		path: './public_html/assets/svg/',
	},

	sprites: {
		png: {
			all: './public_html/assets/sprites/*.png',
			path: './public_html/assets/sprites/'
		},

		svg: {
			all: './public_html/assets/sprites/*.svg',
			path: './public_html/assets/sprites/'
		}
	},

	favicons: {
		all: './public_html/assets/favicons/**/*.*',
		path: './public_html/assets/favicons/',
	},

	scripts: {
		all: './public_html/assets/js/**/*',
		path: './public_html/assets/js/',
	},
};

module.exports = config;
