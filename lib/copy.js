'use strict';

const merge = require('lodash').merge;
const $     = require('gulp-load-plugins')();

const defaults = {
  taskname: 'copy',
  src: './static/*',
  dest: './dist/',
  size: false
};

module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options);
  const size = opts.size;

  gulp.task(opts.taskname, () => gulp.src(opts.src)
    .pipe(size ? $.size({ title: `Gulp task ${opts.taskname}`, gzip: false, showFiles: true }) : $.util.noop())
    .pipe(gulp.dest(opts.dest)));
};
