const { dest, parallel, series, src, watch } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babelify = require('babelify')
const browserify = require('browserify')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')

const browsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

const sassCompile = () => (
  src('./src/stylesheets/style.scss')
    .pipe(sass())
    .pipe(autoprefixer(browsers))
    .pipe(cleanCSS())
    .pipe(dest('./build/stylesheets'))
    .pipe(browserSync.stream())
)

const jsCompile = () => (
  browserify('./src/javascripts/main.js')
    .transform(babelify.configure({ presets: ['@babel/preset-env'] }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest('./build/javascripts'))
    .pipe(browserSync.stream())
)

const pugCompile = () => (
  src('./src/views/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./build'))
    .pipe(browserSync.stream())
)

const server = () => browserSync.init({ server: { baseDir: './build' } })

const watcher = () => {
  watch('./src/**/*.js', series(jsCompile))
  watch('./src/**/*.pug', series(pugCompile))
  watch('./src/**/*.scss', series(sassCompile))
}

exports.default = series(sassCompile, jsCompile, pugCompile, parallel(server, watcher))
