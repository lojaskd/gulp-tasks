'use strict'

const merge = require('lodash').merge
const config = require('./config')
const $ = require('gulp-load-plugins')()
const path = require('path')

const defaults = {
  taskname: 'sass',
  src: path.join(__dirname, `src/stylesheets/*.sass`),
  dest: path.join(__dirname, `dist/stylesheets`),
  plumb: true,
  autoprefixer: true,
  combinemq: true,
  size: false,
  minify: false,
  beautifier: false,
  production: false
}

module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options)
  const src = opts.src
  const taskname = opts.taskname
  const prefixer = opts.autoprefixer
  const combinemq = opts.combinemq
  const minify = opts.minify
  const beautifier = opts.beautifier
  const plumb = opts.plumb
  const dest = opts.dest
  const size = opts.size
  const isProd = opts.production

  gulp.task(taskname, done => gulp.src(src)
    .pipe(plumb ? $.plumber(config.plumberErrorHandler) : $.util.noop())
    .pipe($.sass(config.sassConfig))
    .pipe(prefixer ? $.autoprefixer(config.autoprefixer) : $.util.noop())
    .pipe(combinemq ? $.combineMq() : $.util.noop())
    .pipe((!isProd && beautifier)
      ? $.jsbeautifier(config.jsbeautifier) : $.util.noop())
    .pipe((minify && isProd) ? $.cssnano() : $.util.noop())
    .pipe((minify && isProd) ? $.rename({ suffix: '.min' }) : $.util.noop())
    .pipe((!isProd && size) ? $.size({
      title: `Gulp task ${taskname}`,
      showFiles: true
    }) : $.util.noop())
    .pipe(plumb ? $.plumber.stop() : $.util.noop())
    .pipe(gulp.dest(dest)))
}
