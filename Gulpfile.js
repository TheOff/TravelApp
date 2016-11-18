const gulp = require('gulp');
const sass = require('gulp-sass');
const bs = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');

gulp.task('compile:sass', () => {
  return gulp.src('./app/app.sass')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./app'))
    .pipe(bs.stream())
});

gulp.task('compile', ['compile:sass']);

gulp.task('watch:sass', () => {
  gulp.watch('./app/**/*.sass', ['compile:sass'])
});

gulp.task('watch:static', () => {
  gulp.watch(['./index.html', './components/**/*.html', './assets/**/*']).on('change', bs.reload);
});

gulp.task('watch:other', () => {
  gulp.watch(['./app/**/*.js', './components/**/*.js', './app/**/*.html']).on('change', bs.reload);
});

gulp.task('watch', ['watch:sass', 'watch:static', 'watch:other']);

gulp.task('serve', () => {
  bs.init({
    server: {
      baseDir: '.'
    },
    middleware(req, res, next) {
      console.log(`${req.method} [${res.statusCode}]: ${req.url}`);

      if (!/\.[a-zA-Z]{1,5}(\/?\?.*)?$/.test(req.url)) {
        req.url = '/';
      }

      return next();
    }
  });
});

gulp.task('default', ['compile', 'serve', 'watch']);
