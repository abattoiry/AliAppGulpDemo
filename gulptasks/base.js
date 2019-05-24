const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoPrefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence').use(gulp);
const changed = require('gulp-changed');
const fs = require('fs');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');

// 路径
const PATH = {
    allSrc: './src/**/*',
    dist: './dist',
    get allImgs() {
        return `${this.allSrc}.{png,jpg}`;
    }
}

/**
 * 将环境字段写入/src/constants/env.js文件
 *
 * @param {String} env 环境字段
 */
function codeEnv(env) {
    fs.open('./src/constants/env.js', 'w', function (err, fd) {
        const buf = `export default '${env}';`;
        fs.write(fd, buf, 0, 'utf-8', function (err, written, buffer) { });
    });
}

/**
 * 图片压缩并log，但是没有destination
 */
function imgMin(changedFlag) {
    return gulp.src(PATH.allImgs)
        .pipe(imagemin([
            imagemin.gifsicle({ progressive: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ progressive: true }),
            imagemin.svgo({
                progressive: true, plugins: [{ removeViewBox: true },]
            })], {
                verbose: true // 开启图片压缩log
            }))
}

// 删除dist中所有文件
gulp.task('clean', function () {
    return del([
        `${PATH.dist}/**/*`,
    ])
})

// 将scss文件编译到dist文件夹里并改名为acss
gulp.task('scss', function () {
    return gulp.src(`${PATH.allSrc}.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(rename((path) => path.extname = '.acss'))
        .pipe(gulp.dest(PATH.dist))
})

// 将其他文件从src copy到dist
gulp.task('copy', function () {
    return gulp.src([PATH.allSrc, `!${PATH.allSrc}.{scss}`])
        .pipe(gulp.dest(PATH.dist));
})

// 将图片文件压缩到dist
gulp.task('image', function () {
    return imgMin()
        .pipe(gulp.dest(PATH.dist));
})

// 观察文件修改
// 如果是修改文件名字，会触发两次task，是因为vscode做了两次编辑，没想到解决方案，也不重要
// 修改代码只会触发一次
gulp.task('watch', function () {
    // 仅做scss的处理
    watch(`${PATH.allSrc}.scss`, function () {
        runSequence('scss');
    });
    // 图片压缩到dist
    watch(PATH.allImgs, function () {
        return imgMin()
            .pipe(gulp.dest(PATH.dist))
    })
    // 其他文件的copy
    watch([PATH.allSrc, `!${PATH.allSrc}.{scss,png,jpg}`], function () {
        return gulp.src([PATH.allSrc, `!${PATH.allSrc}.{scss,png,jpg}`])
            // 仅处理修改过的文件
            .pipe(changed(PATH.dist))
            .pipe(gulp.dest(PATH.dist));
    })
})

function run(imgFlag) {
    if (imgFlag) {
        runSequence('clean', 'scss', 'copy', 'image', 'watch');
    } else {
        runSequence('clean', 'scss', 'copy', 'watch');
    }
};

module.exports = {
    run: run,
    codeEnv: codeEnv,
    imgMin: imgMin
}
