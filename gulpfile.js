'use strict';

var Gulp = require('gulp');
var requireDir = require('require-dir');

// Load Tasks
requireDir('./tasks');

//  Build task definition 
Gulp.task('dev-build', ['html', 'fonts', 'images', 'misc', 'styles', 'webpack']);
Gulp.task('prod-build', ['dev-build', 'rev']);

Gulp.task('dev', ['dev-build', 'browsersync']);
Gulp.task('build', ['prod-build']);

Gulp.task('default', ['dev']);
