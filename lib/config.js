const path = require('path')
const merge = require('lodash').merge
const pkg = require('../package.json')
const notify = require('gulp-notify')
const bourbon = require('node-bourbon')

const config = {
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
  jsIncludeConfig: {
    extensions: 'js',
    includePaths: [
      `node_modules`,
      `src/javascripts`
    ]
  },
  plumberErrorHandler: {
    errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
    })
  },
  banner: [
    `/**`,
    ` * <%= pkg.name %> - <%= pkg.description %>`,
    ` * @version v<%= pkg.version %>`,
    ` * @license <%= pkg.license %>`,
    ` * @copyright 2016 <%= pkg.author %>.`,
    ` * @link <%= pkg.homepage %>`,
    ` */`,
    ``
  ]
}

const defaults = {
  production: true,
  plumb: true,
  gzip: true,
  size: true,
  headerPackage: { pkg },
  batchReplace: [],
  jsbeautifier: config.jsbeautifier,
  plumberErrorHandler: config.plumberErrorHandler
}

const scriptsDefaults = merge({}, defaults, {
  taskname: 'scripts',
  src: path.join(__dirname, `src/stylesheets/*.sass`),
  dest: path.join(__dirname, `dist/stylesheets`),
  webpack: true,
  webpackConfig: {},
  include: false,
  sourcemaps: true,
  uglify: false
})

const stylesheetsDefaults = merge({}, defaults, {
  taskname: 'stylesheets',
  src: path.join(__dirname, `src/stylesheets/*.sass`),
  dest: path.join(__dirname, `dist/stylesheets`),
  sass: true,
  combinemq: true,
  minify: true,
  beautifier: true,
  sassConfig: config.sassConfig,
  autoprefixer: config.autoprefixer
})

module.exports = {
  config,
  scriptsDefaults,
  stylesheetsDefaults
}
