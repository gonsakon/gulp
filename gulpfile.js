//  gulp
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    minifyCSS = require('gulp-minify-css'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync');


// 編譯 jade 任務
gulp.task('jade', function () {
  gulp.src('./src/jade/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./'))
});
//開啟伺服器
gulp.task('connect', function() {
    connect.server();
});
//檢查js
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//合併與壓縮js
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));
});
//compass
gulp.task('compass', function() {
  gulp.src('./src/sass/*.sass')
  .pipe(compass({
    config_file: './src/config.rb',
    css: './dist/css',
    sass: './src/sass'
  }))
  .pipe(gulp.dest('./dist/css'))
});
//壓縮CSS
gulp.task('minify-css', function() {
  gulp.src('./dist/css/all.css')
    .pipe(minifyCSS())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('./dist/css'))
});

//livereload
gulp.task('livereload', function () {  
    livereload.listen();
    gulp.watch('*.*').on('change', livereload.changed);
});
//跨載具
gulp.task('browser-sync', function() {
    browserSync.init(['./*.*','./**'], {
        server: {
            baseDir: "./"
        }
    });
});
//watch
gulp.task('watch', function () {  
     gulp.watch('./src/sass/*.sass', ['compass']);
     gulp.watch('./dist/css/*.css', ['minify-css']);
     gulp.watch('./src/js/*.js', ['lint','scripts']);
     gulp.watch('./src/jade/*.jade', ['jade']);
});

gulp.task('default', 
  [
  'compass',
  'connect',
  'watch',
  'livereload',
  'scripts',
  'lint',
  'minify-css',
  'jade',
  'browser-sync'], function(){
    
});
