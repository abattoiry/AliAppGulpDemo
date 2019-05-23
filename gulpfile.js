const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoPrefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence').use(gulp);
const changed = require('gulp-changed');

// 路径
const PATH = {
    allSrc: './src/**/*',
    dist: './dist'
}

// 删除dist中所有文件
gulp.task('clean', function () {
    return del([
        `${PATH.dist}/**/*`,
    ])
})

// 将文件从src copy到dist，去除scss
gulp.task('copy', function () {
    return gulp.src([PATH.allSrc, `!${PATH.allSrc}.scss`])
        .pipe(gulp.dest(PATH.dist));
})

// 将scss文件编译到dist文件夹里并改名为acss，如果当前文件夹既有acss也有scss，scss将会覆盖
gulp.task('scss', function () {
    return gulp.src(`${PATH.allSrc}.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(rename((path) => path.extname = '.acss'))
        .pipe(gulp.dest(PATH.dist))
})

// 观察文件修改
gulp.task('watch', function() {
    // 仅做scss的处理
    gulp.watch(`${PATH.allSrc}.scss`).on('change', function() {
        runSequence('scss');
    });
    gulp.watch([PATH.allSrc, `!${PATH.allSrc}.{scss}`]).on('change', function() {
        return gulp.src([PATH.allSrc, `!${PATH.allSrc}.{scss}`])
            // 仅处理修改过的文件
            .pipe(changed(PATH.dist))
            .pipe(gulp.dest(PATH.dist));
    })
})

gulp.task('default', function () {
    runSequence('clean', 'copy', 'scss', 'watch');
})
