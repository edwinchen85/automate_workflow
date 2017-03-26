var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(customPlumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch('app.scss/**/*.scss', ['sass']);
});

function customPlumber() {
  return plumber({
    errorHandler: function(err) {
      // Logs error in console
      console.log(err.stack);
      // Ends the current pipe, so Gulp watch doesn't break
      this.emit('end');
    }
  });
}
