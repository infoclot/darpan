'use strict';
const Gulp = require('gulp');
const BrowserSync = require('browser-sync').create();

// Static server
Gulp.task('browsersync', function() {
    BrowserSync.init({
        server: {
            baseDir: './'
        }
    });

    Gulp.watch('assets/styles/**/*', ['styles']);
    Gulp.watch('assets/**/*').on('change', BrowserSync.reload);
    Gulp.watch('/*.html').on('change', BrowserSync.reload);


});
