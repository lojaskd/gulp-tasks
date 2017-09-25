const merge = require('lodash').merge
const $ = require('gulp-load-plugins')()
const fs = require('fs')

const { templatesDefaults } = require('./config')

module.exports = (gulp, options, othersTasks = []) => {
  const opts = merge({}, templatesDefaults, options)
  const taskname = opts.taskname
  const minify = opts.minify
  const plumb = opts.plumb
  const isProduction = opts.production
  const plumberErrorHandler = opts.plumberErrorHandler

  gulp.task(taskname, othersTasks, done => gulp.src(opts.src)
    .pipe(plumb ? $.plumber(plumberErrorHandler) : $.util.noop())
    .pipe(opts.data ? $.data(file => opts.dataSettings) : $.util.noop())
    .pipe(opts.pug ? $.pug(opts.pugSettings) : $.util.noop())
    .pipe((!isProduction && opts.beautifier)
      ? $.jsbeautifier(opts.jsbeautifier) : $.util.noop())
    .pipe(isProduction ? $.batchReplace(opts.batchReplace) : $.util.noop())
    .pipe((minify && isProduction) ? $.rename({
      suffix: '.min'
    }) : $.util.noop())
    .pipe($.replace(opts.replaceRegexCss, (s, filename) =>
      `<style type="text/css">${fs.readFileSync(`${opts.distCss}/${filename}`, 'utf8')}</style>`))
    .pipe((!isProduction && opts.size)
      ? $.size(opts.sizeSettings(taskname)) : $.util.noop())
    .pipe(gulp.dest(opts.dest))
    .pipe(plumb ? $.plumber.stop() : $.util.noop()))
}
