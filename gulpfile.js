var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
  console.log('Hello Edwin');
});

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', errorHandler))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch('app.scss/**/*.scss', ['sass']);
});

function errorHandler(err) {
  // Logs out error in the command line
  console.log(err.toString());
  // Ends the current pipe, so Gulp watch doesn't break
  this.emit('end');
}
