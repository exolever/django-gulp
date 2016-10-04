/*jslint node: true */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');


gulp.task('inject-reload', ['inject'], function() {
});

gulp.task('inject', ['styles', 'templates'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join(conf.paths.css, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join('!' + conf.paths.src, '/test/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/test/**/*.mock.js'),
  ]);

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(conf.paths.base)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(conf.wiredep))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});


gulp.task('inject-scripts', ['scripts'], function(){
  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join('!' + conf.paths.src, '/test/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/test/**/*.mock.js'),
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(conf.paths.base)
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});


gulp.task('inject-styles', ['styles'], function(){
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join(conf.paths.css, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(conf.paths.base)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

gulp.task('inject-base', ['styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join(conf.paths.css, '/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/modules/**/*.js'),
    path.join('!' + conf.paths.src, '/test/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/test/**/*.mock.js'),
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  var injectOpctionsLibraries = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false,
    name: 'libraries'
  };

  return gulp.src(conf.paths.base)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(conf.wiredep))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

