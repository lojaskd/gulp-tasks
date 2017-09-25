const merge = require('lodash').merge
const path = require('path')
const $ = require('gulp-load-plugins')()

module.exports = (gulp, options, othersTasks = []) => {
  const opts = merge({}, {
    src: path.join(__dirname, `src/javascripts/**/*.js`),
    taskname: 'eslint',
    eslintOptions: { extends: ['lojaskd-base'] }
  }, options)

  gulp.task(opts.taskname, othersTasks, done => gulp.src(opts.src)
    .pipe($.eslint(opts.eslintOptions))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError()))
}
