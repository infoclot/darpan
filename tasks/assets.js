'use strict';

const Gulp = require('gulp');
const Sass = require('gulp-sass');
const Autoprefixer = require('gulp-autoprefixer');

Gulp.task('html', function() {
    return Gulp.src('./src/*.html')
        .pipe(Gulp.dest('.build/'));
});

Gulp.task('styles', function() {
    Gulp.src('./src/styles/index.scss')
        .pipe(Sass().on('error', Sass.logError))
        .pipe(Autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(Gulp.dest('.build/css/'));
});

Gulp.task('fonts', function() {
    return Gulp.src('./src/assets/fonts')
        .pipe(Gulp.dest('.build/fonts'));
});

Gulp.task('images', function() {
    return Gulp.src('./src/assets/images')
        .pipe(Gulp.dest('.build/images'));
});

Gulp.task('misc', function() {
    return Gulp.src('./src/assets/misc')
        .pipe(Gulp.dest('.build/misc'));
});

Gulp.task('fonts', function() {
    return Gulp.src('./src/assets/fonts')
        .pipe(Gulp.dest('.build/fonts'));
});

Gulp.task('store', function() {
    return Gulp.src('./store/*')
        .pipe(Gulp.dest('.build/store'));
});
