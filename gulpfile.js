var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scripts', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});


// remove comments
gulp.task('strip', function () {
    return gulp.src('./index-dev.html')
      .pipe(wait(250))
      .pipe(strip())
      .pipe(rename('./index.html'))
      .pipe(gulp.dest('./'));
  });

gulp.task('watch', function() {
    gulp.watch('js/scripts.js', gulp.series('scripts'));
    gulp.watch('scss/styles.scss', gulp.series('styles'));
    gulp.watch('./index-dev.html', gulp.series('strip'));
});