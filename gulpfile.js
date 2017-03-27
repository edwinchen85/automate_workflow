var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(customPlumber('Error Running Sass'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/css'))
    // Tells Browser Sync to reload files when task is done
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app.scss/**/*.scss', ['sass']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      // Customizing error title
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Glass"
    })
  });
}
