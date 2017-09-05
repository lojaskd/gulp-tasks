'use strict'

const merge = require('lodash').merge
const config = require('./config')
const $ = require('gulp-load-plugins')()
const path = require('path')

const defaults = {
  taskname: 'sass',
  src: path.join(__dirname, `src/stylesheets/*.sass`),
  dest: path.join(__dirname, `dist/stylesheets`),
  gzip: true,
  plumb: true,
  combinemq: true,
  size: true,
  minify: true,
  beautifier: true,
  production: true,
  sassConfig: config.sassConfig,
  jsbeautifier: config.jsbeautifier,
  autoprefixer: config.autoprefixer,
  plumberErrorHandler: config.plumberErrorHandler
}

module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options)
  const src = opts.src
  const taskname = opts.taskname
  const combinemq = opts.combinemq
  const gzip = opts.gzip
  const minify = opts.minify
  const beautifier = opts.beautifier
  const plumb = opts.plumb
  const dest = opts.dest
  const size = opts.size
  const isProduction = opts.production
  const sassConfig = opts.sassConfig
  const jsbeautifier = opts.jsbeautifier
  const autoprefixer = opts.autoprefixer
  const plumberErrorHandler = opts.plumberErrorHandler

  gulp.task(taskname, done => gulp.src(src)
    .pipe(plumb ? $.plumber(plumberErrorHandler) : $.util.noop())
    .pipe($.sass(sassConfig).on('error', $.sass.logError))
    .pipe(autoprefixer ? $.autoprefixer(autoprefixer) : $.util.noop())
    .pipe(combinemq ? $.combineMq() : $.util.noop())
    .pipe((!isProduction && beautifier)
      ? $.jsbeautifier(jsbeautifier)
      : (minify && isProduction) ? $.cssnano() : $.util.noop())
    .pipe((minify && isProduction) ? $.rename({
      suffix: '.min'
    }) : $.util.noop())
    .pipe(gzip ? $.gzip({
      append: false
    }) : $.util.noop())
    .pipe((!isProduction && size) ? $.size({
      title: `Gulp task ${taskname}`,
      showFiles: true
    }) : $.util.noop())
    .pipe(gulp.dest(dest))
    .pipe(plumb ? $.plumber.stop() : $.util.noop()))
}
