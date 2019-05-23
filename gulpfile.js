const gulp = require('gulp');

gulp.task('dev', function() {
    require('./gulptasks/dev.env.js');
});

gulp.task('fat', function() {
    require('./gulptasks/fat.env.js');
});