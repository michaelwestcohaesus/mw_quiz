'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect')

//Convert scss to css
gulp.task('sass', function () {
  gulp.src('src/stylesheets/scss/*.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('src/stylesheets/css/'));
});
//Minify css
gulp.task('compresscss', function() {
    gulp.src('src/stylesheets/css/*.css')
	    .pipe(cssnano())
	    .pipe(rename({
	  		suffix: '.min'
		}))
	    .pipe(gulp.dest('dist/css/'));
});
//Concat js
gulp.task('concatjs', function() {
  return gulp.src(['src/js/dynamicLoad.js', 'src/js/jsonHandler.js', 'src/js/serializeObject.js', 'src/js/scoreCalculator.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/js/main/'));
});
//Minify js
gulp.task('compressjs', function () {
  gulp.src('src/js/main/main.js')
	    .pipe(uglify())
	    .pipe(rename({
	      suffix: '.min'
	    }))
        .pipe(gulp.dest('dist/js/'));
});
//Minifiy html
gulp.task('minifyhtml', function() {
  return gulp.src('src/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/html/'));
});
//Set up server
// gulp.task('connect', function(){
// connect.server({
//     root: ['dist/'],
//     port: 8000,
//     base: 'http://localhost',
//     livereload: true
// });
// });
//Watch scss, css and js files for changes
gulp.task('default', function () {
	gulp.watch(['src/html/*.html'], ['minifyhtml']);
	gulp.watch(['src/stylesheets/scss/*.scss'], ['sass']);
	gulp.watch(['src/stylesheets/css/*.css'], ['compresscss']);
	gulp.watch(['src/js/*.js'], ['concatjs']);
	gulp.watch(['src/js/main/main.js'], ['compressjs']);
});
