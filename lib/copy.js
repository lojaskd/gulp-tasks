const merge = require('lodash').merge
const $ = require('gulp-load-plugins')()

const defaults = {
  taskname: 'copy',
  src: './static/*',
  dest: './dist/',
  size: false
}

module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options)
  const taskname = opts.taskname
  const size = opts.size

  gulp.task(taskname, () => gulp.src(opts.src)
    .pipe(size ? $.size(opts.sizeSettings(taskname)) : $.util.noop())
    .pipe(gulp.dest(opts.dest)))
}
