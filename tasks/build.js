'use strict';

/* global gulp */

gulp.task('build:dev', ['scripts', 'sprites', 'svg', 'templates', 'styles', 'images', 'copy']);
gulp.task('build:prod', ['scripts', 'sprites', 'svg', 'styles', 'images', 'copy']);
