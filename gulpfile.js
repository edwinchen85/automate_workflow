var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');
var gulpIf = require('gulp-if');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var fs = require('fs');

gulp.task('sass', function() {
  gulp.src('app/scss/**/*.scss')
    .pipe(customPlumber('Error Running Sass'))
    // Initialize sourcemap
    .pipe(sourcemaps.init())
    .pipe(sass({
      // Include bower_components and node_modules as import locations
      includePaths: ['app/bower_components/', 'node_modules/']
    }))
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
  gulp.watch([
    'app/templates/**.*'
    'app/pages/**/*.+(html|nunjucks)'
    'app/data.json'
    ], ['nunjucks']
  );
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
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

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['app/templates/']);

  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  .pipe(customPlumber('Error Running Nunjucks'))
  // Adding data to Nunjucks
  .pipe(data(function() {
    return JSON.parse(fs.readFileSync('./app/data.json'))
  }))
  // Renders template with nunjucks
  .pipe(nunjucksRender({
    path: ['app/templates']
  }))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({
    stream: true
  }));
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
