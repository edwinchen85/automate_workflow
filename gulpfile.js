var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('hello', function() {
  console.log('Hello Edwin');
});

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      precision: 2  // Sets precision to 2
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch('app.scss/**/*.scss', ['sass']);
});
