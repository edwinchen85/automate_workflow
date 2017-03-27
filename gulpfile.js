var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var gulpIf = require('gulp-if');

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(customPlumber('Error Running Sass'))
    // Initialize sourcemap
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      // Adds prefixes for IE8, IE9 and last 2 versions of all other browsers
      browsers: ['ie 8-9', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
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

gulp.task('sprites', function() {
  gulp.src('app/images/sprites/**/*')
  .pipe(spritesmith({
    cssName: '_sprites.scss',
    imgName: 'sprites.png',
    imgPath: '../images/sprites.png',
    retinaSrcFilter: 'app/images/sprites/*@2x.png',
    retinaImgName: 'sprite@2x.png',
    retinaImgPath: '../images/sprites@2x.png'
  }))
  .pipe(gulpIf('*.png', gulp.dest('app/images')))
  .pipe(gulpIf('*.scss', gulp.dest('app/scss')));
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
