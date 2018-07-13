const path = require('path')
const merge = require('lodash').merge
const pkg = require('../package.json')
const notify = require('gulp-notify')
const bourbon = require('node-bourbon')

const browsersVersions = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 5',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
]

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
    browsers: browsersVersions,
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
      return function(err) {
        console.log(err);
        process.exit()
      }
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
  plumberErrorHandler: config.plumberErrorHandler,
  sizeSettings: title => {
    return {
      title: `Task ${title}: `,
      showFiles: true
    }
  }
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
  cssnano: {
    zindex: false,
    reduceIdents: false,
    autoprefixer: {
      browsers: browsersVersions,
      add: true
    }
  },
  beautifier: true,
  sassConfig: config.sassConfig,
  autoprefixer: config.autoprefixer
})

const templatesDefaults = merge({}, defaults, {
  taskname: 'templates',
  src: path.join(__dirname, `src/templates/**/*.pug`),
  dest: path.join(__dirname, `dist`),
  beautifier: false,
  data: true,
  dataSettings: {
    siteUrl: 'https://site.dev',
    assetsUrl: '/dist'
  },
  pug: true,
  pugSettings: {},
  distCss: path.join(__dirname, `dist/stylesheets`),
  /* eslint no-useless-escape: 0 */
  replaceRegexCss: /<link rel="stylesheet" href="[^]*\/([^\.]+\.[^]*css)"[^>]*>/g
})

module.exports = {
  config,
  scriptsDefaults,
  stylesheetsDefaults,
  templatesDefaults
}
