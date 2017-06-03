var gulp = require('gulp');
var rimraf = require('rimraf');

var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.cordova.config');

gulp.task('default', () => {
    console.log("Default!");
});

gulp.task('clean', (done) => {
    rimraf('./www', done);
});

gulp.task('static', ['clean'], () => {
    return gulp.src('./static/**/*.!(html)')
        .pipe(gulp.dest('./www/static'));
});

gulp.task('html', ['static'], () => {
    return gulp.src('./static/*.html')
        .pipe(gulp.dest('./www'));
});

gulp.task('build', ['html'], () => {
    return gulp.src('./src/indexcordova.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest("./www/dist/"));
});