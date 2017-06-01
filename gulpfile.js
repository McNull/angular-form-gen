#!/usr/bin/env node

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

var config = require('./build-config.js');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

var gulp = require('gulp');
var path = require('path');
var karma = require('gulp-karma');
var clean = require('gulp-rimraf');
var webserver = require('gulp-webserver');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

require('./gulp-tasks/bower-task.js')(gulp);
require('./gulp-tasks/index-task.js')(gulp);
require('./gulp-tasks/modules-task.js')(gulp);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('app-copy-readme', ['app-copy-clean'], function () {
  return gulp.src('README.md')
    .pipe(gulp.dest(path.join(config.folders.dest, 'app')));
});

gulp.task('sitemap', [], function () {
  return gulp.src(path.join(config.folders.src, 'sitemap.xml'))
    .pipe(gulp.dest(config.folders.dest));
});

var appCopy = gulp.tasks['app-copy'];
appCopy.dep.push('app-copy-readme');
appCopy.dep.push('sitemap');

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('sandbox-clean', [ 'modules', 'bower' ], function () {
  return gulp.src(path.join(config.folders.dest, 'sandbox'))
    .pipe(clean());
});

gulp.task('sandbox-copy', [ 'sandbox-clean' ], function () {
  return gulp.src(path.join(config.folders.src, 'sandbox/**/*'))
    .pipe(gulp.dest(path.join(config.folders.dest, 'sandbox')));
});

gulp.task('sandbox', [ 'sandbox-copy', 'modules', 'bower' ]);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('test-run', ['angular-form-gen'], function () {

  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/lodash/dist/lodash.compat.js',
    path.join(config.folders.dest, 'angular-form-gen/angular-form-gen.min.js'),
    path.join(config.folders.src, 'angular-form-gen/**/*.test.js')
  ])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
      singleRun: true
    })).on('error', function (err) {
      throw err;
    });

});

//gulp.task('test-watch', ['angular-form-gen'], function () {
//
//  gulp.src([
//    'bower_components/jquery/dist/jquery.js',
//    'bower_components/angular/angular.js',
//    'bower_components/angular-mocks/angular-mocks.js',
//    'bower_components/lodash/dist/lodash.compat.js',
//    path.join(config.folders.src, 'angular-form-gen/angular-form-gen.js'),
//    path.join(config.folders.dest, 'angular-form-gen/angular-form-gen-templates.js'),
//    path.join(config.folders.src, 'angular-form-gen/**/*.js')
//  ])
//    .pipe(karma({
//      configFile: 'karma.conf.js',
//      action: 'watch'
//    }));
//
//});

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('dist-clean', function () {

  return gulp.src('dist/**/*', { read: false }).pipe(clean());

});

gulp.task('dist', ['dist-clean', 'angular-form-gen', 'test-run'], function () {

  var destGlob = path.join(config.folders.dest, 'angular-form-gen/**/*');
  return gulp.src([
    destGlob
    //'README.md',
    // 'LICENSE',
    // '!**/angular-form-gen-templates.js'
  ]).pipe(gulp.dest('dist'));

});

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

gulp.task('build', [ 'modules', 'bower', 'index' ]);
gulp.task('watch', [ 'modules-watch' ]);
gulp.task('default', [ 'build' ]);

// - - - - 8-< - - - - - - - - - - - - - - - - - - -

// Launch webserver
gulp.task('webserver', function() {
  return gulp.src('dest')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true,
      open: false
    }));
});
