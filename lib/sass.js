'use strict';

const merge = require('lodash').merge;
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const jsbeautifier = require('gulp-jsbeautifier');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const bourbon = require('node-bourbon');
const notify = require('gulp-notify');
const util = require('gulp-util');

const defaults = {
  taskname: 'sass',
  src: './src/stylesheets/*.sass',
  dest: './dist/stylesheets',
  plumb: true,
  autoprefixer: true,
  minify: false,
  beautifier: false,
  bourbon: false
};

const config = {
  sassConfig: {
    compass: true,
    sourcemap: false,
    noCache: true,
    style: 'expanded',
    sourceComments: 'normal',
    includePaths: [
      // bourbon.includePaths,
      `node_modules`,
      `bower_components`,
      `src/bower`,
      `src/stylesheets`
    ]
  },
  jsbeautifier: {
    indent_size: 2,
    indent_char: ' ',
  },
  autoprefixer: {
    browsers: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 5',
      'opera >= 23',
      'ios >= 6',
      'android >= 4.4',
      'bb >= 10'
    ],
    cascade: false
  },
  plumberErrorHandler: {
    errorHandler: notify.onError({
      title   : 'Gulp',
      message : 'Error: <%= error.message %>'
    })
  }
}

module.exports = function (gulp, options) {
  const opts = merge({}, defaults, options);
  const src = opts.src;
  const taskname = opts.taskname;
  const prefixer = opts.autoprefixer;
  const minify = opts.minify;
  const beautifier = opts.beautifier;
  const plumb = opts.plumb;
  const dest = opts.dest;

  gulp.task(taskname, done => gulp.src(src)
    .pipe(plumb ? plumber(config.plumberErrorHandler) : util.noop())
    .pipe(sass(config.sassConfig))
    .pipe(prefixer ? autoprefixer(config.autoprefixer) : util.noop())
    .pipe(beautifier ? jsbeautifier(config.jsbeautifier) : util.noop())
    .pipe((beautifier && minify) ? gulp.dest(dest) : util.noop())
    .pipe(minify ? cssnano() : util.noop())
    .pipe(minify ? rename({ suffix: '.min' }) : util.noop())
    .pipe(plumb ? plumber.stop() : util.noop())
    .pipe(gulp.dest(dest)));
};
