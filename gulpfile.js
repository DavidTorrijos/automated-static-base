const { parallel, src, dest } = require('gulp')
const pug = require('gulp-pug')

const pugCompile = cb => {
  src('src/views/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(dest('./build'))
  return cb()
}

exports.default = parallel(pugCompile)
