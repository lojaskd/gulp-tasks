'use strict';

const merge  = require('lodash').merge;
const config = require('./config');
const $      = require('gulp-load-plugins')();

const defaults = {
  taskname: 'sass',
  src: './src/stylesheets/*.sass',
  dest: './dist/stylesheets',
  plumb: true,
  autoprefixer: true,
  size: false,
  minify: false,
  beautifier: false
};

module.exports = (gulp, options) => {
  const opts       = merge({}, defaults, options);
  const src        = opts.src;
  const taskname   = opts.taskname;
  const prefixer   = opts.autoprefixer;
  const minify     = opts.minify;
  const beautifier = opts.beautifier;
  const plumb      = opts.plumb;
  const dest       = opts.dest;
  const size       = opts.size;

  gulp.task(taskname, done => gulp.src(src)
    .pipe(plumb ? $.plumber(config.plumberErrorHandler) : $.util.noop())
    .pipe($.sass(config.sassConfig))
    .pipe(prefixer ? $.autoprefixer(config.autoprefixer) : $.util.noop())
    .pipe(beautifier ? $.jsbeautifier(config.jsbeautifier) : $.util.noop())
    .pipe(size ? $.size({ title: `Gulp task ${taskname}`, gzip: false, showFiles: true }) : $.util.noop())
    .pipe((beautifier && minify) ? gulp.dest(dest) : $.util.noop())
    .pipe(minify ? $.cssnano() : $.util.noop())
    .pipe(minify ? $.rename({ suffix: '.min' }) : $.util.noop())
    .pipe(size ? $.size({ title: `Gulp task ${taskname}`, gzip: false, showFiles: true }) : $.util.noop())
    .pipe(plumb ? $.plumber.stop() : $.util.noop())
    .pipe(gulp.dest(dest)));
};
