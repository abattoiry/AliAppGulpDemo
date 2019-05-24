const gulp = require('gulp');
const { imgMin } = require('./gulptasks/base');

gulp.task('dev', function () {
    require('./gulptasks/dev.env.js');
});

gulp.task('fat', function () {
    require('./gulptasks/fat.env.js');
});

// 图片压缩检查
gulp.task('imgmin-log', function () {
    return imgMin();
})

// src图片压缩并替换原文件
gulp.task('imgmin', function () {
    return imgMin()
        .pipe(gulp.dest('./src'));
})
