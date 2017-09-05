'use strict'

const notify = require('gulp-notify')
const bourbon = require('node-bourbon')

module.exports = {
  sassConfig: {
    sourcemap: true,
    noCache: true,
    style: 'expanded',
    sourceComments: 'normal',
    includePaths: [
      bourbon.includePaths
    ]
  },
  jsbeautifier: {
    indent_size: 2,
    indent_char: ' '
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
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
    })
  }
}
