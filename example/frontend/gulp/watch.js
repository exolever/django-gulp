/*jslint node: true */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.less')
  ], function(event) {
    gulp.start('html-dev-styles');
  });

  gulp.watch(path.join(conf.paths.src, '/modules/**/*.js'), function(event) {
    gulp.start('html-dev-scripts');
  });
});
