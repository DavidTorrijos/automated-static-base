const { dest, parallel, series, src, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')
const sass = require('gulp-sass')

const pugCompile = () => (
  src('./src/views/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./build'))
    .pipe(browserSync.stream())
)

const sassCompile = () => (
  src('./src/stylesheets/style.scss')
    .pipe(sass())
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
