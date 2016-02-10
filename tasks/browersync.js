'use strict';
const Gulp = require('gulp');
const BrowserSync = require('browser-sync').create();

// Static server
Gulp.task('browsersync', function() {
    BrowserSync.init({
        server: {
            baseDir: '.build'
        }
    });

    Gulp.watch('src/styles/**/*', ['styles']);
    Gulp.watch('src/*.html', ['html']);
    Gulp.watch('.build/**/*').on('change', BrowserSync.reload);

});
