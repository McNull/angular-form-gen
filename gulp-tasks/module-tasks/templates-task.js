#!/usr/bin/env node
/**
 * Created by null on 11/08/14.
 */

var minifyHtml = require('gulp-minify-html');
var svgmin = require('gulp-svgmin');
var merge = require('merge-stream');

var path = require('path');

var ngXml = require('../lib/ng-xml.js');
var modify = require('../lib/gulp-modify-content.js');
var config = require('../../build-config.js');

module.exports = function(gulp, module) {

  var inputFiles = [
    path.join(module.folders.src, '**/*.ng.html'),
    path.join(module.folders.src, '**/*.ng.svg')
  ];

  module.watch('templates', function() {
    return {
      glob: inputFiles,
      tasks: ['scripts']
    };
  });

  module.task('templates-clean', function(cb) {

    cb();
//    var outputFiles = [
//      path.join(module.folders.dest, module.name + '-templates.js')
//    ];
//
//    var clean = require('gulp-rimraf');
//
//    return gulp.src(outputFiles, { read: false })
//      .pipe(clean({ force: true }));

  });

  module.task('templates', 'templates-clean', function () {

    var ngHtmlGlob = [
      path.join(module.folders.src, '**/*.ng.html'),
      '!**/*.ignore.ng.html'
    ];

    var ngSvgGlob = [
      path.join(module.folders.src, '/**/*.ng.svg'),
      '!**/*.ignore.ng.svg'
    ];

    var ngHtmlStream = gulp.src(ngHtmlGlob)
      .pipe(module.touch())
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }));

    var ngSvgStream = gulp.src(ngSvgGlob)
      .pipe(module.touch())
      .pipe(svgmin());

    return merge(ngHtmlStream, ngSvgStream)
      .pipe(ngXml({
        moduleName: module.alias || module.name,
        base: config.folders.src,
        filename: module.name + '-templates.js'
      }))
      .pipe(modify(function(contents) {
        return [
          '// ATTENTION!',
          '// DO NOT MODIFY THIS FILE BECAUSE IT WAS GENERATED AUTOMATICALLY',
          '// SO ALL YOUR CHANGES WILL BE LOST THE NEXT TIME THE FILE IS GENERATED',
          ''
        ].join('\n') + contents;
      }))
      .pipe(gulp.dest(module.folders.src));

  });

};

