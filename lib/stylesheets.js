const merge = require('lodash').merge
const $ = require('gulp-load-plugins')()

const { config, stylesheetsDefaults } = require('./config')

module.exports = (gulp, options, othersTasks = []) => {
  const opts = merge({}, stylesheetsDefaults, options)
  const taskname = opts.taskname
  const minify = opts.minify
  const plumb = opts.plumb
  const isProduction = opts.production
  const autoprefixer = opts.autoprefixer
  const plumberErrorHandler = opts.plumberErrorHandler

  gulp.task(taskname, othersTasks, done => gulp.src(opts.src)
    .pipe(plumb ? $.plumber(plumberErrorHandler) : $.util.noop())
    .pipe(opts.sass ? $.sass(opts.sassConfig).on('error', $.sass.logError) : $.util.noop())
    .pipe(autoprefixer ? $.autoprefixer(autoprefixer) : $.util.noop())
    .pipe(opts.combinemq ? $.combineMq() : $.util.noop())
    .pipe((!isProduction && opts.beautifier)
      ? $.jsbeautifier(opts.jsbeautifier)
      : (minify && isProduction) ? $.cssnano(opts.cssnano) : $.util.noop())
    .pipe(isProduction ? $.batchReplace(opts.batchReplace) : $.util.noop())
    .pipe((minify && isProduction) ? $.rename({
      suffix: '.min'
    }) : $.util.noop())
    .pipe($.header(config.banner.join('\n'), opts.headerPackage))
    .pipe(opts.gzip ? $.gzip({
      append: false
    }) : $.util.noop())
    .pipe((!isProduction && opts.size) ? $.size({
      title: `Gulp task ${taskname}`,
      showFiles: true
    }) : $.util.noop())
    .pipe(gulp.dest(opts.dest))
    .pipe(plumb ? $.plumber.stop() : $.util.noop()))
}
