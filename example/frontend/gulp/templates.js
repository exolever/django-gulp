/*jslint node: true */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


gulp.task('templates', function () {
    return gulp.src(path.join(conf.paths.src, '/templates/**/*.html'))
      .pipe($.html2tpl('templates.js'))
      .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/templates/')));
});
