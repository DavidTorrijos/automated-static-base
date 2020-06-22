const { dest, parallel, series, src, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')

const pugCompile = () => (
  src('./src/views/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./build'))
    .pipe(browserSync.stream())
)

const server = () => (
  browserSync.init({
    server: {
      baseDir: './build'
    }
  })
)

const watcher = () => {
  watch('./src/**/*.pug', series(pugCompile))
}

exports.default = series(pugCompile, parallel(server, watcher))
