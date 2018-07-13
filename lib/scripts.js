const merge = require('lodash').merge
const $ = require('gulp-load-plugins')()

const { config, scriptsDefaults } = require('./config')

module.exports = (gulp, options, othersTasks = []) => {
  const opts = merge({}, scriptsDefaults, options)
  const taskname = opts.taskname
  const webpack = opts.webpack
  const batchReplace = opts.batchReplace
  const sourcemaps = opts.sourcemaps
  const uglify = opts.uglify
  const plumb = opts.plumb
  const isProduction = opts.production

  gulp.task(taskname, othersTasks, done => gulp.src(opts.src)
    .pipe(plumb ? $.plumber(opts.plumberErrorHandler) : $.util.noop())
    .pipe(opts.include ? $.include(config.jsIncludeConfig)
      .on('error', function (error) {
        /* -- Function for when one error appears in build -- */
        console.log("ERROR: A error appears during build process!" + error)
        process.exit(1)
      }) : $.util.noop())
    .pipe(sourcemaps ? $.sourcemaps.init() : $.util.noop())
    .pipe(webpack ? webpack(opts.webpackConfig) : $.util.noop())
    .pipe((isProduction && uglify)
      ? $.uglify() : $.jsbeautifier(opts.jsbeautifier))
    .pipe((isProduction && batchReplace)
      ? $.batchReplace(batchReplace) : $.util.noop())
    .pipe((uglify && isProduction) ? $.rename({
      suffix: '.min'
    }) : $.util.noop())
    .pipe($.header(config.banner.join('\n'), opts.headerPackage))
    .pipe(opts.gzip ? $.gzip({
      append: false
    }) : $.util.noop())
    .pipe((!isProduction && opts.size)
      ? $.size(opts.sizeSettings(taskname)) : $.util.noop())
    .pipe(sourcemaps ? $.sourcemaps.write() : $.util.noop())
    .pipe(gulp.dest(opts.dest))
    .pipe(plumb ? $.plumber.stop() : $.util.noop()))
}
