//  gulp
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

//開啟伺服器
gulp.task('connect', function() {
    connect.server();
});
//compass
gulp.task('compass', function() {
  gulp.src('./sass/*.sass')
  .pipe(compass({
    config_file: './config.rb',
    css: 'css',
    sass: 'sass'
  }))
  .pipe(gulp.dest('./css'))
});

//livereload
gulp.task('livereload', function () {  
    livereload.listen();
    gulp.watch('./**').on('change', livereload.changed);
});
//watch
gulp.task('watch', function () {  
     gulp.watch('./sass/*.sass', ['compass']);
});

gulp.task('default', ['compass','connect','watch','livereload'], function(){
    
});
