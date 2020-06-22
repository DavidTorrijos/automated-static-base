const { dest, parallel, series, src, watch } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css')
const pug = require('gulp-pug')
const sass = require('gulp-sass')

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

const pugCompile = () => (
  src('./src/views/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./build'))
    .pipe(browserSync.stream())
)

const sassCompile = () => (
  src('./src/stylesheets/style.scss')
    .pipe(sass())
    .pipe(autoprefixer(browsers))
    .pipe(cleanCSS())
    .pipe(dest('./build/stylesheets'))
    .pipe(browserSync.stream())
)

const server = () => (
  browserSync.init({
    server: { baseDir: './build' }
  })
)

const watcher = () => {
  watch('./src/**/*.pug', series(pugCompile))
  watch('./src/**/*.scss', series(sassCompile))
}

exports.default = series(pugCompile, sassCompile, parallel(server, watcher))
