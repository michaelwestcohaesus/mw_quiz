'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var jsonminify = require('gulp-jsonminify');
var connect = require('gulp-connect');
var open = require('gulp-open');

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
  return gulp.src(['src/js/serializeObject.js', 'src/js/scoreCalculator.js', 'src/js/jsonHandler.js', 'src/js/dynamicLoad.js'])
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
//Minify json files
gulp.task('minifyjson', function () {
    return gulp.src(['src/data/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/data/'));
});

gulp.task('connect', function() {
  connect.server({
    port: 8080,
  });
});
gulp.task('open', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080/dist/html/'}));
});

//Watch scss, css and js files for changes
gulp.task('watch', function () {
  gulp.watch(['src/data/*json'], ['minifyjson']);
	gulp.watch(['src/html/*.html'], ['minifyhtml']);
	gulp.watch(['src/stylesheets/scss/*.scss'], ['sass']);
	gulp.watch(['src/stylesheets/css/*.css'], ['compresscss']);
	gulp.watch(['src/js/*.js'], ['concatjs']);
	gulp.watch(['src/js/main/main.js'], ['compressjs']);
});

gulp.task('default', ['watch', 'connect', 'open']);
