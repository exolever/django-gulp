/*jslint node: true */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('html-dev', ['inject'], function () {

  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/base.tpl'))
    .pipe($.rename('base.html'))
    .pipe(assets = $.useref.assets())
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../../static/fonts/'))
    .pipe($.replace('../../bower_components/fontawesome/fonts/', '../../static/fonts/'))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });


gulp.task('html-dev-scripts', ['inject-scripts'], function () {

  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/base.tpl'))
    .pipe($.rename('base.html'))
    .pipe(assets = $.useref.assets())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

gulp.task('html-dev-styles', ['inject-styles'], function () {
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/base.tpl'))
    .pipe($.rename('base.html'))
    .pipe(assets = $.useref.assets())
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../../static/fonts/'))
    .pipe($.replace('../../bower_components/fontawesome/fonts/', '../../static/fonts/'))
    .pipe($.replace('../img/', '../assets/plugins/x-editable/'))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });


gulp.task('dev', function(callback){
  runSequence(['html-dev', 'fonts', 'other'],
              'django',
              'index',
              callback);
});
