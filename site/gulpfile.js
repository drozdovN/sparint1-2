const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const del = require('del');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');

function buildSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}


function buildHtml() {
    return src('src/**/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}


function copy() {
    return src(['src/img/**/*.*'], { base: 'src' })
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function buildJs() {
    return src('src/js/index.js')
      .pipe(webpackStream(require('./webpack.config')))
      .pipe(rename('main.min.js'))
      .pipe(dest('src'))
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
  }

function cleanDist() {
    return del('dist');
}

function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    });
}

function serve() {
    watch(['src/js/**/*.js', '!src/js/**/*.min.js'], buildJs);
    watch('src/scss/**/*.scss', buildSass);
    watch('src/**/*.html', buildHtml);
}



exports.build = series(cleanDist, buildSass, buildHtml, buildJs, copy);
exports.default = series([buildSass, buildJs], parallel(createDevServer, serve));